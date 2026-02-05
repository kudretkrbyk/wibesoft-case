'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useProducts } from '@/lib/queries/useProducts'
import type { Product } from '@/lib/types/product'

export type SortKey = 'popular' | 'price-asc' | 'price-desc'

function titleCaseSafe(s: string) {
  return s
    .toLowerCase()
    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function mapSlugToCategory(slug: string) {
  const m: Record<string, string> = {
    casual: "men's clothing",
    men: "men's clothing",
    women: "women's clothing",
    electronics: 'electronics',
    jewelry: 'jewelery',
  }
  return m[slug] ?? slug
}

function formatCategoryLabel(category: string) {
  return titleCaseSafe(category)
}

function computePriceBounds(products: Product[]) {
  if (products.length === 0) return { min: 0, max: 0 }
  let min = Infinity
  let max = -Infinity
  for (const p of products) {
    if (p.price < min) min = p.price
    if (p.price > max) max = p.price
  }
  return { min: Math.floor(min), max: Math.ceil(max) }
}

function isSortKey(v: string | null): v is SortKey {
  return v === 'popular' || v === 'price-asc' || v === 'price-desc'
}

export function useCategoryViewModel(slug: string) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlCat = searchParams.get('cat') ?? ''
  const urlMinRaw = searchParams.get('min')
  const urlMaxRaw = searchParams.get('max')
  const urlSortRaw = searchParams.get('sort')

  const initialSort: SortKey = isSortKey(urlSortRaw) ? urlSortRaw : 'popular'
  const [sort, setSort] = useState<SortKey>(initialSort)

  const { data, isLoading, isError } = useProducts()

  const allProducts = useMemo(() => {
    return (data ?? []) as Product[]
  }, [data])

  // ✅ gerçek kategorileri çıkar (unique)
  const availableCategories = useMemo(() => {
    const set = new Set<string>()
    for (const p of allProducts) {
      if (p?.category) set.add(p.category)
    }
    return Array.from(set)
  }, [allProducts])

  const defaultCategoryFromSlug = useMemo(() => mapSlugToCategory(slug), [slug])

  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // ✅ initial category (URL cat > slug map > first)
  useEffect(() => {
    if (availableCategories.length === 0) return

    const next =
      urlCat && availableCategories.includes(urlCat)
        ? urlCat
        : availableCategories.includes(defaultCategoryFromSlug)
          ? defaultCategoryFromSlug
          : availableCategories[0]

    // aynıysa setleme
    setSelectedCategory((prev) => (prev === next ? prev : next))
  }, [availableCategories, defaultCategoryFromSlug, urlCat])

  const pageTitle = useMemo(() => {
    if (!selectedCategory) return titleCaseSafe(slug)
    return formatCategoryLabel(selectedCategory)
  }, [selectedCategory, slug])

  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return []
    return allProducts.filter((p) => p.category === selectedCategory)
  }, [allProducts, selectedCategory])

  const priceBounds = useMemo(
    () => computePriceBounds(categoryProducts),
    [categoryProducts],
  )

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)

  // ✅ kategori değişince price range reset (default)
  useEffect(() => {
    if (!selectedCategory) return
    setPriceMin(priceBounds.min)
    setPriceMax(priceBounds.max)
  }, [priceBounds.min, priceBounds.max, selectedCategory])

  // ✅ URL min/max varsa bounds hazır olunca uygula
  useEffect(() => {
    if (!selectedCategory) return
    if (priceBounds.min === 0 && priceBounds.max === 0) return

    const uMin = urlMinRaw ? Number(urlMinRaw) : NaN
    const uMax = urlMaxRaw ? Number(urlMaxRaw) : NaN

    if (!Number.isNaN(uMin)) setPriceMin(uMin)
    if (!Number.isNaN(uMax)) setPriceMax(uMax)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, priceBounds.min, priceBounds.max])

  const filteredProducts = useMemo(() => {
    if (categoryProducts.length === 0) return []
    return categoryProducts.filter(
      (p) => p.price >= priceMin && p.price <= priceMax,
    )
  }, [categoryProducts, priceMin, priceMax])

  // ✅ SORT
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts]
    if (sort === 'popular') {
      arr.sort((a, b) => {
        const ap = (a.rating?.rate ?? 0) * (a.rating?.count ?? 0)
        const bp = (b.rating?.rate ?? 0) * (b.rating?.count ?? 0)
        return bp - ap
      })
      return arr
    }
    if (sort === 'price-asc') {
      arr.sort((a, b) => a.price - b.price)
      return arr
    }
    arr.sort((a, b) => b.price - a.price)
    return arr
  }, [filteredProducts, sort])

  const sortLabel =
    sort === 'popular'
      ? 'Most Popular'
      : sort === 'price-asc'
        ? 'Price: Low to High'
        : 'Price: High to Low'

  const PER_PAGE = 9
  const [page, setPage] = useState(1)

  // ✅ kategori/price/sort değişince 1. sayfaya dön
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, priceMin, priceMax, sort])

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE
    return sortedProducts.slice(start, start + PER_PAGE)
  }, [sortedProducts, currentPage])

  const showingFrom =
    sortedProducts.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1
  const showingTo = Math.min(currentPage * PER_PAGE, sortedProducts.length)

  // ✅ URL’e yaz (refresh’te korunsun)
  useEffect(() => {
    if (!selectedCategory) return

    const sp = new URLSearchParams(searchParams.toString())
    sp.set('cat', selectedCategory)
    sp.set('min', String(priceMin))
    sp.set('max', String(priceMax))
    sp.set('sort', sort)

    router.replace(`?${sp.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, priceMin, priceMax, sort])

  return {
    isLoading,
    isError,
    hasData: !!data,

    pageTitle,

    availableCategories,
    selectedCategory,
    setSelectedCategory,

    priceBounds,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,

    // before: filteredProducts
    filteredProducts,
    // NEW:
    sortedProducts,
    sort,
    setSort,
    sortLabel,

    pageItems,

    currentPage,
    totalPages,
    setPage,
    showingFrom,
    showingTo,

    PER_PAGE,
  }
}
