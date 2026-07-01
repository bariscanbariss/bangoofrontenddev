import { MetadataRoute } from "next"
import { listStores } from "@lib/data/stores"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bangoo.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION || "cy"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/${defaultRegion}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/${defaultRegion}/store`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${defaultRegion}/stores`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${defaultRegion}/account`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/${defaultRegion}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  // Dynamic store pages
  let storePages: MetadataRoute.Sitemap = []
  try {
    const { stores } = await listStores({ limit: 100 })
    storePages = stores.map((store) => ({
      url: `${BASE_URL}/${defaultRegion}/stores/${store.handle || store.id}`,
      lastModified: new Date(store.updated_at || store.created_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error("Error generating store sitemap entries:", error)
  }

  return [...staticPages, ...storePages]
}
