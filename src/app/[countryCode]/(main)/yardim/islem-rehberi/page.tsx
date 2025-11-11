import { Metadata } from "next"
import { BookOpen, ShoppingCart, CreditCard, Truck, User } from "lucide-react"

export const metadata: Metadata = {
  title: "İşlem Rehberi | Bangoo",
  description: "Bangoo kullanım rehberi",
}

export default function IslemRehberiPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">İşlem Rehberi</h1>
          <p className="text-xl text-gray-700">
            Bangoo'da alışveriş yapmak için adım adım rehber
          </p>
        </div>

        <div className="space-y-8">
          {/* Üye Olma */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <User className="w-10 h-10 text-[#9865e8] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#9865e8] mb-4">Üye Olma</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Ana sayfada sağ üstteki "Giriş Yap" butonuna tıklayın</li>
                  <li>"Üye Ol" seçeneğini seçin</li>
                  <li>E-posta adresinizi ve şifrenizi girin</li>
                  <li>Kullanıcı sözleşmesini onaylayın</li>
                  <li>"Üye Ol" butonuna tıklayarak kaydınızı tamamlayın</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Ürün Arama ve Sepete Ekleme */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <ShoppingCart className="w-10 h-10 text-[#9865e8] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#9865e8] mb-4">Ürün Arama ve Sepete Ekleme</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Arama çubuğuna aradığınız ürünü yazın</li>
                  <li>Kategorilerden göz atarak ürün bulabilirsiniz</li>
                  <li>Ürün detay sayfasında özellikleri inceleyin</li>
                  <li>Beden, renk gibi seçenekleri belirleyin</li>
                  <li>"Sepete Ekle" butonuna tıklayın</li>
                  <li>Alışverişe devam edin veya sepete gidin</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Ödeme */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <CreditCard className="w-10 h-10 text-[#9865e8] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#9865e8] mb-4">Ödeme İşlemi</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Sepetinizi kontrol edin</li>
                  <li>"Alışverişi Tamamla" butonuna tıklayın</li>
                  <li>Teslimat adresinizi seçin veya yeni adres ekleyin</li>
                  <li>Kargo seçeneğinizi belirleyin</li>
                  <li>Ödeme yöntemini seçin (Kredi Kartı/Kapıda Ödeme)</li>
                  <li>Kart bilgilerinizi girin (kredi kartı seçtiyseniz)</li>
                  <li>"Ödemeyi Tamamla" butonuna tıklayın</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Sipariş Takibi */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <Truck className="w-10 h-10 text-[#9865e8] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#9865e8] mb-4">Sipariş Takibi</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Hesabınıza giriş yapın</li>
                  <li>"Siparişlerim" bölümüne gidin</li>
                  <li>Takip etmek istediğiniz siparişi seçin</li>
                  <li>Sipariş durumunu ve kargo bilgilerini görüntüleyin</li>
                  <li>Kargo takip numarasıyla kargo firmasından detaylı takip yapabilirsiniz</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-purple-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold text-[#9865e8] mb-4 text-center">
            Daha fazla yardıma mı ihtiyacınız var?
          </h3>
          <div className="flex justify-center gap-4">
            <button className="bg-[#9865e8] text-white px-6 py-2 rounded-lg hover:bg-[#7a4dc7] transition-colors">
              Canlı Destek
            </button>
            <button className="border border-[#9865e8] text-[#9865e8] px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              SSS'ye Göz At
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
