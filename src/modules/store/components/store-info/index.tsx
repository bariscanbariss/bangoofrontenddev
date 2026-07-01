"use client"

import { Store } from "@lib/data/stores"
import { Calendar, Share2, Heart, MessageCircle } from "lucide-react"
import { useState } from "react"

type Props = {
  store: Store
  countryCode: string
}

export default function StoreInfo({ store, countryCode }: Props) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/${countryCode}/stores/${store.handle}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: store.name,
          text: store.description || `${store.name} magazasini kesfedin!`,
          url,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(url)
      setShowShareTooltip(true)
      setTimeout(() => setShowShareTooltip(false), 2000)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="mt-16 sm:mt-20">
      {/* Store name and handle - from backend */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {store.name}
          </h1>
          {store.handle && store.handle !== store.id && (
            <p className="text-gray-500 mt-1">@{store.handle}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300 transform hover:scale-105
              ${isFollowing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
              }
            `}
          >
            <Heart
              size={18}
              className={isFollowing ? "fill-red-500 text-red-500" : ""}
            />
            {isFollowing ? "Takip Ediliyor" : "Takip Et"}
          </button>

          <button
            onClick={handleShare}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Share2 size={18} className="text-gray-600" />
            {showShareTooltip && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fadeIn">
                Kopyalandi!
              </div>
            )}
          </button>

          <button className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <MessageCircle size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats - from backend */}
      <div className="flex flex-wrap items-center gap-4 mt-5">
        {store.created_at && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar size={14} />
            <span>{formatDate(store.created_at)}&apos;den beri</span>
          </div>
        )}

        {store.metadata?.verified && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-medium text-blue-700">Onayli Magaza</span>
          </div>
        )}
      </div>

      {/* Description - from backend metadata */}
      {store.description && (
        <div className="mt-6">
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {store.description}
          </p>
        </div>
      )}
    </div>
  )
}
