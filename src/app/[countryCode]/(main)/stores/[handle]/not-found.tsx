import Link from "next/link"
import { Store, ArrowLeft } from "lucide-react"

export default function StoreNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
          <Store size={40} className="text-violet-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Mağaza Bulunamadı
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Aradığınız mağaza bulunamadı veya artık mevcut değil.
          Lütfen URL'yi kontrol edin veya diğer mağazalarımıza göz atın.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            <ArrowLeft size={18} />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
