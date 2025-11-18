import { Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-[#9865e8]">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-0 small:p-32">
        <div className="logo-breathing">
          <Image
            src="/logo.svg"
            alt="Bangoo Logo"
            width={200}
            height={200}
            className="w-32 h-32 small:w-48 small:h-48 medium:w-56 medium:h-56"
            priority
          />
        </div>
        <span className="space-y-2 -mt-2">
          <Heading
            level="h1"
            className="text-4xl leading-12 text-white font-bold"
          >
            Kuzey Kıbrıs'ın Online Alışveriş Platformu
          </Heading>
          <Heading
            level="h2"
            className="text-xl leading-8 text-white/90 font-normal max-w-2xl"
          >
            Binlerce ürün, güvenli ödeme, hızlı teslimat. Teknolojiden modaya, elektroniğe, ev & yaşama her şey Bangoo'da!
          </Heading>
        </span>
      </div>
    </div>
  )
}

export default Hero
