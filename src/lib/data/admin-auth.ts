"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sdk } from "@lib/config"

const ADMIN_AUTH_TOKEN = "admin_auth_token"
const ADMIN_USER_ID = "admin_user_id"

export interface AdminUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: "admin" | "member"
}

/**
 * Check if user is authenticated admin
 */
export const isAdminAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getAdminAuthToken()
    const userId = await getAdminUserId()
    return !!(token && userId)
  } catch {
    return false
  }
}

/**
 * Get current admin user
 */
export const getAdminUser = async (): Promise<AdminUser | null> => {
  try {
    const token = await getAdminAuthToken()
    if (!token) return null

    // Check with Medusa backend
    const response = await sdk.client.fetch<{ user: AdminUser }>(
      "/admin/auth",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    )

    return response.user
  } catch (error) {
    console.error("Error fetching admin user:", error)
    return null
  }
}

/**
 * Require admin authentication (use in pages)
 */
export const requireAdmin = async (countryCode: string = "tr") => {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect(`/${countryCode}/admin/login`)
  }

  const user = await getAdminUser()

  if (!user || user.role !== "admin") {
    redirect(`/${countryCode}/admin/login`)
  }

  return user
}

/**
 * Admin login
 */
export const adminLogin = async (data: {
  email: string
  password: string
}): Promise<{ user?: AdminUser; error?: string }> => {
  try {
    const response = await sdk.client.fetch<{ user: AdminUser; token: string }>(
      "/admin/auth",
      {
        method: "POST",
        body: data,
      }
    )

    if (response.token && response.user) {
      await setAdminAuthToken(response.token)
      await setAdminUserId(response.user.id)
    }

    return { user: response.user }
  } catch (error: any) {
    console.error("Admin login error:", error)
    return { error: error.message || "Giriş başarısız" }
  }
}

/**
 * Admin logout
 */
export const adminLogout = async (countryCode: string = "tr") => {
  await removeAdminAuthToken()
  redirect(`/${countryCode}/admin/login`)
}

/**
 * Cookie Management
 */
export const getAdminAuthToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_AUTH_TOKEN)?.value
}

export const setAdminAuthToken = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_AUTH_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export const removeAdminAuthToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_AUTH_TOKEN)
  cookieStore.delete(ADMIN_USER_ID)
}

export const getAdminUserId = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_USER_ID)?.value
}

export const setAdminUserId = async (userId: string) => {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_USER_ID, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}
