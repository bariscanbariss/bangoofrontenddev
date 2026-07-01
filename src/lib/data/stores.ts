"use server"

import { sdk } from "@lib/config"

// ============ TYPES ============
// Matches Medusa v2 native Store model + metadata extensions

export interface Store {
  id: string
  name: string
  created_at?: string
  updated_at?: string
  metadata?: Record<string, any> | null
  // Computed from metadata for convenience
  handle?: string
  description?: string
  logo_url?: string
  cover_url?: string
}

// Future types - used by components that will be activated when backend endpoints exist

export interface StoreReview {
  id: string
  store_id: string
  customer_id: string
  order_id: string
  rating: number
  comment?: string
  verified_purchase?: boolean
  created_at: string
  customer?: {
    first_name?: string
    last_name?: string
  }
}

export interface FeaturedProduct {
  id: string
  store_id: string
  product_id: string
  order: number
  badge?: "bestseller" | "trending" | "new" | "sale"
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    description?: string
    images?: { id: string; url: string }[]
    variants?: {
      id: string
      title: string
      calculated_price?: {
        calculated_amount: number
        currency_code?: string
        is_calculated_price_price_list?: boolean
      }
      original_price?: number
    }[]
  }
}

export interface StoreCampaign {
  id: string
  store_id: string
  title: string
  description?: string
  banner_url?: string
  discount_type?: "percentage" | "fixed" | "free_shipping"
  discount_value?: number
  start_date?: string
  end_date?: string
  products?: any[]
}

// Helper to extract metadata fields into top-level for easier access
function enrichStore(raw: any): Store {
  const metadata = raw.metadata || {}
  return {
    id: raw.id,
    name: raw.name,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
    metadata: raw.metadata,
    // Pull convenience fields from metadata
    handle: metadata.handle || raw.id,
    description: metadata.description || "",
    logo_url: metadata.logo_url || "",
    cover_url: metadata.cover_url || "",
  }
}

// ============ HELPERS ============

const getBackendUrl = () =>
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const getPublishableKey = () =>
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const defaultHeaders = () => ({
  "x-publishable-api-key": getPublishableKey(),
  "Content-Type": "application/json",
})

// ============ API FUNCTIONS ============

/**
 * List all stores with pagination and search
 * Endpoint: GET /store/stores
 */
export const listStores = async (query?: {
  limit?: number
  offset?: number
  search?: string
}): Promise<{ stores: Store[]; count: number }> => {
  const limit = query?.limit || 20
  const offset = query?.offset || 0

  try {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    })
    if (query?.search) {
      params.set("q", query.search)
    }

    const res = await fetch(
      `${getBackendUrl()}/store/stores?${params.toString()}`,
      {
        headers: defaultHeaders(),
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      // Silently return empty when endpoint doesn't exist (multivendor plugin may not be configured)
      return { stores: [], count: 0 }
    }

    const data = await res.json()
    const stores = (data.stores || []).map(enrichStore)
    return { stores, count: data.count || 0 }
  } catch (error) {
    console.error("Error fetching stores:", error)
    return { stores: [], count: 0 }
  }
}

/**
 * Get a single store by ID
 * Endpoint: GET /store/stores/{id}
 */
export const getStoreById = async (id: string): Promise<Store | null> => {
  try {
    const res = await fetch(
      `${getBackendUrl()}/store/stores/${id}`,
      {
        headers: defaultHeaders(),
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error(`getStoreById: ${res.status}`)
      return null
    }

    const data = await res.json()
    return data.store ? enrichStore(data.store) : null
  } catch (error) {
    console.error(`Error fetching store ${id}:`, error)
    return null
  }
}

/**
 * Get featured/popular stores (falls back to listStores)
 * Endpoint: GET /store/stores (with limit)
 */
export const getFeaturedStores = async (
  limit: number = 10
): Promise<Store[]> => {
  const { stores } = await listStores({ limit })
  return stores
}

/**
 * Get products belonging to a store
 * Endpoint: GET /store/stores/{id}/products
 */
export const getStoreProducts = async (
  storeId: string,
  query?: {
    limit?: number
    offset?: number
  }
): Promise<{ products: any[]; count: number }> => {
  const limit = query?.limit || 20
  const offset = query?.offset || 0

  try {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    })

    const res = await fetch(
      `${getBackendUrl()}/store/stores/${storeId}/products?${params.toString()}`,
      {
        headers: defaultHeaders(),
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error(`getStoreProducts: ${res.status}`)
      return { products: [], count: 0 }
    }

    const data = await res.json()
    return {
      products: data.products || [],
      count: data.count || 0,
    }
  } catch (error) {
    console.error(`Error fetching products for store ${storeId}:`, error)
    return { products: [], count: 0 }
  }
}

// ============ STUB API FUNCTIONS ============
// These will be implemented when backend endpoints are ready

/**
 * Get store reviews
 * Endpoint: GET /store/stores/{handle}/reviews (future)
 */
export const getStoreReviews = async (
  storeHandle: string,
  query?: {
    limit?: number
    offset?: number
    rating?: number
  }
): Promise<{ reviews: StoreReview[]; count: number }> => {
  // TODO: Implement when backend endpoint is ready
  return { reviews: [], count: 0 }
}

/**
 * Get store discount products
 * Endpoint: GET /store/stores/{id}/discount-products (future)
 */
export const getStoreDiscountProducts = async (
  storeId: string,
  query?: {
    limit?: number
    offset?: number
    order?: string
  }
): Promise<{ products: any[]; count: number }> => {
  // TODO: Implement when backend endpoint is ready
  return { products: [], count: 0 }
}

/**
 * Get store categories
 * Endpoint: GET /store/stores/{handle}/categories (future)
 */
export const getStoreCategories = async (
  storeHandle: string
): Promise<any[]> => {
  // TODO: Implement when backend endpoint is ready
  return []
}

/**
 * Get store campaigns
 * Endpoint: GET /store/stores/{handle}/campaigns (future)
 */
export const getStoreCampaigns = async (
  storeHandle: string
): Promise<{ campaigns: StoreCampaign[]; count: number }> => {
  // TODO: Implement when backend endpoint is ready
  return { campaigns: [], count: 0 }
}

/**
 * Create store review (requires authentication)
 * Endpoint: POST /store/stores/{storeId}/reviews
 * NOTE: This endpoint needs to be implemented on the backend
 */
export const createStoreReview = async (
  storeId: string,
  data: {
    order_id: string
    rating: number
    comment?: string
  }
): Promise<{ review: any } | { error: string }> => {
  try {
    const response = await sdk.client.fetch<{ review: any }>(
      `/store/stores/${storeId}/reviews`,
      {
        method: "POST",
        body: data,
      }
    )
    return response
  } catch (error: any) {
    console.error("Error creating review:", error)
    return { error: error?.message || "Yorum eklenirken hata olustu" }
  }
}
