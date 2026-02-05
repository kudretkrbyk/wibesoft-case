import ProductCardSkeleton from './ProductCardSkeleton'

type ProductSectionSkeletonProps = {
  /** Kaç kart gösterilecek (home için genelde 4) */
  count?: number
  /** Başlık skeleton genişliği (NEW ARRIVALS / TOP SELLING yazı uzunluğuna göre) */
  titleWidthClass?: string
  /** Alt buton gösterilsin mi (View All) */
  showButton?: boolean
}

export default function ProductSectionSkeleton({
  count = 4,
  titleWidthClass = 'w-[240px]',
  showButton = true,
}: ProductSectionSkeletonProps) {
  return (
    <section className="w-full py-[60px] animate-pulse">
      <div className="mx-auto max-w-[1240px] px-4">
        {/* Title */}
        <div className="flex justify-center">
          <div className={`h-[44px] ${titleWidthClass} rounded bg-black/10`} />
        </div>

        {/* Grid */}
        <div className="mt-[40px] grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* View All button */}
        {showButton && (
          <div className="mt-[36px] flex justify-center">
            <div className="h-[52px] w-[220px] rounded-full bg-black/10" />
          </div>
        )}
      </div>
    </section>
  )
}
