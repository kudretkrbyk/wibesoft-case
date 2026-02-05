export default function CategorySkeleton() {
  return (
    <div className="w-full">
      <div className="h-px w-full bg-black/10" />
      <div className="mx-auto max-w-[1240px] px-4 py-[24px]">
        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-[295px_1fr]">
          <div className="h-[1220px] rounded-[20px] border border-black/10" />
          <div className="h-[600px] rounded-[20px] border border-black/10" />
        </div>
      </div>
    </div>
  )
}
