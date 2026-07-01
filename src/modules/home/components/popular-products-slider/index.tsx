import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

export default function PopularProductsSlider({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="relative w-full pt-12 pb-8">
      {/* Elegant curved separator line */}
      <div className="absolute top-8 left-0 right-0 h-0.5 overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 2" 
          preserveAspectRatio="none"
          style={{ opacity: 0.6 }}
        >
          <path 
            d="M0,1 Q300,0.5 600,1 T1200,1" 
            stroke="rgb(209, 213, 219)" 
            strokeWidth="1.5" 
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      
      {/* More visible gradient - extends further down */}
      <div 
        className="absolute top-8 left-0 right-0 pointer-events-none"
        style={{
          height: '400px',
          background: 'linear-gradient(to bottom, rgba(229, 231, 235, 0.5) 0%, rgba(229, 231, 235, 0.35) 20%, rgba(229, 231, 235, 0.2) 40%, rgba(229, 231, 235, 0.1) 60%, rgba(229, 231, 235, 0.05) 80%, transparent 100%)',
        }}
      ></div>

      <div className="content-container relative z-10">
        <div className="mb-8 pt-6 flex justify-between items-center">
          <Text className="txt-xlarge font-semibold text-gray-800">Popüler Ürünler</Text>
          <a 
            href="/products" 
            className="text-[#9865e8] hover:text-[#7a4dc7] font-medium text-sm flex items-center gap-1 transition-colors"
          >
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
