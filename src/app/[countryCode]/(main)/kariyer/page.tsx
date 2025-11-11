import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kariyer | Bangoo",
  description: "Bangoo kariyer fırsatları",
}

export default function KariyerPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">Kariyer</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Bangoo ailesine katılın ve kariyerinizi bizimle şekillendirin.
          </p>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Neden Bangoo?</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Yenilikçi çalışma ortamı</li>
            <li>Gelişim fırsatları</li>
            <li>Rekabetçi maaş ve yan haklar</li>
            <li>Esnek çalışma imkanı</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Açık Pozisyonlar</h2>
          <p className="text-gray-700 mb-6">
            Açık pozisyonlarımız için lütfen kariyer@bangoo.com adresine başvurunuzu gönderin.
          </p>
        </div>
      </div>
    </div>
  )
}
