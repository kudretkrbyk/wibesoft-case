import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className="rounded-[20px] border border-black/10 p-[24px]">
      <p className="font-satoshi text-[14px] text-black/60">
        Your cart is empty.
      </p>
      <Link
        href="/"
        className="mt-[12px] inline-flex h-[46px] items-center justify-center rounded-[62px] bg-black px-[18px] font-satoshi text-[14px] font-medium text-white"
      >
        Continue shopping
      </Link>
    </div>
  )
}
