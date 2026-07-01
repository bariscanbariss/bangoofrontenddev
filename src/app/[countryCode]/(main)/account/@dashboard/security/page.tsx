import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { Shield, Key, Smartphone, Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Guvenlik | Bangoo",
  description: "Hesap guvenlik ayarlarinizi yonetin.",
}

export default async function SecurityPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  const securityItems = [
    {
      icon: Key,
      title: "Sifre Degistir",
      description: "Hesap sifrenizi guncelleyin",
      status: "active",
      action: "Degistir",
      color: "violet",
    },
    {
      icon: Smartphone,
      title: "Iki Faktorlu Dogrulama",
      description: "SMS veya uygulama ile ek guvenlik katmani",
      status: "inactive",
      action: "Etkinlestir",
      color: "amber",
    },
    {
      icon: Lock,
      title: "Giris Gecmisi",
      description: "Son giris yapilan cihaz ve konumlar",
      status: "info",
      action: "Goruntule",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Oturum Yonetimi",
      description: "Aktif oturumlarinizi yonetin",
      status: "active",
      action: "Yonet",
      color: "green",
    },
  ]

  return (
    <div className="w-full" data-testid="security-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Guvenlik</h1>
        <p className="text-base-regular text-gray-600">
          Hesap guvenlik ayarlarinizi buradan yonetebilirsiniz.
        </p>
      </div>

      {/* Security Score */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Guvenlik Puani</h3>
              <p className="text-sm text-gray-600">Hesabiniz temel guvenlik onlemleriyle korunuyor</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">7/10</div>
            <p className="text-xs text-gray-500">Iyi</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" />
        </div>
      </div>

      {/* Security Items */}
      <div className="space-y-4">
        {securityItems.map((item, idx) => {
          const Icon = item.icon
          const colorMap: Record<string, { bg: string; text: string; border: string }> = {
            violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
            amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
            blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
            green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
          }
          const colors = colorMap[item.color]

          return (
            <div
              key={idx}
              className={`p-5 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.status === "active" && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle size={12} />
                      Aktif
                    </span>
                  )}
                  {item.status === "inactive" && (
                    <span className="flex items-center gap-1 text-xs text-amber-600">
                      <AlertTriangle size={12} />
                      Pasif
                    </span>
                  )}
                  <button className={`px-4 py-2 text-sm font-medium rounded-lg ${colors.text} border ${colors.border} hover:shadow-sm transition-all`}>
                    {item.action}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tips */}
      <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Shield size={18} />
          Guvenlik Ipuclari
        </h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            Guclu ve benzersiz bir sifre kullanin (en az 8 karakter)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            Iki faktorlu dogrulamayi aktif edin
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            Sifrenizi duzenli olarak degistirin
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
            Taninmayan cihazlarda oturum acmayin
          </li>
        </ul>
      </div>
    </div>
  )
}
