"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRight } from "lucide-react"

type Category = {
  id: string
  name: string
  handle: string
  category_children?: Array<{
    id: string
    name: string
    handle: string
  }>
}

export default function CategoriesClient({ categories }: { categories: Category[] }) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <nav className="border-b border-gray-200 bg-white overflow-hidden" aria-label="Kategoriler">
      <div className="content-container">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {/* Tümü Button */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => setHoveredCategory("all")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#9865e8] hover:bg-purple-50 rounded-md transition-colors whitespace-nowrap font-medium text-sm sm:text-base">
              Tümü
            </button>

            {hoveredCategory === "all" && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 min-w-[200px] z-50">
                <div className="py-2">
                  {categories.map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="block px-4 py-2 text-[#9865e8] hover:bg-purple-50 transition-colors text-sm"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          {categories.slice(0, 8).map((category) => (
            <div
              key={category.id}
              className="relative flex-shrink-0"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <LocalizedClientLink
                href={`/categories/${category.handle}`}
                className="block px-3 sm:px-4 py-1.5 sm:py-2 text-[#9865e8] hover:bg-purple-50 rounded-md transition-colors whitespace-nowrap text-sm sm:text-base"
              >
                {category.name}
              </LocalizedClientLink>

              {/* Subcategories Dropdown */}
              {hoveredCategory === category.id && category.category_children && category.category_children.length > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 min-w-[200px] z-50">
                  <div className="py-2">
                    {category.category_children.map((subCat) => (
                      <LocalizedClientLink
                        key={subCat.id}
                        href={`/categories/${subCat.handle}`}
                        className="flex items-center justify-between px-4 py-2 text-[#9865e8] hover:bg-purple-50 transition-colors text-sm"
                      >
                        <span>{subCat.name}</span>
                        <ChevronRight className="w-4 h-4" />
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
