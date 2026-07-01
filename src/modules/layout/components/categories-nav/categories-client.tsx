"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Store } from "lucide-react"

const staticCategories = [
  { name: "Kadın", href: "/categories/kadin", badge: "" },
  { name: "Erkek", href: "/categories/erkek", badge: "" },
  { name: "Anne & Çocuk", href: "/categories/anne-cocuk", badge: "" },
  { name: "Ev & Yaşam", href: "/categories/ev-yasam", badge: "" },
  { name: "Süpermarket", href: "/categories/supermarket", badge: "" },
  { name: "Kozmetik", href: "/categories/kozmetik", badge: "" },
  { name: "Ayakkabı & Çanta", href: "/categories/ayakkabi-canta", badge: "" },
  { name: "Elektronik", href: "/categories/elektronik", badge: "" },
  { name: "Saat & Aksesuar", href: "/categories/saat-aksesuar", badge: "" },
  { name: "Spor & Outdoor", href: "/categories/spor-outdoor", badge: "" },
  { name: "Flaş Ürünler", href: "/kampanyalar/flash-urunler", badge: "" },
  { name: "Çok Satanlar", href: "/kampanyalar/cok-satanlar", badge: "Yeni" },
]

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
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      
      // If at the very top (0-20px), always show fully
      if (currentScrollY <= 20) {
        setScrollProgress(0)
      } else if (scrollingDown && currentScrollY > 50) {
        // Scrolling down - increase progress (0 to 150)
        const newProgress = Math.min(scrollProgress + 15, 150)
        setScrollProgress(newProgress)
      } else if (!scrollingDown && scrollProgress > 0) {
        // Scrolling up - decrease progress
        const newProgress = Math.max(scrollProgress - 15, 0)
        setScrollProgress(newProgress)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Ensure it's visible on initial load
    if (window.scrollY <= 20) {
      setScrollProgress(0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, scrollProgress])

  // Calculate opacity and translateY together based on scroll progress
  const opacity = Math.max(0, 1 - (scrollProgress / 150))
  const translateY = -(scrollProgress / 150) * 100 // 0 to -100%

  return (
    <nav
      className="border-b border-gray-200 bg-white absolute w-full top-0 left-0 z-30"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}%)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
        height: opacity < 0.1 ? '0' : 'auto',
        overflow: opacity < 0.1 ? 'hidden' : 'visible'
      }}
      aria-label="Kategoriler"
    >
      <div className="content-container">
        <div className="flex items-center gap-6 py-2 overflow-x-auto scrollbar-hide">
          {/* Kategoriler Button with Badge */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => setHoveredCategory("all")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button className="flex items-center gap-1 text-gray-800 hover:text-[#9865e8] whitespace-nowrap font-medium text-sm py-1">
              Kategoriler
              <span className="ml-1 text-xs font-medium text-red-500">(Yeni)</span>
            </button>

            {hoveredCategory === "all" && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-md border border-gray-100 min-w-[200px] z-50">
                <div className="py-2">
                  {staticCategories.map((category, index) => (
                    <LocalizedClientLink
                      key={index}
                      href={category.href}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#9865e8] transition-colors text-sm font-medium"
                    >
                      {category.name}
                      {category.badge && (
                        <span className="ml-2 text-xs font-medium text-red-500">({category.badge})</span>
                      )}
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Static Categories */}
          {staticCategories.map((category, index) => (
            <LocalizedClientLink
              key={index}
              href={category.href}
              className="flex items-center gap-1 text-gray-800 hover:text-[#9865e8] whitespace-nowrap text-sm font-medium flex-shrink-0 py-1"
            >
              {category.name}
              {category.badge && (
                <span className="text-xs font-medium text-red-500">({category.badge})</span>
              )}
            </LocalizedClientLink>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

          {/* Magazalar Link */}
          <LocalizedClientLink
            href="/stores"
            className="flex items-center gap-1.5 text-[#9865e8] hover:text-[#7a4bc4] whitespace-nowrap text-sm font-semibold flex-shrink-0 py-1"
          >
            <Store className="w-3.5 h-3.5" />
            Magazalar
          </LocalizedClientLink>
        </div>
      </div>
    </nav>
  )
}
