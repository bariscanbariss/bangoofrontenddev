"use client"

import Link from "next/link"
import Image from "next/image"

const categoryCards = [
  {
    id: 1,
    name: "Kadın Giyim",
    image: "/categories/kadin.jpg",
    bgColor: "bg-pink-100",
    link: "/categories/kadin",
    icon: "👗",
  },
  {
    id: 2,
    name: "Erkek Giyim",
    image: "/categories/erkek.jpg",
    bgColor: "bg-blue-100",
    link: "/categories/erkek",
    icon: "👔",
  },
  {
    id: 3,
    name: "Elektronik",
    image: "/categories/elektronik.jpg",
    bgColor: "bg-purple-100",
    link: "/categories/elektronik",
    icon: "📱",
  },
  {
    id: 4,
    name: "Ev & Yaşam",
    image: "/categories/ev-yasam.jpg",
    bgColor: "bg-green-100",
    link: "/categories/ev-yasam",
    icon: "🏠",
  },
  {
    id: 5,
    name: "Spor & Outdoor",
    image: "/categories/spor.jpg",
    bgColor: "bg-orange-100",
    link: "/categories/spor-outdoor",
    icon: "⚽",
  },
  {
    id: 6,
    name: "Kozmetik",
    image: "/categories/kozmetik.jpg",
    bgColor: "bg-rose-100",
    link: "/categories/kozmetik",
    icon: "💄",
  },
  {
    id: 7,
    name: "Süpermarket",
    image: "/categories/supermarket.jpg",
    bgColor: "bg-yellow-100",
    link: "/categories/supermarket",
    icon: "🛒",
  },
  {
    id: 8,
    name: "Çocuk",
    image: "/categories/cocuk.jpg",
    bgColor: "bg-cyan-100",
    link: "/categories/cocuk",
    icon: "🧸",
  },
]

export default function CategoryGrid() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="content-container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Kategoriler
          </h2>
          <p className="text-gray-600 mt-2">
            Tüm ihtiyaçlarınız için kategorileri keşfedin
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categoryCards.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                {/* Category Image/Icon Container */}
                <div className={`${category.bgColor} aspect-square flex items-center justify-center relative overflow-hidden`}>
                  {/* Icon */}
                  <div className="text-6xl md:text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  {/* Optional: Add gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Name */}
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-[#9865e8] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
