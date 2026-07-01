"use client"

import { useState } from "react"
import { Store, StoreCampaign } from "@lib/data/stores"
import StoreHeader from "@modules/store/components/store-header"
import StoreInfo from "@modules/store/components/store-info"
import StoreTabs, { TabType } from "@modules/store/components/store-tabs"
import StoreProducts from "@modules/store/components/store-products"
import StoreCampaigns from "@modules/store/components/store-campaigns"
import StoreDiscounts from "@modules/store/components/store-discounts"
import StoreCategories from "@modules/store/components/store-categories"
import StoreReviews from "@modules/store/components/store-reviews"

type Props = {
  store: Store
  initialProducts: any[]
  productCount: number
  activeTab?: TabType
  countryCode: string
  campaigns?: StoreCampaign[]
  campaignCount?: number
  reviewCount?: number
}

export default function StoreProfileTemplate({
  store,
  initialProducts,
  productCount,
  activeTab = "products",
  countryCode,
  campaigns = [],
  campaignCount = 0,
  reviewCount = 0,
}: Props) {
  const [tab, setTab] = useState<TabType>(activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="content-container py-6 sm:py-8">
        {/* Header - cover photo and logo from backend */}
        <StoreHeader store={store} />

        {/* Store info - all dynamic from backend */}
        <StoreInfo store={store} countryCode={countryCode} />

        {/* Tabs navigation */}
        <StoreTabs
          activeTab={tab}
          onTabChange={setTab}
          productCount={productCount}
          campaignCount={campaignCount}
          reviewCount={reviewCount}
        />

        {/* Tab content - all data from backend */}
        <div className="mt-8">
          {tab === "products" && (
            <StoreProducts
              storeId={store.id}
              countryCode={countryCode}
              initialProducts={initialProducts}
              initialCount={productCount}
            />
          )}

          {tab === "campaigns" && (
            <StoreCampaigns
              campaigns={campaigns}
              countryCode={countryCode}
            />
          )}

          {tab === "discounts" && (
            <StoreDiscounts
              storeId={store.id}
              countryCode={countryCode}
            />
          )}

          {tab === "categories" && (
            <StoreCategories
              storeId={store.id}
              storeHandle={store.handle || store.id}
              countryCode={countryCode}
            />
          )}

          {tab === "reviews" && (
            <StoreReviews
              storeHandle={store.handle || store.id}
              initialReviews={[]}
              totalCount={reviewCount}
              averageRating={store.rating || 0}
            />
          )}

          {tab === "about" && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Magaza Hakkinda
                </h2>
                {store.description ? (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {store.description}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">
                    Bu magaza henuz bir aciklama eklemedi.
                  </p>
                )}

                {store.created_at && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Katilim Tarihi:</span>{" "}
                      {new Date(store.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}

                {store.metadata?.verified && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium text-blue-700">
                      Onayli Magaza
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
