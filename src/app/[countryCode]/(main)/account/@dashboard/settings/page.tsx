import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import { Settings, Bell, Globe, Moon, Sun, Palette, Volume2, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Ayarlar | Bangoo",
  description: "Hesap ayarlarinizi yonetin.",
}

export default async function SettingsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const customer = await retrieveCustomer()

  const settingSections = [
    {
      title: "Bildirimler",
      icon: Bell,
      items: [
        { label: "E-posta Bildirimleri", description: "Siparis ve kampanya bildirimleri", enabled: true },
        { label: "SMS Bildirimleri", description: "Kargo ve siparis durumu", enabled: false },
        { label: "Push Bildirimleri", description: "Tarayici bildirimleri", enabled: true },
      ],
    },
    {
      title: "Goruntu",
      icon: Palette,
      items: [
        { label: "Karanlik Mod", description: "Koyu tema kullanin", enabled: false },
        { label: "Buyuk Yazi", description: "Yazi boyutunu artirin", enabled: false },
      ],
    },
    {
      title: "Gizlilik",
      icon: Eye,
      items: [
        { label: "Profil Gizliligi", description: "Profilinizi gizli yapin", enabled: false },
        { label: "Alisveris Gecmisi", description: "Gecmisi kaydet", enabled: true },
      ],
    },
    {
      title: "Dil ve Bolge",
      icon: Globe,
      items: [
        { label: "Dil", description: "Turkce", enabled: true },
        { label: "Para Birimi", description: "TRY (Turk Lirasi)", enabled: true },
      ],
    },
  ]

  return (
    <div className="w-full" data-testid="settings-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Ayarlar</h1>
        <p className="text-base-regular text-gray-600">
          Hesap tercihlerinizi ve ayarlarinizi buradan yonetebilirsiniz.
        </p>
      </div>

      <div className="space-y-8">
        {settingSections.map((section, sIdx) => {
          const SectionIcon = section.icon

          return (
            <div key={sIdx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Section Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-100 rounded-lg">
                    <SectionIcon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                </div>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-gray-50">
                {section.items.map((item, iIdx) => (
                  <div key={iIdx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                        item.enabled
                          ? "bg-gradient-to-r from-violet-500 to-purple-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                          item.enabled ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200">
        <h3 className="font-semibold text-red-800 mb-2">Tehlikeli Bolge</h3>
        <p className="text-sm text-red-600 mb-4">
          Bu islemler geri alinamaz. Lutfen dikkatli olun.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-100 transition-colors">
            Hesabimi Dondur
          </button>
          <button className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg hover:bg-red-200 transition-colors">
            Hesabimi Sil
          </button>
        </div>
      </div>
    </div>
  )
}
