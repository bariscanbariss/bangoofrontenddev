"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface FlashDealsProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function FlashDeals({ products, region }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!products || products.length === 0) {
    return null
  }

  // Take first 6 products for flash deals
  const flashProducts = products.slice(0, 6)

  return (
    <div className="content-container py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-500 text-white p-3 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <Text className="text-2xl md:text-3xl font-bold text-gray-900">
              Flaş Ürünler
            </Text>
            <Text className="text-sm text-gray-600">
              Süre sınırlı özel fiyatlar
            </Text>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3">
          <Text className="text-sm font-medium text-gray-600">
            Bitimine
          </Text>
          <div className="flex gap-2">
            <div className="bg-red-500 text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
              <div className="text-xl font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-xs opacity-80">Saat</div>
            </div>
            <div className="flex items-center text-2xl font-bold text-red-500">:</div>
            <div className="bg-red-500 text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
              <div className="text-xl font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-xs opacity-80">Dakika</div>
            </div>
            <div className="flex items-center text-2xl font-bold text-red-500">:</div>
            <div className="bg-red-500 text-white px-3 py-2 rounded-lg min-w-[50px] text-center">
              <div className="text-xl font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-xs opacity-80">Saniye</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {flashProducts.map((product) => (
          <div
            key={product.id}
            className="relative group"
          >
            {/* Flash Deal Badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
              FLASH
            </div>
            <ProductPreview product={product} region={region} isFeatured />
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href="/kampanyalar/flash-urunler"
          className="inline-flex items-center gap-2 text-[#9865e8] hover:text-[#7a4bc4] font-semibold transition-colors"
        >
          Tüm Flaş Ürünleri Gör
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
