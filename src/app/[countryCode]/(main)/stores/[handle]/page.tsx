import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listStores, getStoreById, getStoreProducts, getStoreCampaigns, getStoreReviews, Store } from "@lib/data/stores"
import StoreProfileTemplate from "@modules/store/templates/store-profile"
import { TabType } from "@modules/store/components/store-tabs"

type Props = {
  params: Promise<{
    handle: string
    countryCode: string
  }>
  searchParams: Promise<{
    tab?: TabType
  }>
}

/**
 * Find a store by its handle (metadata.handle) or by ID.
 * First tries listing stores and matching by handle from enrichStore().
 * Falls back to getStoreById if handle looks like an ID.
 */
async function findStoreByHandle(handle: string): Promise<Store | null> {
  // Try listing stores and matching by handle (from metadata)
  const { stores } = await listStores({ limit: 100 })
  const matchedStore = stores.find(
    (s) => s.handle === handle || s.id === handle
  )

  if (matchedStore) {
    return matchedStore
  }

  // Fallback: try fetching directly by ID
  const storeById = await getStoreById(handle)
  return storeById
}

// Generate SEO Metadata dynamically from backend
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const store = await findStoreByHandle(params.handle)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bangoo.com"

  if (!store) {
    return {
      title: "Magaza Bulunamadi | Bangoo",
      description: "Aradiginiz magaza bulunamadi.",
    }
  }

  const title = `${store.name} | Bangoo Magaza`
  const description =
    store.description ||
    `${store.name} magazasinin urunlerini kesfedin. Bangoo'da guvenli alisveris.`
  const canonicalUrl = `${baseUrl}/${params.countryCode}/stores/${store.handle}`

  return {
    title,
    description,
    keywords: [
      store.name,
      "magaza",
      "alisveris",
      "bangoo",
      "online alisveris",
      store.handle || "",
      "KKTC",
      "e-ticaret",
    ],
    authors: [{ name: store.name }],
    creator: store.name,
    publisher: "Bangoo",
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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Bangoo",
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: store.logo_url || store.cover_url || `${baseUrl}/og-store-default.jpg`,
          width: 1200,
          height: 630,
          alt: `${store.name} - Bangoo Magaza`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [store.logo_url || store.cover_url || `${baseUrl}/og-store-default.jpg`],
      creator: `@bangoo`,
    },
  }
}

// JSON-LD Structured Data - dynamically generated from backend store data
function generateJsonLd(store: Store, baseUrl: string, countryCode: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": `${baseUrl}/${countryCode}/stores/${store.handle}`,
    name: store.name,
    description: store.description || `${store.name} magazasi`,
    url: `${baseUrl}/${countryCode}/stores/${store.handle}`,
    image: store.cover_url || store.logo_url,
    logo: store.logo_url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/${countryCode}/stores/${store.handle}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    brand: {
      "@type": "Brand",
      name: store.name,
    },
    sameAs: [],
    foundingDate: store.created_at,
    slogan: store.description,
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Credit Card, Cash, Bank Transfer",
    areaServed: {
      "@type": "Country",
      name: "Kuzey Kibris Turk Cumhuriyeti",
    },
  }
}

export default async function StoreProfilePage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { handle, countryCode } = params
  const { tab = "products" } = searchParams
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bangoo.com"

  // Fetch store data dynamically from backend
  const store = await findStoreByHandle(handle)

  if (!store) {
    notFound()
  }

  // Fetch store products, campaigns, and reviews in parallel
  const [productsResult, campaignsResult, reviewsResult] = await Promise.all([
    getStoreProducts(store.id, { limit: 12 }),
    getStoreCampaigns(store.handle || store.id),
    getStoreReviews(store.handle || store.id, { limit: 10 }),
  ])

  // Generate JSON-LD from dynamic store data
  const jsonLd = generateJsonLd(store, baseUrl, countryCode)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <StoreProfileTemplate
        store={store}
        initialProducts={productsResult.products}
        productCount={productsResult.count}
        activeTab={tab}
        countryCode={countryCode}
        campaigns={campaignsResult}
        campaignCount={campaignsResult.length}
        reviewCount={reviewsResult.count}
      />
    </>
  )
}
