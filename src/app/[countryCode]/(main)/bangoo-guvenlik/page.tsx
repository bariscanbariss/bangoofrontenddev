import { Metadata } from "next"
import { Shield, Lock, Eye, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Bangoo'da Güvenlik | Bangoo",
  description: "Bangoo güvenlik önlemleri",
}

export default function BangooGuvenlikPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">Bangoo'da Güvenlik</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-8">
            Bangoo olarak, müşterilerimizin güvenliği bizim için önceliklidir. Alışveriş deneyiminizin güvenli olması için çeşitli önlemler alıyoruz.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <Shield className="w-8 h-8 text-[#9865e8] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">SSL Şifreleme</h3>
                <p className="text-gray-700 text-sm">Tüm verileriniz 256-bit SSL sertifikası ile şifrelenir.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <Lock className="w-8 h-8 text-[#9865e8] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">Güvenli Ödeme</h3>
                <p className="text-gray-700 text-sm">Ödeme bilgileriniz güvenli ödeme sistemleri ile korunur.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <Eye className="w-8 h-8 text-[#9865e8] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">Gizlilik</h3>
                <p className="text-gray-700 text-sm">Kişisel verileriniz KVKK uyarınca korunur.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-[#9865e8] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">Doğrulanmış Satıcılar</h3>
                <p className="text-gray-700 text-sm">Tüm satıcılarımız kimlik doğrulamasından geçer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
