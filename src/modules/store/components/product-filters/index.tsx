"use client"

import { useState } from "react"
import { Filter, ChevronDown, X, SortAsc } from "lucide-react"

export type SortOption = "newest" | "popular" | "price_asc" | "price_desc"

type Props = {
  onSortChange: (sort: SortOption) => void
  onPriceFilterChange: (min?: number, max?: number) => void
  currentSort: SortOption
  priceRange?: { min?: number; max?: number }
}

export default function ProductFilters({
  onSortChange,
  onPriceFilterChange,
  currentSort,
  priceRange,
}: Props) {
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [minPrice, setMinPrice] = useState(priceRange?.min?.toString() || "")
  const [maxPrice, setMaxPrice] = useState(priceRange?.max?.toString() || "")

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "En Yeni" },
    { value: "popular", label: "En Popüler" },
    { value: "price_asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price_desc", label: "Fiyat: Yüksekten Düşüğe" },
  ]

  const currentSortLabel = sortOptions.find((opt) => opt.value === currentSort)?.label

  const handlePriceApply = () => {
    const min = minPrice ? parseFloat(minPrice) : undefined
    const max = maxPrice ? parseFloat(maxPrice) : undefined
    onPriceFilterChange(min, max)
    setShowPriceFilter(false)
  }

  const clearPriceFilter = () => {
    setMinPrice("")
    setMaxPrice("")
    onPriceFilterChange(undefined, undefined)
  }

  const hasActiveFilter = priceRange?.min !== undefined || priceRange?.max !== undefined

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Sort dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-violet-300 transition-colors"
        >
          <SortAsc size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{currentSortLabel}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {showSortDropdown && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-fadeIn">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setShowSortDropdown(false)
                }}
                className={`
                  w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors
                  ${currentSort === option.value ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-700"}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price filter */}
      <div className="relative">
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className={`
            flex items-center gap-2 px-4 py-2.5 border rounded-xl transition-colors
            ${hasActiveFilter
              ? "bg-violet-50 border-violet-300 text-violet-700"
              : "bg-white border-gray-200 hover:border-violet-300 text-gray-700"
            }
          `}
        >
          <Filter size={16} className={hasActiveFilter ? "text-violet-500" : "text-gray-500"} />
          <span className="text-sm">Fiyat</span>
          {hasActiveFilter && (
            <span className="flex items-center justify-center w-5 h-5 bg-violet-600 text-white text-xs rounded-full">
              1
            </span>
          )}
        </button>

        {showPriceFilter && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-20 animate-fadeIn">
            <h4 className="font-medium text-gray-900 mb-3">Fiyat Aralığı</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                <div className="relative">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ₺
                  </span>
                </div>
              </div>
              <span className="text-gray-400 mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                <div className="relative">
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="∞"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-violet-300"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ₺
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePriceApply}
                className="flex-1 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
              >
                Uygula
              </button>
              {hasActiveFilter && (
                <button
                  onClick={clearPriceFilter}
                  className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Temizle
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active filter badge */}
      {hasActiveFilter && (
        <button
          onClick={clearPriceFilter}
          className="flex items-center gap-1.5 px-3 py-2 bg-violet-100 text-violet-700 rounded-lg text-sm hover:bg-violet-200 transition-colors"
        >
          <span>
            {priceRange?.min && priceRange?.max
              ? `${priceRange.min}₺ - ${priceRange.max}₺`
              : priceRange?.min
              ? `${priceRange.min}₺+`
              : `Max ${priceRange?.max}₺`}
          </span>
          <X size={14} />
        </button>
      )}
    </div>
  )
}
