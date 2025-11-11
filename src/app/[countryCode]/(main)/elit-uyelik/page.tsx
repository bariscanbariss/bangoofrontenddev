import { Metadata } from "next"
import { Crown, Truck, Star, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Elit Üyelik | Bangoo",
  description: "Bangoo Elit üyelik avantajları",
}

export default function ElitUyelikPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Crown className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Elit Üyelik</h1>
          <p className="text-xl text-gray-700">
            Özel ayrıcalıklarla tanışın
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Truck className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Ücretsiz Kargo</h3>
            <p className="text-gray-700 text-sm">Tüm siparişlerinizde ücretsiz kargo</p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Star className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Erken Erişim</h3>
            <p className="text-gray-700 text-sm">Kampanyalara erken erişim hakkı</p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Zap className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Hızlı Teslimat</h3>
            <p className="text-gray-700 text-sm">Öncelikli teslimat seçeneği</p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Crown className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Özel Destek</h3>
            <p className="text-gray-700 text-sm">7/24 öncelikli müşteri desteği</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#9865e8] to-[#7a4dc7] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Sadece 99 TL / Yıl</h2>
          <p className="text-lg mb-6">İlk ay ücretsiz deneyin!</p>
          <button className="bg-white text-[#9865e8] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Hemen Üye Ol
          </button>
        </div>
      </div>
    </div>
  )
}
