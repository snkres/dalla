import { JSX } from 'react'

interface FeatureCardProps {
  icon: JSX.Element
  title: string
  description: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="radius-[24px] rounded-lg border border-[#EEB238] bg-[#FFD37B] p-6 backdrop-blur-sm">
      <div className="mb-4 inline-flex rounded-full [&_svg]:h-16 [&_svg]:w-16">
        {Icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
