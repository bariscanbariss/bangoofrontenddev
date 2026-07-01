import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { Heart, ShoppingBag, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Favorilerim | Bangoo",
  description: "Favori urunlerinizi goruntuyleyin ve yonetin.",
}

export default async function FavoritesPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  return (
    <div className="w-full" data-testid="favorites-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Favorilerim</h1>
        <p className="text-base-regular text-gray-600">
          Begendginiz urunleri burada goruntuleyebilirsiniz.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-pink-500" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henuz Favoriniz Yok
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Urunleri favorilerinize ekleyerek daha sonra kolayca erisebilirsiniz.
          Kalp ikonuna tiklayarak favori ekleyebilirsiniz.
        </p>
        <Link
          href={`/${params.countryCode}/store`}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          Urunleri Kesfet
        </Link>
      </div>
    </div>
  )
}
