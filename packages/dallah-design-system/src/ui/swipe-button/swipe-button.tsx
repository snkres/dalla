'use client'

import { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { cn } from '@dallah/utils'

interface SwipeButtonProps {
  onSwipeComplete?: () => void
  disabled?: boolean
  className?: string
}

export function SwipeButton({
  onSwipeComplete,
  disabled,
  className,
}: SwipeButtonProps) {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const buttonWidth = 380 // Approximate width of the button
  const dragThreshold = buttonWidth * 0.75 // 75% of the button width

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (disabled) return
    setIsDragging(true)
    setDragX(Math.max(0, Math.min(info.offset.x, buttonWidth - 56))) // 56 is approx width of the circle
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false)
    if (info.offset.x > dragThreshold) {
      setDragX(buttonWidth - 56)
      onSwipeComplete?.()
    } else {
      setDragX(0)
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-14 w-96 items-center overflow-hidden rounded-2xl bg-[#1F3A4F] p-2 transition-colors',
        disabled ? 'bg-[#F1F5F9]' : '',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium',
          disabled ? 'text-[#CBD5E1]' : 'text-foreground',
        )}
      >
        Swipe for AI suggestions
      </span>
      <motion.div
        drag={disabled ? false : 'x'}
        dragConstraints={{ left: 0, right: buttonWidth - 56 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ x: dragX }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        className={cn(
          'bg-foreground/90 relative z-50 flex h-10 w-10 cursor-grab items-center justify-center rounded-xl',
          isDragging ? 'cursor-grabbing' : '',
          disabled ? 'cursor-not-allowed bg-[#E2E8F0]' : '',
        )}
      >
        <svg
          width="24"
          height="24"
          className={cn(
            'h-5 w-5',
            disabled
              ? '[&_path]:stroke-[#234d6442]'
              : '[&_path]:stroke-[#234D64]',
          )}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 7L18 12L13 17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7L12 12L7 17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
