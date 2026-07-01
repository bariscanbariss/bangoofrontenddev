"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("customers")),
    }

    return await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })

    await setAuthToken(token as string)

    const headers = {
      ...(await getAuthHeaders()),
    }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      customerForm,
      {},
      headers
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password,
    })

    await setAuthToken(loginToken as string)

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    await transferCart()

    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") === "on"

  try {
    await sdk.auth
      .login("customer", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string, remember)
        const customerCacheTag = await getCacheTag("customers")
        revalidateTag(customerCacheTag)
      })
  } catch (error: any) {
    return error.toString()
  }

  try {
    await transferCart()
  } catch (error: any) {
    return error.toString()
  }
}

export async function loginWithGoogle(countryCode: string = 'tr') {
  try {
    console.log("Starting Google OAuth flow with country code:", countryCode)

    // Medusa 2.12.5 SDK ile Google OAuth başlat
    // SDK session-based authentication kullanıyor
    const result = await sdk.auth.login("customer", "google", {})

    console.log("SDK auth.login result:", result)

    // SDK bir location URL döner (Google'a redirect için)
    if (result && typeof result === "object" && "location" in result) {
      console.log("Got location URL for Google redirect:", result.location)
      return { success: true, url: result.location }
    }

    // Zaten authenticate olmuş
    console.log("Already authenticated")
    return { success: true, authenticated: true }
  } catch (error: any) {
    console.error("Google login error:", error)
    return { success: false, error: error.toString() }
  }
}

export async function handleGoogleCallback(params: { code: string; state?: string }) {
  try {
    console.log("Processing Google callback with params:", params)

    const { code, state } = params

    if (!code) {
      console.error("Code missing in params!")
      return { success: false, error: "No code provided in callback parameters" }
    }

    // Medusa 2.12.5 SDK ile callback'i validate et
    // SDK otomatik olarak token'ı yönetir (session cookie)
    await sdk.auth.callback("customer", "google", {
      code,
      state: state || ''
    })

    console.log("Callback validation successful")

    // Cache'i temizle
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    // Kullanıcı bilgilerini çek
    const customer = await retrieveCustomer()

    // Setup tamamlanmış mı kontrol et (metadata'dan)
    const isSetupCompleted = customer?.metadata?.is_setup_completed === true

    // Yeni kullanıcı veya setup tamamlanmamış kullanıcı
    const needsSetup = !isSetupCompleted || !customer?.first_name || !customer?.last_name

    // Cart'ı transfer et
    await transferCart()

    return { success: true, isNewUser: needsSetup }
  } catch (error: any) {
    console.error("Google callback error:", error)
    return { success: false, error: error.toString() }
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function completeGoogleProfile(
  _currentState: unknown,
  formData: FormData
) {
  try {
    const profileData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      metadata: {
        is_setup_completed: true
      }
    }

    // Boş alanları kontrol et
    if (!profileData.first_name || !profileData.last_name) {
      return "Ad ve Soyad alanları zorunludur."
    }

    const headers = {
      ...(await getAuthHeaders()),
    }

    // Profil bilgilerini güncelle ve setup'ı tamamlandı olarak işaretle
    await sdk.store.customer.update(profileData, {}, headers)

    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    return { success: true }
  } catch (error: any) {
    console.error("Profile completion error:", error)
    return error.toString()
  }
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
