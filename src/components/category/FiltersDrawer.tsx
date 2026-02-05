'use client'

import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  topOffset?: number
  children: React.ReactNode
}

export default function FiltersDrawer({
  open,
  onClose,
  topOffset = 100,
  children,
}: Props) {
  // Body scroll lock + ESC close
  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close filters overlay"
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-white"
        style={{ top: topOffset }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full overflow-auto px-[16px] py-[16px]">
          {children}
        </div>
      </div>
    </div>
  )
}
