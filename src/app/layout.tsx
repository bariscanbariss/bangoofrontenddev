import { getBaseURL } from "@lib/util/env"
import { Metadata, Viewport } from "next"
import "styles/globals.css"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#9865e8',
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Bangoo - Türkiye'nin Online Alışveriş Sitesi",
    template: "%s | Bangoo"
  },
  description: "Bangoo'da güvenli alışverişin keyfini çıkarın. Teknoloji, moda, ev, elektronik ve daha fazla kategoride milyonlarca ürün sizi bekliyor. Ücretsiz kargo fırsatlarını kaçırmayın!",
  keywords: ["online alışveriş", "e-ticaret", "bangoo", "alışveriş sitesi", "türkiye", "elektronik", "moda", "teknoloji", "güvenli alışveriş", "ücretsiz kargo"],
  authors: [{ name: "Bangoo" }],
  creator: "Bangoo",
  publisher: "Bangoo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: getBaseURL(),
    siteName: "Bangoo",
    title: "Bangoo - Türkiye'nin Online Alışveriş Sitesi",
    description: "Güvenli alışveriş, hızlı teslimat, kampanyalar ve daha fazlası Bangoo'da!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangoo - Türkiye'nin Online Alışveriş Sitesi",
    description: "Güvenli alışveriş, hızlı teslimat, kampanyalar ve daha fazlası Bangoo'da!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: '',
    yandex: '',
  },
  alternates: {
    canonical: getBaseURL(),
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-mode="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
