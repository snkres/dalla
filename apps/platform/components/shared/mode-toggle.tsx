'use client'

import * as React from 'react'
import { Switch } from '@dallah/design-system'

interface ModeToggleProps {
  mode: 'companies' | 'professional'
  onModeChange: (mode: 'companies' | 'professional') => void
  plural?: boolean
}

const selectedClassName =
  'text-[#FFFDF9] text-[0.875rem] font-semibold leading-[1.25rem] shadow-sm'

const unselectedClassName =
  'text-[#5E8697] text-[0.875rem] font-semibold leading-[1.25rem]'

export function ModeToggle({
  mode,
  onModeChange,
  plural = false,
}: ModeToggleProps) {
  const handleToggle = () => {
    onModeChange(mode === 'professional' ? 'companies' : 'professional')
  }

  return (
    <div className="mx-auto flex w-[29.625rem] items-center justify-center gap-[0.25rem] self-stretch rounded-[0.625rem] border-[0.0625rem] border-solid border-[#E4E7EC] bg-[#FFFDF9] p-[0.25rem]">
      <div
        className={`font-inter flex h-[2.25rem] flex-[1_0_0] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.375rem] px-[12px] py-2 transition-colors duration-200 ${mode === 'professional'
            ? 'bg-coral-red-100 ' + selectedClassName
            : unselectedClassName
          }`}
        onClick={() => onModeChange('professional')}
      >
        Professional{plural && 's'}
      </div>
      <div
        className={`flex h-[2.25rem] flex-[1_0_0] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[0.375rem] px-[12px] py-2 transition-colors duration-200 ${mode === 'companies'
            ? 'bg-[#F4D283] ' + selectedClassName
            : unselectedClassName
          }`}
        onClick={() => onModeChange('companies')}
      >
        Compan{plural ? 'ies' : 'y'}
      </div>
      <Switch
        checked={mode === 'companies'}
        onCheckedChange={handleToggle}
        className="sr-only"
      />
    </div>
  )
}
