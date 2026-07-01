import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profil Tamamla - Google ile Giriş | Bangoo",
  description: "Google hesabınızla Bangoo'ya başarıyla giriş yaptınız. Profilinizi tamamlayarak alışverişe başlayın.",
  keywords: ["bangoo", "google giriş", "profil tamamla", "üyelik", "kayıt"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Profil Tamamla - Bangoo",
    description: "Google hesabınızla giriş yaptınız, profilinizi tamamlayın.",
    type: "website",
    locale: "tr_TR",
  },
}

export default function GoogleSetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
