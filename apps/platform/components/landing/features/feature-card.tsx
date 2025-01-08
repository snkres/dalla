import type { JSX } from 'react'

interface FeatureCardProps {
  icon: JSX.Element
  title: JSX.Element
  description: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-[24px] border border-[#EEB238] bg-[#FFD37B] p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="mb-4 inline-flex rounded-full [&_svg]:h-16 [&_svg]:w-16">
          {Icon}
        </div>
        <div>{title}</div>
      </div>
      <p className="at-least-3-lines text-text-md text-[#00000066]">
        {description}
      </p>
    </div>
  )
}
