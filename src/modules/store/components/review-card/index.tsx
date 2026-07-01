"use client"

import { StoreReview } from "@lib/data/stores"
import RatingStars from "@modules/store/components/rating-stars"
import { CheckCircle, User } from "lucide-react"

type Props = {
  review: StoreReview
}

export default function ReviewCard({ review }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Bugün"
    if (diffDays === 1) return "Dün"
    if (diffDays < 7) return `${diffDays} gün önce`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`

    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "?"
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
  }

  const customerName = review.customer
    ? `${review.customer.first_name} ${review.customer.last_name}`
    : "Anonim Kullanıcı"

  return (
    <div className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-sm font-bold text-violet-600">
              {getInitials(review.customer?.first_name, review.customer?.last_name)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{customerName}</h4>
                {review.verified_purchase && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    <CheckCircle size={12} />
                    Doğrulanmış Alıcı
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={review.rating} size={14} showValue={false} />
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {formatDate(review.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Comment */}
          {review.comment && (
            <p className="mt-3 text-gray-600 leading-relaxed">{review.comment}</p>
          )}
        </div>
      </div>
    </div>
  )
}
