'use client'

import { useCartStore } from '@/store/cart.store'
import CartItemRow from '@/components/cart/CartItemRow'
import OrderSummary from '@/components/cart/OrderSummary'
import EmptyCart from '@/components/cart/EmptyCart'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.remove)
  const setQty = useCartStore((s) => s.setQty)
  const clear = useCartStore((s) => s.clear)
  const subtotal = useCartStore((s) => s.subtotal())

  return (
    <div className="w-full">
      <div className="px-4 md:px-[100px] py-[24px]">
        <div className="h-px w-full bg-black/10" />
        <div className="py-4 font-satoshi text-[14px] text-black/60">
          Home <span className="mx-1">›</span> Cart
        </div>

        <div className="mb-[18px] flex items-center justify-between">
          <h1 className="font-integral text-[40px] font-bold leading-[1] text-black">
            YOUR CART
          </h1>

          {items.length > 0 ? (
            <button
              onClick={clear}
              className="font-satoshi text-[14px] font-medium text-black/60 hover:text-black"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr_360px]">
            <div className="rounded-[20px] border border-black/10 p-[20px]">
              <div className="flex flex-col gap-[18px]">
                {items.map((it) => (
                  <CartItemRow
                    key={it.id}
                    item={it}
                    onRemove={() => remove(it.id)}
                    onDec={() => setQty(it.id, it.qty - 1)}
                    onInc={() => setQty(it.id, it.qty + 1)}
                  />
                ))}
              </div>
            </div>

            <OrderSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </div>
  )
}
