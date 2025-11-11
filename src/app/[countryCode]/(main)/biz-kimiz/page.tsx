import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biz Kimiz | Bangoo",
  description: "Bangoo hakkında bilgi edinin",
}

export default function BizKimizPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#9865e8] mb-8">Biz Kimiz</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Bangoo, modern e-ticaret deneyimini kullanıcılarına sunmak için kurulmuş bir online alışveriş platformudur.
          </p>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Vizyonumuz</h2>
          <p className="text-gray-700 mb-6">
            En iyi alışveriş deneyimini sunarak müşterilerimizin hayatını kolaylaştırmak.
          </p>

          <h2 className="text-2xl font-semibold text-[#9865e8] mt-8 mb-4">Misyonumuz</h2>
          <p className="text-gray-700 mb-6">
            Kaliteli ürünleri uygun fiyatlarla müşterilerimize ulaştırmak ve mükemmel müşteri hizmeti sunmak.
          </p>
        </div>
      </div>
    </div>
  )
}
