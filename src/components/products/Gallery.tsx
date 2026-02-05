'use client'

import { useState } from 'react'

type Props = {
  imageSrc: string
  title: string
}

const VARIANTS = [
  { id: 0, imgClass: 'object-contain' },
  { id: 1, imgClass: 'object-contain scale-[1.08]' },
  { id: 2, imgClass: 'object-contain scale-[1.12] translate-y-[6px]' },
] as const

export default function Gallery({ imageSrc, title }: Props) {
  const [active, setActive] = useState<(typeof VARIANTS)[number]['id']>(0)
  const activeVariant = VARIANTS.find((v) => v.id === active) ?? VARIANTS[0]

  return (
    <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-[150px_1fr] lg:items-start">
      {/* Thumbs */}
      <div className="order-2 flex gap-[12px] lg:order-1 lg:flex-col lg:gap-[16px]">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={[
              // ✅ w-full: kolon genişliğine otursun
              // ✅ lg:h: figma’daki dikey thumb hissi
              'relative h-[110px] w-full overflow-hidden rounded-[20px] bg-[#F0EEED] sm:h-[130px] lg:h-[170px]',
              v.id === active
                ? 'border border-black'
                : 'border border-black/10',
            ].join(' ')}
            aria-label={`thumb-${v.id}`}
            type="button"
          >
            <img
              src={imageSrc}
              alt={title}
              className={['h-full w-full', v.imgClass].join(' ')}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="order-1 rounded-[20px] bg-[#F0EEED] p-[24px] lg:order-2">
        <div className="flex h-[520px] items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className={[
              'h-[480px] w-auto transition-transform duration-200',
              activeVariant.imgClass,
            ].join(' ')}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
