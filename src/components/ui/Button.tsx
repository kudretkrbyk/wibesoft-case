'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'default' | 'outline'
type ButtonSize = 'default' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // base
        'inline-flex items-center justify-center rounded-full font-satoshi text-[14px] font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',

        // variant
        variant === 'default' && 'bg-black text-white hover:bg-black/90',
        variant === 'outline' &&
          'border border-black/10 bg-white text-black hover:bg-black/5',

        // size
        size === 'default' && 'h-[48px] px-[24px]',
        size === 'icon' && 'h-[40px] w-[40px] p-0',

        className,
      )}
      {...props}
    />
  )
}
