'use client'

type Props = {
  value: number
  onChange: (v: number) => void
}

export default function QtyStepper({ value, onChange }: Props) {
  return (
    <div className="flex w-[110px] h-[44px] md:h-[52px] md:w-[170px] items-center justify-between rounded-[62px] bg-[#F0F0F0] px-[16px]">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-[32px] w-[32px] rounded-full text-[20px] leading-none text-black/70 hover:text-black"
        aria-label="decrease"
      >
        –
      </button>

      <span className="font-satoshi text-[14px] font-medium text-black">
        {value}
      </span>

      <button
        onClick={() => onChange(Math.min(99, value + 1))}
        className="h-[32px] w-[32px] rounded-full text-[20px] leading-none text-black/70 hover:text-black"
        aria-label="increase"
      >
        +
      </button>
    </div>
  )
}
