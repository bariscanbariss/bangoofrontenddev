"use client"

import Link from "next/link"
import Image from "next/image"

const promoCards = [
  {
    id: 1,
    title: "Elite Üyelik",
    subtitle: "Özel ayrıcalıklar seni bekliyor",
    bgGradient: "from-purple-600 to-pink-600",
    icon: "👑",
    link: "/elit-uyelik",
    badge: "Yeni",
  },
  {
    id: 2,
    title: "Günün Fırsatları",
    subtitle: "%50'ye varan indirimler",
    bgGradient: "from-orange-500 to-red-600",
    icon: "🔥",
    link: "/kampanyalar/gunun-firsatlari",
    badge: "Sınırlı",
  },
  {
    id: 3,
    title: "Ücretsiz Kargo",
    subtitle: "Tüm siparişlerde geçerli",
    bgGradient: "from-blue-600 to-cyan-600",
    icon: "🚚",
    link: "/kampanyalar/ucretsiz-kargo",
    badge: "",
  },
  {
    id: 4,
    title: "Satıcı Ol",
    subtitle: "Hemen başvur, sat, kazan",
    bgGradient: "from-green-600 to-emerald-600",
    icon: "💼",
    link: "/satici",
    badge: "Özel",
  },
]

export default function PromotionalBanners() {
  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {promoCards.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${card.bgGradient} p-6 md:p-8 h-48 md:h-56 flex flex-col justify-between relative`}>
              {/* Badge */}
              {card.badge && (
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                  {card.badge}
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl md:text-6xl transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Text Content */}
              <div className="text-white space-y-1">
                <h3 className="text-xl md:text-2xl font-bold">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base opacity-90">
                  {card.subtitle}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Arrow icon on hover */}
              <div className="absolute bottom-6 right-6 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
