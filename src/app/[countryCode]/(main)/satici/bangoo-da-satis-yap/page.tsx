import { Metadata } from "next"
import { Store, TrendingUp, Users, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Bangoo'da Satış Yap | Bangoo",
  description: "Bangoo'da satıcı olun ve işinizi büyütün",
}

export default function BangooDaSatisYapPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Store className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Bangoo'da Satış Yap</h1>
          <p className="text-xl text-gray-700">
            Milyonlarca müşteriye ulaşın, işinizi büyütün
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Geniş Müşteri Kitlesi</h3>
            <p className="text-gray-700 text-sm">Milyonlarca aktif kullanıcıya ulaşın</p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <TrendingUp className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Kolay Satış</h3>
            <p className="text-gray-700 text-sm">Kullanıcı dostu satıcı paneli</p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <DollarSign className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Hızlı Ödemeler</h3>
            <p className="text-gray-700 text-sm">Düzenli ve güvenli ödemeler</p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <Store className="w-12 h-12 text-[#9865e8] mx-auto mb-4" />
            <h3 className="font-semibold text-[#9865e8] mb-2">Mağaza Yönetimi</h3>
            <p className="text-gray-700 text-sm">Kolay stok ve sipariş takibi</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#9865e8] mb-6">Nasıl Başlarım?</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Başvuru Yapın</h3>
                <p className="text-gray-700">Satıcı başvuru formunu doldurun</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Onay Alın</h3>
                <p className="text-gray-700">Başvurunuz 24 saat içinde değerlendirilir</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Mağazanızı Oluşturun</h3>
                <p className="text-gray-700">Ürünlerinizi ekleyin ve satışa başlayın</p>
              </div>
            </li>
          </ol>

          <div className="mt-8 text-center">
            <button className="bg-[#9865e8] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7a4dc7] transition-colors">
              Hemen Başvur
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
