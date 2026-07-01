"use client"

import Link from "next/link"

const brands = [
  { name: "Apple", logo: "🍎", link: "/brand/apple" },
  { name: "Samsung", logo: "📱", link: "/brand/samsung" },
  { name: "Nike", logo: "✓", link: "/brand/nike" },
  { name: "Adidas", logo: "⚡", link: "/brand/adidas" },
  { name: "Zara", logo: "Z", link: "/brand/zara" },
  { name: "H&M", logo: "H&M", link: "/brand/hm" },
  { name: "Sony", logo: "🎮", link: "/brand/sony" },
  { name: "LG", logo: "📺", link: "/brand/lg" },
  { name: "Philips", logo: "💡", link: "/brand/philips" },
  { name: "Bosch", logo: "🔧", link: "/brand/bosch" },
]

export default function BrandShowcase() {
  return (
    <div className="bg-white py-12">
      <div className="content-container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Popüler Markalar
          </h2>
          <p className="text-gray-600 mt-2">
            En sevilen markaları keşfedin
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.link}
              className="group"
            >
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 hover:border-[#9865e8] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center aspect-square">
                <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {brand.logo}
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#9865e8] transition-colors text-center">
                  {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-[#9865e8] hover:text-[#7a4bc4] font-semibold transition-colors"
          >
            Tüm Markaları Gör
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
