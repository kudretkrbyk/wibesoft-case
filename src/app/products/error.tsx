'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-10">
      <h2 className="font-satoshi text-[20px] font-bold">Bir hata oluştu</h2>
      <p className="mt-2 text-black/70">
        Ürünler yüklenirken sorun yaşandı. Tekrar deneyebilirsin.
      </p>

      <button
        onClick={reset}
        className="mt-6 rounded-full bg-black px-6 py-3 font-satoshi text-[14px] font-medium text-white"
      >
        Yeniden dene
      </button>
    </div>
  )
}
