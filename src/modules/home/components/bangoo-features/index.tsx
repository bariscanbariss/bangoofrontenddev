"use client"

import React from "react"

export default function BangooFeatures() {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="content-container">
        {/* Online Payment Section */}
        <div className="mb-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Video */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/bangoo_order.webm" type="video/webm" />
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Güvenli ve Hızlı Ödeme
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Bangoo sayesinde KKTC&apos;de online alışverişlerinizi güvenli, hızlı ve pratik bir şekilde yapabilirsiniz. Tek tıkla ödeme, anında onay ve sorunsuz alışveriş deneyimi artık elinizin altında.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-800">SSL Güvenliği</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-800">Anında Onay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fast Delivery Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Hızlı ve Güvenli Teslimat
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Bangoo ile kargolarınız hızlı ve güvenli bir şekilde kapınıza geliyor. Profesyonel kargo hizmetimiz ile siparişleriniz özenle paketlenir ve en kısa sürede adresinize teslim edilir.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-sm font-medium text-orange-800">Hızlı Kargo</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-purple-800">Güvenli Paketleme</span>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/bangoo_cargo.webm" type="video/webm" />
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
