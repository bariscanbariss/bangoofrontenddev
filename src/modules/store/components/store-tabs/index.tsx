"use client"

import { Grid3X3, Info, Megaphone, Percent, Folder, Star } from "lucide-react"

export type TabType = "products" | "about" | "campaigns" | "discounts" | "categories" | "reviews"

type Props = {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  productCount?: number
  campaignCount?: number
  reviewCount?: number
}

export default function StoreTabs({
  activeTab,
  onTabChange,
  productCount = 0,
  campaignCount = 0,
  reviewCount = 0,
}: Props) {
  const tabs: {
    id: TabType
    label: string
    icon: React.ReactNode
    count?: number
  }[] = [
    {
      id: "products",
      label: "Urunler",
      icon: <Grid3X3 size={18} />,
      count: productCount,
    },
    {
      id: "campaigns",
      label: "Kampanyalar",
      icon: <Megaphone size={18} />,
      count: campaignCount,
    },
    {
      id: "discounts",
      label: "Indirimler",
      icon: <Percent size={18} />,
    },
    {
      id: "categories",
      label: "Kategoriler",
      icon: <Folder size={18} />,
    },
    {
      id: "reviews",
      label: "Yorumlar",
      icon: <Star size={18} />,
      count: reviewCount,
    },
    {
      id: "about",
      label: "Hakkinda",
      icon: <Info size={18} />,
    },
  ]

  return (
    <div className="mt-10 border-b border-gray-200">
      <nav className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-5 py-4 text-sm font-medium
              whitespace-nowrap transition-all duration-300
              ${activeTab === tab.id
                ? "text-violet-600"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <span
              className={`
                transition-transform duration-300
                ${activeTab === tab.id ? "scale-110" : ""}
              `}
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`
                  px-2 py-0.5 text-xs rounded-full transition-colors
                  ${activeTab === tab.id
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {tab.count.toLocaleString("tr-TR")}
              </span>
            )}

            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
