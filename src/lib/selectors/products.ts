import type { Product } from '@/lib/types/product'

export function selectNewArrivals(products: Product[], limit = 4) {
  return [...products].sort((a, b) => b.id - a.id).slice(0, limit)
}

// Opsiyonel: New Arrivals ile çakışmayı engellemek için excludeIds ekledim
export function selectTopSelling(
  products: Product[],
  limit = 4,
  excludeIds: Set<number> = new Set(),
) {
  return [...products]
    .filter((p) => !excludeIds.has(p.id))
    .sort((a, b) => {
      // primary: rating.count (popülerlik proxy)
      const ac = a.rating?.count ?? 0
      const bc = b.rating?.count ?? 0
      if (bc !== ac) return bc - ac

      // secondary: rating.rate (kalite proxy)
      const ar = a.rating?.rate ?? 0
      const br = b.rating?.rate ?? 0
      if (br !== ar) return br - ar

      // tertiary: id (stabil tie-break)
      return a.id - b.id
    })
    .slice(0, limit)
}
export function selectYouMayAlsoLike(
  products: Product[],
  current: Product,
  limit = 4,
) {
  if (!Array.isArray(products) || products.length === 0) return []

  const byCategory = products
    .filter((p) => p.id !== current.id && p.category === current.category)
    .sort((a, b) => a.id - b.id)

  if (byCategory.length >= limit) return byCategory.slice(0, limit)

  const fallback = products
    .filter((p) => p.id !== current.id && p.category !== current.category)
    .sort((a, b) => a.id - b.id)

  const merged = [...byCategory]
  for (const p of fallback) {
    if (merged.length >= limit) break
    merged.push(p)
  }

  return merged
}
