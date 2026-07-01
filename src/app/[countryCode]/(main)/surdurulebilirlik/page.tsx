import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sürdürülebilirlik | Bangoo",
  description: "Bangoo sürdürülebilirlik politikaları",
}

export default function SurdurulebilirlikPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">Sürdürülebilirlik</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Bangoo olarak çevre dostu ve sürdürülebilir ticaret uygulamalarını benimsiyoruz.
          </p>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Çevre Politikamız</h2>
          <p className="text-gray-700 mb-6">
            Karbon ayak izimizi azaltmak için çalışıyoruz ve tüm operasyonlarımızda çevre dostu uygulamaları tercih ediyoruz.
          </p>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Ambalajlama</h2>
          <p className="text-gray-700 mb-6">
            Geri dönüştürülebilir ambalaj malzemeleri kullanarak çevreye olan etkimizi en aza indiriyoruz.
          </p>
        </div>
      </div>
    </div>
  )
}
