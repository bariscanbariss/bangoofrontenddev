import { Suspense } from "react"
import { Heart, ShoppingCart, User } from "lucide-react"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchBar from "@modules/layout/components/search-bar"
import CategoriesNav from "@modules/layout/components/categories-nav"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Main Navbar */}
      <header className="relative mx-auto bg-[#9865e8] text-white overflow-hidden">
        <div className="content-container">
          {/* Desktop Layout: Logo, Search, Icons in one row */}
          <nav className="hidden lg:flex items-center justify-between w-full h-24 gap-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <LocalizedClientLink
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity"
                data-testid="nav-store-link"
                aria-label="Bangoo Ana Sayfa"
              >
                <Image
                  src="/logo.svg"
                  alt="Bangoo - Türkiye'nin Online Alışveriş Sitesi"
                  width={280}
                  height={80}
                  className="h-20 w-auto"
                  priority
                />
              </LocalizedClientLink>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Right Side: Login, Favorites, Cart */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <LocalizedClientLink
                className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                href="/account"
                data-testid="nav-account-link"
                aria-label="Hesabım"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Giriş Yap</span>
              </LocalizedClientLink>

              <LocalizedClientLink
                className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                href="/account/favorites"
                data-testid="nav-favorites-link"
                aria-label="Favorilerim"
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm">Favorilerim</span>
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                    href="/cart"
                    data-testid="nav-cart-link"
                    aria-label="Sepetim"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-sm">Sepetim</span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>

          {/* Mobile & Tablet Layout: Trendyol style */}
          <div className="lg:hidden">
            {/* Top Row: Logo and Icons */}
            <div className="flex items-center justify-between">
              {/* Logo - 7rem height for mobile/tablet */}
              <LocalizedClientLink
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity"
                data-testid="nav-store-link"
                aria-label="Bangoo Ana Sayfa"
              >
                <Image
                  src="/logo.svg"
                  alt="Bangoo - Türkiye'nin Online Alışveriş Sitesi"
                  width={280}
                  height={80}
                  className="h-28 w-auto"
                  priority
                />
              </LocalizedClientLink>

              {/* Icons - Right aligned */}
              <div className="flex items-center gap-5">
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

            {/* Bottom Row: Full width Search Bar - No padding between */}
            <div className="pb-3">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <CategoriesNav />
    </div>
  )
}
