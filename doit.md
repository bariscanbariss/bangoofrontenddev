# Medusa JS v2.10.3 Downgrade Sonrası Uyum ve Google Auth Setup Görevi

## GENEL AMAÇ
Projede Medusa JS sürümü **v2.10.3**’e downgrade edilmiştir.  
Bu nedenle:

- Tüm frontend sayfaların
- Backend entegrasyonlarının
- Auth (özellikle Google Auth)
- Setup / onboarding akışlarının

**tamamen Medusa JS v2.10.3 ile uyumlu hale getirilmesi** gerekmektedir.

Claude AI’den beklenti:  
Webi ve Medusa dokümantasyonunu araştırarak **yalnızca v2.10.3’e uygun** bir mimari kurmak, fazlalık veya uyumsuz kod bırakmamak.

---

## 1️⃣ MEDUSA CORE KONTROLÜ

### Yapılacaklar
- Medusa backend sürümünün **kesin olarak v2.10.3** olduğunu doğrula
- Aşağıdakileri kontrol et:
  - `@medusajs/medusa`
  - `@medusajs/framework`
  - `@medusajs/auth`
  - `@medusajs/modules-sdk`

❗ **2.11+ veya 2.12+ API, hook veya config kullanılmayacak**

---

## 2️⃣ GOOGLE AUTH (medusajs-google-auth) – v2.10.3 UYUMLU SETUP

### Araştır ve doğrula:
- Medusa JS **v2.10.3 için Google OAuth desteği**
- Kullanılması gereken **doğru plugin / module**
- Kullanılmaması gereken yeni (2.11+) auth flow’ları

### Yüklenmesi gerekenler
- Gerekli auth modülleri (v2.10.3 uyumlu)
- Passport veya Medusa native auth çözümü (hangisi 2.10.3’e uygunsa)

### Backend Setup
- Google Client ID / Secret
- Callback URL
- Auth provider config
- Environment variables

### Endpointler
- `/auth/google`
- `/auth/google/callback`
- Session & customer bağlama

---

## 3️⃣ SETUP (ONBOARDING) SAYFASI AKIŞI

### Senaryo
Bazı kullanıcılar:
- Daha önce **Google ile giriş yapmış**
- Ancak **setup/onboarding sayfasına yönlendirilmemiş**

### İstenen Akış
1. Kullanıcı Google ile login olur
2. Backend kontrol eder:
   - `is_setup_completed === false`
3. Eğer setup tamamlanmamışsa:
   - Kullanıcı **zorunlu olarak `/setup` sayfasına yönlendirilir**
4. Setup tamamlandıktan sonra:
   - Normal kullanıcı akışına geçer

---

## 4️⃣ FRONTEND SAYFALARININ KONTROLÜ (v2.10.3 UYUMLULUK)

### Kontrol edilecekler
- Auth state management
- Medusa SDK / client kullanımı
- Customer session alma yöntemleri
- API endpoint çağrıları

❗ **2.11+ client methodları kullanılmayacak**

### Sayfalar
- Login
- Register
- Google Login callback
- Setup / Onboarding
- Dashboard / Home

---

## 5️⃣ BACKEND ENTEGRASYONLARI

### Yapılacaklar
- Customer modeli:
  - Google ile gelen kullanıcı doğru bağlanıyor mu?
- Metadata veya custom field:
  - `is_setup_completed`
- Middleware:
  - Setup tamamlanmamış kullanıcıyı blokla

---

## 6️⃣ MIDDLEWARE / GUARD YAPISI

### Kurallar
- Authenticated ama setup tamamlanmamış kullanıcı:
  - Sadece `/setup` erişebilir
- Setup tamamlandıktan sonra:
  - Normal route’lara erişebilir

---

## 7️⃣ TEST SENARYOLARI

Claude aşağıdaki senaryoları **tek tek test eder gibi düşünmeli**:

1. İlk kez Google ile giriş
2. Google ile giriş → setup’a yönlenme
3. Setup yarım kalırsa tekrar giriş
4. Setup tamamlandıktan sonra login
5. Normal email/password kullanıcı etkileniyor mu?

---

## 8️⃣ DOKÜMANTASYON & ÇIKTI

Claude’dan beklenen çıktı:
- ✔ v2.10.3 uyumlu backend setup
- ✔ Google Auth çalışan yapı
- ✔ Setup redirect logic
- ✔ Gereksiz / uyumsuz kodların kaldırılması
- ✔ Açıklamalı kod örnekleri
- ✔ Net folder & file değişiklikleri

---

## KRİTİK NOTLAR
- ❌ 2.11+ Medusa Auth API **KESİNLİKLE KULLANILMAYACAK**
- ❌ Varsayım yapılmayacak, araştırılacak
- ✔ Her şey **Medusa JS v2.10.3** referans alınarak yapılacak
