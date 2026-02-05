export default function ProductDetailSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-px w-full bg-black/10" />

      <div className="px-[100px] py-[24px]">
        {/* breadcrumb */}
        <div className="mb-[16px] h-[14px] w-[260px] rounded bg-black/10" />

        {/* top layout */}
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2 lg:items-start">
          {/* left gallery */}
          <div className="grid grid-cols-[90px_1fr] gap-4">
            <div className="space-y-3">
              <div className="h-[90px] rounded-[14px] bg-black/10" />
              <div className="h-[90px] rounded-[14px] bg-black/10" />
              <div className="h-[90px] rounded-[14px] bg-black/10" />
            </div>
            <div className="h-[520px] rounded-[20px] bg-black/10" />
          </div>

          {/* right info */}
          <div>
            <div className="h-[28px] w-3/4 rounded bg-black/10" />
            <div className="mt-3 h-[18px] w-[160px] rounded bg-black/10" />
            <div className="mt-5 flex items-center gap-3">
              <div className="h-[26px] w-[80px] rounded bg-black/10" />
              <div className="h-[18px] w-[60px] rounded bg-black/10" />
              <div className="h-[18px] w-[56px] rounded bg-black/10" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-[14px] w-full rounded bg-black/10" />
              <div className="h-[14px] w-11/12 rounded bg-black/10" />
              <div className="h-[14px] w-10/12 rounded bg-black/10" />
            </div>

            <div className="mt-6 h-px w-full bg-black/10" />

            <div className="mt-6 h-[14px] w-[90px] rounded bg-black/10" />
            <div className="mt-3 flex gap-3">
              <div className="h-[32px] w-[32px] rounded-full bg-black/10" />
              <div className="h-[32px] w-[32px] rounded-full bg-black/10" />
              <div className="h-[32px] w-[32px] rounded-full bg-black/10" />
            </div>

            <div className="mt-6 h-[14px] w-[90px] rounded bg-black/10" />
            <div className="mt-3 flex gap-3">
              <div className="h-[36px] w-[70px] rounded-full bg-black/10" />
              <div className="h-[36px] w-[80px] rounded-full bg-black/10" />
              <div className="h-[36px] w-[70px] rounded-full bg-black/10" />
              <div className="h-[36px] w-[80px] rounded-full bg-black/10" />
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-[48px] w-[140px] rounded-full bg-black/10" />
              <div className="h-[48px] flex-1 rounded-full bg-black/10" />
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-[40px] h-[44px] w-full rounded bg-black/10" />

        {/* related */}
        <div className="mt-[50px] h-[24px] w-[220px] rounded bg-black/10" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[380px] rounded-[20px] bg-black/10" />
          ))}
        </div>
      </div>
    </div>
  )
}
