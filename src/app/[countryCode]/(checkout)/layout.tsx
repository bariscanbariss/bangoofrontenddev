import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Image from "next/image"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-20 md:h-24 bg-[#9865e8]">
        <nav className="flex h-full items-center content-container justify-between px-4">
          <LocalizedClientLink
            href="/cart"
            className="text-white flex items-center gap-x-2 hover:opacity-80 transition-opacity"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={20} />
            <span className="mt-px hidden small:block font-medium">
              Sepete Dön
            </span>
            <span className="mt-px block small:hidden font-medium">
              Geri
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            data-testid="store-link"
            aria-label="Bangoo Ana Sayfa"
          >
            <Image
              src="/logo.svg"
              alt="Bangoo"
              width={200}
              height={60}
              className="h-12 w-auto sm:h-14 md:h-16"
              priority
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
