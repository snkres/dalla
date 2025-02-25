import * as React from 'react'

import { cn } from '@dallah/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input bg-sunshine-yellow-10 ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full border px-3 py-2 text-base placeholder-[#667085] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
