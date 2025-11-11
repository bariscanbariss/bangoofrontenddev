import { Metadata } from "next"
import { HelpCircle, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Bangoo",
  description: "Bangoo sıkça sorulan sorular",
}

export default function SSSPage() {
  const faqs = [
    {
      category: "Sipariş ve Teslimat",
      questions: [
        {
          q: "Siparişim ne zaman teslim edilir?",
          a: "Siparişiniz, ödeme onayından sonra ortalama 2-5 iş günü içinde kargoya verilir. Kargo süresi bölgenize göre değişiklik gösterebilir."
        },
        {
          q: "Kargo ücretleri ne kadar?",
          a: "Kargo ücreti 29.90 TL'dir. 500 TL ve üzeri alışverişlerde kargo ücretsizdir."
        },
        {
          q: "Siparişimi nasıl takip edebilirim?",
          a: "Hesabım > Siparişlerim bölümünden sipariş durumunuzu ve kargo takip numaranızı görebilirsiniz."
        }
      ]
    },
    {
      category: "İade ve İptal",
      questions: [
        {
          q: "İade süresi ne kadar?",
          a: "Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz."
        },
        {
          q: "Siparişimi iptal edebilir miyim?",
          a: "Evet, siparişiniz kargoya verilmeden önce iptal edebilirsiniz."
        }
      ]
    },
    {
      category: "Ödeme",
      questions: [
        {
          q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
          a: "Kredi kartı, banka kartı ve kapıda ödeme seçeneklerini kabul ediyoruz."
        },
        {
          q: "Taksit imkanı var mı?",
          a: "Evet, seçili bankaların kredi kartlarıyla taksit yapabilirsiniz."
        }
      ]
    }
  ]

  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-[#9865e8] mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-xl text-gray-700">
            Merak ettiklerinizin yanıtları burada
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold text-[#9865e8] mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, qIdx) => (
                  <details key={qIdx} className="group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-semibold text-gray-900">{item.q}</span>
                      <ChevronDown className="w-5 h-5 text-[#9865e8] group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-4 text-gray-700">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-50 p-8 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-[#9865e8] mb-4">
            Aradığınız soruyu bulamadınız mı?
          </h3>
          <p className="text-gray-700 mb-6">
            Canlı destek ekibimizle iletişime geçin veya bize e-posta gönderin.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-[#9865e8] text-white px-6 py-2 rounded-lg hover:bg-[#7a4dc7] transition-colors">
              Canlı Destek
            </button>
            <button className="border border-[#9865e8] text-[#9865e8] px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              E-posta Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
