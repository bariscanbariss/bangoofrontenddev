"use client"

import { useState, useEffect, useCallback } from "react"
import { getStoreProducts } from "@lib/data/stores"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingCart, Heart, Loader2, Package } from "lucide-react"
import Image from "next/image"

type Props = {
  storeId: string
  countryCode: string
  initialProducts?: any[]
  initialCount?: number
}

export default function StoreProducts({
  storeId,
  countryCode,
  initialProducts = [],
  initialCount = 0,
}: Props) {
  const [products, setProducts] = useState<any[]>(initialProducts)
  const [loading, setLoading] = useState(initialProducts.length === 0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [offset, setOffset] = useState(initialProducts.length)
  const [totalCount, setTotalCount] = useState(initialCount)
  const [hasMore, setHasMore] = useState(initialProducts.length < initialCount)

  // Initial fetch if no initial products
  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts(true)
    }
  }, [])

  const fetchProducts = useCallback(async (reset = false) => {
    if (reset) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const result = await getStoreProducts(storeId, {
        limit: 12,
        offset: reset ? 0 : offset,
      })

      if (reset) {
        setProducts(result.products)
        setOffset(result.products.length)
      } else {
        setProducts((prev) => [...prev, ...result.products])
        setOffset((prev) => prev + result.products.length)
      }
      setTotalCount(result.count)
      setHasMore((reset ? result.products.length : offset + result.products.length) < result.count)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [storeId, offset])

  const getProductPrice = (product: any) => {
    const variant = product.variants?.[0]
    if (!variant?.calculated_price?.calculated_amount) return null

    const amount = variant.calculated_price.calculated_amount / 100
    const currency = variant.calculated_price.currency_code?.toUpperCase() || "TRY"

    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency === "TRY" ? "TRY" : currency,
    }).format(amount)
  }

  const getOriginalPrice = (product: any) => {
    const variant = product.variants?.[0]
    if (!variant?.calculated_price?.original_amount) return null
    if (variant.calculated_price.original_amount === variant.calculated_price.calculated_amount) return null

    const amount = variant.calculated_price.original_amount / 100
    const currency = variant.calculated_price.currency_code?.toUpperCase() || "TRY"

    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency === "TRY" ? "TRY" : currency,
    }).format(amount)
  }

  const getDiscountPercentage = (product: any) => {
    const variant = product.variants?.[0]
    if (!variant?.calculated_price) return null

    const original = variant.calculated_price.original_amount
    const calculated = variant.calculated_price.calculated_amount

    if (!original || original === calculated) return null

    return Math.round(((original - calculated) / original) * 100)
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={40} className="text-violet-500 animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Urun bulunamadi
          </h3>
          <p className="text-gray-500">
            Bu magazada henuz urun bulunmuyor.
          </p>
        </div>
      ) : (
        <>
          {/* Product count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {totalCount} urun listeleniyor
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => {
              const price = getProductPrice(product)
              const originalPrice = getOriginalPrice(product)
              const discount = getDiscountPercentage(product)

              return (
                <LocalizedClientLink
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-violet-200 transition-all duration-300 transform hover:-translate-y-1">
                    {/* Image container */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <Package size={40} className="text-gray-300" />
                        </div>
                      )}

                      {/* Discount badge */}
                      {discount && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                          %{discount}
                        </div>
                      )}

                      {/* Quick actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all"
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to wishlist
                          }}
                        >
                          <Heart size={16} className="text-gray-600" />
                        </button>
                      </div>

                      {/* Add to cart button */}
                      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg"
                          onClick={(e) => {
                            e.preventDefault()
                            // Add to cart
                          }}
                        >
                          <ShoppingCart size={16} />
                          Sepete Ekle
                        </button>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-violet-600 transition-colors min-h-[2.5rem]">
                        {product.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-2">
                        {price && (
                          <span className="text-lg font-bold text-gray-900">
                            {price}
                          </span>
                        )}
                        {originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => fetchProducts(false)}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Yukleniyor...
                  </>
                ) : (
                  <>
                    Daha Fazla Urun
                    <span className="text-white/70">
                      ({totalCount - products.length} kaldi)
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
