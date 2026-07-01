"use client"

import { useEffect, useState } from "react"
import ProductPreview from "@modules/products/components/product-preview"
import { getStoreDiscountProducts } from "@lib/data/stores"
import { Tag, Percent } from "lucide-react"

type Props = {
  storeId: string
  countryCode: string
}

export default function StoreDiscounts({ storeId, countryCode }: Props) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const limit = 12

  useEffect(() => {
    fetchDiscounts()
  }, [storeId, offset])

  const fetchDiscounts = async () => {
    setLoading(true)
    const result = await getStoreDiscountProducts(storeId, {
      limit,
      offset,
    })

    if (offset === 0) {
      setProducts(result.products)
    } else {
      setProducts((prev) => [...prev, ...result.products])
    }

    setHasMore(result.count > offset + limit)
    setLoading(false)
  }

  const loadMore = () => {
    setOffset((prev) => prev + limit)
  }

  if (loading && offset === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="h-80 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
            <Tag className="w-12 h-12 text-violet-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <Percent className="w-5 h-5 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henüz İndirimli Ürün Yok
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Bu mağazada şu anda indirimli ürün bulunmuyor. Yakında harika
          fırsatlar için tekrar kontrol edin!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Discount Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Percent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">İndirimli Ürünler</h2>
            <p className="text-white/90">
              {products.length} üründe özel indirim fırsatları!
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            region={{ id: "reg_01", name: "Default Region", currency_code: "TRY" }}
            isFeatured={false}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Yükleniyor..." : "Daha Fazla Göster"}
          </button>
        </div>
      )}
    </div>
  )
}
