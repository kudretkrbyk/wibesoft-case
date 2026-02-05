import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '@/lib/types/product'

export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  qty: number

  // Figma’da var ama API’de yok → opsiyonel “mock seçenekler”
  size?: string
  color?: string
}

type CartState = {
  items: CartItem[]

  // actions
  add: (
    product: Product,
    qty?: number,
    meta?: { size?: string; color?: string },
  ) => void
  remove: (id: number) => void
  setQty: (id: number, qty: number) => void
  clear: () => void

  // selectors as functions (component içinde hesaplamak yerine store’dan)
  totalItems: () => number
  subtotal: () => number
}

function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1
  return Math.max(1, Math.min(99, Math.floor(qty)))
}

// SSR-safe storage (server’da localStorage yok)
const storage =
  typeof window !== 'undefined'
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => ({
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      }))

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, qty = 1, meta) => {
        const addQty = clampQty(qty)

        set((state) => {
          const idx = state.items.findIndex((it) => it.id === product.id)

          // normalize item
          const base: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: addQty,
            size: meta?.size,
            color: meta?.color,
          }

          if (idx === -1) {
            return { items: [base, ...state.items] }
          }

          const copy = state.items.slice()
          const current = copy[idx]
          copy[idx] = { ...current, qty: clampQty(current.qty + addQty) }
          return { items: copy }
        })
      },

      remove: (id) => {
        set((state) => ({ items: state.items.filter((it) => it.id !== id) }))
      },

      setQty: (id, qty) => {
        const nextQty = clampQty(qty)
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, qty: nextQty } : it,
          ),
        }))
      },

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, it) => sum + it.qty, 0),

      subtotal: () =>
        get().items.reduce((sum, it) => sum + it.price * it.qty, 0),
    }),
    {
      name: 'shopco-cart-v1',
      storage,
      version: 1,
      // sadece items’ı persist et (selector fonksiyonlarını değil)
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
