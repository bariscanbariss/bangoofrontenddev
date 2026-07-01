import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Google ile Giriş Yapılıyor... | Bangoo",
  description: "Google hesabınızla Bangoo'ya giriş yapılıyor, lütfen bekleyin.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function GoogleCallbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
