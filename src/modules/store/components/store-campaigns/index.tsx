"use client"

import { StoreCampaign } from "@lib/data/stores"
import { Megaphone, Clock, Percent, Truck, Tag, ArrowRight, Gift } from "lucide-react"
import Image from "next/image"

type Props = {
  campaigns: StoreCampaign[]
  countryCode: string
}

const discountTypeConfig: Record<string, {
  icon: any
  label: string
  color: string
  bgColor: string
  textColor: string
}> = {
  percentage: {
    icon: Percent,
    label: "Yuzde Indirim",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  fixed: {
    icon: Tag,
    label: "Sabit Indirim",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
  },
  free_shipping: {
    icon: Truck,
    label: "Ucretsiz Kargo",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
}

export default function StoreCampaigns({ campaigns, countryCode }: Props) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
            <Megaphone className="w-12 h-12 text-violet-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Gift className="w-5 h-5 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henuz Kampanya Yok
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          Bu magazada su anda aktif kampanya bulunmuyor. Yakinda harika
          firsatlar icin tekrar kontrol edin!
        </p>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getRemainingDays = (endDate?: string) => {
    if (!endDate) return null
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  const getDiscountLabel = (campaign: StoreCampaign) => {
    if (!campaign.discount_type || !campaign.discount_value) return null
    if (campaign.discount_type === "percentage") return `%${campaign.discount_value}`
    if (campaign.discount_type === "fixed") return `${campaign.discount_value} TL`
    if (campaign.discount_type === "free_shipping") return "Ucretsiz Kargo"
    return null
  }

  return (
    <div className="space-y-6">
      {/* Campaign banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Megaphone className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Aktif Kampanyalar</h2>
            <p className="text-white/90">
              {campaigns.length} aktif kampanya sizi bekliyor!
            </p>
          </div>
        </div>
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => {
          const config = campaign.discount_type
            ? discountTypeConfig[campaign.discount_type]
            : discountTypeConfig.percentage
          const DiscountIcon = config.icon
          const remaining = getRemainingDays(campaign.end_date)
          const discountLabel = getDiscountLabel(campaign)

          return (
            <div
              key={campaign.id}
              className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-violet-200 transition-all duration-300 group"
            >
              {/* Campaign banner image */}
              {campaign.banner_url ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={campaign.banner_url}
                    alt={campaign.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Discount badge on image */}
                  {discountLabel && (
                    <div className="absolute top-4 right-4">
                      <div className={`bg-gradient-to-r ${config.color} text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg`}>
                        {discountLabel}
                      </div>
                    </div>
                  )}

                  {/* Title on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {campaign.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className={`relative h-48 bg-gradient-to-br ${config.color} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                    {discountLabel && (
                      <div className="text-4xl font-black mb-2">{discountLabel}</div>
                    )}
                    <h3 className="text-xl font-bold text-center">
                      {campaign.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Campaign details */}
              <div className="p-5">
                {campaign.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {campaign.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {/* Discount type badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 ${config.bgColor} rounded-full`}>
                    <DiscountIcon size={14} className={config.textColor} />
                    <span className={`text-xs font-medium ${config.textColor}`}>
                      {config.label}
                    </span>
                  </div>

                  {/* Remaining time */}
                  {remaining !== null && remaining > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
                      <Clock size={14} className="text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">
                        {remaining} gun kaldi
                      </span>
                    </div>
                  )}

                  {/* Dates */}
                  {campaign.end_date && (
                    <span className="text-xs text-gray-400 ml-auto">
                      {formatDate(campaign.end_date)}'e kadar
                    </span>
                  )}
                </div>

                {/* Products in campaign */}
                {campaign.products && campaign.products.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {campaign.products.length} urun bu kampanyada
                      </span>
                      <button className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                        Urunleri Gor
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
