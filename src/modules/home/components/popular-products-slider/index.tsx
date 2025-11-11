"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

export default function PopularProductsSlider({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const targetScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12">
      <div className="flex justify-between items-center mb-8">
        <Text className="txt-xlarge font-semibold">Popüler</Text>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Önceki ürünler"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Sonraki ürünler"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[280px] small:w-[320px]"
          >
            <ProductPreview product={product} region={region} isFeatured />
          </div>
        ))}
      </div>
    </div>
  )
}
