"use client"

import { useEffect, useState } from "react"
import { getStoreCategories } from "@lib/data/stores"
import { getStoreProducts } from "@lib/data/stores"
import { Folder, ChevronRight, Package } from "lucide-react"
import Link from "next/link"
import ProductPreview from "@modules/products/components/product-preview"

type Category = {
  id: string
  name: string
  handle: string
  product_count?: number
}

type Props = {
  storeId: string
  storeHandle: string
  countryCode: string
}

export default function StoreCategories({
  storeId,
  storeHandle,
  countryCode,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [storeHandle])

  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryProducts(selectedCategory)
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    setLoading(true)
    const result = await getStoreCategories(storeHandle)
    setCategories(result)
    setLoading(false)
  }

  const fetchCategoryProducts = async (categoryId: string) => {
    setProductsLoading(true)
    const result = await getStoreProducts(storeId, {
      limit: 8,
    })
    setProducts(result.products)
    setProductsLoading(false)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="h-32 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <Folder className="w-12 h-12 text-violet-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Kategori Bulunamadı
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Bu mağazaya ait kategori bulunmuyor.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Categories Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Folder className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Kategoriler</h2>
            <p className="text-white/90">
              {categories.length} farklı kategoride ürünler
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
            className={`
              relative group p-6 rounded-xl border-2 transition-all duration-300
              ${
                selectedCategory === category.id
                  ? "border-violet-500 bg-violet-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md"
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-all
                ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-br from-violet-500 to-purple-600"
                    : "bg-gradient-to-br from-violet-100 to-purple-100 group-hover:from-violet-200 group-hover:to-purple-200"
                }
              `}
              >
                <Folder
                  className={`w-7 h-7 ${
                    selectedCategory === category.id
                      ? "text-white"
                      : "text-violet-600"
                  }`}
                />
              </div>

              <div>
                <h3
                  className={`font-semibold mb-1 ${
                    selectedCategory === category.id
                      ? "text-violet-700"
                      : "text-gray-900"
                  }`}
                >
                  {category.name}
                </h3>
                {category.product_count !== undefined && (
                  <p className="text-sm text-gray-500">
                    {category.product_count} ürün
                  </p>
                )}
              </div>

              {selectedCategory === category.id && (
                <ChevronRight className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-violet-600 rotate-90" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Category Products */}
      {selectedCategory && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-violet-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {categories.find((c) => c.id === selectedCategory)?.name}{" "}
              Kategorisindeki Ürünler
            </h3>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-80 bg-white rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          ) : (
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
          )}
        </div>
      )}
    </div>
  )
}
