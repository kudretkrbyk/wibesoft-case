export default function Loading() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-10">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full">
            <div className="h-[298px] w-full animate-pulse rounded-[20px] bg-black/5" />
            <div className="mt-[16px] h-5 w-4/5 animate-pulse rounded bg-black/5" />
            <div className="mt-[8px] h-4 w-2/5 animate-pulse rounded bg-black/5" />
            <div className="mt-[12px] h-6 w-1/3 animate-pulse rounded bg-black/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
