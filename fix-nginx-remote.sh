#!/bin/bash
# Remote nginx fix script

echo "=== Cleaning up nginx containers ==="
docker ps -a --filter 'name=nginx' -q | xargs -r docker rm -f

echo "=== Checking ports ==="
netstat -tulpn | grep -E ':(80|443) ' || echo "Ports 80 and 443 are free"

echo "=== Creating clean nginx config ==="
mkdir -p /tmp/nginx-clean/conf.d

cat > /tmp/nginx-clean/conf.d/bangoo.conf << 'NGINX'
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
NGINX

echo "=== Starting fresh nginx container ==="
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

echo "=== Waiting for nginx to start ==="
sleep 3

echo "=== Testing nginx ==="
docker logs bangoo-nginx --tail 20

echo "=== Testing frontend ==="
curl -I http://localhost 2>&1 | head -10

echo "=== Testing HTTPS ==="
curl -Ik https://bangoocyp.com 2>&1 | head -15

