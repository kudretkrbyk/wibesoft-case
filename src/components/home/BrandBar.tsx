import Image from 'next/image'

const BRANDS = [
  { alt: 'Versace', src: '/images/brands/versace.svg' },
  { alt: 'Zara', src: '/images/brands/zara.svg' },
  { alt: 'Gucci', src: '/images/brands/gucci.svg' },
  { alt: 'Prada', src: '/images/brands/prada.svg' },
  { alt: 'Calvin Klein', src: '/images/brands/calvin.svg' },
] as const

export default function BrandBar() {
  const topRow = BRANDS.slice(0, 3)
  const bottomRow = BRANDS.slice(3)

  return (
    <section className="w-full bg-black">
      <div className="mx-auto max-w-[1240px] px-4">
        {/* MOBILE GRID */}
        <div className="grid grid-cols-3 place-items-center gap-x-6 gap-y-4 py-6 sm:hidden">
          {topRow.map((b) => (
            <div
              key={b.alt}
              className="relative h-[23px] w-[116px] md:h-[26px] md:w-[120px]"
            >
              <Image src={b.src} alt={b.alt} fill className="object-contain" />
            </div>
          ))}

          {/* bottom row: 2 logos together */}
          <div className="col-span-3 flex items-center justify-center gap-x-10">
            {bottomRow.map((b) => (
              <div
                key={b.alt}
                className="relative h-[23px] w-[116px] md:h-[26px] md:w-[120px]"
              >
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP FLEX */}
        <div className="hidden sm:flex sm:h-[122px] sm:items-center sm:justify-between sm:gap-6">
          {BRANDS.map((b) => (
            <div key={b.alt} className="relative h-[40px] w-[220px]">
              <Image
                src={b.src}
                alt={b.alt}
                fill
                className="object-contain"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
