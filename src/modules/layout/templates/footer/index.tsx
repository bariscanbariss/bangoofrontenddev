import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export default async function Footer() {
  return (
    <footer className="border-t border-gray-200 w-full bg-white">
      <div className="content-container flex flex-col w-full">
        {/* Logo */}
        <div className="py-8 border-b border-gray-200">
          <LocalizedClientLink
            href="/"
            className="inline-block hover:opacity-80 transition-opacity"
            aria-label="Bangoo Ana Sayfa"
          >
            <div className="text-[#9865e8]" style={{ color: '#9865e8' }}>
              <Image
                src="/logo.svg"
                alt="Bangoo - Türkiye'nin Online Alışveriş Platformu"
                width={320}
                height={96}
                className="h-20 w-auto sm:h-24 md:h-28 lg:h-32"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1829%) hue-rotate(234deg) brightness(93%) contrast(91%)'
                }}
              />
            </div>
          </LocalizedClientLink>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Biz Kimiz Section */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-[#9865e8] font-semibold mb-2">Kurumsal</h3>
            <LocalizedClientLink
              href="/biz-kimiz"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Biz Kimiz
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/kariyer"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Kariyer
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/surdurulebilirlik"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Sürdürülebilirlik
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/iletisim"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              İletişim
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/bangoo-guvenlik"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Bangoo'da Güvenlik
            </LocalizedClientLink>
          </div>

          {/* Kampanya Section */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-[#9865e8] font-semibold mb-2">Kampanya</h3>
            <LocalizedClientLink
              href="/kampanyalar"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Kampanyalar
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/elit-uyelik"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Elit Üyelik
            </LocalizedClientLink>
          </div>

          {/* Satıcı Section */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-[#9865e8] font-semibold mb-2">Satıcı</h3>
            <LocalizedClientLink
              href="/satici/bangoo-da-satis-yap"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Bangoo'da Satış Yap
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/satici/temel-kavramlar"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Temel Kavramlar
            </LocalizedClientLink>
          </div>

          {/* Yardım Section */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-[#9865e8] font-semibold mb-2">Yardım</h3>
            <LocalizedClientLink
              href="/yardim/sss"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Sıkça Sorulan Sorular
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/yardim/canli-yardim"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Canlı Yardım / Asistan
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/yardim/nasil-iade-ederim"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              Nasıl İade Edebilirim
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/yardim/islem-rehberi"
              className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors text-sm"
            >
              İşlem Rehberi
            </LocalizedClientLink>
          </div>

          {/* Sosyal Medya */}
          <div className="flex flex-col gap-y-3">
            <h3 className="text-[#9865e8] font-semibold mb-2">Bizi Takip Edin</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-[#9865e8] hover:text-[#7a4dc7] transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex w-full py-6 border-t border-gray-200 justify-between text-[#9865e8]">
          <p className="text-sm">
            © {new Date().getFullYear()} Bangoo. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
