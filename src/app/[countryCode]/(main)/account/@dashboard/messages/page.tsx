import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { MessageSquare, Store, Clock, Send } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Satici Mesajlarim | Bangoo",
  description: "Saticilarla olan mesajlarinizi goruntuyleyin.",
}

export default async function MessagesPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  return (
    <div className="w-full" data-testid="messages-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Satici Mesajlarim</h1>
        <p className="text-base-regular text-gray-600">
          Saticilarla olan iletisimlerinizi buradan yonetebilirsiniz.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-12 h-12 text-indigo-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Store className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Henuz Mesajiniz Yok
        </h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Saticilarla iletisime gectiginizde mesajlariniz burada gorunecektir.
          Siparis detay sayfasindan saticiyla iletisime gecebilirsiniz.
        </p>
        <Link
          href={`/${params.countryCode}/account/orders`}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          Siparislerime Git
        </Link>
      </div>
    </div>
  )
}
