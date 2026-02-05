'use client'

type Props = {
  current: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  onPage: (page: number) => void
}

export default function Pagination({
  current,
  totalPages,
  onPrev,
  onNext,
  onPage,
}: Props) {
  const pages = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, i) => i + 1,
  )

  return (
    <div className="flex items-center justify-between gap-[12px]">
      {/* Prev */}
      <button
        onClick={onPrev}
        className="
          flex h-[40px] items-center gap-[8px]
          rounded-[8px] border border-black/10
          px-[14px]
          font-satoshi text-[14px] font-medium
        "
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Pages */}
      <div className="flex items-center gap-[6px]">
        {pages.map((p) => {
          const active = p === current
          return (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={[
                'h-[36px] w-[36px] rounded-[8px]',
                'font-satoshi text-[14px] font-medium',
                active
                  ? 'bg-black/5 text-black'
                  : 'text-black/60 hover:bg-black/5',
              ].join(' ')}
            >
              {p}
            </button>
          )
        })}
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        className="
          flex h-[40px] items-center gap-[8px]
          rounded-[8px] border border-black/10
          px-[14px]
          font-satoshi text-[14px] font-medium
        "
      >
        <span className="hidden sm:inline">Next</span> →
      </button>
    </div>
  )
}
