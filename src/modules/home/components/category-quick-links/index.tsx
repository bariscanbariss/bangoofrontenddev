"use client"

import Link from "next/link"

const quickCategories = [
  { name: "Bugün Fiyatı Düşenler", href: "/kampanyalar/fiyati-dusenler", icon: "📉" },
  { name: "Ayrıcalıkları Keşfet", href: "/elit-uyelik", icon: "👑" },
  { name: "Kampanya Detayları", href: "/kampanyalar", icon: "🎁" },
  { name: "Sanat Eserleri", href: "/categories/sanat-eserleri", icon: "🎨" },
  { name: "İyi Fiyatlı Ürünler", href: "/kampanyalar/iyi-fiyatli", icon: "💰" },
  { name: "Sen De Al!", href: "/kampanyalar/populer", icon: "🔥" },
  { name: "Avantajlı Ürünler", href: "/kampanyalar/avantajli", icon: "⭐" },
  { name: "İndirim Kuponlarım", href: "/account/kuponlar", icon: "🎟️" },
  { name: "Yeni Gelen Ürünler", href: "/kampanyalar/yeni-gelenler", icon: "✨" },
]

export default function CategoryQuickLinks() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm relative z-10 pt-8">
      <div className="content-container">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
          {quickCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100 whitespace-nowrap group flex-shrink-0 min-w-[100px]"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#9865e8] text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
