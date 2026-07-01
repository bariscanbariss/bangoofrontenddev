"use client"

import { completeGoogleProfile } from "@lib/data/customer"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-6 px-6 py-3 bg-[#9865e8] text-white font-semibold rounded-lg
                 transition-all duration-300 ease-in-out
                 hover:bg-[#7d4fd1] hover:shadow-lg hover:scale-105
                 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:scale-100"
    >
      {pending ? "Kaydediliyor..." : children}
    </button>
  )
}

interface GoogleSetupFormProps {
  customer: {
    email?: string
    first_name?: string
    last_name?: string
    phone?: string
  }
  countryCode: string
}

export default function GoogleSetupForm({ customer, countryCode }: GoogleSetupFormProps) {
  const router = useRouter()
  const [message, formAction] = useActionState(completeGoogleProfile, null)

  useEffect(() => {
    // Form başarıyla gönderildiyse account sayfasına yönlendir
    if (message && typeof message === "object" && "success" in message && message.success) {
      setTimeout(() => {
        router.push(`/${countryCode}/account`)
      }, 500)
    }
  }, [message, router, countryCode])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f5ff] to-white px-4 py-12">
      <div className="max-w-md w-full animate-fade-in-top">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9865e8] bg-opacity-10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-[#9865e8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profilinizi Tamamlayın
            </h1>
            <p className="text-gray-600">
              Google hesabınızla başarıyla giriş yaptınız. Son olarak profil bilgilerinizi tamamlayın.
            </p>
          </div>

          {/* Google Email Info */}
          {customer?.email && (
            <div className="mb-6 p-4 bg-white rounded-lg border-2 border-[#9865e8] shadow-sm">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#9865e8] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Google Hesabı</p>
                  <p className="text-base font-medium text-gray-800 break-all">{customer.email}</p>
                </div>
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">
                Ad <span className="text-red-500">*</span>
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Adınızı girin"
                defaultValue={customer?.first_name || ""}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#9865e8] focus:border-transparent
                         placeholder:text-gray-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                Soyad <span className="text-red-500">*</span>
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Soyadınızı girin"
                defaultValue={customer?.last_name || ""}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#9865e8] focus:border-transparent
                         placeholder:text-gray-400 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(5xx) xxx xx xx"
                defaultValue={customer?.phone || ""}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-[#9865e8] focus:border-transparent
                         placeholder:text-gray-400 transition-all duration-200"
              />
            </div>

            <ErrorMessage error={message} />

            <SubmitButton>
              Profili Tamamla ve Devam Et
            </SubmitButton>
          </form>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <svg className="w-4 h-4 inline-block mr-1 text-[#9865e8]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Bu bilgiler hesabınızın güvenliği ve size özel hizmet sunabilmemiz için gereklidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
