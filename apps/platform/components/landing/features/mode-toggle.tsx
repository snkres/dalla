'use client'

import * as React from 'react'
import { Switch } from '@dallah/design-system'

interface ModeToggleProps {
  mode: 'companies' | 'professional'
  onModeChange: (mode: 'companies' | 'professional') => void
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="bg-slate-blue z-20 flex items-center gap-2 rounded-full p-4">
      <span
        className={`text-text-xl font-medium ${mode === 'companies' ? 'text-sunshine-yellow' : 'text-[#418FB9]'}`}
      >
        Companies
      </span>
      <Switch
        checked={mode === 'professional'}
        onCheckedChange={(checked) =>
          onModeChange(checked ? 'professional' : 'companies')
        }
        className="[&_button]:data-[state=checked]:!bg-[#357293]"
      />
      <span
        className={`text-text-xl font-medium ${mode === 'professional' ? 'text-sunshine-yellow' : 'text-[#418FB9]'}`}
      >
        Professional
      </span>
    </div>
  )
}
