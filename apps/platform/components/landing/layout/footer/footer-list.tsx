import { cn } from '@dallah/utils'

interface FooterListProps {
  children: React.ReactNode
  className?: string
}

export function FooterList({ children, className }: FooterListProps) {
  return (
    <div className={cn('mb-6 flex w-fit flex-col gap-4', className)}>
      {children}
    </div>
  )
}
