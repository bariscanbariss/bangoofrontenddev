import { Metadata } from "next"
import { MessageCircle, Clock, Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Canlı Yardım | Bangoo",
  description: "Bangoo canlı destek ve yardım",
}

export default function CanliYardimPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageCircle className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Canlı Yardım / Asistan</h1>
          <p className="text-xl text-gray-700">
            Size yardımcı olmak için buradayız
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#9865e8] to-[#7a4dc7] text-white p-8 rounded-lg">
            <MessageCircle className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Canlı Sohbet</h2>
            <p className="mb-6">Anında destek almak için canlı sohbet başlatın</p>
            <button className="bg-white text-[#9865e8] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full">
              Sohbet Başlat
            </button>
            <div className="flex items-center gap-2 mt-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Ortalama yanıt süresi: 2 dakika</span>
            </div>
          </div>

          <div className="border border-gray-200 p-8 rounded-lg">
            <Phone className="w-12 h-12 text-[#9865e8] mb-4" />
            <h2 className="text-2xl font-bold text-[#9865e8] mb-4">Telefon Desteği</h2>
            <p className="text-gray-700 mb-6">Telefon ile destek almak için bizi arayın</p>
            <a
              href="tel:+902121234567"
              className="border border-[#9865e8] text-[#9865e8] px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors block text-center"
            >
              +90 (212) 123 45 67
            </a>
            <div className="flex items-center gap-2 mt-4 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Hafta içi 09:00 - 18:00</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-[#9865e8] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-[#9865e8] mb-3">E-posta Desteği</h3>
              <p className="text-gray-700 mb-4">
                Acil olmayan sorularınız için bize e-posta gönderebilirsiniz.
                24 saat içinde size dönüş yapacağız.
              </p>
              <a
                href="mailto:destek@bangoo.com"
                className="text-[#9865e8] hover:text-[#7a4dc7] font-semibold"
              >
                destek@bangoo.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl font-bold text-[#9865e8] mb-2">7/24</div>
            <div className="text-sm text-gray-600">Canlı Destek</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl font-bold text-[#9865e8] mb-2">2 dk</div>
            <div className="text-sm text-gray-600">Ortalama Yanıt</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl font-bold text-[#9865e8] mb-2">98%</div>
            <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
          </div>
        </div>
      </div>
    </div>
  )
}
