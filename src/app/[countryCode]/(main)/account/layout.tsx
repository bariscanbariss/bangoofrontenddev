import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"
import { redirect } from "next/navigation"

export default async function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: { countryCode: string }
}) {
  const customer = await retrieveCustomer().catch(() => null)

  // Kullanıcı giriş yapmış ama setup tamamlanmamışsa setup sayfasına yönlendir
  if (customer) {
    const isSetupCompleted = customer.metadata?.is_setup_completed === true
    const hasBasicInfo = customer.first_name && customer.last_name

    if (!isSetupCompleted || !hasBasicInfo) {
      redirect(`/${params.countryCode}/auth/google/setup`)
    }
  }

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
