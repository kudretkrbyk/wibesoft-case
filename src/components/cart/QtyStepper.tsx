'use client'

export default function QtyStepper({
  value,
  onDec,
  onInc,
}: {
  value: number
  onDec: () => void
  onInc: () => void
}) {
  return (
    <div className="flex h-[40px] w-[120px] items-center justify-between rounded-[62px] bg-[#F0F0F0] px-[12px]">
      <button
        onClick={onDec}
        className="h-[28px] w-[28px] rounded-full text-[18px] text-black/70 hover:text-black"
        aria-label="decrease"
      >
        –
      </button>
      <span className="font-satoshi text-[14px] font-medium text-black">
        {value}
      </span>
      <button
        onClick={onInc}
        className="h-[28px] w-[28px] rounded-full text-[18px] text-black/70 hover:text-black"
        aria-label="increase"
      >
        +
      </button>
    </div>
  )
}
