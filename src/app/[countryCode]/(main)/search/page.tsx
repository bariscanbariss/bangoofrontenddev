import { Metadata } from "next"
import { listProducts } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import { SearchX } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Arama Sonuçları | Bangoo",
  description: "Bangoo ürün arama sonuçları",
}

type PageProps = {
  params: { countryCode: string }
  searchParams: { q?: string }
}

export default async function SearchPage({
  params,
  searchParams,
}: PageProps) {
  const { q } = await searchParams
  const { countryCode } = await params

  const query = q || ""

  let products = []
  let hasResults = false

  if (query) {
    try {
      const searchResults = await listProducts({
        countryCode,
        queryParams: {
          q: query,
          limit: 50,
        },
      })
      products = searchResults?.response?.products || []
      hasResults = products.length > 0
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className="content-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#9865e8] mb-2">
          {query ? `"${query}" için arama sonuçları` : "Arama Sonuçları"}
        </h1>
        {hasResults && (
          <p className="text-gray-600">{products.length} ürün bulundu</p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-16">
          <SearchX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Arama terimi giriniz
          </h2>
          <p className="text-gray-500">
            Yukarıdaki arama çubuğunu kullanarak ürün arayabilirsiniz
          </p>
        </div>
      ) : !hasResults ? (
        <div className="text-center py-16">
          <SearchX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Ürün bulunamadı
          </h2>
          <p className="text-gray-500 mb-6">
            "{query}" araması için sonuç bulunamadı. Lütfen farklı bir arama terimi deneyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink
              href="/store"
              className="px-6 py-3 bg-[#9865e8] text-white rounded-lg hover:bg-[#7a4dc7] transition-colors"
            >
              Tüm Ürünleri Gör
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/"
              className="px-6 py-3 border border-[#9865e8] text-[#9865e8] rounded-lg hover:bg-purple-50 transition-colors"
            >
              Ana Sayfaya Dön
            </LocalizedClientLink>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
