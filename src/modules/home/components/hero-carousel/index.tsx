"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Kış İndirimleri Başladı!",
    subtitle: "%70'e Varan İndirimler",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    image: "/banners/winter-sale.jpg",
    link: "/kampanyalar/kis-indirimleri",
    cta: "Alışverişe Başla",
  },
  {
    id: 2,
    title: "Yeni Sezon Elektronik",
    subtitle: "En Yeni Teknoloji Ürünleri",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
    image: "/banners/electronics.jpg",
    link: "/categories/elektronik",
    cta: "Keşfet",
  },
  {
    id: 3,
    title: "Ücretsiz Kargo",
    subtitle: "Tüm Siparişlerde!",
    bgColor: "bg-gradient-to-r from-orange-600 to-red-600",
    image: "/banners/free-shipping.jpg",
    link: "/",
    cta: "Detaylar",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href={slide.link} className="block w-full h-full">
            <div className={`w-full h-full ${slide.bgColor} relative`}>
              {/* Content Container */}
              <div className="content-container h-full">
                <div className="flex flex-col md:flex-row items-center justify-between h-full py-12 md:py-16">
                  {/* Text Content */}
                  <div className="flex-1 text-white z-10 text-center md:text-left space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium opacity-90">
                      {slide.subtitle}
                    </p>
                    <button className="mt-6 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block">
                      {slide.cta}
                    </button>
                  </div>

                  {/* Optional: Image placeholder */}
                  <div className="flex-1 hidden md:flex items-center justify-center">
                    <div className="w-72 h-72 lg:w-96 lg:h-96 relative">
                      {/* You can add actual images here */}
                      <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-8xl">
                          {index === 0 ? "🎁" : index === 1 ? "📱" : "🚚"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Önceki slayt"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
        aria-label="Sonraki slayt"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Slayt ${index + 1}'e git`}
          />
        ))}
      </div>
    </div>
  )
}
