# Nginx Configuration Fix Guide

## Problem
The nginx container is having configuration conflicts because:
1. Multiple config files are loading (sites-enabled/store.conf + conf.d/bangoo.conf)
2. Wrong SSL certificate is being served
3. Connection resets happening

## Solution: Fresh Nginx Container with Clean Config

### Step 1: Connect to VPS
```bash
ssh root@72.61.106.2
# Password: bT@HtuliKPxnah-/#2Zw
```

### Step 2: Clean Up Old Nginx Containers
```bash
# Stop and remove all nginx containers
docker ps -a | grep nginx
docker rm -f $(docker ps -a --filter 'name=nginx' -q)

# Verify ports are free
netstat -tulpn | grep -E ':(80|443) '
```

### Step 3: Create Clean Nginx Configuration
```bash
# Create directory for clean config
mkdir -p /tmp/nginx-clean/conf.d

# Create the configuration file
cat > /tmp/nginx-clean/conf.d/bangoo.conf << 'EOF'
# Frontend HTTP - Redirect to HTTPS
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name bangoocyp.com www.bangoocyp.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# Frontend HTTPS
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name bangoocyp.com www.bangoocyp.com;

    ssl_certificate /etc/letsencrypt/live/bangoocyp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bangoocyp.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=31536000" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://bangoo-frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://bangoo-frontend:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# Backend HTTP - Redirect
server {
    listen 80;
    server_name admin.bangoocyp.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# Backend HTTPS
server {
    listen 443 ssl http2;
    server_name admin.bangoocyp.com;

    ssl_certificate /etc/letsencrypt/live/admin.bangoocyp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.bangoocyp.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 100M;

    location / {
        proxy_pass http://medusa-backend:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 300s;
        proxy_read_timeout 300s;
    }
}
EOF
```

### Step 4: Start Fresh Nginx Container
```bash
docker run -d \
  --name bangoo-nginx \
  --restart unless-stopped \
  --network medusa-backend-multivendor_backend \
  -p 80:80 \
  -p 443:443 \
  -v /tmp/nginx-clean/conf.d:/etc/nginx/conf.d:ro \
  -v /root/bangoo/medusa-backend-multivendor/certbot/conf:/etc/letsencrypt:ro \
  -v /root/bangoo/medusa-backend-multivendor/certbot/www:/var/www/certbot:ro \
  nginx:alpine
```

### Step 5: Verify Everything Works
```bash
# Check nginx is running
docker ps | grep bangoo-nginx

# Check nginx logs
docker logs bangoo-nginx --tail 50

# Test HTTP redirect
curl -I http://localhost

# Test HTTPS
curl -Ik https://bangoocyp.com

# Check SSL certificate
echo | openssl s_client -servername bangoocyp.com -connect localhost:443 2>/dev/null | grep -E 'subject=|issuer='

# Test backend admin
curl -Ik https://admin.bangoocyp.com
```

## Expected Results

### HTTP Test (should redirect to HTTPS):
```
HTTP/1.1 301 Moved Permanently
Location: https://bangoocyp.com/
```

### HTTPS Test (should show frontend):
```
HTTP/2 200
server: nginx/1.25.x
```

### SSL Certificate Test:
```
subject=CN=bangoocyp.com
issuer=C=US, O=Let's Encrypt, CN=R11
```

### Backend Admin Test:
```
HTTP/2 200
server: nginx/1.25.x
```

## Troubleshooting

### If frontend shows 502 Bad Gateway:
```bash
# Check frontend container is running
docker ps | grep bangoo-frontend

# Check frontend logs
docker logs bangoo-frontend --tail 50

# Restart frontend if needed
docker restart bangoo-frontend
```

### If wrong SSL certificate is served:
```bash
# Check certificate files exist
ls -la /root/bangoo/medusa-backend-multivendor/certbot/conf/live/bangoocyp.com/

# Check nginx config
docker exec bangoo-nginx cat /etc/nginx/conf.d/bangoo.conf

# Restart nginx
docker restart bangoo-nginx
```

### If ports are still in use:
```bash
# Find what's using the ports
netstat -tulpn | grep -E ':(80|443) '

# If it's docker-proxy, find the container
docker ps | grep -E '80|443'

# Stop that container
docker stop <container-name>
```

## DNS Verification
```bash
# Check DNS propagation
dig bangoocyp.com +short
dig www.bangoocyp.com +short
dig admin.bangoocyp.com +short

# Should all return: 72.61.106.2
```

## Final Test from Local Machine
```bash
# Test from your Mac
curl -I https://bangoocyp.com
curl -I https://admin.bangoocyp.com

# Or open in browser:
# https://bangoocyp.com
# https://admin.bangoocyp.com
```

## Success Criteria
- ✅ https://bangoocyp.com loads the frontend (Next.js app)
- ✅ https://admin.bangoocyp.com loads the Medusa admin
- ✅ Correct SSL certificates are served for each domain
- ✅ HTTP redirects to HTTPS
- ✅ No connection reset errors

## Notes
- This creates a CLEAN nginx setup with NO conflicts
- Only one config file in /etc/nginx/conf.d/
- No sites-enabled directory mounted
- Uses Alpine nginx image (lightweight)
- Connected to medusa-backend-multivendor_backend network to reach backend
