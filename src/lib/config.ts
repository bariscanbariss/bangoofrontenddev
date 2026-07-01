import Medusa from "@medusajs/js-sdk"

// IMPORTANT: Client-side needs NEXT_PUBLIC_ prefix!
// Server-side can use either MEDUSA_BACKEND_URL or NEXT_PUBLIC_MEDUSA_BACKEND_URL
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  process.env.MEDUSA_BACKEND_URL ||
  "http://localhost:9000"

console.log("Medusa SDK Config:", {
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.substring(0, 10) + "...",
  environment: typeof window !== 'undefined' ? 'client' : 'server'
})

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: "session", // Session-based authentication (cookies)
    // CRITICAL: Cookie'leri cross-origin isteklerde de gönder (Google OAuth için gerekli)
    // Backend'deki CORS ayarları ile birlikte çalışır
    fetchCredentials: "include", // "same-origin" yerine "include" - cross-origin için
  },
})
