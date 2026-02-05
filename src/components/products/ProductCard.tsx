import Link from 'next/link'
import StarIcon from '@/components/ui/StarIcon'
import type { Product } from '@/lib/types/product'

type ProductCardProps = {
  product: Product
  oldPrice?: number
  discountPercent?: number
}

function clampTitle(title: string) {
  return title
}

function formatPrice(value: number) {
  return `$${Math.round(value)}`
}

export default function ProductCard({
  product,
  oldPrice,
  discountPercent,
}: ProductCardProps) {
  const rate = product.rating?.rate ?? 0

  const fullStars = Math.floor(rate)
  const hasHalfStar = rate - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <Link
      href={`/products/${product.id}`}
      className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-[20px]"
      aria-label={`${product.title} detay`}
    >
      <article className="w-full">
        {/* Image box */}
        <div className="flex h-[298px] w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#F0EEED]">
          <img
            src={product.image}
            alt={product.title}
            className="h-[260px] w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="mt-[16px] font-satoshi text-[16px] md:text-[20px] font-bold leading-[1] line-clamp-2">
          {clampTitle(product.title)}
        </h3>

        {/* Rating row */}
        <div className="mt-[8px] flex items-center gap-[13px]">
          <div className="flex h-[19px] w-[150px] items-center gap-[2px]">
            {Array.from({ length: fullStars }).map((_, i) => (
              <StarIcon key={`full-${i}`} type="full" />
            ))}

            {hasHalfStar ? <StarIcon type="half" /> : null}

            {Array.from({ length: emptyStars }).map((_, i) => (
              <StarIcon key={`empty-${i}`} type="empty" />
            ))}
          </div>

          <span className="font-satoshi text-[12px] md:text-[14px] font-normal leading-[1] text-black">
            {rate.toFixed(1)}/5
          </span>
        </div>

        {/* Price row */}
        <div className="mt-[12px] flex items-center gap-[10px]">
          <span className="font-satoshi text-[20px] md:text-[24px] font-bold leading-[1] text-black">
            {formatPrice(product.price)}
          </span>

          {typeof oldPrice === 'number' && oldPrice > product.price ? (
            <span className="font-satoshi text-[20px] font-bold leading-[1] text-black/40 line-through">
              {formatPrice(oldPrice)}
            </span>
          ) : null}

          {typeof discountPercent === 'number' && discountPercent > 0 ? (
            <span className="rounded-[62px] bg-[#FFECEC] px-[8px] py-[4px] font-satoshi text-[12px] font-medium leading-[1] text-[#FF3333]">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
      </article>
    </Link>
  )
}
