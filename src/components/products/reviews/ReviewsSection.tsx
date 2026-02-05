'use client'

import { useState } from 'react'
import { MOCK_REVIEWS } from '@/lib/mock/reviews'
import ReviewCard from './ReviewCard'

export default function ReviewsSection() {
  const [page, setPage] = useState(1)
  const pageSize = 6

  const visibleDesktop = MOCK_REVIEWS.slice(0, page * pageSize)

  return (
    <section>
      {/* header */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="font-satoshi text-[20px] font-bold">
          All Reviews{' '}
          <span className="text-[14px] font-normal text-black/40">
            ({MOCK_REVIEWS.length})
          </span>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
        {MOCK_REVIEWS.map((r, i) => (
          <div
            key={r.id}
            className={`
              ${i >= 3 ? 'hidden lg:block' : ''}
              ${i >= visibleDesktop.length ? 'lg:hidden' : ''}
            `}
          >
            <ReviewCard review={r} />
          </div>
        ))}
      </div>

      {/* load more (mobil + desktop) */}
      {(visibleDesktop.length < MOCK_REVIEWS.length ||
        MOCK_REVIEWS.length > 3) && (
        <div className="mt-[28px] flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="
              h-[52px]
              rounded-[62px]
              border border-black/10
              px-[54px]
              font-satoshi text-[16px] font-medium
              hover:bg-black hover:text-white
              transition-colors
            "
          >
            Load More Reviews
          </button>
        </div>
      )}
    </section>
  )
}
