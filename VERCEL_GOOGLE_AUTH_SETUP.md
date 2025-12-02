# Google Auth - Vercel Deployment Kurulum Rehberi

## Frontend Ayarları (Vercel)

### 1. Vercel Environment Variables Ayarlama

Vercel dashboard'unuzda (https://vercel.com):

1. Projenize gidin
2. **Settings** → **Environment Variables** bölümüne gidin
3. Aşağıdaki değişkenleri ekleyin:

```bash
# Production için
NEXT_PUBLIC_BASE_URL=https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/

# Preview/Development için (opsiyonel)
NEXT_PUBLIC_BASE_URL=https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/
```

**ÖNEMLI:** Her environment variable için **Environment** seçimi yapın:
- **Production**: Ana domain için
- **Preview**: Branch deployment'ları için
- **Development**: Local development için

### 2. Google Cloud Console Ayarları

Google Cloud Console'da (https://console.cloud.google.com):

1. **APIs & Services** → **Credentials** gidin
2. OAuth 2.0 Client ID'nizi seçin
3. **Authorized redirect URIs** bölümüne şu URL'leri ekleyin:

```
https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/auth/google/callback
https://admin.bangoocyp.com/auth/customer/google/callback
http://localhost:8000/auth/google/callback
```

**NOT:** Vercel her deployment için farklı URL oluşturabilir. Ana domain'iniz varsa onu kullanın:
```
https://your-domain.com/auth/google/callback
```

4. **Authorized JavaScript origins** bölümüne de ekleyin:

```
https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app
https://your-domain.com
http://localhost:8000
```

5. **Save** butonuna tıklayın

## Backend Ayarları (MedusaJS)

### 1. CORS Ayarları

`medusa-config.js` dosyanızda CORS ayarlarını güncelleyin:

```javascript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app,https://your-domain.com",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:8000",
    },
  },
})
```

### 2. Google Auth Callback URL'leri

Backend `.env` dosyanızda:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Callback URL - Backend'iniz otomatik olarak bu URL'leri kabul edecek
GOOGLE_CALLBACK_URL=https://admin.bangoocyp.com/auth/customer/google/callback

# Allowed redirect URIs (virgülle ayrılmış)
GOOGLE_ALLOWED_REDIRECT_URIS=http://localhost:8000/auth/google/callback,https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/auth/google/callback,https://your-domain.com/auth/google/callback
```

## Vercel Deployment Sonrası Test

### 1. URL'leri Kontrol Edin

Deployment tamamlandıktan sonra:

1. **Vercel Dashboard** → **Deployments** → En son deployment'ınızı seçin
2. URL'yi kopyalayın
3. Eğer URL değiştiyse, Google Cloud Console ve backend ayarlarını güncelleyin

### 2. Google Login'i Test Edin

1. `https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/tr/account` adresine gidin
2. **Google ile Giriş Yap** butonuna tıklayın
3. Google login sayfasına yönlendirilmelisiniz
4. Login sonrası tekrar sitenize dönmelisiniz

### 3. Hata Ayıklama

Eğer sorun yaşarsanız:

**Browser Console'u Kontrol Edin:**
- F12 → Console
- CORS hataları varsa backend CORS ayarlarını kontrol edin

**Network Tab'ı Kontrol Edin:**
- F12 → Network
- Google redirect URL'ini kontrol edin
- Callback'den dönen token'ı kontrol edin

**Backend Logs:**
```bash
# Backend'de CORS hatalarını görmek için
curl -I https://admin.bangoocyp.com/auth/customer/google \
  -H "Origin: https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app"
```

## Custom Domain Kullanıyorsanız

Eğer custom domain kullanacaksanız (örn: `bangoo.com`):

1. **Vercel'de Domain Ekleyin:**
   - Settings → Domains → Add Domain
   - DNS kayıtlarını güncelleyin

2. **Environment Variables'ı Güncelleyin:**
```bash
NEXT_PUBLIC_BASE_URL=https://bangoo.com/
```

3. **Google Cloud Console'da URL'leri Güncelleyin:**
```
https://bangoo.com/auth/google/callback
```

4. **Backend CORS'a Ekleyin:**
```javascript
storeCors: "https://bangoo.com,https://www.bangoo.com"
```

## Otomatik Deployment URL Yönetimi

Vercel her branch için farklı URL oluşturur. Bunu yönetmek için:

### 1. Environment Variable ile Dinamik URL

Frontend zaten `NEXT_PUBLIC_BASE_URL` kullanıyor, bu yüzden Vercel'de her environment için doğru URL'yi ayarlayın.

### 2. Vercel System Environment Variables

Vercel otomatik olarak şu değişkenleri sağlar:
- `VERCEL_URL`: Deployment URL'i (örn: `your-app-xxx.vercel.app`)
- `VERCEL_ENV`: production, preview, veya development

Bunu kullanmak için `customer.ts` dosyasını güncelleyebilirsiniz (opsiyonel):

```typescript
export async function loginWithGoogle() {
  try {
    const baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

    // Vercel deployment URL'ini otomatik algıla
    const deploymentUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

    const callbackUrl = `${deploymentUrl}/auth/google/callback`

    const googleAuthUrl = `${baseUrl}/auth/customer/google?redirect_uri=${encodeURIComponent(callbackUrl)}`

    return { success: true, url: googleAuthUrl }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
```

## Özet Checklist

Frontend (Vercel):
- [ ] Environment variables ayarlandı
- [ ] `.env.production` dosyası oluşturuldu
- [ ] Deployment başarılı

Google Cloud Console:
- [ ] Authorized redirect URIs güncellendi
- [ ] Authorized JavaScript origins güncellendi
- [ ] Tüm URL'ler (local, preview, production) eklendi

Backend (MedusaJS):
- [ ] CORS ayarları güncellendi
- [ ] Google OAuth env variables ayarlandı
- [ ] Allowed redirect URIs eklendi
- [ ] Backend restart edildi

Test:
- [ ] Local'de çalışıyor
- [ ] Vercel deployment'ta çalışıyor
- [ ] Google login akışı tamamlanıyor
- [ ] Callback sonrası redirect çalışıyor

## Sorun Giderme

### "redirect_uri_mismatch" Hatası
- Google Cloud Console'da URL'lerin tam olarak eşleştiğinden emin olun
- URL sonunda `/` olup olmadığını kontrol edin
- `http` vs `https` farkına dikkat edin

### CORS Hatası
- Backend CORS ayarlarında Vercel URL'i olduğundan emin olun
- Wildcard kullanmak isterseniz: `*.vercel.app` (güvenli değil, sadece development için)

### Callback Çalışmıyor
- Browser console'da network tab'ı kontrol edin
- Token'ın query parameter olarak geldiğinden emin olun
- Callback sayfasının (`/auth/google/callback/page.tsx`) doğru çalıştığını test edin
