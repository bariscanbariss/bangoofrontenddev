# Mağaza Profil Sayfaları - MedusaJS Entegrasyonu

## Proje Genel Bakış

Bu doküman, MedusaJS tabanlı multi-vendor (çoklu mağaza) marketplace sisteminin ön yüz ve arka yüz geliştirme gereksinimlerini içermektedir.

---

## 📋 Özellikler

### Mağaza Profil Sayfası Gereksinimleri

1. **Profil Görselleri**
   - Profil resmi (avatar)
   - Kapak fotoğrafı (banner)
   - Görsel yükleme ve düzenleme özellikleri

2. **Ürün Listeleme**
   - Mağazanın sattığı tüm ürünlerin listelenmesi
   - Ürün filtreleme ve sıralama
   - Sayfalama (pagination)

3. **Öne Çıkan Ürünler**
   - Mağaza sahibinin seçtiği ürünleri öne çıkarma
   - Featured/pinned ürün sistemi
   - Sıralama ve yönetim paneli

4. **Değerlendirme ve Yorumlar**
   - Sipariş veren kullanıcılar mağazaya puan verebilir
   - Yorum yapma sistemi
   - Sadece sipariş veren kullanıcılar yorum/puan verebilir
   - Ortalama puan hesaplama

5. **Puan Gösterimi**
   - Mağaza puanı, mağaza adının yanında görüntülenir
   - Yıldız veya sayısal gösterim
   - Toplam değerlendirme sayısı

6. **Mağaza Yönlendirme**
   - Ürün kartlarında mağaza adı görüntülenir
   - Mağaza adına tıklandığında profil sayfasına yönlendirme
   - Hem web hem de mobil uygulamada çalışır

---

## 🎨 Frontend Gereksinimleri

### Mevcut Teknoloji Stack (Proje)
- **Framework:** Next.js 15.3.1 (App Router)
- **React:** 19.0.0-rc
- **TypeScript:** 5.3.2
- **MedusaJS SDK:** @medusajs/js-sdk v2.10.3
- **UI Library:** @medusajs/ui v4.0.31
- **Styling:** TailwindCSS v3.0.23
- **Icons:** lucide-react v0.553.0
- **State Management:** React Server Components + Client Components
- **Ödeme:** Stripe (@stripe/react-stripe-js, @stripe/stripe-js)

### Proje Yapısı
```
src/
├── app/
│   └── [countryCode]/
│       └── (main)/
│           ├── store/              # Mevcut (tüm ürünler)
│           └── stores/             # Yeni eklenecek
│               ├── page.tsx        # Tüm mağazalar listesi
│               └── [slug]/         # Mağaza profil sayfası
│                   ├── page.tsx
│                   └── loading.tsx
├── modules/
│   ├── store/                      # Mevcut (ürün listeleme için)
│   │   ├── components/
│   │   │   └── refinement-list/    # Filtreleme ve sıralama
│   │   └── templates/
│   └── stores/                     # Yeni eklenecek (mağazalar için)
│       ├── components/
│       │   ├── store-header/       # Profil ve kapak fotoğrafı
│       │   ├── store-info/         # Mağaza bilgileri ve puan
│       │   ├── store-tabs/         # Ürünler, Öne Çıkanlar, Yorumlar
│       │   ├── store-products/     # Mağaza ürün listesi
│       │   ├── featured-products/  # Öne çıkan ürünler
│       │   ├── store-reviews/      # Yorumlar bölümü
│       │   ├── review-form/        # Yorum ekleme formu
│       │   └── rating-stars/       # Yıldız gösterimi
│       └── templates/
│           ├── store-profile/      # Ana profil template
│           └── stores-list/        # Mağazalar listesi
└── lib/
    └── data/
        └── stores.ts               # Mevcut (güncellenecek)
```

### Geliştirme Adımları - İlerleme Durumu

#### ✅ 1. Mağaza Veri Modeli (TypeScript Interfaces) - TAMAMLANDI

**src/lib/data/stores.ts** dosyasını genişletin:

```typescript
"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export interface Store {
  id: string
  name: string
  handle: string                    // URL slug için
  description?: string
  logo_url?: string                 // Profil resmi
  cover_url?: string                // Kapak fotoğrafı
  rating?: number                   // Ortalama puan (0-5)
  review_count?: number             // Toplam yorum sayısı
  total_sales?: number              // Toplam satış sayısı
  created_at?: string
  updated_at?: string
}

export interface StoreReview {
  id: string
  store_id: string
  customer_id: string
  order_id: string
  rating: number                    // 1-5 arası
  comment?: string
  verified_purchase: boolean        // Sipariş kontrolü
  created_at: string
  customer?: {
    first_name: string
    last_name: string
  }
}

export interface FeaturedProduct {
  id: string
  store_id: string
  product_id: string
  order: number                     // Sıralama için
}

/**
 * Tüm mağazaları listele
 */
export const listStores = async (query?: {
  limit?: number
  offset?: number
  search?: string
}): Promise<{ stores: Store[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("stores")),
  }

  const limit = query?.limit || 20
  const offset = query?.offset || 0

  try {
    const response = await sdk.client.fetch<{ stores: Store[]; count: number }>(
      "/store/stores",
      {
        query: {
          limit,
          offset,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    return response
  } catch (error) {
    console.error("Error fetching stores:", error)
    return { stores: [], count: 0 }
  }
}

/**
 * Tek bir mağazayı slug ile getir
 */
export const getStoreBySlug = async (slug: string): Promise<Store | null> => {
  const next = {
    ...(await getCacheOptions("stores")),
  }

  try {
    const response = await sdk.client.fetch<{ store: Store }>(
      `/store/stores/${slug}`,
      {
        next,
        cache: "force-cache",
      }
    )
    return response.store
  } catch (error) {
    console.error(`Error fetching store ${slug}:`, error)
    return null
  }
}

/**
 * Mağaza yorumlarını getir
 */
export const getStoreReviews = async (
  storeId: string,
  query?: { limit?: number; offset?: number }
): Promise<{ reviews: StoreReview[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("stores")),
  }

  try {
    const response = await sdk.client.fetch<{
      reviews: StoreReview[]
      count: number
    }>(`/store/stores/${storeId}/reviews`, {
      query,
      next,
      cache: "force-cache",
    })
    return response
  } catch (error) {
    console.error(`Error fetching reviews for store ${storeId}:`, error)
    return { reviews: [], count: 0 }
  }
}

/**
 * Mağazaya yorum ekle
 */
export const createStoreReview = async (
  storeId: string,
  data: {
    order_id: string
    rating: number
    comment?: string
  }
): Promise<{ review: StoreReview } | { error: string }> => {
  try {
    const response = await sdk.client.fetch<{ review: StoreReview }>(
      `/store/stores/${storeId}/reviews`,
      {
        method: "POST",
        body: data,
      }
    )
    return response
  } catch (error: any) {
    console.error("Error creating review:", error)
    return { error: error.message || "Yorum eklenirken hata oluştu" }
  }
}

/**
 * Mağazanın öne çıkan ürünlerini getir
 */
export const getStoreFeaturedProducts = async (
  storeId: string
): Promise<FeaturedProduct[]> => {
  const next = {
    ...(await getCacheOptions("stores")),
  }

  try {
    const response = await sdk.client.fetch<{ featured: FeaturedProduct[] }>(
      `/store/stores/${storeId}/featured`,
      {
        next,
        cache: "force-cache",
      }
    )
    return response.featured
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}
```

#### ✅ 2. Sayfa Komponenti Yapısı (Next.js App Router) - TAMAMLANDI

**Dosya Yapısı:**
```
src/app/[countryCode]/(main)/stores/
├── page.tsx                        # Tüm mağazalar listesi
├── loading.tsx                     # Loading state
└── [slug]/
    ├── page.tsx                    # Mağaza profil sayfası
    └── loading.tsx                 # Loading state
```

#### ✅ 3. Mağazalar Listesi Sayfası - TAMAMLANDI

**src/app/[countryCode]/(main)/stores/page.tsx:**
```typescript
import { Metadata } from "next"
import { listStores } from "@lib/data/stores"
import StoresListTemplate from "@modules/stores/templates/stores-list"

export const metadata: Metadata = {
  title: "Mağazalar | Bangoo",
  description: "Tüm mağazaları keşfedin",
}

type Params = {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StoresPage(props: Params) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { page, search } = searchParams

  const pageNumber = page ? parseInt(page) : 1
  const limit = 20
  const offset = (pageNumber - 1) * limit

  const { stores, count } = await listStores({
    limit,
    offset,
    search,
  })

  return (
    <StoresListTemplate
      stores={stores}
      count={count}
      currentPage={pageNumber}
      countryCode={params.countryCode}
    />
  )
}
```

#### ✅ 4. Mağaza Profil Sayfası - TAMAMLANDI

**src/app/[countryCode]/(main)/stores/[slug]/page.tsx:**
```typescript
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getStoreBySlug, getStoreReviews } from "@lib/data/stores"
import { listProducts } from "@lib/data/products"
import StoreProfileTemplate from "@modules/stores/templates/store-profile"

type Props = {
  params: Promise<{
    slug: string
    countryCode: string
  }>
  searchParams: Promise<{
    tab?: "products" | "featured" | "reviews"
    page?: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const store = await getStoreBySlug(params.slug)

  if (!store) {
    return {
      title: "Mağaza Bulunamadı",
    }
  }

  return {
    title: `${store.name} | Bangoo`,
    description: store.description || `${store.name} mağazasının ürünlerini keşfedin`,
  }
}

export default async function StoreProfilePage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { slug, countryCode } = params
  const { tab = "products", page = "1" } = searchParams

  // Mağaza bilgilerini getir
  const store = await getStoreBySlug(slug)

  if (!store) {
    notFound()
  }

  // Mağaza ürünlerini getir
  const { response: productsData } = await listProducts({
    pageParam: parseInt(page),
    queryParams: {
      // Backend'de store_id filter eklenecek
      // @ts-ignore - Custom filter
      store_id: store.id,
      limit: 12,
    },
    countryCode,
  })

  // Yorumları getir
  const { reviews, count: reviewCount } = await getStoreReviews(store.id, {
    limit: 10,
    offset: 0,
  })

  return (
    <StoreProfileTemplate
      store={store}
      products={productsData.products}
      reviews={reviews}
      reviewCount={reviewCount}
      activeTab={tab}
      currentPage={parseInt(page)}
      countryCode={countryCode}
    />
  )
}
```

#### ✅ 5. Ürün Kartına Mağaza Bilgisi Ekleme - TAMAMLANDI

**src/modules/products/components/product-preview/index.tsx** dosyasını güncelleyin:

```typescript
import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Store } from "lucide-react"

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

  return (
    <div className="group">
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between">
            <Text className="text-ui-fg-subtle" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Mağaza Bilgisi */}
      {product.store && (
        <LocalizedClientLink
          href={`/stores/${product.store.handle}`}
          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Store size={14} />
          <span>{product.store.name}</span>
          {product.store.rating && (
            <span className="flex items-center gap-0.5 ml-1">
              <span className="text-yellow-500">★</span>
              <span>{product.store.rating.toFixed(1)}</span>
            </span>
          )}
        </LocalizedClientLink>
      )}
    </div>
  )
}
```

#### ✅ 6. Mağaza Profil Template Örneği - TAMAMLANDI

**src/modules/stores/templates/store-profile/index.tsx:**
```typescript
"use client"

import { useState } from "react"
import { Text, Heading } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { Store, StoreReview } from "@lib/data/stores"
import StoreHeader from "@modules/stores/components/store-header"
import StoreInfo from "@modules/stores/components/store-info"
import StoreTabs from "@modules/stores/components/store-tabs"
import StoreProducts from "@modules/stores/components/store-products"
import StoreReviews from "@modules/stores/components/store-reviews"

type Props = {
  store: Store
  products: HttpTypes.StoreProduct[]
  reviews: StoreReview[]
  reviewCount: number
  activeTab: "products" | "featured" | "reviews"
  currentPage: number
  countryCode: string
}

export default function StoreProfileTemplate({
  store,
  products,
  reviews,
  reviewCount,
  activeTab,
  currentPage,
  countryCode,
}: Props) {
  const [tab, setTab] = useState(activeTab)

  return (
    <div className="content-container py-6">
      {/* Kapak Fotoğrafı ve Profil Resmi */}
      <StoreHeader store={store} />

      {/* Mağaza Bilgileri */}
      <StoreInfo store={store} />

      {/* Tabs */}
      <StoreTabs activeTab={tab} onTabChange={setTab} reviewCount={reviewCount} />

      {/* İçerik */}
      <div className="mt-8">
        {tab === "products" && (
          <StoreProducts
            products={products}
            currentPage={currentPage}
            countryCode={countryCode}
          />
        )}
        {tab === "featured" && (
          <div>
            <Heading level="h2" className="mb-4">Öne Çıkan Ürünler</Heading>
            {/* Öne çıkan ürünler burada gösterilecek */}
          </div>
        )}
        {tab === "reviews" && (
          <StoreReviews
            storeId={store.id}
            reviews={reviews}
            reviewCount={reviewCount}
          />
        )}
      </div>
    </div>
  )
}
```

#### ✅ 7. Yıldız Rating Komponenti - TAMAMLANDI

**src/modules/stores/components/rating-stars/index.tsx:**
```typescript
import { Star } from "lucide-react"

type Props = {
  rating: number
  maxRating?: number
  size?: number
  showValue?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 20,
  showValue = true,
  interactive = false,
  onRatingChange,
}: Props) {
  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1
          const isFilled = starValue <= Math.floor(rating)
          const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(starValue)}
              disabled={!interactive}
              className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}
            >
              <Star
                size={size}
                className={
                  isFilled
                    ? "fill-yellow-500 text-yellow-500"
                    : isHalf
                    ? "fill-yellow-500/50 text-yellow-500"
                    : "fill-gray-200 text-gray-200"
                }
              />
            </button>
          )
        })}
      </div>
      {showValue && (
        <Text className="text-sm text-gray-600">
          {rating.toFixed(1)}
        </Text>
      )}
    </div>
  )
}
```

#### ✅ 8. Yorum Formu Komponenti - TAMAMLANDI

**src/modules/stores/components/review-form/index.tsx:**
```typescript
"use client"

import { useState } from "react"
import { Button, Textarea, Label } from "@medusajs/ui"
import { createStoreReview } from "@lib/data/stores"
import RatingStars from "../rating-stars"

type Props = {
  storeId: string
  orderId: string
  onSuccess?: () => void
}

export default function ReviewForm({ storeId, orderId, onSuccess }: Props) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Lütfen bir puan verin")
      return
    }

    setIsSubmitting(true)
    setError("")

    const result = await createStoreReview(storeId, {
      order_id: orderId,
      rating,
      comment: comment.trim() || undefined,
    })

    setIsSubmitting(false)

    if ("error" in result) {
      setError(result.error)
    } else {
      setRating(0)
      setComment("")
      onSuccess?.()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label>Puanınız *</Label>
        <div className="mt-2">
          <RatingStars
            rating={rating}
            interactive
            onRatingChange={setRating}
            showValue={false}
            size={32}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comment">Yorumunuz (isteğe bağlı)</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Mağaza hakkındaki deneyiminizi paylaşın..."
          rows={4}
          className="mt-1"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? "Gönderiliyor..." : "Yorum Gönder"}
      </Button>
    </form>
  )
}
```

#### ✅ 9. Routing Yapısı - TAMAMLANDI

Projede Next.js App Router kullanılıyor:

```
/[countryCode]/stores              -> Tüm mağazalar listesi
/[countryCode]/stores/[slug]       -> Mağaza profil sayfası
  ?tab=products                    -> Mağaza ürünleri (varsayılan)
  ?tab=featured                    -> Öne çıkan ürünler
  ?tab=reviews                     -> Mağaza yorumları
  ?page=1                          -> Sayfalama
```

#### ⏳ 10. Backend'den Product ile Store İlişkisi - BACKEND GEREKLİ

**NOT:** Bu adım backend hazır olduğunda uygulanacak.

**src/lib/data/products.ts** dosyasında products endpoint'ine `store` bilgisi eklenmelidir:

```typescript
export const listProducts = async ({ ... }) => {
  // ...
  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,+store", // +store eklendi
          ...queryParams,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    // ...
}
```

Backend'de Product entity'sine store ilişkisi eklenmelidir (Backend bölümünde detaylı anlatıldı).

---

## 🔧 Backend Gereksinimleri (VPS Deployment)

### Teknoloji Stack
- Node.js (v18+)
- MedusaJS v2.0+
- PostgreSQL
- Redis
- Nginx (reverse proxy)
- Docker & Docker Compose (önerilen)

### VPS Minimum Gereksinimleri
- **RAM:** 2GB minimum, 4GB önerilen
- **Disk:** 20GB minimum
- **OS:** Ubuntu 22.04 LTS / Debian 11+
- **Node.js:** v18 veya üstü
- **PostgreSQL:** v14+
- **Redis:** v6+

### 1. MedusaJS Multi-Vendor Plugin Kurulumu

```bash
# MedusaJS marketplace plugin kurulumu
npm install @techlabiadmedusa-marketplace-plugin
# veya
yarn add @techlabiadmedusa-marketplace-plugin
```

**medusa-config.js** dosyası güncellenmeli:

```javascript
module.exports = {
  plugins: [
    // ... diğer pluginler
    {
      resolve: `@techlabiadmedusa-marketplace-plugin`,
      options: {
        enableUI: true,
        enableVendorProfiles: true,
      }
    }
  ]
}
```

### 2. Custom Entity Oluşturma

MedusaJS'de custom entity'ler TypeORM kullanılarak oluşturulur.

**src/models/store.ts**
```typescript
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm"
import { BaseEntity, generateEntityId } from "@medusajs/medusa"

@Entity()
export class Store extends BaseEntity {
  @Column({ type: "varchar" })
  name: string

  @Index({ unique: true })
  @Column({ type: "varchar" })
  slug: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ type: "varchar", nullable: true })
  profile_image: string

  @Column({ type: "varchar", nullable: true })
  cover_image: string

  @Column({ type: "decimal", default: 0 })
  rating: number

  @Column({ type: "int", default: 0 })
  review_count: number

  @Column({ type: "varchar" })
  owner_id: string

  @OneToMany(() => StoreReview, review => review.store)
  reviews: StoreReview[]

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "store")
  }
}
```

**src/models/store-review.ts**
```typescript
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity, generateEntityId } from "@medusajs/medusa"
import { Store } from "./store"

@Entity()
export class StoreReview extends BaseEntity {
  @Column({ type: "varchar" })
  store_id: string

  @ManyToOne(() => Store, store => store.reviews)
  @JoinColumn({ name: "store_id" })
  store: Store

  @Column({ type: "varchar" })
  customer_id: string

  @Column({ type: "varchar" })
  order_id: string

  @Column({ type: "int" })
  rating: number

  @Column({ type: "text", nullable: true })
  comment: string

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "store_review")
  }
}
```

**src/models/featured-product.ts**
```typescript
import { BeforeInsert, Column, Entity } from "typeorm"
import { BaseEntity, generateEntityId } from "@medusajs/medusa"

@Entity()
export class FeaturedProduct extends BaseEntity {
  @Column({ type: "varchar" })
  store_id: string

  @Column({ type: "varchar" })
  product_id: string

  @Column({ type: "int", default: 0 })
  order: number

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "featured_product")
  }
}
```

### 3. Custom API Endpoints

**src/api/store/stores/[slug]/route.ts**
```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { slug } = req.params
  const storeService = req.scope.resolve("storeService")

  const store = await storeService.retrieveBySlug(slug)

  res.json({ store })
}
```

**src/api/store/stores/[id]/reviews/route.ts**
```typescript
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const reviewService = req.scope.resolve("storeReviewService")

  const reviews = await reviewService.listByStore(id)

  res.json({ reviews })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const { rating, comment, order_id } = req.body
  const customer_id = req.user.customer_id

  const reviewService = req.scope.resolve("storeReviewService")

  // Sipariş kontrolü
  const hasOrder = await reviewService.hasCustomerOrderedFromStore(
    customer_id,
    id,
    order_id
  )

  if (!hasOrder) {
    return res.status(403).json({
      message: "Bu mağazadan sipariş vermelisiniz"
    })
  }

  const review = await reviewService.create({
    store_id: id,
    customer_id,
    order_id,
    rating,
    comment
  })

  res.json({ review })
}
```

### 4. Services Oluşturma

**src/services/store.ts**
```typescript
import { TransactionBaseService } from "@medusajs/medusa"
import { Store } from "../models/store"

class StoreService extends TransactionBaseService {
  async retrieveBySlug(slug: string): Promise<Store> {
    const storeRepo = this.activeManager_.getRepository(Store)
    return await storeRepo.findOne({
      where: { slug },
      relations: ["reviews"]
    })
  }

  async updateRating(storeId: string): Promise<void> {
    const storeRepo = this.activeManager_.getRepository(Store)
    const reviewRepo = this.activeManager_.getRepository("StoreReview")

    const { avg, count } = await reviewRepo
      .createQueryBuilder("review")
      .select("AVG(review.rating)", "avg")
      .addSelect("COUNT(review.id)", "count")
      .where("review.store_id = :storeId", { storeId })
      .getRawOne()

    await storeRepo.update(storeId, {
      rating: parseFloat(avg) || 0,
      review_count: parseInt(count) || 0
    })
  }
}

export default StoreService
```

### 5. Database Migration

```bash
# Migration oluşturma
npx medusa migrations create CreateStoreEntities

# Migration çalıştırma
npx medusa migrations run
```

**migrations/[timestamp]-CreateStoreEntities.ts**
```typescript
import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateStoreEntities1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "store" (
        "id" VARCHAR PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "slug" VARCHAR UNIQUE NOT NULL,
        "description" TEXT,
        "profile_image" VARCHAR,
        "cover_image" VARCHAR,
        "rating" DECIMAL DEFAULT 0,
        "review_count" INTEGER DEFAULT 0,
        "owner_id" VARCHAR NOT NULL,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "store_review" (
        "id" VARCHAR PRIMARY KEY,
        "store_id" VARCHAR NOT NULL,
        "customer_id" VARCHAR NOT NULL,
        "order_id" VARCHAR NOT NULL,
        "rating" INTEGER NOT NULL,
        "comment" TEXT,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY ("store_id") REFERENCES "store"("id")
      )
    `)

    await queryRunner.query(`
      CREATE TABLE "featured_product" (
        "id" VARCHAR PRIMARY KEY,
        "store_id" VARCHAR NOT NULL,
        "product_id" VARCHAR NOT NULL,
        "order" INTEGER DEFAULT 0,
        "created_at" TIMESTAMP DEFAULT NOW(),
        "updated_at" TIMESTAMP DEFAULT NOW()
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "featured_product"`)
    await queryRunner.query(`DROP TABLE "store_review"`)
    await queryRunner.query(`DROP TABLE "store"`)
  }
}
```

### 6. Product Entity Genişletme

Ürünlere mağaza bilgisi eklemek için Product entity genişletilmeli:

**src/models/product.ts**
```typescript
import { Product as MedusaProduct } from "@medusajs/medusa"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { Store } from "./store"

@Entity()
export class Product extends MedusaProduct {
  @Column({ type: "varchar", nullable: true })
  store_id: string

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store: Store
}
```

---

## 🚀 VPS Deployment Adımları

### 1. Sunucu Hazırlığı

```bash
# Sunucuya SSH bağlantısı
ssh root@your-vps-ip

# Sistem güncellemeleri
apt update && apt upgrade -y

# Gerekli paketler
apt install -y git curl build-essential
```

### 2. Node.js Kurulumu

```bash
# NodeSource repository ekleme
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

# Node.js kurulumu
apt install -y nodejs

# Versiyon kontrolü
node --version
npm --version
```

### 3. PostgreSQL Kurulumu

```bash
# PostgreSQL kurulumu
apt install -y postgresql postgresql-contrib

# PostgreSQL başlatma
systemctl start postgresql
systemctl enable postgresql

# Database oluşturma
sudo -u postgres psql
CREATE DATABASE medusa_db;
CREATE USER medusa_user WITH PASSWORD 'güçlü_şifre';
GRANT ALL PRIVILEGES ON DATABASE medusa_db TO medusa_user;
\q
```

### 4. Redis Kurulumu

```bash
# Redis kurulumu
apt install -y redis-server

# Redis başlatma
systemctl start redis-server
systemctl enable redis-server

# Test
redis-cli ping  # PONG dönmeli
```

### 5. Docker & Docker Compose Kurulumu (Önerilen)

```bash
# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose kurulumu
apt install -y docker-compose

# Docker başlatma
systemctl start docker
systemctl enable docker
```

### 6. MedusaJS Backend Deploy

**docker-compose.yml** oluşturma:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: medusa_user
      POSTGRES_PASSWORD: güçlü_şifre
      POSTGRES_DB: medusa_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  medusa-server:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgres://medusa_user:güçlü_şifre@postgres:5432/medusa_db
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
      JWT_SECRET: your_jwt_secret
      COOKIE_SECRET: your_cookie_secret
      STORE_CORS: https://yourdomain.com
      ADMIN_CORS: https://admin.yourdomain.com
    ports:
      - "9000:9000"
    command: ["npm", "run", "start"]

  medusa-worker:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgres://medusa_user:güçlü_şifre@postgres:5432/medusa_db
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
    command: ["npm", "run", "start:worker"]

volumes:
  postgres_data:
```

**Dockerfile** oluşturma:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npm", "run", "start"]
```

### 7. Nginx Reverse Proxy Kurulumu

```bash
# Nginx kurulumu
apt install -y nginx

# Nginx konfigürasyonu
nano /etc/nginx/sites-available/medusa
```

**Nginx config:**

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Siteyi aktifleştirme
ln -s /etc/nginx/sites-available/medusa /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 8. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kurulumu
apt install -y certbot python3-certbot-nginx

# SSL sertifikası alma
certbot --nginx -d api.yourdomain.com

# Otomatik yenileme
certbot renew --dry-run
```

### 9. Firewall Ayarları

```bash
# UFW kurulumu
apt install -y ufw

# Portları açma
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS

# UFW başlatma
ufw enable
```

### 10. Deploy ve Başlatma

```bash
# Projeyi klonlama
git clone https://github.com/your-repo/medusa-backend.git
cd medusa-backend

# Environment variables
cp .env.example .env
nano .env  # Değişkenleri düzenle

# Docker ile başlatma
docker-compose up -d

# Logları kontrol
docker-compose logs -f medusa-server

# Migration çalıştırma
docker-compose exec medusa-server npx medusa migrations run

# Admin kullanıcı oluşturma
docker-compose exec medusa-server npx medusa user -e admin@yourdomain.com -p admin_password
```

### 11. Monitoring ve Bakım

```bash
# PM2 kurulumu (Docker kullanmıyorsanız)
npm install -g pm2

# Uygulamayı başlatma
pm2 start npm --name "medusa-server" -- run start
pm2 start npm --name "medusa-worker" -- run start:worker

# Otomatik başlatma
pm2 startup
pm2 save

# Monitoring
pm2 monit
pm2 logs
```

---

## 📊 Veritabanı İndeksleme

Performans için önemli indeksler:

```sql
-- Store tablosu
CREATE INDEX idx_store_slug ON store(slug);
CREATE INDEX idx_store_rating ON store(rating DESC);

-- StoreReview tablosu
CREATE INDEX idx_store_review_store ON store_review(store_id);
CREATE INDEX idx_store_review_customer ON store_review(customer_id);
CREATE INDEX idx_store_review_order ON store_review(order_id);

-- FeaturedProduct tablosu
CREATE INDEX idx_featured_product_store ON featured_product(store_id);
CREATE INDEX idx_featured_product_order ON featured_product(store_id, order);

-- Product tablosu
CREATE INDEX idx_product_store ON product(store_id);
```

---

## 🔒 Güvenlik Kontrol Listesi

- [ ] Environment variables güvenli şekilde saklanıyor (.env dosyası git'te yok)
- [ ] PostgreSQL ve Redis sadece localhost'tan erişilebilir
- [ ] Nginx rate limiting aktif
- [ ] SSL sertifikası kuruldu
- [ ] Firewall (UFW) aktif ve doğru portlar açık
- [ ] JWT ve Cookie secret'ları güçlü
- [ ] CORS ayarları doğru yapılandırıldı
- [ ] Sipariş kontrolü review API'sinde aktif
- [ ] SQL injection koruması (TypeORM parametrize sorgular kullanıyor)
- [ ] XSS koruması (input sanitization)
- [ ] Regular backup stratejisi
- [ ] Monitoring ve logging aktif

---

## 🧪 Test Senaryoları

### Frontend Test Listesi

1. Mağaza profil sayfası doğru yükleniyor mu?
2. Profil ve kapak fotoğrafı görüntüleniyor mu?
3. Mağaza puanı ve yorum sayısı doğru gösteriliyor mu?
4. Ürün listesi sayfalama ile çalışıyor mu?
5. Öne çıkan ürünler doğru sırayla gösteriliyor mu?
6. Ürün kartından mağaza sayfasına yönlendirme çalışıyor mu?
7. Yorum yapma formu sadece sipariş veren kullanıcılara açık mı?
8. Puan verme sistemi çalışıyor mu?

### Backend Test Listesi

1. Store entity'leri veritabanında oluşturuluyor mu?
2. Custom API endpoint'leri çalışıyor mu?
3. Sipariş kontrolü review'da çalışıyor mu?
4. Ortalama puan doğru hesaplanıyor mu?
5. Featured product sıralaması çalışıyor mu?
6. Product-Store ilişkisi doğru kuruluyor mu?
7. Migration'lar hatasız çalışıyor mu?

---

## 📚 Kaynaklar

### MedusaJS Resmi Dökümanlar
- [MedusaJS Marketplace Recipe](https://docs.medusajs.com/resources/recipes/marketplace/examples/vendors)
- [MedusaJS Deployment Guide](https://docs.medusajs.com/learn/deployment)
- [MedusaJS Product Reviews Tutorial](https://docs.medusajs.com/resources/how-to-tutorials/tutorials/product-reviews)

### Multi-Vendor Rehberleri
- [Medusa JS for Multi-Vendor Marketplaces - Complete Guide](https://tameta.tech/blogs/topics/medusa-js-for-multi-vendor-marketplaces-a-complete-guide)
- [Building a Multivendor Marketplace with Medusa JS 2.0](https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-dashboard-customization-part-3-6ce584b8c1c1)

### Deployment Rehberleri
- [Deploy Medusa to VPS Guide](https://deploymedusa.com/guides/vps)
- [Deploy Medusa JS to Coolify](https://www.306technologies.com/blog/deploy-medusa-js-to-coolify)
- [Medusa 2.0 Custom Setup on Railway](https://medium.com/@pether.maciejewski/medusa-2-0-e-commerce-admin-server-and-worker-easy-custom-setup-on-railway-stripe-resend-and-7b7079627879)

### MedusaJS Plugin
- [Medusa Marketplace Plugin](https://medusajs.com/integrations/@techlabimedusa-marketplace-plugin/)

---

## 🚦 Geliştirme Aşamaları

### Faz 1: Backend Altyapı (1-2 hafta)
- [ ] VPS kurulumu ve konfigürasyonu
- [ ] MedusaJS kurulumu
- [ ] PostgreSQL ve Redis kurulumu
- [ ] Custom entity'lerin oluşturulması
- [ ] Migration'ların yazılması ve çalıştırılması

### Faz 2: Backend API (1-2 hafta)
- [ ] Store service oluşturma
- [ ] Review service oluşturma
- [ ] Featured product service oluşturma
- [ ] Custom API endpoint'leri yazma
- [ ] Sipariş kontrolü mantığı
- [ ] Puan hesaplama sistemi

### Faz 3: Frontend Geliştirme - ✅ TAMAMLANDI
- [x] Mağaza profil sayfası UI
- [x] Profil ve kapak fotoğrafı gösterimi
- [x] Ürün listeleme ve filtreleme
- [x] Öne çıkan ürünler bölümü (skeleton hazır)
- [x] Yorum ve puan sistemi UI
- [x] Ürün kartlarına mağaza bilgisi ekleme
- [x] Routing ve navigation
- [x] Loading states
- [x] TypeScript interfaces
- [x] All required components created

### Faz 4: Test ve Deployment (1 hafta)
- [ ] Unit testler
- [ ] Integration testler
- [ ] E2E testler
- [ ] Production deployment
- [ ] SSL kurulumu
- [ ] Monitoring kurulumu

### Faz 5: Optimizasyon (devam eden)
- [ ] Performance optimizasyonu
- [ ] SEO iyileştirmeleri
- [ ] Cache stratejisi
- [ ] CDN entegrasyonu
- [ ] Backup sistemi

---

## 💡 Önemli Notlar

1. **MedusaJS Versiyonu**: Bu dokümantasyon MedusaJS v2.0+ için hazırlanmıştır. Önceki versiyonlarda bazı farklılıklar olabilir.

2. **TypeORM Migration**: MedusaJS, entity değişikliklerinde migration dosyaları gerektirir. Her değişiklikten sonra migration oluşturun.

3. **Sipariş Kontrolü**: Review sistemi için mutlaka kullanıcının o mağazadan sipariş verip vermediğini kontrol edin.

4. **Image Upload**: Profil ve kapak fotoğrafları için MedusaJS'in file service'ini kullanabilir veya AWS S3, Cloudinary gibi servisler entegre edebilirsiniz.

5. **Performans**: Büyük ürün kataloğu için elasticsearch veya algolia entegrasyonu düşünülebilir.

6. **Backup**: PostgreSQL için düzenli backup stratejisi oluşturun (pg_dump veya automated backup service).

7. **Monitoring**: Production'da mutlaka log monitoring (ELK Stack, Datadog, vb.) kullanın.

8. **Rate Limiting**: API endpoint'lerine rate limiting ekleyin (spam ve abuse önleme için).

---

## ✅ Frontend İmplementasyon Özeti

### Tamamlanan Dosyalar

#### Data Layer
- ✅ `src/lib/data/stores.ts` - Tüm store veri fonksiyonları ve interface'leri (mock data ile)

#### Components
- ✅ `src/modules/stores/components/rating-stars/index.tsx` - Yıldız rating komponenti
- ✅ `src/modules/stores/components/review-form/index.tsx` - Yorum formu
- ✅ `src/modules/stores/components/store-header/index.tsx` - Mağaza header (profil/kapak)
- ✅ `src/modules/stores/components/store-info/index.tsx` - Mağaza bilgileri
- ✅ `src/modules/stores/components/store-tabs/index.tsx` - Tab navigation
- ✅ `src/modules/stores/components/store-products/index.tsx` - Ürün listesi
- ✅ `src/modules/stores/components/store-reviews/index.tsx` - Yorumlar bölümü

#### Templates
- ✅ `src/modules/stores/templates/store-profile/index.tsx` - Mağaza profil template
- ✅ `src/modules/stores/templates/stores-list/index.tsx` - Mağazalar listesi template

#### Pages
- ✅ `src/app/[countryCode]/(main)/stores/page.tsx` - Mağazalar listesi sayfası
- ✅ `src/app/[countryCode]/(main)/stores/loading.tsx` - Loading state
- ✅ `src/app/[countryCode]/(main)/stores/[slug]/page.tsx` - Mağaza profil sayfası
- ✅ `src/app/[countryCode]/(main)/stores/[slug]/loading.tsx` - Loading state

#### Updates
- ✅ `src/modules/products/components/product-preview/index.tsx` - Mağaza bilgisi eklendi

### Kullanılan URL'ler

```
✅ /tr/stores - Tüm mağazalar listesi
✅ /tr/stores/bangoo-teknoloji - Mağaza profil sayfası
✅ /tr/stores/bangoo-teknoloji?tab=products - Ürünler sekmesi
✅ /tr/stores/bangoo-teknoloji?tab=featured - Öne çıkanlar sekmesi
✅ /tr/stores/bangoo-teknoloji?tab=reviews - Yorumlar sekmesi
```

### Mock Data Kullanımı

Şu anda frontend **mock data** ile çalışmaktadır. Backend hazır olduğunda:

1. `src/lib/data/stores.ts` dosyasındaki commented kısımları aktif edin
2. Mock data return'lerini kaldırın
3. Backend endpoint'leri hazır olmalı:
   - `GET /store/stores` - Mağaza listesi
   - `GET /store/stores/:slug` - Tek mağaza
   - `GET /store/stores/:id/reviews` - Mağaza yorumları
   - `POST /store/stores/:id/reviews` - Yorum ekleme
   - `GET /store/stores/:id/featured` - Öne çıkan ürünler

### Sonraki Adımlar

1. **Backend Development** - Backend entity ve API'leri oluştur
2. **Integration** - Frontend'i gerçek API'lerle bağla
3. **Testing** - Frontend testleri yaz
4. **Image Upload** - Profil ve kapak fotoğrafı upload özelliği ekle

---

**Son Güncelleme:** 2026-01-08
**Versiyon:** 2.0 - Frontend Implementation Complete
