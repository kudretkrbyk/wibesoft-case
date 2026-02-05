'use client'

import { useState } from 'react'
import ReviewsSection from './reviews/ReviewsSection'

type TabKey = 'details' | 'reviews' | 'faqs'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'details', label: 'Product Details' },
  { key: 'reviews', label: 'Rating & Reviews' },
  { key: 'faqs', label: 'FAQs' },
]

export default function ProductTabs() {
  const [active, setActive] = useState<TabKey>('reviews') // figma’da default bu

  return (
    <div className="">
      {/* Tabs row */}
      <div className="relative flex items-center justify-between">
        {TABS.map((t) => {
          const isActive = t.key === active

          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className="relative pb-[14px]"
            >
              <span
                className={[
                  'font-satoshi text-[16px] leading-[1]',
                  isActive
                    ? 'font-bold text-black'
                    : 'font-normal text-black/50 hover:text-black',
                ].join(' ')}
              >
                {t.label}
              </span>

              {/* Active underline */}
              {isActive && (
                <span
                  className="
                    absolute left-0 right-0 bottom-0
                    h-[2px] bg-black
                  "
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Base divider line */}
      <div className="h-px w-full bg-black/10" />

      {/* Content */}
      <div className="mt-[24px]">
        {active === 'details' && (
          <div className="font-satoshi text-[14px] leading-[1.8] text-black/70">
            Product details content (placeholder).
          </div>
        )}

        {active === 'reviews' && <ReviewsSection />}

        {active === 'faqs' && (
          <div className="font-satoshi text-[14px] leading-[1.8] text-black/70">
            FAQs content (placeholder).
          </div>
        )}
      </div>
    </div>
  )
}
