import Link from 'next/link'

export default function Page() {
  return (
    <main className="w-full px-[16px] sm:px-[32px] md:px-[100px] py-16">
      <h1 className="font-integral text-3xl text-black">Coming soon</h1>
      <p className="mt-3 max-w-[600px] font-satoshi text-black/60">
        This page is a placeholder for the case study. Core flows are implemented:
        product listing, product detail, and cart.
      </p>

      <div className="mt-6">
        <Link
          href="/products"
          className="inline-flex h-11 items-center rounded-[62px] bg-black px-6 font-satoshi text-white"
        >
          Browse products
        </Link>
      </div>
    </main>
  )
}
