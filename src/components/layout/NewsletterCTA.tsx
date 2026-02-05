'use client'

import { Mail } from 'lucide-react'

export default function NewsletterCTA() {
  return (
    <section className="w-full px-[16px] md:px-[100px]">
      <div className="mx-auto  ">
        <div
          className=" w-full
            flex flex-col lg:flex-row min-h-[180px] items-center justify-center md:justify-between
            rounded-[20px] bg-black px-[24px] py-[24px] sm:px-[32px] sm:py-[32px]
            lg:px-[64px] lg:py-[36px] gap-6
            md:gap-8
          "
        >
          {/* LEFT */}
          <h3 className="w-full block md:hidden text-white font-extrabold font-integral leading-none tracking-[-0.02em] text-[32px] md:text-[36px] lg:text-[40px]">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h3>
          <h3 className="w-full hidden md:block text-white font-extrabold font-integral leading-none tracking-[-0.02em] text-[32px] md:text-[36px] lg:text-[40px]">
            STAY UPTO DATE ABOUT <br />
            OUR LATEST OFFERS
          </h3>

          {/* RIGHT */}
          <div className=" w-full">
            <form
              className="flex w-full  flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                e.currentTarget.reset()
              }}
            >
              <label className="relative w-full">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  size={18}
                  color="rgba(0,0,0,0.35)"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="
                  h-[46px] w-full rounded-full bg-white
                  pl-11 pr-4
                  text-[14px] md:text-[16px] text-black
                  outline-none
                  placeholder:text-black/40
                "
                />
              </label>

              <button
                type="submit"
                className="h-[46px] w-full rounded-full bg-white text-[14px] md:text-[16px] font-medium text-black"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
