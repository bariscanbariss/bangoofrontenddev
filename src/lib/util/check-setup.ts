"use server"

import { retrieveCustomer } from "@lib/data/customer"
import { redirect } from "next/navigation"

/**
 * Checks if the authenticated user has completed their profile setup.
 * Redirects to setup page if not completed.
 * Returns customer if setup is completed.
 */
export async function requireSetupCompleted(countryCode: string) {
  const customer = await retrieveCustomer()

  if (!customer) {
    // Not authenticated, redirect to login
    redirect(`/${countryCode}/account`)
  }

  const isSetupCompleted = customer.metadata?.is_setup_completed === true
  const hasBasicInfo = customer.first_name && customer.last_name

  if (!isSetupCompleted || !hasBasicInfo) {
    // Setup not completed, redirect to setup page
    redirect(`/${countryCode}/auth/google/setup`)
  }

  return customer
}
