import { cn } from '@dallah/utils'
import Image from 'next/image'

export function LoginRightSide({ proMode }: { proMode?: boolean }) {
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth relative flex flex-1 items-center justify-between transition-all duration-200',
        proMode ? 'bg-slate-blue' : 'bg-white',
      )}
    >
      <Image
        src="/login.webp"
        alt="company"
        className="h-screen w-full object-cover object-top brightness-75"
        width={500}
        height={500}
        loading='eager'
        priority
      />
    </section>
  )
}
