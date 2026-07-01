import { Metadata } from "next"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim | Bangoo",
  description: "Bangoo ile iletişime geçin",
}

export default function IletisimPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">İletişim</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#9865e8] mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">E-posta</h3>
                <p className="text-gray-700">info@bangoo.com</p>
                <p className="text-gray-700">destek@bangoo.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#9865e8] mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">Telefon</h3>
                <p className="text-gray-700">+90 (212) 123 45 67</p>
                <p className="text-gray-700 text-sm">Hafta içi 09:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#9865e8] mt-1" />
              <div>
                <h3 className="font-semibold text-[#9865e8] mb-2">Adres</h3>
                <p className="text-gray-700">
                  Bangoo A.Ş.<br />
                  Örnek Mahallesi, Test Caddesi No:123<br />
                  34000 İstanbul, Türkiye
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-[#9865e8] mb-4">Bize Yazın</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#9865e8]"
              />
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#9865e8]"
              />
              <textarea
                placeholder="Mesajınız"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#9865e8]"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#9865e8] text-white py-2 rounded-md hover:bg-[#7a4dc7] transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
