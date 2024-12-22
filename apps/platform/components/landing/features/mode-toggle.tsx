'use client'

import * as React from 'react'
import { Switch } from '@dallah/design-system'

interface ModeToggleProps {
  mode: 'companies' | 'professional'
  onModeChange: (mode: 'companies' | 'professional') => void
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div
      className={`bg-slate-blue z-20 flex items-center gap-2 rounded-full border-2 p-4 ${
        mode === 'professional' ? 'border-sunshine-yellow' : ''
      }`}
    >
      <span
        className={`text-text-xl font-medium ${mode === 'companies' ? 'text-sunshine-yellow' : 'text-foreground'}`}
      >
        Companies
      </span>

      <Switch
        checked={mode === 'professional'}
        onCheckedChange={(checked) =>
          onModeChange(checked ? 'professional' : 'companies')
        }
        className={
          'data-[state=checked]:bg-sunshine-yellow [&_*]:!rounded-full [&_button]:p-4'
        }
      />

      <span
        className={`text-text-xl font-medium ${mode === 'professional' ? 'text-sunshine-yellow' : 'text-[#418FB9]'}`}
      >
        Professional
      </span>
    </div>
  )
}
