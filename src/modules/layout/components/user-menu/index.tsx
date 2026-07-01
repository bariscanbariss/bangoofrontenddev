"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  User,
  ChevronDown,
  Settings,
  Package,
  Heart,
  MapPin,
  LogOut,
  MessageSquare,
  Gift,
  Clock,
  Shield,
  Truck,
  Bot
} from "lucide-react"
import { signout } from "@lib/data/customer"

type UserMenuProps = {
  customer: {
    id: string
    first_name?: string
    last_name?: string
    email: string
  } | null
}

const menuItems = [
  { href: "/account", label: "Profilim", icon: User },
  { href: "/account/orders", label: "Siparişlerim", icon: Package },
  { href: "/account/addresses", label: "Konumum", icon: MapPin },
  { href: "/account/favorites", label: "Favorilerim", icon: Heart },
  { href: "/account/coupons", label: "İndirim Kuponları", icon: Gift },
  { href: "/account/recently-viewed", label: "Öncece Gezdiklerim", icon: Clock },
  { href: "/account/shipments", label: "Kargom", icon: Truck },
  { href: "/account/messages", label: "Satıcı Mesajlarım", icon: MessageSquare },
  { href: "/account/assistant", label: "Bangoo Asistan", icon: Bot },
  { href: "/account/security", label: "Güvenlik", icon: Shield },
  { href: "/account/settings", label: "Ayarlar", icon: Settings },
]

export default function UserMenu({ customer, countryCode }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signout(countryCode)
  }

  // Guest state - show login button
  if (!customer) {
    return (
      <Link
        className="flex flex-col items-center hover:opacity-80 transition-opacity"
        href={`/${countryCode}/account`}
        data-testid="nav-account-link"
        aria-label="Giriş Yap"
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-xs">Giriş Yap</span>
      </Link>
    )
  }

  // Logged in state - show dropdown
  const displayName = customer.first_name
    ? `${customer.first_name} ${customer.last_name?.charAt(0) || ""}`.trim()
    : "Hesabım"

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center hover:opacity-80 transition-opacity"
        data-testid="nav-account-link"
        aria-label="Profilim"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1">
          <User className="w-5 h-5" />
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
        <span className="text-xs">Profilim</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          data-testid="user-menu-dropdown"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-900 truncate">
              {customer.first_name} {customer.last_name}
            </p>
            <p className="text-sm text-gray-500 truncate">{customer.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={`/${countryCode}${item.href}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">{isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
