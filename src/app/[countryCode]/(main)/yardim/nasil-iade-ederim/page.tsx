import { Metadata } from "next"
import { RotateCcw, Package, CheckCircle, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Nasıl İade Edebilirim | Bangoo",
  description: "Bangoo iade işlemleri rehberi",
}

export default function NasilIadeEderimPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <RotateCcw className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Nasıl İade Edebilirim</h1>
          <p className="text-xl text-gray-700">
            İade işlemlerinizi kolayca yapabilirsiniz
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-[#9865e8] mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            İade Koşulları
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ürün teslim tarihinden itibaren 14 gün içinde iade edilebilir</li>
            <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
            <li>Fatura ve iade formu eksiksiz olmalıdır</li>
            <li>Kişisel hijyen ürünleri iade edilemez</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-[#9865e8] mb-6">İade Adımları</h2>

        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Hesabınıza Giriş Yapın</h3>
              <p className="text-gray-700">
                Bangoo hesabınıza giriş yaparak "Siparişlerim" bölümüne gidin.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">İade Talebinde Bulunun</h3>
              <p className="text-gray-700">
                İade etmek istediğiniz ürünü seçin ve "İade Talebi Oluştur" butonuna tıklayın.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">İade Nedenini Belirtin</h3>
              <p className="text-gray-700">
                İade nedeninizi seçin ve varsa açıklama ekleyin.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Kargo Etiketini Alın</h3>
              <p className="text-gray-700">
                İade onaylandıktan sonra size gönderilen kargo etiketini yazdırın.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Ürünü Kargolayın</h3>
              <p className="text-gray-700">
                Ürünü orijinal ambalajında, kargo etiketiyle birlikte kargoya verin.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-[#9865e8] text-white rounded-full flex items-center justify-center font-bold">
              6
            </div>
            <div className="flex-1 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">İade Onayı ve Para İadesi</h3>
              <p className="text-gray-700">
                Ürün tarafımıza ulaştıktan sonra kontrol edilir ve 3-5 iş günü içinde ödemeniz iade edilir.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Package className="w-8 h-8 text-[#9865e8] flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[#9865e8] mb-3">Önemli Bilgiler</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>İade kargo ücreti Bangoo tarafından karşılanır (ürün kusurlu ise)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Para iadesi aynı ödeme yöntemiyle yapılır</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>İade sürecini "Siparişlerim" bölümünden takip edebilirsiniz</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
