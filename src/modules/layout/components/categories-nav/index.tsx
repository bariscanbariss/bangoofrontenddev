import { listCategories } from "@lib/data/categories"
import CategoriesClient from "./categories-client"

export default async function CategoriesNav() {
  const productCategories = await listCategories()

  // Ana kategorileri filtrele (parent_category olmayanlar)
  const mainCategories = productCategories?.filter(cat => !cat.parent_category) || []

  return <CategoriesClient categories={mainCategories} />
}
