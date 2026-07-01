import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { Package, Truck, CheckCircle, Clock, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kargom | Bangoo",
  description: "Kargo durumlarinizi takip edin.",
}

export default async function ShipmentsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  let orders: any[] = []
  try {
    const result = await listOrders()
    orders = result?.orders || []
  } catch (e) {
    // silently fail
  }

  // Filter orders that have fulfillments (shipped items)
  const shippedOrders = orders.filter(
    (o: any) => o.fulfillment_status && o.fulfillment_status !== "not_fulfilled"
  )

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "shipped":
        return {
          label: "Kargoda",
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        }
      case "delivered":
        return {
          label: "Teslim Edildi",
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        }
      case "partially_shipped":
        return {
          label: "Kismi Gonderim",
          icon: Package,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
        }
      default:
        return {
          label: "Hazirlaniyor",
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        }
    }
  }

  return (
    <div className="w-full" data-testid="shipments-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Kargom</h1>
        <p className="text-base-regular text-gray-600">
          Siparislerinizin kargo durumunu buradan takip edebilirsiniz.
        </p>
      </div>

      {shippedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Truck className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aktif Kargo Yok
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Su anda takip edilecek bir kargonuz bulunmuyor.
            Siparis verdiginizde kargo bilgileri burada gorunecektir.
          </p>
          <Link
            href={`/${params.countryCode}/store`}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Alisverise Basla
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {shippedOrders.map((order: any) => {
            const config = getStatusConfig(order.fulfillment_status)
            const StatusIcon = config.icon

            return (
              <div
                key={order.id}
                className={`p-6 rounded-xl border ${config.borderColor} ${config.bgColor} transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${config.bgColor}`}>
                      <StatusIcon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Siparis #{order.display_id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bgColor}`}>
                    {config.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{order.shipping_address?.city || "Adres bilgisi yok"}</span>
                  </div>
                  <Link
                    href={`/${params.countryCode}/account/orders/details/${order.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    Detay
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
