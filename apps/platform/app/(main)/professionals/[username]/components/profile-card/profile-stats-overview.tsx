'use client'

import { Hourglass, CreditCard } from 'lucide-react'
import { Input, Riyal } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { formatCurrency } from '@lib/utils/format-currency'
import type { ProfileCardFormInstance } from '../../hooks/use-profile-card'

interface ProfileStatsOverviewProps {
  isEditing: boolean
  hourlyRate: number | null | undefined
  totalEarned: number | null | undefined
  form: ProfileCardFormInstance
}

export function ProfileStatsOverview({
  isEditing,
  hourlyRate,
  totalEarned,
  form,
}: ProfileStatsOverviewProps) {
  return (
    <div className="mb-5 grid w-full grid-cols-2 gap-4">
      <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
        <div className="mb-1 flex items-center justify-center">
          <Hourglass className="h-4 w-4 text-[#63B7B7]" />
        </div>
        {isEditing ? (
          <form.Field
            name="hourlyRate"
            children={(field) => (
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    <Riyal />
                  </span>
                  <Input
                    name={field.name}
                    type="number"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value))
                    }}
                    className={cn(
                      'h-7 border-none bg-transparent pl-6 text-center text-base font-medium text-[#63B7B7] focus:ring-0',
                      field.state.meta.errors &&
                        'border-red-500 focus:ring-red-500',
                    )}
                    placeholder="0"
                    min="0"
                    step="any"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    /hr
                  </span>
                </div>
                {field.state.meta.errors ? (
                  <p className="mt-1 text-center text-xs text-red-500">
                    {Array.isArray(field.state.meta.errors)
                      ? field.state.meta.errors.join(', ')
                      : field.state.meta.errors}
                  </p>
                ) : null}
              </div>
            )}
          />
        ) : (
          <div className="flex items-baseline justify-center gap-0.5 text-base font-medium text-[#63B7B7]">
            {formatCurrency(hourlyRate || 0)}{' '}
            <span className="text-xs text-gray-600">/hr</span>
          </div>
        )}
        <div className="text-xs text-gray-600">Hourly Rate</div>
      </div>

      <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
        <div className="mb-1 flex items-center justify-center">
          <CreditCard className="h-4 w-4 text-[#63B7B7]" />
        </div>
        <div className="flex items-baseline justify-center gap-0.5 text-base font-medium text-[#63B7B7]">
          {formatCurrency(totalEarned || 0)}
        </div>
        <div className="text-xs text-gray-600">Total Earned</div>
      </div>
    </div>
  )
}
