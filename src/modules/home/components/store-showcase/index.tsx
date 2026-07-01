import { getFeaturedStores } from "@lib/data/stores"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Store, Building2, ArrowRight } from "lucide-react"
import Image from "next/image"

export default async function StoreShowcase() {
  const stores = await getFeaturedStores(10)

  if (!stores || stores.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="content-container">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Populer Magazalar
              </h2>
            </div>
            <p className="text-gray-500 mt-1 ml-10">
              One cikan magazalari kesfedin
            </p>
          </div>
          <LocalizedClientLink
            href="/stores"
            className="hidden sm:inline-flex items-center gap-2 text-[#9865e8] hover:text-[#7a4bc4] font-semibold transition-colors group"
          >
            Tum Magazalar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </LocalizedClientLink>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stores.map((store) => (
            <LocalizedClientLink
              key={store.id}
              href={`/stores/${store.handle}`}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-violet-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1">
                {/* Store Logo */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-violet-200 transition-colors mb-3 shadow-sm">
                  {store.logo_url ? (
                    <Image
                      src={store.logo_url}
                      alt={store.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-100">
                      <Building2 className="w-8 h-8 md:w-10 md:h-10 text-violet-400" />
                    </div>
                  )}
                </div>

                {/* Store Name */}
                <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#9865e8] transition-colors line-clamp-1">
                  {store.name}
                </h3>

                {/* Verified Badge */}
                {store.metadata?.verified && (
                  <div className="mt-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    Onayli
                  </div>
                )}
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* Mobile: View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <LocalizedClientLink
            href="/stores"
            className="inline-flex items-center gap-2 text-[#9865e8] hover:text-[#7a4bc4] font-semibold transition-colors"
          >
            Tum Magazalari Gor
            <ArrowRight className="w-4 h-4" />
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
