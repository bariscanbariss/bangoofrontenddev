import { Text } from "@medusajs/ui"
import { Store } from "@lib/data/stores"

export default function StoresList({ stores }: { stores: Store[] }) {
  if (!stores || stores.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12 bg-gray-50">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {stores.map((store, index) => (
          <div key={store.id} className="flex items-center">
            <Text className="text-gray-600 text-sm">{store.name}</Text>
            {index < stores.length - 1 && (
              <span className="mx-3 text-gray-300">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
