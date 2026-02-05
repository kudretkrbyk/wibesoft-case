export default function YouMayAlsoLikeSkeleton() {
  return (
    <section className="w-full">
      <div className="mb-6 h-[28px] w-[220px] rounded bg-black/5" />

      <div className="grid grid-cols-2 gap-[16px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[20px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full">
            <div className="h-[220px] w-full rounded-[20px] bg-black/5 sm:h-[298px]" />
            <div className="mt-4 h-[18px] w-[80%] rounded bg-black/5" />
            <div className="mt-2 h-[18px] w-[60%] rounded bg-black/5" />
            <div className="mt-3 h-[18px] w-[40%] rounded bg-black/5" />
          </div>
        ))}
      </div>
    </section>
  )
}
