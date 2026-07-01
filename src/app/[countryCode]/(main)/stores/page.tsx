import { Metadata } from "next"
import { listStores } from "@lib/data/stores"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Building2, Search, ChevronLeft, ChevronRight, Store } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Tum Magazalar | Bangoo",
  description: "Bangoo'daki tum magazalari kesfedin. Guvenilir saticilardan alisveris yapin.",
  openGraph: {
    title: "Tum Magazalar | Bangoo",
    description: "Bangoo'daki tum magazalari kesfedin. Guvenilir saticilardan alisveris yapin.",
  },
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ page?: string; search?: string }>
}

export default async function StoresPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { page, search } = searchParams

  const pageNumber = page ? parseInt(page) : 1
  const limit = 24
  const offset = (pageNumber - 1) * limit

  // Fetch stores dynamically from backend
  const { stores, count } = await listStores({
    limit,
    offset,
    search,
  })

  const totalPages = Math.ceil(count / limit)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-lg shadow-violet-200">
            <Store className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Tum Magazalar
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Bangoo&apos;daki guvenilir saticilari kesfedin. {count} magaza sizi bekliyor.
          </p>
        </div>

        {/* Search */}
        <form className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Magaza ara..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all shadow-sm"
            />
          </div>
        </form>

        {/* Stores Grid */}
        {stores.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <Building2 size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Magaza bulunamadi
            </h3>
            <p className="text-gray-500">
              {search
                ? `"${search}" aramasina uygun magaza bulunamadi.`
                : "Henuz magaza bulunmamaktadir."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {stores.map((store) => (
                <LocalizedClientLink
                  key={store.id}
                  href={`/stores/${store.handle}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-violet-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1">
                    {/* Logo */}
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-violet-200 transition-colors mb-3 shadow-sm">
                      {store.logo_url ? (
                        <Image
                          src={store.logo_url}
                          alt={store.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-100">
                          <Building2 className="w-7 h-7 md:w-8 md:h-8 text-violet-400" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-[#9865e8] transition-colors line-clamp-2 leading-tight">
                      {store.name}
                    </h3>

                    {/* Verified */}
                    {store.metadata?.verified && (
                      <div className="mt-1.5 px-1.5 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-medium rounded-full">
                        Onayli
                      </div>
                    )}
                  </div>
                </LocalizedClientLink>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {pageNumber > 1 && (
                  <LocalizedClientLink
                    href={`/stores?page=${pageNumber - 1}${search ? `&search=${search}` : ""}`}
                    className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-gray-600 hover:text-violet-600 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </LocalizedClientLink>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                    let pageNum: number
                    if (totalPages <= 7) {
                      pageNum = i + 1
                    } else if (pageNumber <= 4) {
                      pageNum = i + 1
                    } else if (pageNumber >= totalPages - 3) {
                      pageNum = totalPages - 6 + i
                    } else {
                      pageNum = pageNumber - 3 + i
                    }

                    return (
                      <LocalizedClientLink
                        key={pageNum}
                        href={`/stores?page=${pageNum}${search ? `&search=${search}` : ""}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium text-sm transition-all ${
                          pageNumber === pageNum
                            ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200"
                            : "bg-white border border-gray-200 hover:border-violet-300 hover:bg-violet-50 text-gray-600 hover:text-violet-600"
                        }`}
                      >
                        {pageNum}
                      </LocalizedClientLink>
                    )
                  })}
                </div>

                {pageNumber < totalPages && (
                  <LocalizedClientLink
                    href={`/stores?page=${pageNumber + 1}${search ? `&search=${search}` : ""}`}
                    className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-gray-600 hover:text-violet-600 transition-all"
                  >
                    <ChevronRight size={18} />
                  </LocalizedClientLink>
                )}
              </div>
            )}

            {/* Page info */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Sayfa {pageNumber} / {totalPages} ({count} magaza)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
