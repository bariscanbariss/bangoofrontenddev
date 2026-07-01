"use client"

import { useState } from "react"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export function useGoogleCallback() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCallback = async (code: string, state?: string) => {
    setLoading(true)
    setError(null)

    try {
      console.log("=== GOOGLE OAUTH CALLBACK DEBUG ===")
      console.log("Backend URL:", BACKEND_URL)
      console.log("Publishable Key:", PUBLISHABLE_KEY?.substring(0, 15) + "...")
      console.log("Code:", code.substring(0, 30) + "...")
      console.log("State:", state?.substring(0, 30) + "...")
      console.log("Current URL:", window.location.href)
      console.log("Cookies:", document.cookie)

      if (!code) {
        throw new Error("No code provided in callback parameters")
      }

      const queryParams = new URLSearchParams({
        code,
        ...(state && { state }),
      })

      const callbackUrl = `${BACKEND_URL}/auth/customer/google/callback?${queryParams}`
      console.log("Calling:", callbackUrl.substring(0, 100) + "...")

      const response = await fetch(callbackUrl, {
        method: "GET",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY || "",
        },
        credentials: "include",
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))
      console.log("Set-Cookie header:", response.headers.get('set-cookie'))

      const responseText = await response.text()
      console.log("Response body:", responseText)

      if (!response.ok) {
        let errorData
        try {
          errorData = JSON.parse(responseText)
        } catch {
          errorData = { message: responseText }
        }

        console.error("❌ Callback failed:", errorData)
        throw new Error(
          errorData.message ||
          `Backend returned ${response.status}: ${response.statusText}`
        )
      }

      const data = JSON.parse(responseText)
      console.log("✅ Callback validation successful, response:", data)

      // Token'ı server-side cookie'ye kaydet ve bekle
      if (data.token) {
        const setCookieResponse = await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: data.token })
        })

        if (!setCookieResponse.ok) {
          console.error("Failed to set cookie")
        } else {
          console.log("✅ Token saved to cookie")
        }
      }

      // Kullanıcı bilgilerini çek - artık cookie set edildi
      const customerResponse = await fetch(`${BACKEND_URL}/store/customers/me`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_KEY || "",
          "Authorization": `Bearer ${data.token}`,
        },
        credentials: "include",
      })

      console.log("Customer fetch status:", customerResponse.status)

      if (!customerResponse.ok) {
        const errorText = await customerResponse.text()
        console.error("Customer fetch failed:", errorText)
        throw new Error("Failed to fetch customer data")
      }

      const { customer } = await customerResponse.json()
      console.log("✅ Customer data:", customer)

      // Setup tamamlanmış mı kontrol et (metadata'dan)
      const isSetupCompleted = customer?.metadata?.is_setup_completed === true

      // Yeni kullanıcı veya setup tamamlanmamış kullanıcı
      const isNewUser = !isSetupCompleted || !customer?.first_name || !customer?.last_name

      setLoading(false)
      return { success: true, isNewUser, customer }
    } catch (err: any) {
      console.error("❌ GOOGLE CALLBACK ERROR:", err)
      console.error("Error type:", err.constructor.name)
      console.error("Error message:", err.message)
      console.error("Error stack:", err.stack)
      setLoading(false)
      setError(err.message || err.toString())
      return { success: false, error: err.message || err.toString() }
    }
  }

  return { handleCallback, loading, error }
}
