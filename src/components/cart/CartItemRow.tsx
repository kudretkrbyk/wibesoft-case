'use client'

import QtyStepper from '@/components/cart/QtyStepper'
import type { CartItem } from '@/store/cart.store'
import { money } from '@/lib/money'

export default function CartItemRow({
  item,
  onRemove,
  onDec,
  onInc,
}: {
  item: CartItem
  onRemove: () => void
  onDec: () => void
  onInc: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-[16px] border-b border-black/5 pb-[18px] last:border-b-0 last:pb-0">
      {/* left */}
      <div className="flex gap-[16px]">
        <div className="flex h-[124px] w-[90px] items-center justify-center overflow-hidden rounded-[12px] bg-[#F0EEED]">
          <img
            src={item.image}
            alt={item.title}
            className="h-[80px] w-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <div className="font-satoshi text-[16px] font-bold leading-[1.2] text-black line-clamp-2">
            {item.title}
          </div>

          <div className="mt-[8px] space-y-[4px] font-satoshi text-[12px] text-black/60">
            <div>
              Size:{' '}
              <span className="text-black/80">{item.size ?? 'Large'}</span>
            </div>
            <div>
              Color:{' '}
              <span className="text-black/80">{item.color ?? 'White'}</span>
            </div>
          </div>

          <div className="mt-[10px] font-satoshi text-[18px] font-bold leading-[1] text-black">
            {money(item.price)}
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-col items-end gap-[12px]">
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-600"
          aria-label="remove"
          title="Remove"
        >
          🗑
        </button>

        <QtyStepper value={item.qty} onDec={onDec} onInc={onInc} />
      </div>
    </div>
  )
}
