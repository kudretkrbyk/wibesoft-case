import ProductCardSkeleton from './ProductCardSkeleton'

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}
