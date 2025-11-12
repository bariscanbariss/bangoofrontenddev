# Bangoo Frontend Proje Dokümantasyonu (README)

## 1. Navbar
- Arkaplan rengi: **#9865e8**
- Yazı renkleri: Bu renge uyumlu tonlarda açık ve okunabilir metin rengi.
- Hover efekti: Navbar yazıları ve ikonlar hover olduğunda renk tonu koyulaşacak veya opaklık artacak.
- Sol üstte logo: **"bangoo"** yazı logosu konumlandırılacak. Boyutu küçük ama okunabilir olacak. Tamamen responsive.
- Orta kısım: **Search bar** bulunacak. Backend API üzerinden ürün araması yapacak.
  - Sonuç yoksa kullanıcı **"Ürün bulunamadı"** sayfasına yönlendirilir.
- Sağ kısım: "Giriş Yap", "Favorilerim", "Sepetim" butonları ve ikonları olacak.
  - Hover efekti ikon ve yazılara uygulanacak.

## 2. Search Bar Altı: Kategoriler
- Kategoriler backendden alınacak ve dinamik listelenecek.
- Kategori üzerine gelindiğinde alt kategori menüsü açılacak.
  - Arkaplan: beyaz
  - Yazı rengi: **#9865e8**
- En solda **Tümü** olacak. Tüm üst kategoriler solda listelenecek. Üstüne gelindiğinde sağ tarafında alt kategoriler görüntülenecek.

## 3. Footer
- Arkaplan rengi: beyaz
- Yazı rengi: **#9865e8**
- Hover efekti: yazılar hover olduğunda renk tonu koyulaşacak.
- Responsive tasarım.
- Footer başında Bangoo logosu yer alacak.

### Footer Menüsü
**Biz Kimiz**  
**Kariyer**  
**Sürdürülebilirlik**  
**İletişim**  
**Bangoo'da Güvenlik**  
**Kampanyalar**  
**Elit Üyelik**

**Satıcı**  
**Bangoo'da Satış Yap**  
**Temel Kavramlar**

**Yardım**  
**Sıkça Sorulan Sorular**  
**Canlı Yardım / Asistan**  
**Nasıl İade Edebilirim**  
**İşlem Rehberi**

**Ülke Değiştir**  
**Ülke Seç**

**Sosyal Medya**

---

## 4. Footer Sayfa Yapıları (Otomatik Oluşturulacak)
Bu sayfalara tıklandığında yönlendirme yapılabilmesi için temel template dosyaları oluşturulur. İçerikler sonrasında senin tarafından düzenlenecektir.

- /biz-kimiz
- /kariyer
- /surdurulebilirlik
- /iletisim
- /bangoo-guvenlik
- /kampanyalar
- /vip-uyelik

**Satıcı Bölümü**
- /satici/bangoo-da-satis-yap
- /satici/temel-kavramlar

**Yardım Bölümü**
- /yardim/sss
- /yardim/canli-yardim
- /yardim/nasil-iade-ederim
- /yardim/islem-rehberi

---

## 5. Dosya Yapısı (Claude AI için Önerilen Proje Şeması)
```
/project-root
│
├── public
│   ├── logo.svg
│   └── icons/
│
├── src
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Categories.jsx
│   │   ├── Footer.jsx
│   │   └── CategoryMenu.jsx
│   │
│   ├── pages
│   │   ├── index.jsx
│   │   ├── urun-bulunamadi.jsx
│   │   ├── biz-kimiz.jsx
│   │   ├── kariyer.jsx
│   │   ├── surdurulebilirlik.jsx
│   │   ├── iletisim.jsx
│   │   ├── bangoo-guvenlik.jsx
│   │   ├── kampanyalar.jsx
│   │   ├── elit-uyelik.jsx
│   │   ├── satici/
│   │   │   ├── bangoo-da-satis-yap.jsx
│   │   │   └── temel-kavramlar.jsx
│   │   ├── yardim/
│   │   │   ├── sss.jsx
│   │   │   ├── canli-yardim.jsx
│   │   │   ├── nasil-iade-ederim.jsx
│   │   │   └── islem-rehberi.jsx
│   │   └── ulke-sec.jsx
│   │
│   ├── styles
│   │   ├── globals.css
│   │   └── navbar.css
│   │
│   └── utils
│       ├── api.js
│       └── categories.js
│
└── README.md
```

---

## 6. Claude'a Gönderilecek Talimat
Bu README içeriğini Claude'a vererek tüm dosyaları otomatik oluşturmasını sağlayabilirsin.
Tasarım kurallarını, renkleri, responsive yapıyı ve dosya yapısını net olarak uygulatacaktır.

