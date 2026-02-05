'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

type Props = {
  href?: string
}

export default function PromoBar({ href = '/signup' }: Props) {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div className="w-full bg-black text-white">
      {/* Height: mobile 34, desktop 38 */}
      <div className=" h-[34px] md:h-[38px]">
        {/* Content wrapper:
            - mobile: px-4 (16px)
            - desktop: center, narrow content area like Figma padding 544/544
        */}
        <div className="mx-auto flex h-full items-center justify-center  px-4">
          <div className="mx-auto flex w-full items-center justify-center md:max-w-[352px] ">
            <p className="text-center font-satoshi text-[14px] font-normal leading-[1] text-white">
              Sign up and get 20% off to your first order.{' '}
              <Link
                href={href}
                className="font-satoshi text-[14px] font-medium leading-[1] underline underline-offset-0"
              >
                Sign Up Now
              </Link>
            </p>
          </div>

          {/* Close button (right) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="  hidden md:block"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
