'use client'

import * as React from 'react'

type ViewAllButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function ViewAllButton({
  children = 'View All',
  onClick,
  className = '',
  type = 'button',
}: ViewAllButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        // Figma: w=218 h=52 radius=62 border=1 #0000001A padding 16/54 gap 12
        'mx-auto mt-[24px] sm:mt-[36px] flex h-[52px] w-[218px] items-center justify-center',
        'rounded-[62px] border border-black/10',
        'px-[54px] py-[16px]',
        'font-satoshi text-[14px] md:text-[16px] font-medium leading-[1]',
        'transition-colors hover:bg-black hover:text-white active:translate-y-[1px]',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
