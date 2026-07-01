"use client"

import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Store, Heart, Star, Truck } from "lucide-react"
import { useState, useEffect, useMemo } from "react"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct & {
    store?: { id: string; name: string; handle: string; rating?: number }
  }
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const [isMounted, setIsMounted] = useState(false)
  const [randomRating, setRandomRating] = useState('4.5')
  const [randomFavorites, setRandomFavorites] = useState(25000)
  const [randomReviews, setRandomReviews] = useState(20000)
  const [showShipping, setShowShipping] = useState(true)
  const [showDiscount, setShowDiscount] = useState(true)

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setRandomRating((4.0 + Math.random() * 1).toFixed(1))
    setRandomFavorites(Math.floor(Math.random() * 50000) + 1000)
    setRandomReviews(Math.floor(Math.random() * 40000) + 1000)
    setShowShipping(Math.random() > 0.3)
    setShowDiscount(Math.random() > 0.5)
  }, [])

  const messages1 = [
    <div key="msg1-0" className="flex items-center gap-1 text-xs text-gray-600">
      <span>🚚</span>
      <span className="text-orange-500 font-medium">Hızlı teslimat</span>
    </div>,
    <div key="msg1-1" className="flex items-center gap-1 text-xs text-gray-600">
      <span>👁️</span>
      <span>24 saatte </span>
      <span className="text-orange-500 font-medium">19k kişi inceledi</span>
    </div>,
    <div key="msg1-2" className="flex items-center gap-1 text-xs text-gray-600">
      <span>🛒</span>
      <span>10k kişinin </span>
      <span className="text-orange-500 font-medium">sepetinde</span>
    </div>,
    <div key="msg1-3" className="flex items-center gap-1 text-xs text-[#9865e8] font-medium">
      <Heart className="w-3 h-3 fill-[#9865e8]" />
      <span>{(randomFavorites / 1000).toFixed(0)}k kişi favoriledi!</span>
    </div>,
  ]

  const messages2 = [
    <div key="msg2-2" className="flex items-center gap-1 text-xs text-gray-600">
      <span>📉</span>
      <span className="text-red-600 font-medium">Son 10 günün en düşük fiyatı</span>
    </div>,
    <div key="msg2-3" className="flex items-center gap-1 text-xs text-gray-600">
      <span>🎟️</span>
      <span className="text-pink-500 font-medium">Kupon Fırsatı</span>
    </div>,
    <div key="msg2-4" className="flex items-center gap-1 text-xs text-gray-600">
      <span>💰</span>
      <span className="text-pink-500 font-medium">50 TL Kupon</span>
    </div>,
    <div key="msg2-5" className="flex items-center gap-1 text-xs text-gray-600">
      <span>🔥</span>
      <span className="font-medium">3 Al 2 Öde</span>
    </div>,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % Math.max(messages1.length, messages2.length))
        setIsAnimating(false)
      }, 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col" style={{ minHeight: '420px' }}>
      {/* EN ÇOK SATAN Badge - Sol Üst */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-20">
          <div className="bg-[#9865e8] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-md leading-tight text-center">
            EN ÇOK<br />SATAN
          </div>
        </div>
      )}

      {/* AVANTAJLI ÜRÜN Badge - Sol Üst (alternatif) */}
      {!isFeatured && Math.random() > 0.5 && (
        <div className="absolute top-2 left-2 z-20">
          <div className="bg-[#9865e8] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            AVANTAJLI<br />ÜRÜN
          </div>
        </div>
      )}

      {/* Favorilere Ekle - Sağ Üst */}
      <button 
        className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        onClick={(e) => {
          e.preventDefault()
          // Favori ekleme fonksiyonu
        }}
        aria-label="Favorilere ekle"
      >
        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      <LocalizedClientLink href={`/products/${product.handle}`} className="flex flex-col h-full">
        <div data-testid="product-wrapper" className="p-3 flex flex-col h-full">
          {/* Ürün Resmi - Sabit Alan */}
          <div className="relative aspect-square mb-3">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
            {/* En Çok Satan 1. Ürün Etiketi - Resim İçinde, En Altta */}
            {isFeatured && (
              <div className="absolute bottom-0 left-0 right-0 bg-[#9865e8] text-white text-xs font-bold px-3 py-1.5 rounded text-center">
                ◎ En Çok Satan 1. Ürün
              </div>
            )}
          </div>
          
          {/* İçerik Alanı - Sabit Yapı */}
          <div className="flex flex-col space-y-1">
            {/* Ürün Başlığı - Sabit Yükseklik */}
            <div className="h-10">
              <Text className="text-sm text-gray-800 line-clamp-2" data-testid="product-title">
                {product.title}
              </Text>
            </div>

            {/* Cycling Messages 1 - Sabit Yükseklik */}
            <div className="h-5 flex items-center overflow-hidden">
              <div 
                className={`flex items-center transition-all duration-600 ease-in-out ${
                  isAnimating 
                    ? 'transform translate-x-6 opacity-0' 
                    : 'transform translate-x-0 opacity-100'
                }`}
              >
                {messages1[currentMessageIndex % messages1.length]}
              </div>
            </div>

            {/* Rating ve Yorum Sayısı - Sabit Yükseklik */}
            <div className="h-5 flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-600 font-medium">{randomRating}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(parseFloat(randomRating)) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-400">
                ({isMounted ? randomReviews.toLocaleString('tr-TR') : randomReviews})
              </span>
            </div>

            {/* Cycling Messages 2 - Sabit Yükseklik */}
            <div className="h-5 flex items-center overflow-hidden">
              <div 
                className={`flex items-center transition-all duration-600 ease-in-out ${
                  isAnimating 
                    ? 'transform translate-x-6 opacity-0' 
                    : 'transform translate-x-0 opacity-100'
                }`}
              >
                {messages2[currentMessageIndex % messages2.length]}
              </div>
            </div>

            {/* Fiyat - Sabit Yükseklik */}
            <div className="h-8 flex items-end pt-1">
              {cheapestPrice && (
                <PreviewPrice price={cheapestPrice} />
              )}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
