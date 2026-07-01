"use client"

import { Star } from "lucide-react"

type Props = {
  rating: number
  size?: number
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export default function RatingStars({
  rating,
  size = 16,
  showValue = true,
  reviewCount,
  className = "",
}: Props) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-amber-400 text-amber-400 drop-shadow-sm"
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star size={size} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-gray-300"
          />
        ))}
      </div>

      {showValue && (
        <span className="text-sm font-semibold text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">
          ({reviewCount.toLocaleString("tr-TR")} değerlendirme)
        </span>
      )}
    </div>
  )
}
