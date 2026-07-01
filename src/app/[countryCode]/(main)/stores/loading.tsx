export default function StoresListLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-pulse">
      <div className="content-container py-8">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mb-3" />
          <div className="h-5 w-80 bg-gray-200 rounded mx-auto" />
        </div>

        {/* Search skeleton */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="h-14 bg-gray-200 rounded-2xl" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-28 bg-gray-200">
                <div className="absolute -bottom-8 left-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-300" />
                </div>
              </div>
              <div className="p-4 pt-10 space-y-3">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
