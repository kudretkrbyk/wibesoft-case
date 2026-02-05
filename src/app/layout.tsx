import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/react-query/providers'
import localFont from 'next/font/local'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const integral = localFont({
  src: [
    {
      path: '../assets/fonts/IntegralCF-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-integral',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'SHOP.CO – Wibesoft Case',
  description:
    'E-commerce case study built with Next.js, TypeScript, TanStack Query v5 and Zustand.',
  metadataBase: new URL('https://wibesoft.kudretkrbyk.com.tr'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${satoshi.variable} ${integral.variable}`}>
      <body className="font-satoshi bg-white text-black">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
