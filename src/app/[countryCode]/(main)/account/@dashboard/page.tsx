import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound, redirect } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate({
  params,
}: {
  params: { countryCode: string }
}) {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  // Google OAuth ile giriş yapan yeni kullanıcıları setup sayfasına yönlendir
  if (!customer.first_name || !customer.last_name) {
    redirect(`/${params.countryCode}/auth/google/setup`)
  }

  return <Overview customer={customer} orders={orders} />
}
