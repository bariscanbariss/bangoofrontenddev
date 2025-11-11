import { Metadata } from "next"
import { Tag, Gift, Percent } from "lucide-react"

export const metadata: Metadata = {
  title: "Kampanyalar | Bangoo",
  description: "Bangoo kampanyaları ve fırsatları",
}

export default function KampanyalarPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">Kampanyalar</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Tag className="w-12 h-12 text-[#9865e8] mb-4" />
            <h3 className="text-xl font-semibold text-[#9865e8] mb-2">Yeni Üye İndirimi</h3>
            <p className="text-gray-700 mb-4">
              İlk alışverişinizde %20 indirim fırsatı!
            </p>
            <span className="text-sm text-gray-500">Geçerlilik: 31 Aralık 2025</span>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Gift className="w-12 h-12 text-[#9865e8] mb-4" />
            <h3 className="text-xl font-semibold text-[#9865e8] mb-2">Kargo Bedava</h3>
            <p className="text-gray-700 mb-4">
              500 TL ve üzeri alışverişlerinizde kargo ücretsiz!
            </p>
            <span className="text-sm text-gray-500">Süresiz</span>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Percent className="w-12 h-12 text-[#9865e8] mb-4" />
            <h3 className="text-xl font-semibold text-[#9865e8] mb-2">Sezonluk İndirimler</h3>
            <p className="text-gray-700 mb-4">
              Seçili ürünlerde %50'ye varan indirimler!
            </p>
            <span className="text-sm text-gray-500">Stoklar tükenene kadar</span>
          </div>
        </div>
      </div>
    </div>
  )
}
