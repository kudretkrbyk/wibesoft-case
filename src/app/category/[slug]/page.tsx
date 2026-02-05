'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'

import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button' // (Button notu: sonra bunu ui/button'a standardize edeceğiz)
import CategorySkeleton from '@/components/category/CategorySkeleton'
import FiltersSidebar from '@/components/category/FiltersSidebar'
import FiltersDrawer from '@/components/category/FiltersDrawer'
import Pagination from '@/components/category/Pagination'
import ProductCard from '@/components/products/ProductCard'

import { useCategoryViewModel } from '@/lib/hooks/useCategoryViewModel'

export default function CategoryPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug ?? 'casual'

  const vm = useCategoryViewModel(slug)

  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sort dropdown
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement | null>(null)

  // click-outside -> close
  useEffect(() => {
    if (!sortOpen) return
    const onDown = (e: MouseEvent) => {
      const el = sortRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) setSortOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [sortOpen])

  if (vm.isLoading) {
    return <CategorySkeleton />
  }

  if (vm.isError || !vm.hasData) {
    return (
      <div className="w-full">
        <div className="h-px w-full bg-black/10" />
        <div className="mx-auto max-w-[1240px] px-4 py-[40px]">
          <p className="font-satoshi text-[16px] text-red-500">
            Failed to load products.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-[16px] md:px-[100px]">
      <div className="mx-auto py-[24px]">
        {/* Breadcrumb */}
        <div className="mb-[16px] font-satoshi text-[14px] text-black/60">
          Home <span className="mx-1">›</span> {vm.pageTitle}
        </div>

        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[295px_1fr]">
          {/* LEFT: Filters (desktop) */}
          <div className="hidden lg:block">
            <FiltersSidebar
              headerVariant="panel"
              onClose={() => setFiltersOpen(false)}
              categories={vm.availableCategories}
              selectedCategory={vm.selectedCategory}
              onSelectCategory={vm.setSelectedCategory}
              minPossible={vm.priceBounds.min}
              maxPossible={vm.priceBounds.max}
              priceMin={vm.priceMin}
              priceMax={vm.priceMax}
              onChangeMin={vm.setPriceMin}
              onChangeMax={vm.setPriceMax}
              showApply
              onApply={() => setFiltersOpen(false)}
            />
          </div>

          {/* RIGHT */}
          <div className="w-full">
            {/* Top bar */}
            <div className="mb-[20px] flex flex-col gap-[12px] sm:flex-row sm:items-start sm:justify-between">
              <h1 className="font-satoshi text-[32px] font-bold leading-[1] text-black">
                {vm.pageTitle}
              </h1>

              <div className="flex items-center gap-[15px] font-satoshi text-[12px] text-black/60">
                <span>
                  Showing {vm.showingFrom}-{vm.showingTo} of{' '}
                  {vm.sortedProducts.length} Products
                </span>

                {/* Sort */}
                <div
                  className="relative flex items-center gap-[6px]"
                  ref={sortRef}
                >
                  <span>Sort by:</span>

                  <button
                    type="button"
                    className="font-satoshi text-[12px] font-bold text-black"
                    onClick={() => setSortOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={sortOpen}
                  >
                    {vm.sortLabel}
                    <span className="ml-1 inline-block translate-y-[-1px]">
                      ▾
                    </span>
                  </button>

                  {sortOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 w-[190px] rounded-[12px] border border-black/10 bg-white p-2 shadow-sm"
                    >
                      {[
                        { key: 'popular', label: 'Most Popular' },
                        { key: 'price-asc', label: 'Price: Low to High' },
                        { key: 'price-desc', label: 'Price: High to Low' },
                      ].map((opt) => {
                        const active = vm.sort === opt.key
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              vm.setSort(opt.key as any)
                              setSortOpen(false)
                            }}
                            className={[
                              'w-full rounded-[10px] px-3 py-2 text-left font-satoshi text-[12px] text-black/80 hover:bg-black/5',
                              active ? 'bg-black/5 text-black' : '',
                            ].join(' ')}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="mt-1 lg:hidden"
                  aria-label="Open filters"
                  onClick={() => setFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Empty */}
            {vm.sortedProducts.length === 0 ? (
              <div className="rounded-[20px] border border-black/10 p-6">
                <p className="font-satoshi text-[14px] text-black/60">
                  No products found in this price range.
                </p>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-2 gap-[20px] lg:grid-cols-3">
                  {vm.pageItems.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-[28px]">
                  <Pagination
                    current={vm.currentPage}
                    totalPages={vm.totalPages}
                    onPrev={() => vm.setPage((v) => Math.max(1, v - 1))}
                    onNext={() =>
                      vm.setPage((v) => Math.min(vm.totalPages, v + 1))
                    }
                    onPage={(p) => vm.setPage(p)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        topOffset={100}
      >
        <FiltersSidebar
          headerVariant="panel"
          onClose={() => setFiltersOpen(false)}
          categories={vm.availableCategories}
          selectedCategory={vm.selectedCategory}
          onSelectCategory={vm.setSelectedCategory}
          minPossible={vm.priceBounds.min}
          maxPossible={vm.priceBounds.max}
          priceMin={vm.priceMin}
          priceMax={vm.priceMax}
          onChangeMin={vm.setPriceMin}
          onChangeMax={vm.setPriceMax}
          showApply
          onApply={() => setFiltersOpen(false)}
        />
      </FiltersDrawer>
    </div>
  )
}
