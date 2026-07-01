export default function StoreProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-pulse">
      <div className="content-container py-6 sm:py-8">
        {/* Cover skeleton */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full bg-gray-200 rounded-2xl">
          {/* Logo skeleton */}
          <div className="absolute -bottom-12 left-6 sm:left-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gray-300 border-4 border-white shadow-lg" />
          </div>
        </div>

        {/* Store info skeleton */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded-lg" />
              <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
            </div>
            <div className="flex gap-3">
              <div className="h-11 w-28 bg-gray-200 rounded-xl" />
              <div className="h-11 w-11 bg-gray-200 rounded-xl" />
              <div className="h-11 w-11 bg-gray-200 rounded-xl" />
            </div>
          </div>

          {/* Info skeleton */}
          <div className="flex gap-4 mt-5">
            <div className="h-6 w-40 bg-gray-200 rounded" />
          </div>

          {/* Description skeleton */}
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full max-w-2xl bg-gray-200 rounded" />
            <div className="h-4 w-3/4 max-w-xl bg-gray-200 rounded" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mt-10 border-b border-gray-200">
          <div className="flex gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-12 w-28 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-6 w-20 bg-gray-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
