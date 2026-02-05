import Link from 'next/link'
import NewsletterCTA from './NewsletterCTA'
import { Twitter, Facebook, Instagram, Github } from 'lucide-react'

const COLS = [
  {
    title: 'COMPANY',
    links: ['About', 'Features', 'Works', 'Career'],
  },
  {
    title: 'HELP',
    links: [
      'Customer Support',
      'Delivery Details',
      'Terms & Conditions',
      'Privacy Policy',
    ],
  },
  {
    title: 'FAQ',
    links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  },
  {
    title: 'RESOURCES',
    links: [
      'Free eBooks',
      'Development Tutorial',
      'How to - Blog',
      'Youtube Playlist',
    ],
  },
] as const

const socials = [
  { icon: Twitter, filled: false, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Facebook, filled: true, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, filled: false, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Github, filled: false, label: 'GitHub', href: 'https://github.com' },
] as const

const payments = [
  { src: '/payments/visa.svg', alt: 'Visa' },
  { src: '/payments/masterCard.svg', alt: 'Mastercard' },
  { src: '/payments/paypal.svg', alt: 'PayPal' },
  { src: '/payments/apple.svg', alt: 'Apple Pay' },
  { src: '/payments/gpay.svg', alt: 'G Pay' },
] as const

function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function Footer() {
  return (
    <footer className="mt-20 w-full pt-10">
      {/* MAIN CONTENT */}
      <div className="relative w-full bg-[#F0F0F0] py-10">
        {/* CTA */}
        <div className="absolute inset-x-0 top-0 -translate-y-1/2">
          <div className="mx-auto">
            <NewsletterCTA />
          </div>
        </div>

        <div className="mx-auto px-[16px] pt-20 sm:px-[32px] md:px-[100px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            {/* LEFT */}
            <div className="max-w-[280px] shrink-0">
              <div className="font-integral text-[28px] font-bold leading-none text-black md:text-[33.45px]">
                SHOP.CO
              </div>

              <p className="mt-3 font-satoshi text-[14px] leading-[22px] text-black/50">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>

              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ icon: Icon, filled, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      'grid h-[28px] w-[28px] place-items-center rounded-full border',
                      filled
                        ? 'border-black bg-black text-white'
                        : 'border-black/20 bg-white text-black',
                    ].join(' ')}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT COLS */}
            <div className="grid w-full grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 lg:w-auto">
              {COLS.map((c) => (
                <div key={c.title}>
                  <div className="font-satoshi text-[14px] font-semibold leading-[19px] tracking-[0.16em] text-black md:text-[16px]">
                    {c.title}
                  </div>

                  <ul className="mt-5 space-y-4">
                    {c.links.map((label) => (
                      <li key={label}>
                        <Link
                          href={`/${toSlug(label)}`}
                          prefetch={false}
                          className="font-satoshi text-[14px] font-normal leading-[19px] text-black/50 hover:text-black md:text-[16px]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="mt-10 h-px w-full bg-black/10" />

          {/* bottom bar */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-satoshi text-[14px] leading-[22px] text-black/50">
              Shop.co © 2000-2023, All Rights Reserved
            </p>

            <div className="flex items-center justify-center gap-2 px-[14px] md:gap-3">
              {payments.map((p) => (
                <img
                  key={p.alt}
                  src={p.src}
                  alt={p.alt}
                  width={48}
                  height={30}
                  className="h-[30px] w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
