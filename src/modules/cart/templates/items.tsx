import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <h2 className="text-3xl font-bold text-gray-900">Sepetim</h2>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-sm font-medium">
                <th className="text-left py-3 px-4">Ürün</th>
                <th></th>
                <th className="text-left py-3 px-2">Adet</th>
                <th className="hidden small:table-cell text-left py-3 px-2">
                  Fiyat
                </th>
                <th className="text-right py-3 px-4">
                  Toplam
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items
                ? items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    })
                    .map((item) => {
                      return (
                        <Item
                          key={item.id}
                          item={item}
                          currencyCode={cart?.currency_code}
                        />
                      )
                    })
                : repeat(5).map((i) => {
                    return <SkeletonLineItem key={i} />
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ItemsTemplate
