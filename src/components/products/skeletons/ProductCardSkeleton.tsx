export default function ProductCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-[298px] w-full rounded-[20px] bg-black/10" />
      <div className="mt-[16px] h-[20px] w-3/4 rounded bg-black/10" />
      <div className="mt-[8px] flex items-center gap-[13px]">
        <div className="h-[19px] w-[150px] rounded bg-black/10" />
        <div className="h-[14px] w-[52px] rounded bg-black/10" />
      </div>
      <div className="mt-[12px] flex items-center gap-[10px]">
        <div className="h-[24px] w-[70px] rounded bg-black/10" />
        <div className="h-[20px] w-[60px] rounded bg-black/10" />
        <div className="h-[20px] w-[48px] rounded bg-black/10" />
      </div>
    </div>
  )
}
