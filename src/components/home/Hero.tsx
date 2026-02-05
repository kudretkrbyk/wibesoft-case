import Image from 'next/image'
import BrandBar from './BrandBar'
import { Button } from '@/components/ui/Button'
const STATS = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
] as const

export default function Hero() {
  return (
    <section className="w-full">
      {/* HERO WRAPPER */}
      <div className="relative w-full overflow-hidden bg-[#F2F0F1]">
        {/* XL+ DESKTOP IMAGE: background gibi, sağ yarıyı kaplar */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 xl:block">
          <Image
            src="/images/hero/hero-model.png"
            alt=""
            fill
            priority={false}
           sizes="(min-width: 1280px) 50vw, 0px"
            className="object-cover object-right"
          />
        </div>

        {/* XL+ STARS: background katmanı üstünde */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
          <Image
            src="/images/hero/star.svg"
            alt=""
            aria-hidden="true"
            width={104}
            height={104}
            className="absolute right-[80px] top-[64px]"
            priority={false}
          />
          <Image
            src="/images/hero/star.svg"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="absolute left-[55%] top-[52%]"
            priority={false}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 px-[16px] md:px-[100px]">
          {/* xl+ yan yana layout (sağ kolon boş: sadece yerleşim için) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 xl:min-h-[663px]">
            {/* LEFT */}
            <div className="pt-[40px] sm:pt-[64px] xl:pt-0 xl:flex xl:flex-col xl:justify-center">
              <h1
                className="
                  font-integral font-extrabold text-black
                  text-[36px] leading-[34px]
                  sm:text-[48px] sm:leading-[48px]
                  md:text-[64px] md:leading-[64px]
                "
              >
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </h1>

              <p
                className="
                  mt-3 max-w-[520px] font-satoshi text-black/60
                  text-[14px] leading-[20px]
                  sm:mt-4 sm:text-[16px] sm:leading-[22px]
                "
              >
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>

              <Button
                type="button"
                className="
    mt-6 h-[52px] rounded-[62px]
    w-full max-w-[358px] px-[54px]
    sm:mt-8 sm:w-[210px] sm:max-w-none sm:px-0
  "
              >
                Shop Now
              </Button>

              {/* STATS */}
              <div className="mt-8 sm:mt-12">
                {/* xs: 2+1 grid, sm+: tek satır flex + divider */}
                <div className="grid grid-cols-2 gap-y-6 sm:flex sm:items-start sm:gap-0">
                  {STATS.map((s, i) => {
                    const isMobileTopLeft = i === 0
                    const isMobileTopRight = i === 1
                    const isMobileBottom = i === 2

                    return (
                      <div
                        key={s.value}
                        className={[
                          // sm+ flex item
                          'flex items-start sm:items-start',
                          // mobile bottom item centered
                          isMobileBottom
                            ? 'col-span-2 justify-center text-center'
                            : '',
                          // mobile divider between first two
                          isMobileTopLeft
                            ? 'pr-6 border-r border-black/10 sm:border-0 sm:pr-0'
                            : '',
                          isMobileTopRight ? 'pl-6 sm:pl-0' : '',
                        ].join(' ')}
                      >
                        {/* content */}
                        <div className="sm:px-6 md:px-8 xl:px-10">
                          <div
                            className="
                font-satoshi font-bold text-black
                text-[24px] leading-[24px]
                sm:text-[32px] sm:leading-[32px]
                lg:text-[40px] lg:leading-[40px]
              "
                          >
                            {s.value}
                          </div>

                          <div
                            className="
                mt-2 font-satoshi text-black/60
                text-[12px] leading-[22px]
                sm:text-[14px] sm:leading-[22px]
                lg:text-[16px] lg:leading-[22px]
              "
                          >
                            {s.label}
                          </div>
                        </div>

                        {/* divider: sm+ her zaman görünür (aralarda kaybolmaz) */}
                        {i !== STATS.length - 1 && (
                          <div className="hidden sm:block h-[74px] w-px bg-black/10" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT (XL+): sadece spacing için boş kolon */}
            <div className="hidden xl:block" />
          </div>

          <div className="mt-10 xl:hidden">
            <div className="relative w-full aspect-[390/448]">
              {/* Mobil görsel */}
              <Image
                src="/images/hero/hero-model-mobil.png"
                alt=""
                fill
                sizes="100vw"
                priority
                className="object-contain object-bottom"
              />

              {/* Mobil yıldızlar */}
              <Image
                src="/images/hero/star.svg"
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                className="absolute right-[24px] top-[32px]"
              />

              <Image
                src="/images/hero/star.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="absolute left-[20px] top-[250px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BRAND BAR */}
      <BrandBar />
    </section>
  )
}
