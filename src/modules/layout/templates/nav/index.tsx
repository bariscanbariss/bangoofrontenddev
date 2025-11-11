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
      <header className="relative h-20 md:h-24 mx-auto bg-[#9865e8] text-white">
        <nav className="content-container flex items-center justify-between w-full h-full px-4">
          {/* Logo */}
          <div className="flex items-center min-w-[200px] sm:min-w-[240px] md:min-w-[280px]">
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
                className="h-14 w-auto sm:h-16 md:h-18 lg:h-20 max-w-full"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Side: Login, Favorites, Cart */}
          <div className="flex items-center gap-6">
            <LocalizedClientLink
              className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
              href="/account"
              data-testid="nav-account-link"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Giriş Yap</span>
            </LocalizedClientLink>

            <LocalizedClientLink
              className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
              href="/account/favorites"
              data-testid="nav-favorites-link"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden md:inline">Favorilerim</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden md:inline">Sepetim</span>
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
