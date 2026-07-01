"use client"

import { submitSupportTicket } from "@lib/data/support"
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 bg-[#9865e8] text-white font-semibold rounded-lg
                 transition-all duration-300 ease-in-out
                 hover:bg-[#7d4fd1] hover:shadow-lg hover:scale-105
                 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:scale-100"
    >
      {pending ? "Gönderiliyor..." : "Mesaj Gönder"}
    </button>
  )
}

export default function MusteriHizmetleriPage() {
  const [state, formAction] = useActionState(submitSupportTicket, null)

  useEffect(() => {
    if (state?.success) {
      // Form başarılı olduğunda formu temizle
      const form = document.getElementById("contact-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
    }
  }, [state])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#9865e8] mb-4">
            Müşteri Hizmetleri
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Size yardımcı olmak için buradayız. Sorularınız, önerileriniz veya
            şikayetleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* İletişim Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            {/* E-posta */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#9865e8] bg-opacity-10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-[#9865e8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">E-posta</h3>
                  <a
                    href="mailto:destek@bangoo.com"
                    className="text-[#9865e8] hover:text-[#7d4fd1] transition-colors"
                  >
                    destek@bangoo.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    7/24 e-posta desteği
                  </p>
                </div>
              </div>
            </div>

            {/* Telefon */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#9865e8] bg-opacity-10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-[#9865e8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
                  <a
                    href="tel:+908501234567"
                    className="text-[#9865e8] hover:text-[#7d4fd1] transition-colors"
                  >
                    0850 123 45 67
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Hafta içi 09:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Canlı Destek - Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-gray-300 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Canlı Destek
                  </h3>
                  <p className="text-sm text-gray-500">
                    Yakında aktif olacak
                  </p>
                  <button
                    disabled
                    className="mt-2 text-sm bg-gray-200 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
                  >
                    Çok Yakında
                  </button>
                </div>
              </div>
            </div>

            {/* SSS Link */}
            <LocalizedClientLink href="/yardim/sss">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-[#9865e8] bg-opacity-10 p-3 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-[#9865e8]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Sıkça Sorulan Sorular
                    </h3>
                    <p className="text-sm text-gray-500">
                      Aradığınız cevap burada olabilir
                    </p>
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          </div>

          {/* İletişim Formu */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Bize Yazın
              </h2>

              {state?.success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="font-semibold">Başarılı!</p>
                  <p>{state.message}</p>
                  {state.ticketId && (
                    <p className="text-sm mt-1">
                      Talep Numaranız: {state.ticketId}
                    </p>
                  )}
                </div>
              )}

              {state?.success === false && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-semibold">Hata!</p>
                  <p>{state.message}</p>
                </div>
              )}

              <form id="contact-form" action={formAction} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9865e8] focus:border-transparent transition-all"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                {/* E-posta */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9865e8] focus:border-transparent transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>

                {/* Telefon (Opsiyonel) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9865e8] focus:border-transparent transition-all"
                    placeholder="0555 123 45 67"
                  />
                </div>

                {/* Konu */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9865e8] focus:border-transparent transition-all"
                  >
                    <option value="">Bir konu seçin</option>
                    <option value="Sipariş Takibi">Sipariş Takibi</option>
                    <option value="İade ve Değişim">İade ve Değişim</option>
                    <option value="Ürün Hakkında Soru">
                      Ürün Hakkında Soru
                    </option>
                    <option value="Ödeme Sorunları">Ödeme Sorunları</option>
                    <option value="Kargo Sorunları">Kargo Sorunları</option>
                    <option value="Hesap İşlemleri">Hesap İşlemleri</option>
                    <option value="Öneri ve Şikayet">Öneri ve Şikayet</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                {/* Mesaj */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9865e8] focus:border-transparent transition-all resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <SubmitButton />
              </form>
            </div>
          </div>
        </div>

        {/* Ek Bilgi */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Çalışma Saatlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Müşteri Hizmetleri
              </h3>
              <p className="text-gray-600">Hafta içi: 09:00 - 18:00</p>
              <p className="text-gray-600">Cumartesi: 10:00 - 16:00</p>
              <p className="text-gray-600">Pazar: Kapalı</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                E-posta Desteği
              </h3>
              <p className="text-gray-600">
                E-posta desteğimiz 7/24 aktiftir.
              </p>
              <p className="text-gray-600">
                Mesajlarınıza en geç 24 saat içinde dönüş yapıyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
