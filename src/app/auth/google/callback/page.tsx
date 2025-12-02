"use client"

import { handleGoogleCallback } from "@lib/data/customer"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processCallback = async () => {
      const token = searchParams.get("token")
      const errorParam = searchParams.get("error")

      if (errorParam) {
        setError("Google ile giriş yapılırken bir hata oluştu.")
        setTimeout(() => {
          router.push("/account")
        }, 3000)
        return
      }

      if (!token) {
        setError("Token bulunamadı.")
        setTimeout(() => {
          router.push("/account")
        }, 3000)
        return
      }

      const result = await handleGoogleCallback(token)

      if (result.success) {
        router.push("/account")
      } else {
        setError(result.error || "Bir hata oluştu.")
        setTimeout(() => {
          router.push("/account")
        }, 3000)
      }
    }

    processCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-8 py-12 bg-white rounded-lg shadow-md text-center">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hata</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Giriş sayfasına yönlendiriliyorsunuz...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9865e8] mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giriş yapılıyor...</h2>
            <p className="text-gray-600">Google hesabınızla giriş yapılıyor, lütfen bekleyin.</p>
          </>
        )}
      </div>
    </div>
  )
}
