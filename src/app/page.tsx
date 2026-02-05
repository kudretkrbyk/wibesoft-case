'use client'

import BrowseByStyle from '@/components/home/BrowseByStyle'
import Hero from '@/components/home/Hero'
import NewArrivals from '@/components/home/NewArrivals'
import TopSelling from '@/components/home/TopSelling'
import HappyCustomers from '@/components/home/HappyCustomers'

import { useProducts } from '@/lib/queries/useProducts'
import { selectNewArrivals, selectTopSelling } from '@/lib/selectors/products'

import ProductSectionSkeleton from '@/components/products/skeletons/ProductSectionSkeleton'

function SectionError({
  message,
  onRetry,
  isRetrying,
}: {
  message: string
  onRetry: () => void
  isRetrying: boolean
}) {
  return (
    <section className="w-full px-[100px] py-[72px]">
      <p className="text-center text-red-500">{message}</p>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="rounded-full bg-black px-6 py-3 font-satoshi text-[14px] font-medium text-white disabled:opacity-50"
        >
          Yeniden dene
        </button>
      </div>
    </section>
  )
}

export default function Home() {
  const q = useProducts()
  const data = q.data ?? []

  return (
    <div>
      <Hero />

      {/* NEW ARRIVALS */}
      {q.status === 'pending' ? (
        <ProductSectionSkeleton titleWidthClass="w-[260px]" />
      ) : q.status === 'error' ? (
        <SectionError
          message="Failed to load products."
          onRetry={() => q.refetch()}
          isRetrying={q.fetchStatus === 'fetching'}
        />
      ) : (
        <NewArrivals products={selectNewArrivals(data, 4)} />
      )}

      {/* TOP SELLING */}
      {q.status === 'pending' ? (
        <ProductSectionSkeleton titleWidthClass="w-[220px]" />
      ) : q.status === 'error' ? (
        <SectionError
          message="Failed to load products."
          onRetry={() => q.refetch()}
          isRetrying={q.fetchStatus === 'fetching'}
        />
      ) : (
        <TopSelling products={selectTopSelling(data, 4)} />
      )}

      <BrowseByStyle />
      <HappyCustomers />
    </div>
  )
}
