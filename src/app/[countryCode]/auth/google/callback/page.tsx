"use client"

import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { handleGoogleCallback } from "@lib/data/customer"

function GoogleCallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()
  const countryCode = params.countryCode as string
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    async function processCallback() {
      const errorParam = searchParams.get("error")
      const code = searchParams.get("code")
      const state = searchParams.get("state")

      if (errorParam) {
        setError("Google ile giriş yapılırken bir hata oluştu: " + errorParam)
        setProcessing(false)
        setTimeout(() => {
          router.push(`/${countryCode}/account`)
        }, 3000)
        return
      }

      if (!code) {
        setError("Google authentication kodu eksik")
        setProcessing(false)
        setTimeout(() => {
          router.push(`/${countryCode}/account`)
        }, 3000)
        return
      }

      // Backend callback'i işle
      console.log("Processing Google callback with code:", code)
      const result = await handleGoogleCallback({
        code,
        state: state || undefined
      })

      console.log("handleGoogleCallback result:", result)

      if (!result.success) {
        console.error("Authentication failed:", result.error)
        setError(result.error || "Google ile giriş başarısız oldu")
        setProcessing(false)
        setTimeout(() => {
          router.push(`/${countryCode}/account`)
        }, 3000)
        return
      }

      // Başarılı! Setup'a veya account'a yönlendir
      console.log("Google authentication successful, redirecting...")
      console.log("isNewUser:", result.isNewUser)
      setProcessing(false)

      if (result.isNewUser) {
        console.log("Redirecting to setup page")
        router.push(`/${countryCode}/auth/google/setup`)
      } else {
        console.log("Redirecting to account page")
        router.push(`/${countryCode}/account`)
      }
    }

    processCallback()
  }, [searchParams, router, countryCode])

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

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-8 py-12 bg-white rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9865e8] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Yükleniyor...</h2>
          <p className="text-gray-600">Lütfen bekleyin.</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  )
}
