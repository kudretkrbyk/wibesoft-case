'use client'

import { useProducts } from '@/lib/queries/useProducts'
import ProductGrid from '@/components/products/ProductGrid'
import ProductGridSkeleton from '@/components/products/skeletons/ProductGridSkeleton'

export default function ProductsPage() {
  const q = useProducts()
  const data = q.data ?? []

  // 1) pending -> skeleton
  if (q.status === 'pending') return <ProductGridSkeleton />

  // 2) error -> error UI + retry button
  if (q.status === 'error') {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-satoshi text-[20px] font-bold">Bir hata oluştu</h2>
        <p className="mt-2 text-black/70">
          {q.error instanceof Error ? q.error.message : 'Ürünler yüklenemedi.'}
        </p>

        <button
          type="button"
          onClick={() => q.refetch()}
          disabled={q.fetchStatus === 'fetching'}
          className="mt-6 rounded-full bg-black px-6 py-3 font-satoshi text-[14px] font-medium text-white disabled:opacity-50"
        >
          Yeniden dene
        </button>
      </main>
    )
  }

  // 3) success -> grid
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <ProductGrid products={data} />
    </main>
  )
}
