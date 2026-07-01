"use client"

import { useState, useEffect } from "react"
import { StoreReview, getStoreReviews } from "@lib/data/stores"
import ReviewCard from "@modules/store/components/review-card"
import RatingStars from "@modules/store/components/rating-stars"
import { Star, Filter, ChevronDown, Loader2 } from "lucide-react"

type Props = {
  storeHandle: string
  initialReviews: StoreReview[]
  totalCount: number
  averageRating?: number
}

export default function StoreReviews({
  storeHandle,
  initialReviews,
  totalCount,
  averageRating = 0,
}: Props) {
  const [reviews, setReviews] = useState<StoreReview[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<number | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [offset, setOffset] = useState(initialReviews.length)
  const [hasMore, setHasMore] = useState(initialReviews.length < totalCount)

  // Rating distribution (mock - in real app this would come from API)
  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalCount * 0.6) },
    { stars: 4, count: Math.floor(totalCount * 0.25) },
    { stars: 3, count: Math.floor(totalCount * 0.1) },
    { stars: 2, count: Math.floor(totalCount * 0.03) },
    { stars: 1, count: Math.floor(totalCount * 0.02) },
  ]

  const handleFilterChange = async (rating: number | null) => {
    setFilter(rating)
    setLoading(true)

    try {
      const result = await getStoreReviews(storeHandle, {
        limit: 10,
        offset: 0,
        rating: rating || undefined,
      })
      setReviews(result.reviews)
      setOffset(result.reviews.length)
      setHasMore(result.reviews.length < result.count)
    } catch (error) {
      console.error("Error filtering reviews:", error)
    } finally {
      setLoading(false)
      setShowFilter(false)
    }
  }

  const loadMore = async () => {
    setLoading(true)

    try {
      const result = await getStoreReviews(storeHandle, {
        limit: 10,
        offset,
        rating: filter || undefined,
      })
      setReviews((prev) => [...prev, ...result.reviews])
      setOffset((prev) => prev + result.reviews.length)
      setHasMore(offset + result.reviews.length < result.count)
    } catch (error) {
      console.error("Error loading more reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8">
      {/* Summary section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Average rating card */}
        <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <RatingStars rating={averageRating} size={20} showValue={false} />
              <p className="text-sm text-gray-500 mt-2">
                {totalCount.toLocaleString("tr-TR")} değerlendirme
              </p>
            </div>

            {/* Rating distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map(({ stars, count }) => {
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0
                return (
                  <button
                    key={stars}
                    onClick={() => handleFilterChange(filter === stars ? null : stars)}
                    className={`
                      w-full flex items-center gap-2 group
                      ${filter === stars ? "opacity-100" : "opacity-70 hover:opacity-100"}
                    `}
                  >
                    <span className="text-sm text-gray-600 w-3">{stars}</span>
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filter card */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Filtrele</h3>
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <span className="text-gray-700">
                  {filter ? `${filter} yıldız` : "Tüm değerlendirmeler"}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${showFilter ? "rotate-180" : ""}`}
              />
            </button>

            {showFilter && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-fadeIn">
                <button
                  onClick={() => handleFilterChange(null)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    filter === null ? "bg-violet-50 text-violet-700" : ""
                  }`}
                >
                  Tüm değerlendirmeler
                </button>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => handleFilterChange(stars)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      filter === stars ? "bg-violet-50 text-violet-700" : ""
                    }`}
                  >
                    <span>{stars} yıldız</span>
                    <div className="flex">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {filter && (
            <button
              onClick={() => handleFilterChange(null)}
              className="mt-3 text-sm text-violet-600 hover:text-violet-700"
            >
              Filtreyi temizle
            </button>
          )}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {loading && reviews.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="text-violet-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Henüz değerlendirme yok
            </h3>
            <p className="text-gray-500">
              Bu mağaza için henüz değerlendirme yapılmamış.
            </p>
          </div>
        ) : (
          <>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/* Load more button */}
            {hasMore && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    "Daha Fazla Yükle"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
