import { Suspense } from "react"
import { Heart, ShoppingCart, User } from "lucide-react"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchBar from "@modules/layout/components/search-bar"
import CategoriesNav from "@modules/layout/components/categories-nav"
import UserMenu from "@modules/layout/components/user-menu"
import { retrieveCustomer } from "@lib/data/customer"

export default async function Nav() {
  const customer = await retrieveCustomer().catch(() => null)
  return (
    <div className="sticky top-0 z-[100] bg-white">
      {/* Main Navbar - Always Sticky */}
      <header className="bg-[#9865e8] text-white shadow-lg relative z-50">
        <div className="content-container">
          {/* Desktop Layout */}
          <nav className="hidden lg:flex items-center justify-between w-full h-16 gap-6">
            {/* Logo */}
            <LocalizedClientLink
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
              data-testid="nav-store-link"
              aria-label="Bangoo Ana Sayfa"
            >
              <Image
                src="/logo.svg"
                alt="Bangoo"
                width={400}
                height={100}
                className="h-32 w-auto"
                priority
              />
            </LocalizedClientLink>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <SearchBar />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <UserMenu customer={customer} countryCode="tr" />

              <LocalizedClientLink
                className="flex flex-col items-center hover:opacity-80 transition-opacity"
                href="/account/favorites"
                data-testid="nav-favorites-link"
                aria-label="Favorilerim"
              >
                <Heart className="w-5 h-5 mb-0.5" />
                <span className="text-xs">Favorilerim</span>
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex flex-col items-center hover:opacity-80 transition-opacity"
                    href="/cart"
                    data-testid="nav-cart-link"
                    aria-label="Sepetim"
                  >
                    <ShoppingCart className="w-5 h-5 mb-0.5" />
                    <span className="text-xs">Sepetim</span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>

          {/* Mobile Layout */}
          <div className="lg:hidden py-3">
            <div className="flex items-center justify-between mb-3">
              {/* Logo */}
              <LocalizedClientLink
                href="/"
                className="flex items-center hover:opacity-90 transition-opacity"
                data-testid="nav-store-link"
                aria-label="Bangoo Ana Sayfa"
              >
                <Image
                  src="/logo.svg"
                  alt="Bangoo"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </LocalizedClientLink>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <LocalizedClientLink
                  className="flex items-center hover:opacity-80 transition-opacity"
                  href="/account"
                  data-testid="nav-account-link"
                  aria-label="Hesabım"
                >
                  <User className="w-6 h-6" />
                </LocalizedClientLink>

                <LocalizedClientLink
                  className="flex items-center hover:opacity-80 transition-opacity"
                  href="/account/favorites"
                  data-testid="nav-favorites-link"
                  aria-label="Favorilerim"
                >
                  <Heart className="w-6 h-6" />
                </LocalizedClientLink>

                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex items-center hover:opacity-80 transition-opacity"
                      href="/cart"
                      data-testid="nav-cart-link"
                      aria-label="Sepetim"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Categories Navigation - Below main nav with relative positioning */}
      <div className="relative">
        <CategoriesNav />
      </div>
    </div>
  )
}
