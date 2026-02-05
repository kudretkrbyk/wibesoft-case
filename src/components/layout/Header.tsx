'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, ChevronDown, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart.store'
import PromoBar from './PromoBar'

const NAV = [
  { label: 'Shop', href: '/shop', hasDropdown: true },
  { label: 'On Sale', href: '/on-sale' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Brands', href: '/brands', hasDropdown: false },
] as const

export default function Header() {
  const pathname = usePathname()
  const totalItems = useCartStore((s) => s.totalItems())

  const isHome = pathname === '/'

  return (
    <>
      <PromoBar />

      <header className="w-full bg-white py-[24px]">
        {/* container: padding aynen korunuyor */}
        <div className="w-full px-[16px] sm:px-[32px] md:px-[100px]">
          <div className="flex h-[48px] items-center">
            {/* LEFT: hamburger + logo */}
            <div className="flex items-center gap-[16px]">
              <button
                type="button"
                className="md:hidden"
                aria-label="Menu"
                title="Menu"
              >
                <Menu className="h-[24px] w-[24px] text-black" />
              </button>

              <Link
                href="/"
                className="shrink-0 font-integral text-[25px] md:text-[32px] font-extrabold leading-none text-black"
              >
                SHOP.CO
              </Link>
            </div>

            {/* Nav (desktop) */}
            <nav className="ml-[40px] hidden items-center gap-6 md:flex text-nowrap">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={false}
                  className="flex items-center gap-1 font-satoshi text-[16px] font-normal leading-none text-black hover:opacity-80"
                >
                  <span>{item.label}</span>
                 
                    <ChevronDown className="h-4 w-4" />
                 
                </Link>
              ))}
            </nav>

            {/* Search + Icons */}
            <div className="ml-auto flex items-center gap-4">
              {/* Desktop search */}
              <div className="hidden lg:block">
                <div className="flex h-[48px] items-center gap-3 rounded-[62px] bg-[#F0F0F0] px-4 w-auto  xl:w-[577px]">
                  <Search className="h-5 w-5 text-black/40" />
                  <input
                    className="w-full bg-transparent font-satoshi text-[16px] font-normal leading-none text-black outline-none placeholder:text-black/40"
                    placeholder="Search for products..."
                  />
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="lg:hidden"
                  aria-label="Search"
                  title="Search"
                >
                  <Search className="h-[24px] w-[24px] text-black" />
                </button>

                {/* Cart with badge */}
                <Link
                  href="/cart"
                  aria-label="Cart"
                  title="Cart"
                  className="relative"
                >
                  <ShoppingCart className="h-[24px] w-[24px] text-black" />

                  {totalItems > 0 && (
                    <span
                      className="absolute -right-2 -top-2
                        flex h-[18px] min-w-[18px] items-center justify-center
                        rounded-full bg-black px-[5px]
                        font-satoshi text-[10px] font-bold text-white"
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>

                <Link href="/account" aria-label="Account" title="Account">
                  <User className="h-[24px] w-[24px] text-black" />
                </Link>
              </div>
            </div>
          </div>

          {/* Alt çizgi – sadece HOME dışında */}
          {!isHome && <div className="mt-[24px] h-px w-full bg-black/10" />}
        </div>
      </header>
    </>
  )
}
