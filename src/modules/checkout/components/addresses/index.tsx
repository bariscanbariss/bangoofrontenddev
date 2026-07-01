"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="flex flex-row text-2xl font-bold text-gray-900 gap-x-2 items-baseline">
          Teslimat Adresi
          {!isOpen && <CheckCircleSolid />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <span className="text-base">
            <button
              onClick={handleEdit}
              className="text-[#9865e8] hover:text-[#7d4fd1] font-medium transition-colors"
              data-testid="edit-address-button"
            >
              Düzenle
            </button>
          </span>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 pb-6 pt-8">
                  Fatura Adresi
                </h2>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6 w-full" data-testid="submit-address-button">
              Kargoya Devam Et
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <p className="text-base font-medium text-gray-900 mb-1">
                      Teslimat Adresi
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </p>
                  </div>

                  <div
                    className="flex flex-col w-1/3 "
                    data-testid="shipping-contact-summary"
                  >
                    <p className="text-base font-medium text-gray-900 mb-1">
                      İletişim
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.shipping_address.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      {cart.email}
                    </p>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <p className="text-base font-medium text-gray-900 mb-1">
                      Fatura Adresi
                    </p>

                    {sameAsBilling ? (
                      <p className="text-sm text-gray-600">
                        Fatura ve teslimat adresi aynı.
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
