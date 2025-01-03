import type { JSX } from 'react'

interface TimelineProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

interface TimelineItemProps {
  children: React.ReactNode
  isActive?: boolean
  isLast?: boolean
  isPhoto?: boolean
  isIcon?: boolean
  Icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Timeline({ children, className, style }: TimelineProps) {
  return (
    <div className={`relative flex flex-col ${className}`} style={style}>
      {children}
    </div>
  )
}

export function TimelineItem({
  children,
  isActive = false,
  isLast = false,
  isPhoto = false,
  isIcon,
  Icon,
  className,
  style,
}: TimelineItemProps) {
  return (
    <div className={`relative flex gap-2 ${className}`} style={style}>
      <div className="flex flex-col items-center">
        <div className="relative flex h-12 w-12 items-center justify-center">
          {isPhoto && (
            <img
              src="/avatar.png"
              alt="Avatar"
              className="rounded-full border-4 border-white/10"
            />
          )}
          {isIcon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <div className="text-slate-blue">{Icon}</div>
            </div>
          )}
          {!isPhoto && !isIcon && (
            <div className="h-12 w-12 rounded-full bg-white" />
          )}
        </div>
        {!isLast && (
          <div className="h-full w-0 border-l-2 border-dashed border-white/20" />
        )}
      </div>

      <div className="flex-1 pb-8">{children}</div>
    </div>
  )
}
