'use client'

import { useMemo } from 'react'

type Props = {
  /** Controlled price range */
  minPossible: number
  maxPossible: number
  priceMin: number
  priceMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void

  /** NEW: real categories filter */
  categories?: string[]
  selectedCategory?: string
  onSelectCategory?: (category: string) => void

  /** UI behaviour */
  onApply?: () => void
  showApply?: boolean
  /** panel modunda X butonu göstermek istersen */
  onClose?: () => void
  /** panelde “Filters” headerındaki icon yerine X koymak için */
  headerVariant?: 'default' | 'panel'
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(n, b))
}

function titleCase(s: string) {
  return s
    .toLowerCase()
    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function FiltersSidebar({
  minPossible,
  maxPossible,
  priceMin,
  priceMax,
  onChangeMin,
  onChangeMax,

  categories,
  selectedCategory,
  onSelectCategory,

  onApply,
  showApply = true,
  onClose,
  headerVariant = 'default',
}: Props) {
  const bounds = useMemo(() => {
    const a = Math.min(minPossible, maxPossible)
    const b = Math.max(minPossible, maxPossible)
    return { min: a, max: b }
  }, [minPossible, maxPossible])

  const safeMin = clamp(priceMin, bounds.min, bounds.max)
  const safeMax = clamp(priceMax, bounds.min, bounds.max)

  const minPct =
    bounds.max === bounds.min
      ? 0
      : ((safeMin - bounds.min) / (bounds.max - bounds.min)) * 100
  const maxPct =
    bounds.max === bounds.min
      ? 100
      : ((safeMax - bounds.min) / (bounds.max - bounds.min)) * 100

  const isRealCategoryMode = (categories?.length ?? 0) > 0

  return (
    <aside
      className="
        w-full
        lg:w-[295px]
        h-auto
        lg:h-[1220px]
        rounded-[20px]
        border border-black/10
        bg-white
        px-[24px] py-[20px]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-satoshi text-[20px] font-bold leading-[1]">
          Filters
        </h2>

        {headerVariant === 'panel' ? (
          <button
            type="button"
            aria-label="Close filters"
            className="h-[24px] w-[24px] rounded-full text-[16px] text-black/60"
            onClick={onClose}
          >
            ✕
          </button>
        ) : (
          <button
            type="button"
            aria-label="Filters settings"
            className="h-[24px] w-[24px] rounded-full border border-black/10 text-[12px]"
          >
            ⎘
          </button>
        )}
      </div>

      <div className="mt-[24px] flex flex-col gap-[24px]">
        {/* Categories list */}
        <div>
          <div className="flex flex-col gap-[20px] font-satoshi text-[16px] font-normal leading-[1] text-black/60">
            {(isRealCategoryMode
              ? (categories as string[])
              : ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
            ).map((t) => {
              const active = isRealCategoryMode && selectedCategory === t

              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    if (isRealCategoryMode) onSelectCategory?.(t)
                  }}
                  className={[
                    'flex items-center justify-between text-left hover:text-black',
                    active ? 'text-black font-medium' : '',
                  ].join(' ')}
                  aria-current={active ? 'true' : undefined}
                >
                  <span>{isRealCategoryMode ? titleCase(t) : t}</span>
                  <span className="text-black/40">›</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Price (REAL) */}
        <div className="flex flex-col gap-[20px]">
          <h3 className="font-satoshi text-[20px] font-bold leading-[1]">
            Price
          </h3>

          <div className="flex flex-col gap-[12px]">
            <div className="relative h-[26px]">
              {/* track */}
              <div className="absolute top-1/2 h-[4px] w-full -translate-y-1/2 rounded-full bg-black/10" />

              {/* active range */}
              <div
                className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-black"
                style={{
                  left: `${minPct}%`,
                  width: `${Math.max(0, maxPct - minPct)}%`,
                }}
              />

              {/* knobs */}
              <div
                className="absolute top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ left: `${minPct}%` }}
              />
              <div
                className="absolute top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ left: `${maxPct}%` }}
              />

              {/* Invisible real inputs on top */}
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                value={safeMin}
                onChange={(e) => {
                  const next = Number(e.target.value)
                  const nextMin = Math.min(next, safeMax)
                  onChangeMin(nextMin)
                }}
                className="absolute inset-0 w-full opacity-0"
                aria-label="Min price"
              />
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                value={safeMax}
                onChange={(e) => {
                  const next = Number(e.target.value)
                  const nextMax = Math.max(next, safeMin)
                  onChangeMax(nextMax)
                }}
                className="absolute inset-0 w-full opacity-0"
                aria-label="Max price"
              />
            </div>

            {/* labels */}
            <div className="flex items-center justify-between">
              <span className="font-satoshi text-[14px] font-medium leading-[1] text-black">
                ${safeMin}
              </span>
              <span className="font-satoshi text-[14px] font-medium leading-[1] text-black">
                ${safeMax}
              </span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Colors (UI-only) */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <h3 className="font-satoshi text-[20px] font-bold leading-[1]">
              Colors
            </h3>
            <span className="text-black/40">⌃</span>
          </div>

          <div className="grid grid-cols-5 gap-[10px]">
            {[
              '#00C12B',
              '#F50606',
              '#F5DD06',
              '#F57906',
              '#06CAF5',
              '#063AF5',
              '#7D06F5',
              '#F506A4',
              '#FFFFFF',
              '#000000',
            ].map((c, i) => (
              <button
                key={c}
                className="h-[20px] w-[20px] rounded-full border border-black/10"
                style={{ backgroundColor: c }}
                aria-label={`color-${i}`}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Size (UI-only) */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <h3 className="font-satoshi text-[20px] font-bold leading-[1]">
              Size
            </h3>
            <span className="text-black/40">⌃</span>
          </div>

          <div className="flex flex-wrap gap-[8px]">
            {[
              'XX-Small',
              'X-Small',
              'Small',
              'Medium',
              'Large',
              'X-Large',
              'XX-Large',
              '3X-Large',
              '4X-Large',
            ].map((s) => (
              <button
                key={s}
                type="button"
                className="
                  rounded-[62px]
                  border border-black/10
                  px-[14px] py-[8px]
                  font-satoshi text-[12px] font-medium
                  text-black/60
                  hover:text-black
                "
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Dress Style (UI-only) */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <h3 className="font-satoshi text-[20px] font-bold leading-[1]">
              Dress Style
            </h3>
            <span className="text-black/40">⌃</span>
          </div>

          <div className="flex flex-col gap-[16px] font-satoshi text-[16px] font-normal leading-[1] text-black/60">
            {['Casual', 'Formal', 'Party', 'Gym'].map((t) => (
              <button
                key={t}
                className="flex items-center justify-between hover:text-black"
                type="button"
              >
                <span>{t}</span>
                <span className="text-black/40">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Apply Filter */}
        {showApply && (
          <button
            type="button"
            className="
              mt-[8px]
              h-[48px]
              w-full
              rounded-[62px]
              bg-black
              font-satoshi
              text-[14px]
              font-medium
              text-white
            "
            onClick={onApply}
          >
            Apply Filter
          </button>
        )}
      </div>
    </aside>
  )
}
