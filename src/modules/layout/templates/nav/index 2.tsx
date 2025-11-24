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
      <header className="relative h-16 sm:h-20 md:h-24 mx-auto bg-[#9865e8] text-white overflow-hidden">
        <nav className="content-container flex items-center justify-between w-full h-full px-3 sm:px-4 md:px-6 gap-2 sm:gap-4">
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
                className="h-8 w-auto sm:h-12 md:h-16 lg:h-20"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Side: Login, Favorites, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
            <LocalizedClientLink
              className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
              href="/account"
              data-testid="nav-account-link"
              aria-label="Hesabım"
            >
              <User className="w-5 h-5 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline text-sm">Giriş Yap</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
              href="/account/favorites"
              data-testid="nav-favorites-link"
              aria-label="Favorilerim"
            >
              <Heart className="w-5 h-5 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline text-sm">Favorilerim</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label="Sepetim"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span className="hidden lg:inline text-sm">Sepetim</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>

      {/* Categories Navigation */}
      <CategoriesNav />
    </div>
  )
}
