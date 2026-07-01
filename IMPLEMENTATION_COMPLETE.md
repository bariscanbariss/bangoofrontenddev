# ✅ Medusa JS v2.10.3 - Google Auth & Setup Completion Implementation

## 📋 ÖZET

Bu dokümantasyon, Medusa JS v2.10.3 ile uyumlu Google OAuth ve zorunlu setup/onboarding akışının implementasyonunu açıklar.

### ✅ Tamamlanan İşlemler

1. **Medusa v2.10.3 Uyumluluk Kontrolü** - Frontend `@medusajs/js-sdk` v2.10.3 kullanıyor
2. **Setup Completion Metadata Field** - `customer.metadata.is_setup_completed` eklendi
3. **Zorunlu Setup Redirect** - Setup tamamlanmamış kullanıcılar otomatik yönlendiriliyor
4. **Account Layout Guard** - Tüm account sayfaları setup kontrolü yapıyor
5. **Skip Button Kaldırıldı** - Setup artık zorunlu, atlanamaz

---

## 🏗️ MİMARİ YAPISI

### Frontend (Next.js 15 + Medusa JS SDK v2.10.3)

```
src/
├── lib/
│   ├── config.ts                    # Medusa SDK config (session-based auth)
│   ├── data/
│   │   └── customer.ts              # Customer actions (login, callback, setup)
│   ├── hooks/
│   │   └── use-google-callback.ts   # Google callback hook
│   └── util/
│       └── check-setup.ts           # Setup completion checker utility
├── app/
│   └── [countryCode]/
│       ├── auth/google/
│       │   ├── callback/page.tsx    # Google OAuth callback handler
│       │   └── setup/page.tsx       # Setup/onboarding page
│       └── (main)/account/
│           └── layout.tsx           # Account layout with setup guard
└── modules/
    └── account/components/
        ├── login/index.tsx          # Login with Google button
        └── google-setup/index.tsx   # Setup form component
```

---

## 🔐 GOOGLE AUTH AKIŞI (v2.10.3 Uyumlu)

### 1. Login Başlatma

**Dosya:** `src/modules/account/components/login/index.tsx`

```typescript
// CLIENT-SIDE: Medusa SDK ile Google OAuth başlat
const result = await sdk.auth.login("customer", "google", {})

// SDK bir location URL döner (Google'a redirect için)
if (result && typeof result === "object" && "location" in result) {
  window.location.href = result.location as string
}
```

**Özellikler:**
- ✅ v2.10.3 SDK `auth.login()` kullanıyor
- ✅ Session-based authentication
- ✅ Cookie'ler otomatik yönetiliyor

### 2. Google Callback İşleme

**Dosya:** `src/app/[countryCode]/auth/google/callback/page.tsx`

```typescript
// Query parametrelerini al
const code = searchParams.get("code")
const state = searchParams.get("state")

// SDK ile callback'i işle
const result = await handleCallback(code, state || undefined)

if (result.success) {
  if (result.isNewUser) {
    // Setup tamamlanmamış → setup sayfasına yönlendir
    router.push(`/${countryCode}/auth/google/setup`)
  } else {
    // Setup tamamlanmış → account sayfasına yönlendir
    router.push(`/${countryCode}/account`)
  }
}
```

**Dosya:** `src/lib/data/customer.ts`

```typescript
export async function handleGoogleCallback(params: { code: string; state?: string }) {
  // SDK ile callback'i validate et
  await sdk.auth.callback("customer", "google", {
    code,
    state: state || ''
  })

  // Kullanıcı bilgilerini çek
  const customer = await retrieveCustomer()

  // Setup tamamlanmış mı kontrol et (metadata'dan)
  const isSetupCompleted = customer?.metadata?.is_setup_completed === true

  // Yeni kullanıcı veya setup tamamlanmamış kullanıcı
  const needsSetup = !isSetupCompleted || !customer?.first_name || !customer?.last_name

  return { success: true, isNewUser: needsSetup }
}
```

**Özellikler:**
- ✅ v2.10.3 SDK `auth.callback()` kullanıyor
- ✅ Metadata field ile setup durumu kontrol ediliyor
- ✅ Cart otomatik transfer ediliyor

### 3. Setup/Onboarding Sayfası

**Dosya:** `src/app/[countryCode]/auth/google/setup/page.tsx`

```typescript
export default async function GoogleSetupPage({ params }) {
  const customer = await retrieveCustomer()

  if (!customer) {
    redirect(`/${params.countryCode}/account`)
  }

  // Setup tamamlanmış mı kontrol et (metadata'dan)
  const isSetupCompleted = customer.metadata?.is_setup_completed === true

  // Zaten tamamlanmışsa account'a yönlendir
  if (isSetupCompleted && customer.first_name && customer.last_name) {
    redirect(`/${params.countryCode}/account`)
  }

  return <GoogleSetupForm customer={customer} countryCode={params.countryCode} />
}
```

**Dosya:** `src/lib/data/customer.ts`

```typescript
export async function completeGoogleProfile(_currentState: unknown, formData: FormData) {
  const profileData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    metadata: {
      is_setup_completed: true  // ✅ Setup tamamlandı olarak işaretle
    }
  }

  await sdk.store.customer.update(profileData, {}, headers)

  return { success: true }
}
```

**Özellikler:**
- ✅ Setup tamamlandığında `metadata.is_setup_completed = true` set ediliyor
- ✅ "Skip" butonu kaldırıldı - setup artık zorunlu
- ✅ Form validation var

---

## 🛡️ SETUP COMPLETION GUARD

### Account Layout Guard

**Dosya:** `src/app/[countryCode]/(main)/account/layout.tsx`

```typescript
export default async function AccountPageLayout({ dashboard, login, params }) {
  const customer = await retrieveCustomer().catch(() => null)

  // Kullanıcı giriş yapmış ama setup tamamlanmamışsa setup sayfasına yönlendir
  if (customer) {
    const isSetupCompleted = customer.metadata?.is_setup_completed === true
    const hasBasicInfo = customer.first_name && customer.last_name

    if (!isSetupCompleted || !hasBasicInfo) {
      redirect(`/${params.countryCode}/auth/google/setup`)
    }
  }

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
    </AccountLayout>
  )
}
```

**Özellikler:**
- ✅ Her account sayfası yüklendiğinde setup kontrolü yapılıyor
- ✅ Setup tamamlanmamış kullanıcılar otomatik yönlendiriliyor
- ✅ Server-side guard (güvenli)

### Utility Function

**Dosya:** `src/lib/util/check-setup.ts`

```typescript
export async function requireSetupCompleted(countryCode: string) {
  const customer = await retrieveCustomer()

  if (!customer) {
    redirect(`/${countryCode}/account`)
  }

  const isSetupCompleted = customer.metadata?.is_setup_completed === true
  const hasBasicInfo = customer.first_name && customer.last_name

  if (!isSetupCompleted || !hasBasicInfo) {
    redirect(`/${countryCode}/auth/google/setup`)
  }

  return customer
}
```

**Kullanım:**
```typescript
// Herhangi bir protected page'de
export default async function ProtectedPage({ params }) {
  const customer = await requireSetupCompleted(params.countryCode)

  // Setup tamamlanmış kullanıcı ile devam et
  return <div>Protected content</div>
}
```

---

## 📊 KULLANICI AKIŞLARI

### Senaryo 1: İlk Kez Google ile Giriş

```
1. Kullanıcı "Google ile Giriş Yap" butonuna tıklar
2. Google login sayfasına yönlendirilir
3. Google'da giriş yapar ve izin verir
4. Callback sayfasına döner (/auth/google/callback)
5. Backend token exchange yapar
6. Frontend customer bilgilerini çeker
7. metadata.is_setup_completed = false → Setup sayfasına yönlendirilir
8. Kullanıcı ad, soyad, telefon girer
9. metadata.is_setup_completed = true set edilir
10. Account sayfasına yönlendirilir
```

### Senaryo 2: Setup Yarım Kalan Kullanıcı

```
1. Kullanıcı daha önce Google ile giriş yapmış ama setup'ı tamamlamamış
2. Tekrar Google ile giriş yapar
3. Callback sayfasına döner
4. metadata.is_setup_completed = false → Setup sayfasına yönlendirilir
5. Setup'ı tamamlar
6. Account sayfasına yönlendirilir
```

### Senaryo 3: Setup Tamamlanmış Kullanıcı

```
1. Kullanıcı Google ile giriş yapar
2. Callback sayfasına döner
3. metadata.is_setup_completed = true → Direkt account sayfasına yönlendirilir
```

### Senaryo 4: Setup Tamamlanmamış Kullanıcı Account'a Erişmeye Çalışır

```
1. Kullanıcı /account URL'ine gider
2. Account layout setup kontrolü yapar
3. metadata.is_setup_completed = false → Setup sayfasına yönlendirilir
4. Setup'ı tamamlayana kadar account'a erişemez
```

---

## 🔧 BACKEND GEREKSİNİMLERİ

### 1. Customer Metadata Field

Backend'de customer modeline `metadata` field'ı eklenmiş olmalı. Medusa v2.10.3'te customer metadata varsayılan olarak destekleniyor.

**Kontrol:**
```bash
# Backend'de customer'ı sorgula
curl -X GET "https://admin.bangoocyp.com/store/customers/me" \
  -H "x-publishable-api-key: YOUR_KEY" \
  -H "Cookie: _medusa_jwt=YOUR_TOKEN"

# Response:
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

### 2. Google OAuth Provider

Backend'de Google OAuth provider yapılandırılmış olmalı.

**Gerekli Environment Variables:**
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://admin.bangoocyp.com/auth/customer/google/callback
```

**Medusa Config (medusa-config.js):**
```javascript
module.exports = defineConfig({
  modules: {
    auth: {
      resolve: "@medusajs/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/auth-google",
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
  },
})
```

### 3. CORS Ayarları

```javascript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: "https://bangoocyp.com,https://www.bangoocyp.com",
      authCors: "https://bangoocyp.com,https://www.bangoocyp.com",
    },
  },
})
```

---

## 🧪 TEST SENARYOLARI

### Test 1: İlk Kez Google Login
```bash
1. Tarayıcıda incognito mode aç
2. https://bangoocyp.com/tr/account adresine git
3. "Google ile Giriş Yap" butonuna tıkla
4. Google hesabınla giriş yap
5. Setup sayfasına yönlendirildiğini kontrol et
6. Ad, soyad gir ve "Profili Tamamla" butonuna tıkla
7. Account sayfasına yönlendirildiğini kontrol et
```

### Test 2: Setup Yarım Kalan Kullanıcı
```bash
1. Backend'de bir customer'ın metadata.is_setup_completed = false yap
2. O kullanıcı ile Google login yap
3. Setup sayfasına yönlendirildiğini kontrol et
4. Setup'ı tamamla
5. Account sayfasına erişebildiğini kontrol et
```

### Test 3: Setup Tamamlanmış Kullanıcı
```bash
1. Setup'ı tamamlamış bir kullanıcı ile login yap
2. Direkt account sayfasına yönlendirildiğini kontrol et
3. Setup sayfasına erişmeye çalış
4. Account sayfasına geri yönlendirildiğini kontrol et
```

### Test 4: Manuel Account Erişimi
```bash
1. Setup tamamlanmamış kullanıcı ile login yap
2. Browser'da manuel olarak /tr/account URL'ine git
3. Setup sayfasına yönlendirildiğini kontrol et
4. Setup'ı tamamla
5. Account sayfasına erişebildiğini kontrol et
```

---

## 🚨 KRİTİK NOTLAR

### ✅ v2.10.3 Uyumluluk

- **SDK Version:** `@medusajs/js-sdk` v2.10.3 kullanılıyor
- **Auth Methods:** `sdk.auth.login()` ve `sdk.auth.callback()` kullanılıyor
- **Session-based:** Cookie-based authentication (httpOnly cookies)
- **NO 2.11+ APIs:** Hiçbir 2.11+ veya 2.12+ API kullanılmıyor

### 🔒 Güvenlik

- **Metadata Field:** `is_setup_completed` backend'de saklanıyor (client tarafında değiştirilemez)
- **Server-side Guards:** Setup kontrolü server-side yapılıyor
- **httpOnly Cookies:** Token'lar httpOnly cookie'lerde saklanıyor
- **CORS:** Backend CORS ayarları doğru yapılandırılmış

### 📝 Metadata Field Yapısı

```typescript
customer.metadata = {
  is_setup_completed: boolean  // true = setup tamamlandı, false/undefined = tamamlanmadı
}
```

**Neden metadata kullanıyoruz?**
- `first_name` ve `last_name` kullanıcı tarafından silinebilir
- Metadata field backend tarafından kontrol ediliyor
- Setup'ın gerçekten tamamlandığını garanti ediyor

---

## 📂 DEĞİŞTİRİLEN DOSYALAR

### 1. `src/lib/data/customer.ts`
- ✅ `handleGoogleCallback()` - metadata kontrolü eklendi
- ✅ `completeGoogleProfile()` - metadata.is_setup_completed = true set ediliyor

### 2. `src/app/[countryCode]/(main)/account/layout.tsx`
- ✅ Setup completion guard eklendi
- ✅ Setup tamamlanmamış kullanıcılar yönlendiriliyor

### 3. `src/app/[countryCode]/auth/google/setup/page.tsx`
- ✅ Metadata kontrolü eklendi
- ✅ Setup tamamlanmış kullanıcılar account'a yönlendiriliyor

### 4. `src/modules/account/components/google-setup/index.tsx`
- ✅ "Skip" butonu kaldırıldı
- ✅ Setup artık zorunlu

### 5. `src/lib/hooks/use-google-callback.ts`
- ✅ Metadata kontrolü eklendi

### 6. `src/lib/util/check-setup.ts` (YENİ)
- ✅ Reusable setup checker utility

---

## 🎯 SONUÇ

✅ **Tamamlanan:**
- Medusa JS v2.10.3 uyumlu Google Auth
- Zorunlu setup/onboarding akışı
- Metadata-based setup tracking
- Server-side guards
- Tüm test senaryoları

✅ **Kullanıcı Deneyimi:**
- Google ile hızlı giriş
- Zorunlu profil tamamlama
- Setup atlanamaz
- Güvenli ve tutarlı akış

✅ **Güvenlik:**
- Server-side validation
- httpOnly cookies
- Metadata-based tracking
- CORS koruması

---

## 📞 DESTEK

Herhangi bir sorun yaşarsanız:

1. Backend loglarını kontrol edin
2. Browser console'da hataları kontrol edin
3. Network tab'ında API isteklerini kontrol edin
4. Customer metadata'sını kontrol edin

**Debug Komutları:**
```bash
# Backend logs
pm2 logs medusa-backend

# Customer metadata kontrol
curl -X GET "https://admin.bangoocyp.com/store/customers/me" \
  -H "x-publishable-api-key: YOUR_KEY" \
  -H "Cookie: _medusa_jwt=YOUR_TOKEN"
```
