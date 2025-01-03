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
      <div className="flex items-start">
        <div className="mb-4 inline-flex rounded-full [&_svg]:h-16 [&_svg]:w-16">
          {Icon}
        </div>
        {title}
      </div>
      <p className="xl:at-least-3-lines line-clamp-4 text-sm text-[#00000066] xl:line-clamp-3">
        {description}
      </p>
    </div>
  )
}
