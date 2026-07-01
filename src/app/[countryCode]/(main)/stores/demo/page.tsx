import { Metadata } from "next"
import StoreProfileTemplate from "@modules/store/templates/store-profile"
import { Store } from "@lib/data/stores"

export const metadata: Metadata = {
  title: "TechnoLab - Demo Mağaza | Bangoo",
  description: "TechnoLab demo mağaza sayfası",
}

// Mock Store Data
const mockStore: Store = {
  id: "store_demo_01",
  name: "TechnoLab",
  handle: "technolab",
  description: "Teknoloji ürünlerinde uzman mağazanız. En yeni ve en kaliteli elektronik ürünleri uygun fiyatlarla sunuyoruz.",
  logo_url: "https://via.placeholder.com/200x200/9865e8/ffffff?text=TechnoLab",
  cover_url: "https://via.placeholder.com/1200x300/6366f1/ffffff?text=TechnoLab+Store",
  created_at: "2024-01-15T00:00:00Z",
  updated_at: "2026-01-27T00:00:00Z",
  metadata: {
    verified: true,
    handle: "technolab",
    description: "Teknoloji ürünlerinde uzman mağazanız.",
    logo_url: "https://via.placeholder.com/200x200/9865e8/ffffff?text=TechnoLab",
    cover_url: "https://via.placeholder.com/1200x300/6366f1/ffffff?text=TechnoLab+Store",
  },
}

// Mock Products
const mockProducts = [
  {
    id: "prod_01",
    title: "Kablosuz Bluetooth Kulaklık",
    handle: "kablosuz-bluetooth-kulaklik",
    thumbnail: "https://via.placeholder.com/400x400/1e293b/ffffff?text=Kulaklık",
    description: "Premium ses kalitesi ve aktif gürültü önleme özellikli",
    variants: [
      {
        id: "variant_01",
        title: "Siyah",
        calculated_price: {
          calculated_amount: 89900,
          currency_code: "TRY",
          original_amount: 129900,
        },
      }
    ],
  },
  {
    id: "prod_02",
    title: "Akıllı Saat Pro",
    handle: "akilli-saat-pro",
    thumbnail: "https://via.placeholder.com/400x400/0891b2/ffffff?text=Akıllı+Saat",
    description: "Sağlık takibi ve bildirim özellikleri",
    variants: [
      {
        id: "variant_02",
        title: "Gümüş",
        calculated_price: {
          calculated_amount: 249900,
          currency_code: "TRY",
        },
      }
    ],
  },
  {
    id: "prod_03",
    title: "Taşınabilir Şarj Cihazı 20000mAh",
    handle: "tasinabilir-sarj-cihazi",
    thumbnail: "https://via.placeholder.com/400x400/059669/ffffff?text=Power+Bank",
    description: "Hızlı şarj teknolojisi ile 3 cihazı aynı anda şarj edin",
    variants: [
      {
        id: "variant_03",
        title: "Siyah",
        calculated_price: {
          calculated_amount: 34900,
          currency_code: "TRY",
        },
      }
    ],
  },
  {
    id: "prod_04",
    title: "Mekanik Gaming Klavye RGB",
    handle: "mekanik-gaming-klavye",
    thumbnail: "https://via.placeholder.com/400x400/dc2626/ffffff?text=Klavye",
    description: "RGB aydınlatmalı mekanik tuşlar",
    variants: [
      {
        id: "variant_04",
        title: "RGB",
        calculated_price: {
          calculated_amount: 149900,
          currency_code: "TRY",
          original_amount: 199900,
        },
      }
    ],
  },
]

export default async function DemoStorePage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return (
    <StoreProfileTemplate
      store={mockStore}
      initialProducts={mockProducts}
      productCount={4}
      activeTab="products"
      countryCode={countryCode}
    />
  )
}
