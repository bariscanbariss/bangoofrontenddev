"use client"

import { useEffect, useState } from "react"
import { retrieveCustomer } from "@lib/data/customer"
import GoogleSetupForm from "@modules/account/components/google-setup"
import { useRouter, useParams } from "next/navigation"

export default function GoogleSetupPage() {
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCustomer() {
      try {
        console.log("Loading customer data for setup...")
        const customerData = await retrieveCustomer()

        console.log("Customer data:", customerData)

        if (!customerData) {
          console.log("No customer found, redirecting to account")
          router.push(`/${countryCode}/account`)
          return
        }

        // Setup tamamlanmış mı kontrol et
        const isSetupCompleted = customerData.metadata?.is_setup_completed === true

        if (isSetupCompleted && customerData.first_name && customerData.last_name) {
          console.log("Setup already completed, redirecting to account")
          router.push(`/${countryCode}/account`)
          return
        }

        setCustomer(customerData)
        setLoading(false)
      } catch (error) {
        console.error("Error loading customer:", error)
        router.push(`/${countryCode}/account`)
      }
    }

    // Cookie'nin set edilmesi için kısa bir gecikme
    setTimeout(loadCustomer, 500)
  }, [router, countryCode])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-8 py-12 bg-white rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9865e8] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Yükleniyor...</h2>
          <p className="text-gray-600">Profil bilgileriniz hazırlanıyor.</p>
        </div>
      </div>
    )
  }

  if (!customer) {
    return null
  }

  return <GoogleSetupForm customer={customer} countryCode={countryCode} />
}
