import { Metadata } from "next"

import BangooFeatures from "@modules/home/components/bangoo-features"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CategoryQuickLinks from "@modules/home/components/category-quick-links"
import CategoryGrid from "@modules/home/components/category-grid"
import BrandShowcase from "@modules/home/components/brand-showcase"
import StoreShowcase from "@modules/home/components/store-showcase"
import PromotionalBanners from "@modules/home/components/promotional-banners"
import PopularProductsSlider from "@modules/home/components/popular-products-slider"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { getProductsFromCategories } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Bangoo - Online Alışveriş, Teknoloji, Moda, Elektronik ve Daha Fazlası",
  description:
    "Bangoo'da güvenli ve hızlı alışveriş yapın. Teknoloji, moda, elektronik, ev & yaşam kategorilerinde milyonlarca ürün, ücretsiz kargo fırsatları ve özel kampanyalar sizi bekliyor!",
  keywords: ["online alışveriş", "e-ticaret", "teknoloji", "moda", "elektronik", "kampanya", "ücretsiz kargo"],
  openGraph: {
    title: "Bangoo - Türkiye'nin Online Alışveriş Sitesi",
    description: "Güvenli alışveriş, hızlı teslimat ve özel kampanyalarla Bangoo'da!",
  },
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch categories and get one product from each
  const categories = await listCategories({ limit: 8 })
  const popularProducts = await getProductsFromCategories({
    regionId: region.id,
    limit: 20, // Fetch 20 popular products
  })

  // Fetch collections for featured products
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections) {
    return null
  }

  return (
    <>
      {/* Campaign Quick Links - Not Sticky */}
      <CategoryQuickLinks />

      {/* Popular Products Grid */}
      {popularProducts.length > 0 && (
        <PopularProductsSlider products={popularProducts} region={region} />
      )}

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Popular Stores - dynamically from backend */}
      <StoreShowcase />

      {/* Bangoo Features: Online Payment & Fast Delivery */}
      <BangooFeatures />

      {/* Welcome Section */}
      <div className="content-container py-8">
        <Text className="text-center text-2xl font-semibold text-gray-800">
          Bangoo'ya Hoşgeldiniz
        </Text>
        <Text className="text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          KKTC'nin en güvenilir online alışveriş platformu. Binlerce ürün, güvenli ödeme, hızlı kargo ve cazip kampanyalarla alışverişin keyfini çıkarın!
        </Text>
      </div>

      {/* Featured Products by Collections */}
      <div className="py-12 bg-gray-50">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
