'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import StarIcon from '@/components/ui/StarIcon'
import { MOCK_REVIEWS } from '@/lib/mock/reviews'

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className="flex items-center gap-[6.5px]">
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon key={`f-${i}`} type="full" />
      ))}
      {half ? <StarIcon type="half" /> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon key={`e-${i}`} type="empty" />
      ))}
    </div>
  )
}

function VerifiedTick() {
  return (
    <span
      className="inline-flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#01AB31] text-[14px] text-white md:h-[24px] md:w-[24px]"
      aria-label="verified"
      title="Verified"
    >
      ✓
    </span>
  )
}

type Review = (typeof MOCK_REVIEWS)[number]

function getVisibleCount() {
  // 1 (mobile) -> 2 (sm+) -> 3 (lg+)
  if (typeof window === 'undefined') return 3
  const w = window.innerWidth
  if (w >= 1024) return 3
  if (w >= 640) return 2
  return 1
}

export default function HappyCustomers() {
  const base = useMemo(() => MOCK_REVIEWS.slice(0, 10), [])
  const n = base.length

  const GAP = 20

  // 1/2/3 görünür
  const [visible, setVisible] = useState(() => getVisibleCount())

  // viewport width (padding hariç gerçek alan)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportW, setViewportW] = useState(0)

  useEffect(() => {
    const onResize = () => setVisible(getVisibleCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ResizeObserver: viewport'un gerçek genişliğini oku
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0
      setViewportW(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // kart genişliği: ekrana tam otursun
  const cardW = useMemo(() => {
    if (!viewportW) return 0
    const w = (viewportW - GAP * (visible - 1)) / visible
    return Math.floor(w) // px rounding (subpixel jitter azaltır)
  }, [viewportW, visible])

  const STEP = cardW + GAP

  // clones = visible (sonsuz loop stabil)
  const CLONES = visible

  const track = useMemo(() => {
    const head = base.slice(0, CLONES)
    const tail = base.slice(-CLONES)
    return [...tail, ...base, ...head]
  }, [base, CLONES])

  const [index, setIndex] = useState(CLONES)
  const [transitionOn, setTransitionOn] = useState(true)

  // visible / cardW değişince index reset (kırılma olmasın)
  useEffect(() => {
    setTransitionOn(false)
    setIndex(CLONES)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTransitionOn(true)),
    )
  }, [CLONES, cardW])

  const goNext = () => {
    if (!cardW) return
    setTransitionOn(true)
    setIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (!cardW) return
    setTransitionOn(true)
    setIndex((i) => i - 1)
  }

  const onTransitionEnd = () => {
    if (index >= CLONES + n) {
      setTransitionOn(false)
      setIndex((i) => i - n)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionOn(true)),
      )
      return
    }

    if (index < CLONES) {
      setTransitionOn(false)
      setIndex((i) => i + n)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionOn(true)),
      )
    }
  }

  // ReviewCard artık width'i dışarıdan alıyor
  const ReviewCard = ({ r }: { r: Review }) => (
    <article
      className="
        h-[240px]
        rounded-[20px]
        border border-black/10
        bg-white
        px-[32px] py-[28px]
      "
      style={{ width: cardW, minWidth: cardW }}
    >
      <div className="flex h-full flex-col justify-between">
        <Stars rating={r.rating} />

        <div className="mt-[14px] flex items-center gap-[8px]">
          <div className="font-satoshi text-[16px] font-bold leading-[22px] text-black md:text-[20px]">
            {r.name}
          </div>
          {r.verified ? <VerifiedTick /> : null}
        </div>

        <p className="mt-[10px] line-clamp-4 font-satoshi text-[14px] font-normal leading-[22px] text-black/60 md:text-[16px]">
          {r.text}
        </p>
      </div>
    </article>
  )

  return (
    <section className="mb-40 w-full md:mb-0">
      <div className="px-[16px] py-[25px] sm:px-[32px] sm:py-[32px] md:px-[100px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-integral text-[32px] font-bold leading-[1] text-black md:text-[48px]">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-[14px] py-2">
            <button
              onClick={goPrev}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-black/5"
              aria-label="previous"
              type="button"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-black/5"
              aria-label="next"
              type="button"
            >
              →
            </button>
          </div>
        </div>

        {/* Viewport: padding hariç kalan alana %100 oturur */}
        <div ref={viewportRef} className="mt-[32px] w-full overflow-hidden">
          <div
            className="flex"
            onTransitionEnd={onTransitionEnd}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${-index * STEP}px)`,
              transition: transitionOn ? 'transform 450ms ease' : 'none',
              willChange: 'transform',
            }}
          >
            {track.map((r, i) => (
              <ReviewCard key={`${r.id}-${i}`} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
