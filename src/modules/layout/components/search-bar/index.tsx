"use client"

import { Search } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchQuery("")
    setIsOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const countryCode = pathname.split("/")[1] || "tr"
      router.push(`/${countryCode}/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative flex-1 min-w-0 max-w-2xl lg:mx-8">
      <form onSubmit={handleSearch} className="relative" role="search">
        <label htmlFor="search-input" className="sr-only">Ürün ara</label>
        <input
          id="search-input"
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Ürün, kategori veya marka ara..."
          className="w-full px-3 py-2 pl-10 pr-16 rounded-lg border border-gray-300 focus:outline-none focus:border-[#9865e8] focus:ring-2 focus:ring-[#9865e8]/20 transition-all text-gray-900 placeholder:text-gray-500 text-sm"
          aria-label="Ürün, kategori veya marka ara"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
          aria-hidden="true"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9865e8] text-white px-4 py-1 rounded-md hover:bg-[#8050d0] transition-colors text-sm"
          aria-label="Ara"
        >
          Ara
        </button>
      </form>
    </div>
  )
}
