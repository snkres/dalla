'use client'

import { AccountType } from '@lib/types/auth'
import { motion } from 'motion/react'
import { cn } from '@dalla/utils'
import { useLocale } from '@hooks/use-locale'

interface AccountTypeToggleProps {
  value: AccountType
  onChange: (type: AccountType) => void
  className?: string
}

export function AccountTypeToggle({
  value,
  onChange,
  className,
}: AccountTypeToggleProps) {
  const { locale } = useLocale()
  const options = [
    {
      value: 'company' as AccountType,
      label: locale === 'ar' ? 'شركة' : 'Company',
    },
    {
      value: 'professional' as AccountType,
      label: locale === 'ar' ? 'محترف' : 'Professional',
    },
  ]

  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div className="bg-muted relative flex h-10 rounded-full p-2">
        {/* Background */}
        <motion.div
          className="absolute rounded-full bg-[#234d64] bg-opacity-90 shadow-sm"
          animate={{
            left: value === 'company' ? '0%' : '50%',
          }}
          transition={{
            type: 'spring',
            bounce: 0.15,
            duration: 0.5,
          }}
          style={{
            width: '50%',
            height: '36px',
            top: '2px',
            left: 0,
          }}
        />

        {/* Buttons Container */}
        <div className="relative z-10 flex w-full">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex-1 rounded-full px-4 text-sm font-medium transition-colors duration-200',
                'focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2',
                value === option.value
                  ? 'text-slate-blue-10'
                  : 'text-muted-foreground hover:text-primary',
              )}
              style={{
                minWidth: '100px', // Ensures equal width
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
