"use client"

import { FeaturedProduct } from "@lib/data/stores"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Flame, TrendingUp, Sparkles, Tag, ShoppingCart, Heart, Package } from "lucide-react"
import Image from "next/image"

type Props = {
  products: FeaturedProduct[]
  countryCode: string
}

const badgeConfig: Record<string, {
  icon: any
  label: string
  color: string
}> = {
  bestseller: {
    icon: Flame,
    label: "Çok Satan",
    color: "bg-orange-500",
  },
  trending: {
    icon: TrendingUp,
    label: "Trend",
    color: "bg-blue-500",
  },
  new: {
    icon: Sparkles,
    label: "Yeni",
    color: "bg-green-500",
  },
  sale: {
    icon: Tag,
    label: "İndirim",
    color: "bg-red-500",
  },
}

export default function StoreFeatured({ products, countryCode }: Props) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <Sparkles size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henüz öne çıkan ürün yok
        </h3>
        <p className="text-gray-500">
          Bu mağaza henüz öne çıkan ürün belirlememiş.
        </p>
      </div>
    )
  }

  const getProductPrice = (product: FeaturedProduct["product"]) => {
    const variant = product.variants?.[0]
    if (!variant?.calculated_price?.calculated_amount) return null

    const amount = variant.calculated_price.calculated_amount / 100
    const currency = variant.calculated_price.currency_code?.toUpperCase() || "TRY"

    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currency === "TRY" ? "TRY" : currency,
    }).format(amount)
  }

  return (
    <div className="mt-8">
      {/* Hero featured item */}
      {products[0] && (
        <div className="mb-8">
          <LocalizedClientLink
            href={`/products/${products[0].product.handle}`}
            className="group block"
          >
            <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden">
              {products[0].product.thumbnail ? (
                <Image
                  src={products[0].product.thumbnail}
                  alt={products[0].product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Badge */}
              {products[0].badge && (
                <div className="absolute top-6 left-6">
                  <div className={`flex items-center gap-2 px-4 py-2 ${badgeConfig[products[0].badge].color} text-white rounded-full`}>
                    {(() => {
                      const Icon = badgeConfig[products[0].badge].icon
                      return <Icon size={16} />
                    })()}
                    <span className="text-sm font-medium">
                      {badgeConfig[products[0].badge].label}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                  {products[0].product.title}
                </h3>
                {products[0].product.description && (
                  <p className="text-white/80 line-clamp-2 mb-4 max-w-2xl">
                    {products[0].product.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {getProductPrice(products[0].product)}
                  </span>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-violet-100 transition-colors">
                    <ShoppingCart size={18} />
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
        </div>
      )}

      {/* Grid for remaining featured products */}
      {products.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(1).map((featured, index) => {
            const badge = featured.badge ? badgeConfig[featured.badge] : null
            const price = getProductPrice(featured.product)

            return (
              <LocalizedClientLink
                key={featured.id}
                href={`/products/${featured.product.handle}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-violet-200 transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {featured.product.thumbnail ? (
                      <Image
                        src={featured.product.thumbnail}
                        alt={featured.product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Package size={32} className="text-gray-300" />
                      </div>
                    )}

                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-1 ${badge.color} text-white text-xs font-medium rounded-lg`}>
                        {(() => {
                          const Icon = badge.icon
                          return <Icon size={12} />
                        })()}
                        {badge.label}
                      </div>
                    )}

                    {/* Quick actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all"
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                      >
                        <Heart size={14} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Ranking badge */}
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-violet-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                      #{index + 2}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                      {featured.product.title}
                    </h4>
                    {price && (
                      <span className="text-base font-bold text-gray-900 mt-1 block">
                        {price}
                      </span>
                    )}
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
