# 🔧 Backend Setup Guide - Medusa v2.10.3

**⚠️ GÜNCELLEME:** Bu guide Medusa v2.10.3 için web dokümantasyonundan doğrulanarak güncellenmiştir.

## BACKEND GEREKSİNİMLERİ

Bu dokümantasyon, backend'de yapılması gereken değişiklikleri açıklar.

---

## 1️⃣ CUSTOMER METADATA FIELD

Medusa v2.10.3'te customer metadata varsayılan olarak destekleniyor. Ekstra migration gerekmez.

### Metadata Yapısı

```typescript
{
  "customer": {
    "id": "cus_xxx",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "metadata": {
      "is_setup_completed": true  // Bu field'ı kullanacağız
    }
  }
}
```

### Test Etme

```bash
# Customer metadata'sını kontrol et
curl -X GET "https://admin.bangoocyp.com/store/customers/me" \
  -H "x-publishable-api-key: YOUR_PUBLISHABLE_KEY" \
  -H "Cookie: _medusa_jwt=YOUR_JWT_TOKEN"
```

---

## 2️⃣ GOOGLE OAUTH PROVIDER KURULUMU

### Gerekli Paketler

**NOT:** Medusa v2.10.3'te auth ve auth-google modülleri `@medusajs/medusa` paketine dahildir. Ayrı paket kurulumuna gerek yoktur.

```json
{
  "dependencies": {
    "@medusajs/medusa": "^2.10.3"
  }
}
```

### Environment Variables

`.env` dosyanıza ekleyin:

```bash
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Google OAuth Callback URL (Backend URL)
GOOGLE_CALLBACK_URL=https://admin.bangoocyp.com/auth/customer/google/callback

# Frontend Base URL
FRONTEND_URL=https://bangoocyp.com

# CORS Settings
STORE_CORS=https://bangoocyp.com,https://www.bangoocyp.com
ADMIN_CORS=http://localhost:7001,https://admin.bangoocyp.com

# Cookie Domain (wildcard for subdomains)
COOKIE_DOMAIN=.bangoocyp.com
```

### Medusa Config

**Dosya:** `medusa-config.js` veya `medusa-config.ts`

```javascript
const { defineConfig, Modules } = require("@medusajs/utils")

module.exports = defineConfig({
  projectConfig: {
    // ... other config
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.STORE_CORS || "http://localhost:8000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/auth-google",
            id: "google",
            options: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackUrl: process.env.GOOGLE_CALLBACK_URL,
            },
          },
        ],
      },
    },
  ],
})
```

**ÖNEMLI DEĞİŞİKLİKLER:**
- ✅ `modules` artık **array** (object değil)
- ✅ `resolve: "@medusajs/medusa/auth"` (tam path)
- ✅ `resolve: "@medusajs/medusa/auth-google"` (tam path)
- ✅ Auth modülü dahili olarak gelir, ayrı paket gerekmez

---

## 3️⃣ GOOGLE CLOUD CONSOLE AYARLARI

### Adımlar

1. https://console.cloud.google.com adresine gidin
2. **APIs & Services** → **Credentials**
3. OAuth 2.0 Client ID'nizi seçin
4. **Authorized redirect URIs** bölümüne ekleyin:

```
https://admin.bangoocyp.com/auth/customer/google/callback
```

**ÖNEMLI:**
- ✅ Sadece backend URL'i ekleyin
- ❌ Frontend URL'lerini eklemeyin
- ❌ URL sonunda `/` olmamalı
- ✅ Tam olarak `https://admin.bangoocyp.com/auth/customer/google/callback` şeklinde

5. **Authorized JavaScript origins** bölümüne ekleyin:

```
https://bangoocyp.com
https://www.bangoocyp.com
```

---

## 4️⃣ CUSTOM CALLBACK HANDLER (OPSİYONEL)

Medusa v2.10.3'te varsayılan callback handler çalışır. Ancak custom logic eklemek isterseniz:

### Option A: Medusa v2 Custom Route

**Dosya:** `src/api/auth/google/callback/route.ts`

```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { code, state } = req.query

  try {
    // Medusa auth service ile token exchange
    const authService = req.scope.resolve("authService")
    const result = await authService.callback("customer", "google", {
      code,
      state
    })

    if (!result || !result.token) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/tr/account?error=auth_failed`
      )
    }

    // Token'ı cookie'ye kaydet
    res.cookie("_medusa_jwt", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env.COOKIE_DOMAIN || ".bangoocyp.com",
      path: "/",
    })

    // Frontend'e yönlendir
    return res.redirect(`${process.env.FRONTEND_URL}/tr/account?auth=success`)
  } catch (error) {
    console.error("Google OAuth callback error:", error)
    return res.redirect(
      `${process.env.FRONTEND_URL}/tr/account?error=${encodeURIComponent(error.message)}`
    )
  }
}
```

**NOT:** Varsayılan handler zaten çalışıyorsa bu dosyayı oluşturmanıza gerek yok.

---

## 5️⃣ CUSTOMER METADATA UPDATE ENDPOİNTİ

Medusa v2.10.3'te customer update endpoint'i metadata'yı destekler:

```bash
# Customer metadata güncelleme
curl -X POST "https://admin.bangoocyp.com/store/customers/me" \
  -H "Content-Type: application/json" \
  -H "x-publishable-api-key: YOUR_KEY" \
  -H "Cookie: _medusa_jwt=YOUR_TOKEN" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "metadata": {
      "is_setup_completed": true
    }
  }'
```

**Response:**
```json
{
  "customer": {
    "id": "cus_xxx",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "metadata": {
      "is_setup_completed": true
    }
  }
}
```

---

## 6️⃣ CORS VE COOKIE AYARLARI

### CORS Headers

Backend'inizin şu header'ları dönmesi gerekiyor:

```
Access-Control-Allow-Origin: https://bangoocyp.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, x-publishable-api-key
```

### Cookie Settings

```javascript
// Cookie ayarları
{
  httpOnly: true,              // XSS koruması
  secure: true,                // HTTPS only (production)
  sameSite: "lax",             // CSRF koruması
  domain: ".bangoocyp.com",    // Subdomain'lerde de geçerli
  path: "/",                   // Tüm path'lerde geçerli
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 gün
}
```

---

## 7️⃣ TEST ETME

### Backend Endpoint Test

```bash
# 1. OAuth flow başlatma endpoint'ini test et
curl -i "https://admin.bangoocyp.com/auth/customer/google"

# Beklenen: 302 redirect to Google
# Location: https://accounts.google.com/o/oauth2/v2/auth?...

# 2. Customer endpoint'ini test et
curl -X GET "https://admin.bangoocyp.com/store/customers/me" \
  -H "x-publishable-api-key: YOUR_KEY" \
  -H "Cookie: _medusa_jwt=YOUR_TOKEN"

# Beklenen: 200 OK with customer data
```

### Backend Logs

```bash
# pm2 kullanıyorsanız:
pm2 logs medusa-backend

# Docker kullanıyorsanız:
docker logs -f medusa-backend

# Systemd kullanıyorsanız:
journalctl -u medusa -f
```

**Beklenen loglar:**
```
[INFO] Starting Google OAuth flow
[INFO] Google callback received
[INFO] Token exchange successful
[INFO] Customer authenticated: cus_xxx
```

---

## 8️⃣ PRODUCTION DEPLOYMENT

### Checklist

- [ ] Environment variable'lar production değerleriyle güncellendi
- [ ] `NODE_ENV=production` set edildi
- [ ] HTTPS kullanılıyor
- [ ] CORS ayarları doğru
- [ ] Cookie domain doğru (`.bangoocyp.com`)
- [ ] Google Console'da production URL'ler eklendi
- [ ] Backend restart edildi

### Deployment Komutları

```bash
# pm2 ile:
pm2 restart medusa-backend

# Docker ile:
docker restart medusa-backend

# Systemd ile:
sudo systemctl restart medusa
```

---

## 9️⃣ HATA AYIKLAMA

### "redirect_uri_mismatch" Hatası

**Sebep:** Google Console'da callback URL yanlış

**Çözüm:**
1. Google Console'a gidin
2. Callback URL'in TAM OLARAK şu şekilde olduğunu kontrol edin:
   ```
   https://admin.bangoocyp.com/auth/customer/google/callback
   ```
3. URL sonunda `/` olmamalı
4. `http://` değil `https://` olmalı

### "Could not exchange token" Hatası

**Sebep:** Google credentials yanlış

**Çözüm:**
1. `.env` dosyasında `GOOGLE_CLIENT_ID` ve `GOOGLE_CLIENT_SECRET` kontrol edin
2. Google Console'dan doğru değerleri kopyalayın
3. Backend'i restart edin

### Cookie Set Edilmiyor

**Sebep:** CORS veya cookie ayarları yanlış

**Çözüm:**
1. `COOKIE_DOMAIN=.bangoocyp.com` olduğunu kontrol edin
2. CORS ayarlarında `credentials: true` olduğunu kontrol edin
3. Browser'da 3rd party cookies'in blocked olmadığını kontrol edin
4. HTTPS kullanıldığını kontrol edin (production)

### Customer Metadata Güncellenmiyor

**Sebep:** Endpoint veya permission sorunu

**Çözüm:**
1. Customer authenticated mi kontrol edin
2. JWT token geçerli mi kontrol edin
3. Backend loglarında hata var mı kontrol edin
4. Metadata field'ı doğru format'ta mı kontrol edin:
   ```json
   {
     "metadata": {
       "is_setup_completed": true
     }
   }
   ```

---

## 🔟 GÜVENLİK NOTLARI

### ✅ Yapılması Gerekenler

- ✅ `GOOGLE_CLIENT_SECRET`'ı asla frontend'de kullanmayın
- ✅ Cookie'leri her zaman `httpOnly: true` ile set edin
- ✅ Production'da `secure: true` kullanın
- ✅ CORS'u sadece güvendiğiniz domain'lere açın
- ✅ JWT secret'ları güçlü ve rastgele yapın
- ✅ Environment variable'ları `.env` dosyasında saklayın
- ✅ `.env` dosyasını `.gitignore`'a ekleyin

### ❌ Yapılmaması Gerekenler

- ❌ Client secret'ı frontend'de kullanmayın
- ❌ Cookie'leri `httpOnly: false` yapmayın
- ❌ CORS'u `*` (wildcard) olarak açmayın
- ❌ Production'da `secure: false` kullanmayın
- ❌ JWT secret'ları basit yapmayın (örn: "secret")

---

## 📊 BACKEND VERSİYON KONTROLÜ

### Medusa v2.10.3 Kontrolü

```bash
# package.json'da kontrol et
cat package.json | grep "@medusajs/medusa"

# Beklenen:
"@medusajs/medusa": "^2.10.3"

# Tüm Medusa paketlerini kontrol et
npm list | grep @medusajs

# Beklenen (v2.10.3'te auth dahili):
@medusajs/medusa@2.10.3
```

**NOT:** v2.10.3'te `@medusajs/auth` ve `@medusajs/auth-google` ayrı paketler değil, `@medusajs/medusa` içinde dahili modüller olarak gelir.

### Versiyon Downgrade (Gerekirse)

```bash
# Medusa'yı 2.10.3'e downgrade et
npm install @medusajs/medusa@2.10.3

# node_modules'ü temizle ve yeniden yükle
rm -rf node_modules package-lock.json
npm install

# Backend'i restart et
pm2 restart medusa-backend
```

**NOT:** v2.10.3'te auth modülleri dahili olduğu için ayrı paket kurmanıza gerek yok.

---

## 📞 DESTEK

Backend ile ilgili sorun yaşarsanız:

1. **Logs kontrol edin:**
   ```bash
   pm2 logs medusa-backend --lines 100
   ```

2. **Environment variables kontrol edin:**
   ```bash
   printenv | grep GOOGLE
   printenv | grep MEDUSA
   ```

3. **Endpoint'leri test edin:**
   ```bash
   curl -i https://admin.bangoocyp.com/auth/customer/google
   curl -i https://admin.bangoocyp.com/store/customers/me
   ```

4. **Database'i kontrol edin:**
   ```sql
   SELECT id, email, first_name, last_name, metadata
   FROM customer
   WHERE email = 'test@example.com';
   ```

---

## ✅ BACKEND SETUP TAMAMLANDI

Backend setup tamamlandıktan sonra:

1. ✅ Google OAuth çalışıyor
2. ✅ Customer metadata güncellenebiliyor
3. ✅ CORS ayarları doğru
4. ✅ Cookie'ler set ediliyor
5. ✅ Frontend ile entegrasyon çalışıyor

**Sonraki adım:** Frontend'i test edin ve kullanıcı akışlarını doğrulayın.
