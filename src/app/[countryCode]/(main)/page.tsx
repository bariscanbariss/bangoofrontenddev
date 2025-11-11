import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import PopularProductsSlider from "@modules/home/components/popular-products-slider"
import StoresList from "@modules/home/components/stores-list"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { getProductsFromCategories } from "@lib/data/products"
import { listStores } from "@lib/data/stores"
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
  const categoryIds = categories.map((cat) => cat.id)
  const popularProducts = await getProductsFromCategories({
    regionId: region.id,
    categoryIds,
  })

  // Fetch stores list
  const stores = await listStores({ limit: 10 })

  // Fetch collections for featured products
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections) {
    return null
  }

  return (
    <>
      <Hero />

      {/* Popular Products Slider */}
      {popularProducts.length > 0 && (
        <PopularProductsSlider products={popularProducts} region={region} />
      )}

      {/* Welcome Section */}
      <div className="content-container py-8">
        <Text className="text-center text-2xl font-semibold text-gray-800">
          Bangoo'ya Hoşgeldiniz
        </Text>
      </div>

      {/* Stores List */}
      {stores.length > 0 && <StoresList stores={stores} />}

      {/* Featured Products by Collections */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
