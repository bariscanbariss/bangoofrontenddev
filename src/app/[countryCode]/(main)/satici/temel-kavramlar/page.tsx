import { Metadata } from "next"
import { BookOpen, Package, CreditCard, RotateCcw } from "lucide-react"

export const metadata: Metadata = {
  title: "Temel Kavramlar | Bangoo Satıcı",
  description: "Bangoo satıcı temel kavramlar ve kurallar",
}

export default function TemelKavramlarPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BookOpen className="w-16 h-16 text-[#9865e8] mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Temel Kavramlar</h1>
          <p className="text-xl text-gray-700">
            Bangoo'da satış yaparken bilmeniz gereken temel kurallar ve kavramlar
          </p>
        </div>

        <div className="space-y-8">
          <div className="border-l-4 border-[#9865e8] pl-6">
            <div className="flex items-start gap-4 mb-4">
              <Package className="w-8 h-8 text-[#9865e8] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#9865e8] mb-3">Ürün Listeleme</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ürün başlığı açık ve net olmalıdır</li>
                  <li>Yüksek kaliteli ürün görselleri kullanın</li>
                  <li>Detaylı ürün açıklaması ekleyin</li>
                  <li>Stok miktarını güncel tutun</li>
                  <li>Doğru kategori seçimi yapın</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#9865e8] pl-6">
            <div className="flex items-start gap-4 mb-4">
              <CreditCard className="w-8 h-8 text-[#9865e8] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#9865e8] mb-3">Ödeme ve Komisyon</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Komisyon oranı: Kategori bazlı %5-15 arası</li>
                  <li>Ödemeler her ayın 15'inde yapılır</li>
                  <li>Minimum ödeme tutarı: 100 TL</li>
                  <li>Banka transferi veya havale ile ödeme</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#9865e8] pl-6">
            <div className="flex items-start gap-4 mb-4">
              <RotateCcw className="w-8 h-8 text-[#9865e8] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-semibold text-[#9865e8] mb-3">İade ve İptal</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Müşteriler 14 gün içinde iade hakkına sahiptir</li>
                  <li>İade edilen ürünler hasarsız olmalıdır</li>
                  <li>İptal talepleri kargo çıkışından önce kabul edilir</li>
                  <li>İade kargo ücreti müşteriye aittir (ürün kusurlu değilse)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-[#9865e8] mb-3">Önemli Notlar</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Yasaklı ürünler satışa sunulamaz</li>
              <li>Sahte veya taklit ürün satışı kesinlikle yasaktır</li>
              <li>Müşteri memnuniyeti önceliklidir</li>
              <li>Siparişler 2 iş günü içinde kargoya verilmelidir</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
