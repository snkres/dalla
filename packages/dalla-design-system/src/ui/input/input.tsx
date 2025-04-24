import * as React from 'react'
import { cn } from '@dalla/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-input bg-background flex h-10 w-full rounded-xl border px-3 py-2 text-sm',
          'placeholder:text-muted-foreground',
          'hover:border-[#234d64]/70',
          'focus:border-[#234d64]/80 focus:outline-none',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors duration-200',
          'border-[#E5E7EB] focus:border-[#64B7B7] focus:ring-[#64B7B7]',
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
