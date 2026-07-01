import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { Ticket, Clock, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Indirim Kuponlarim | Bangoo",
  description: "Indirim kuponlarinizi goruntuyleyin ve kullinin.",
}

export default async function CouponsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  return (
    <div className="w-full" data-testid="coupons-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Indirim Kuponlarim</h1>
        <p className="text-base-regular text-gray-600">
          Aktif ve kullanilabilir indirim kuponlariniz burada listelenir.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
            <Ticket className="w-12 h-12 text-amber-500" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henuz Kuponunuz Yok
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Alisverislerinize ozel indirim kuponlari burada gorunecektir.
          Kampanyalari takip ederek kupon kazanabilirsiniz.
        </p>
        <Link
          href={`/${params.countryCode}/store`}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          Kampanyalari Incele
        </Link>
      </div>
    </div>
  )
}
