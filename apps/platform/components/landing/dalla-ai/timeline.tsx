interface TimelineProps {
  children: React.ReactNode
}

interface TimelineItemProps {
  children: React.ReactNode
  isActive?: boolean
  isLast?: boolean
  isPhoto?: boolean
}

export function Timeline({ children }: TimelineProps) {
  return <div className="relative flex flex-col">{children}</div>
}

export function TimelineItem({
  children,
  isActive,
  isLast,
  isPhoto,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-8">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div
          className={`z-10 h-8 w-8 rounded-full border-4 ${
            isActive
              ? 'border-sunshine-yellow bg-white'
              : 'border-white/20 bg-transparent'
          }`}
        />
        {!isLast && (
          <div className="h-full w-0 border-2 border-dashed border-white/20" />
        )}
        {isPhoto && <img src="/avatar.png" alt="" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">{children}</div>
    </div>
  )
}
