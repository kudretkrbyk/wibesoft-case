'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/lib/types/product'
import StarIcon from '@/components/ui/StarIcon'
import QtyStepper from '@/components/products/ui/QtyStepper'
import { useCartStore } from '@/store/cart.store'

type Props = { product: Product }

function formatPrice(value: number) {
  return `$${Math.round(value)}`
}

// İstersen kaldır: API’de yok, figma hissi için deterministik mock
function getMockDiscountPercent(id: number) {
  if (id % 7 === 0) return 40
  if (id % 5 === 0) return 30
  if (id % 3 === 0) return 20
  return 0
}

function getMockOldPrice(price: number, discountPercent: number) {
  if (!discountPercent) return undefined
  const old = price / (1 - discountPercent / 100)
  return Math.round(old)
}

export default function ProductInfo({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<
    'olive' | 'green' | 'navy'
  >('olive')
  const [selectedSize, setSelectedSize] = useState<
    'Small' | 'Medium' | 'Large' | 'X-Large'
  >('Large')
  const [qty, setQty] = useState(1)

  const add = useCartStore((s) => s.add)

  const discount = useMemo(
    () => getMockDiscountPercent(product.id),
    [product.id],
  )
  const oldPrice = useMemo(
    () => getMockOldPrice(product.price, discount),
    [product.price, discount],
  )

  const rate = product.rating?.rate ?? 0
  const fullStars = Math.floor(rate)
  const hasHalfStar = rate - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="w-full">
      <h1 className="font-integral text-[24px] md:text-[40px] font-bold leading-[1] text-black lg:text-[44px]">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="mt-[12px] flex items-center gap-[13px]">
        <div className="flex h-[19px] w-[150px] items-center gap-[2px]">
          {Array.from({ length: fullStars }).map((_, i) => (
            <StarIcon key={`full-${i}`} type="full" />
          ))}
          {hasHalfStar ? <StarIcon type="half" /> : null}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <StarIcon key={`empty-${i}`} type="empty" />
          ))}
        </div>
        <span className="font-satoshi text-[14px] font-normal leading-[1] text-black">
          {rate.toFixed(1)}/5
        </span>
      </div>

      {/* Price */}
      <div className="mt-[18px] flex items-center gap-[12px]">
        <span className="font-satoshi text-[24px] md:text-[32px] font-bold leading-[1] text-black">
          {formatPrice(product.price)}
        </span>

        {typeof oldPrice === 'number' && oldPrice > product.price ? (
          <span className="font-satoshi text-[24px] font-bold leading-[1] text-black/30 line-through">
            {formatPrice(oldPrice)}
          </span>
        ) : null}

        {discount > 0 ? (
          <span className="rounded-[62px] bg-[#FFECEC] px-[12px] py-[6px] font-satoshi text-[12px] font-medium leading-[1] text-[#FF3333]">
            -{discount}%
          </span>
        ) : null}
      </div>

      {/* Desc */}
      <p className="mt-[16px] font-satoshi text-[14px] leading-[1.8] text-black/60">
        {product.description}
      </p>

      <div className="my-[20px] h-px w-full bg-black/10" />

      {/* Colors */}
      <div>
        <div className="font-satoshi text-[14px] font-normal text-black/60">
          Select Colors
        </div>
        <div className="mt-[12px] flex items-center gap-[12px]">
          <ColorDot
            active={selectedColor === 'olive'}
            color="#4C4631"
            onClick={() => setSelectedColor('olive')}
          />
          <ColorDot
            active={selectedColor === 'green'}
            color="#2A4B45"
            onClick={() => setSelectedColor('green')}
          />
          <ColorDot
            active={selectedColor === 'navy'}
            color="#2D2F45"
            onClick={() => setSelectedColor('navy')}
          />
        </div>
      </div>

      <div className="my-[20px] h-px w-full bg-black/10" />

      {/* Size Pills (bunlar senin verdiğin ölçülerle uyumlu: h=46 radius=62 padding 12/24 bg #F0F0F0) */}
      <div>
        <div className="font-satoshi text-[14px] font-normal text-black/60">
          Choose Size
        </div>
        <div className="mt-[12px] flex flex-wrap  gap-[8px] md:gap-[12px]">
          {(['Small', 'Medium', 'Large', 'X-Large'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={[
                ' rounded-[62px] px-[20px] py-[10px] md:px-[24px] md:py-[12px]',
                'font-satoshi text-[14px] font-medium leading-[1] transition-colors text-nowrap',
                selectedSize === s
                  ? 'bg-black text-white'
                  : 'bg-[#F0F0F0] text-black/60 hover:text-black',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="my-[24px] h-px w-full bg-black/10" />

      {/* Qty + Add */}
      <div className="flex  gap-[12px] md:gap-[14px]  sm:items-center sm:gap-[16px]">
        <QtyStepper value={qty} onChange={setQty} />

        <button
          onClick={() =>
            add(product, qty, { size: selectedSize, color: selectedColor })
          }
          className="
            h-[44px] md:h-[52px] flex-1 rounded-[62px] bg-black px-[16px] md:px-[24px]
            font-satoshi text-[16px] font-medium text-white
            hover:bg-black/90 active:translate-y-[1px]
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function ColorDot({
  color,
  active,
  onClick,
}: {
  color: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative h-[36px] w-[36px] rounded-full border border-black/10"
      style={{ backgroundColor: color }}
      aria-label="color"
    >
      {active ? (
        <span className="absolute inset-0 flex items-center justify-center text-white">
          ✓
        </span>
      ) : null}
    </button>
  )
}
