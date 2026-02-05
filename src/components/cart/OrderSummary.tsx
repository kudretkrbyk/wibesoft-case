'use client'

import { useMemo, useState } from 'react'
import { money } from '@/lib/money'

function Row({
  label,
  value,
  bold,
  valueClassName,
}: {
  label: string
  value: string
  bold?: boolean
  valueClassName?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className={bold ? 'font-medium text-black' : 'text-black/60'}>
        {label}
      </div>
      <div
        className={[
          'text-black',
          bold ? 'font-bold' : 'font-medium',
          valueClassName ?? '',
        ].join(' ')}
      >
        {value}
      </div>
    </div>
  )
}

export default function OrderSummary({ subtotal }: { subtotal: number }) {
  const [promo, setPromo] = useState('')

  // Figma mock
  const discountRate = 0.2
  const discount = useMemo(
    () => (subtotal > 0 ? subtotal * discountRate : 0),
    [subtotal],
  )
  const deliveryFee = subtotal > 0 ? 15 : 0
  const total = Math.max(0, subtotal - discount + deliveryFee)

  return (
    <div className="rounded-[20px] border border-black/10 p-[20px]">
      <div className="font-satoshi text-[20px] font-bold leading-[1] text-black">
        Order Summary
      </div>

      <div className="mt-[16px] space-y-[12px] font-satoshi text-[14px]">
        <Row label="Subtotal" value={money(subtotal)} />
        <Row
          label={`Discount (-${Math.round(discountRate * 100)}%)`}
          value={`-${money(discount)}`}
          valueClassName="text-[#FF3333]"
        />
        <Row label="Delivery Fee" value={money(deliveryFee)} />
        <div className="h-px w-full bg-black/10" />
        <Row label="Total" value={money(total)} bold />
      </div>

      <div className="mt-[16px] flex gap-[10px]">
        <div className="flex h-[46px] flex-1 items-center gap-[8px] rounded-[62px] bg-[#F0F0F0] px-[16px]">
          <span className="text-black/40">🏷</span>
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Add promo code"
            className="w-full bg-transparent font-satoshi text-[14px] outline-none placeholder:text-black/40"
          />
        </div>

        <button className="h-[46px] rounded-[62px] bg-black px-[18px] font-satoshi text-[14px] font-medium text-white">
          Apply
        </button>
      </div>

      <button className="mt-[14px] flex h-[52px] w-full items-center justify-center gap-[10px] rounded-[62px] bg-black font-satoshi text-[14px] font-medium text-white hover:bg-black/90">
        Go to Checkout <span className="translate-y-[-1px]">→</span>
      </button>
    </div>
  )
}
