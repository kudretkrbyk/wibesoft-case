import Image from 'next/image'
import Link from 'next/link'

const items = [
  {
    label: 'Casual',
    slug: 'casual',
    src: '/images/browse-style/Casual.png',
    className: 'sm:col-span-1 lg:col-span-1',
  },
  {
    label: 'Formal',
    slug: 'formal',
    src: '/images/browse-style/Formal.png',
    className: 'sm:col-span-1 lg:col-span-2',
  },
  {
    label: 'Party',
    slug: 'party',
    src: '/images/browse-style/Party.png',
    className: 'sm:col-span-1 lg:col-span-2',
  },
  {
    label: 'Gym',
    slug: 'gym',
    src: '/images/browse-style/Gym.png',
    className: 'sm:col-span-1 lg:col-span-1',
  },
] as const

export default function BrowseByStyle() {
  return (
    <section className="">
      {/* container: desktop side padding = 100px (figma) */}
      <div className="px-[16px] sm:px-[32px] md:px-[100px] py-[25px] sm:py-[32px]">
        <div className="rounded-[40px] bg-[#F0F0F0] py-[64px] ">
          {/* Title */}
          <h2 className="text-center font-integral text-[32px] md:text-[48px] font-bold leading-[1] text-black p-2  ">
            BROWSE BY DRESS STYLE
          </h2>

          {/* Grid */}
          <div className="mt-[40px] grid grid-cols-1 gap-[16px]  lg:grid-cols-3 lg:gap-[20px] px-[24px] md:px-[64px]">
            {items.map((it) => (
              <Link
                key={it.label}
                href={`/category/${it.slug}`}
                className={[
                  'group relative overflow-hidden rounded-[20px] bg-white',
                  'h-[190px] sm:h-[220px] lg:h-[289px]',
                  it.className,
                ].join(' ')}
              >
                {/* Label */}
                <div className="absolute left-[24px] top-[24px] z-10 font-satoshi text-[24px] md:text-[36px] font-bold leading-[1] text-black">
                  {it.label}
                </div>

                {/* Image */}
                <Image
                  src={it.src}
                  alt={it.label}
                  fill
                  className="object-contain  object-right-top transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                />

                {/* Subtle overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/60 via-white/0 to-transparent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
