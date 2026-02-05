'use client'

import { useParams } from 'next/navigation'
import { useProduct } from '@/lib/queries/useProduct'
import { useProducts } from '@/lib/queries/useProducts'
import type { Product } from '@/lib/types/product'
import { selectYouMayAlsoLike } from '@/lib/selectors/products'
import { Button } from '@/components/ui/Button'

import Gallery from '@/components/products/Gallery'
import ProductInfo from '@/components/products/ProductInfo'
import ProductTabs from '@/components/products/ProductTabs'
import YouMayAlsoLike from '@/components/products/YouMayAlsoLike'
import YouMayAlsoLikeSkeleton from '@/components/products/YouMayAlsoLikeSkeleton'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ? String(params.id) : ''

  // Ana query: sayfanın state’ini bu yönetir
  const q = useProduct(id)
  const product = (q.data ?? null) as Product | null

  // Öneri query: sadece "You may also like" alanı için
  const recQ = useProducts()
  const allProducts = recQ.data ?? []

  // 1) pending -> skeleton
  if (q.status === 'pending') {
    return (
      <div className="w-full">
        <div className="h-px w-full bg-black/10" />
        <div className="container py-[24px]">
          <div className="h-[600px] rounded-[20px] border border-black/10" />
        </div>
      </div>
    )
  }

  // 2) error -> inline error + retry
  if (q.status === 'error' || !product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-satoshi text-[20px] font-bold">Bir hata oluştu</h2>
        <p className="mt-2 text-black/70">
          {q.error instanceof Error ? q.error.message : 'Ürün yüklenemedi.'}
        </p>

        <Button
          type="button"
          onClick={() => q.refetch()}
          disabled={q.fetchStatus === 'fetching'}
          className="mt-6 h-[48px] px-6"
        >
          Yeniden dene
        </Button>
      </main>
    )
  }

  // success -> UI
  const suggestions = selectYouMayAlsoLike(allProducts, product, 4)

  return (
    <div className="w-full">
      <div className="px-[16px] sm:px-[32px] md:px-[100px] py-[20px] md:py-[24px]">
        <div className="mb-[15px] md:py-1 md:mt-4 font-satoshi text-[14px] text-black/60">
          Home <span className="mx-1">›</span> Shop{' '}
          <span className="mx-1">›</span> {product.category}
        </div>

        <div className="py-1 grid grid-cols-1 gap-[24px] lg:grid-cols-2 lg:items-start">
          <Gallery imageSrc={product.image} title={product.title} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-[40px]">
          <ProductTabs />
        </div>

        <div className="mt-[40px]">
          {recQ.status === 'pending' ? (
            <YouMayAlsoLikeSkeleton />
          ) : recQ.status === 'error' ? (
            // Öneri alanında hata olursa sayfayı bozma — istersen minik retry koy
            <div className="rounded-[20px] border border-black/10 bg-white p-4">
              <div className="font-satoshi text-[14px] text-black/60">
                Öneriler yüklenemedi.
              </div>
              <Button
                type="button"
                onClick={() => recQ.refetch()}
                className="mt-3 h-[40px] px-4"
              >
                Yeniden dene
              </Button>
            </div>
          ) : (
            <YouMayAlsoLike products={suggestions} />
          )}
        </div>
      </div>
    </div>
  )
}
