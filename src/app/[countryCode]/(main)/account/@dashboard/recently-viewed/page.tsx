"use client"

import { Metadata } from "next"
import { Eye, Clock, ArrowRight, Trash2, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

type RecentlyViewedProduct = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  price?: string
  viewedAt: string
}

export default function RecentlyViewedPage() {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    try {
      const stored = localStorage.getItem("bangoo_recently_viewed")
      if (stored) {
        setProducts(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Error loading recently viewed:", e)
    }
    setLoading(false)
  }, [])

  const removeProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    localStorage.setItem("bangoo_recently_viewed", JSON.stringify(updated))
  }

  const clearAll = () => {
    setProducts([])
    localStorage.removeItem("bangoo_recently_viewed")
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full" data-testid="recently-viewed-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl-semi">Onceden Gezdiklerim</h1>
          {products.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={14} />
              Tumunu Temizle
            </button>
          )}
        </div>
        <p className="text-base-regular text-gray-600">
          Daha once incelediginiz urunler burada listelenir.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
              <Eye className="w-12 h-12 text-violet-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Henuz Gozatilan Urun Yok
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Urunleri incelemeye basladiginizda, burada goruntulenir.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => removeProduct(product.id)}
                className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <X size={14} className="text-gray-500 hover:text-red-500" />
              </button>

              <div className="relative h-48 bg-gray-50">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {product.title}
                </h3>
                {product.price && (
                  <p className="text-sm font-semibold text-violet-600">
                    {product.price}
                  </p>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {new Date(product.viewedAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
