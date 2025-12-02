# ✅ Hızlı Başlangıç: Vercel'de Google Auth Kurulumu

## 🚀 Yapmanız Gereken 3 Adım

### 1️⃣ Vercel'de Environment Variable Ekleyin

1. https://vercel.com → Projeniz → **Settings** → **Environment Variables**
2. Şu değişkeni ekleyin:

```
Key: NEXT_PUBLIC_BASE_URL
Value: https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/
Environment: Production, Preview, Development (hepsini seçin)
```

3. **Save** → Projeyi **Redeploy** edin

### 2️⃣ Google Cloud Console'da Redirect URI Ekleyin

1. https://console.cloud.google.com
2. **APIs & Services** → **Credentials** → OAuth 2.0 Client ID'nizi seçin
3. **Authorized redirect URIs** bölümüne ekleyin:

```
https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/auth/google/callback
```

4. **Authorized JavaScript origins** bölümüne ekleyin:

```
https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app
```

5. **Save**

### 3️⃣ Backend'de CORS Ayarları

Backend'inizde (`medusa-config.js`):

```javascript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: "http://localhost:8000,https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app",
    },
  },
})
```

Backend'i restart edin:
```bash
npm run dev
```

## 🧪 Test

1. https://bangoofrontenddev-gmv6qv249-baris-projects-eb51002a.vercel.app/tr/account
2. **Google ile Giriş Yap** butonuna tıklayın
3. Google login sayfasına yönlendirilmelisiniz
4. Login sonrası siteye geri dönmelisiniz

## 🐛 Sorun mu var?

**"redirect_uri_mismatch" hatası:**
- Google Console'da URL'in TAM OLARAK aynı olduğundan emin olun
- URL sonunda `/` olup olmadığına dikkat edin

**CORS hatası:**
- Backend CORS ayarlarını kontrol edin
- Backend'i restart ettiğinizden emin olun

**Callback çalışmıyor:**
- Browser console'da hataları kontrol edin (F12)
- Network tab'ında `/auth/google/callback` isteğini kontrol edin

## 📝 Notlar

- ✅ Frontend kodu zaten güncellenmiş durumda (otomatik Vercel URL algılama)
- ✅ `.env.production` dosyası oluşturuldu
- ✅ Detaylı dokümantasyon: `VERCEL_GOOGLE_AUTH_SETUP.md`

## 🎯 Custom Domain Kullanacaksanız

Eğer `bangoo.com` gibi bir domain kullanacaksanız:

1. Vercel'de domain ekleyin
2. Environment variable'ı güncelleyin: `NEXT_PUBLIC_BASE_URL=https://bangoo.com/`
3. Google Console'da redirect URI'yi güncelleyin
4. Backend CORS'a ekleyin
5. Redeploy

---

Herhangi bir sorun yaşarsanız `VERCEL_GOOGLE_AUTH_SETUP.md` dosyasına bakın. Detaylı troubleshooting adımları orada mevcut.
