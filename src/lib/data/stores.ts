"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export interface Store {
  id: string
  name: string
  handle?: string
  description?: string
  logo_url?: string
}

/**
 * Fetches list of stores/vendors from the backend
 * This endpoint should be implemented in your Medusa backend
 * For now, returns mock data since the endpoint is not available
 */
export const listStores = async (query?: Record<string, any>): Promise<Store[]> => {
  // Return mock data since /store/stores endpoint is not implemented yet
  // TODO: Implement this endpoint in your Medusa backend
  return [
    { id: "1", name: "Bangoo Teknoloji" },
    { id: "2", name: "Elektronik Dünyası" },
    { id: "3", name: "Moda Merkezi" },
    { id: "4", name: "Ev & Yaşam Store" },
    { id: "5", name: "Spor Ürünleri" },
    { id: "6", name: "Kitap Sarayı" },
  ]

  /* Uncomment this when the backend endpoint is ready:
  const next = {
    ...(await getCacheOptions("stores")),
  }

  const limit = query?.limit || 20

  try {
    const response = await sdk.client.fetch<{ stores: Store[] }>(
      "/store/stores",
      {
        query: {
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    return response.stores
  } catch (error) {
    console.error("Error fetching stores:", error)
    return []
  }
  */
}
