import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Testimonials } from './testmonials'

export function LoginRightSide({ proMode }: { proMode?: boolean }) {
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth relative flex flex-1 items-center justify-between transition-all duration-200',
        proMode ? 'bg-slate-blue' : 'bg-white',
      )}
    >
      <img
        src="/right-side.webp"
        alt="company"
        className="h-screen w-full object-cover object-top brightness-75"
      />
      <div className="absolute inset-0 top-0 z-20 flex h-screen flex-col items-start justify-between">
        <LogoHorizontal
          className={cn(
            'motion-ease-spring-bouncy z-50 w-72 px-10 py-10 transition-colors duration-500',
            !proMode ? 'fill-sunshine-yellow-100' : '[&_path]:fill-slate-blue',
          )}
        />

        <Testimonials />
      </div>
    </section>
  )
}
