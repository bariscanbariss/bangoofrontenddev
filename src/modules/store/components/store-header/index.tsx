"use client"

import { Store } from "@lib/data/stores"
import { Building2, Verified } from "lucide-react"
import Image from "next/image"

type Props = {
  store: Store
}

export default function StoreHeader({ store }: Props) {
  return (
    <div className="relative">
      {/* Cover Photo - dynamically from backend store.cover_url (metadata) */}
      <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-2xl">
        {store.cover_url ? (
          <Image
            src={store.cover_url}
            alt={`${store.name} kapak fotografi`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        )}

        {/* Glassmorphism overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Store Logo - dynamically from backend store.logo_url (metadata) */}
      <div className="absolute -bottom-12 left-6 sm:left-8">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />

          {/* Logo container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl border-4 border-white bg-white shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
            {store.logo_url ? (
              <Image
                src={store.logo_url}
                alt={`${store.name} logosu`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100">
                <Building2 size={40} className="text-violet-500" />
              </div>
            )}
          </div>

          {/* Verified badge - from backend metadata */}
          {store.metadata?.verified && (
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Verified size={16} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
