import StarIcon from '@/components/ui/StarIcon'
import type { Review } from '@/lib/mock/reviews'

function StarsRow({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className="flex h-[19px] items-center gap-[2px]">
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

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="
        w-full
        
        rounded-[20px]
        border border-black/10
        bg-white
        px-[32px] py-[28px]
      "
    >
      <div className="flex w-full flex-col justify-between gap-[16px]">
        {/* Top row: stars + menu */}
        <div className="flex items-start justify-between">
          <StarsRow rating={review.rating} />

          <button
            aria-label="more"
            className="text-black/40 hover:text-black hidden md:block"
          >
            •••
          </button>
        </div>

        {/* Name + verified */}
        <div className="flex items-center gap-[8px]">
          <div className="font-satoshi text-[16px] md:text-[20px] font-bold leading-[22px] text-black">
            {review.name}
          </div>

          {review.verified ? (
            <span
              className="
                inline-flex h-[18px] w-[18px]
                items-center justify-center
                rounded-full bg-[#01AB31] text-[12px] text-white
              "
              aria-label="verified"
            >
              ✓
            </span>
          ) : null}
        </div>

        {/* Text */}
        <p className="font-satoshi text-[14px] md:text-[16px] font-normal leading-[22px] text-black/60">
          {review.text}
        </p>

        {/* Date */}
        <div className="font-satoshi text-[14px] md:text-[16px]] font-medium leading-[22px] text-black/60">
          Posted on {review.postedAt}
        </div>
      </div>
    </article>
  )
}
