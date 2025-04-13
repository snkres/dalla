'use client'

import { CheckCircle, Award, Clock } from 'lucide-react'
import { Input } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import type { ProfileCardFormInstance } from '../../hooks/use-profile-card'
interface ProfileStatsDetailsProps {
  isEditing: boolean
  projectsCompleted: number | null | undefined
  successRate: number | null | undefined
  weeklyAvailability: number | null | undefined
  form: ProfileCardFormInstance
}

export function ProfileStatsDetails({
  isEditing,
  projectsCompleted,
  successRate,
  weeklyAvailability,
  form,
}: ProfileStatsDetailsProps) {
  const StatItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType
    label: string
    value: React.ReactNode
  }) => (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
        <Icon className="h-3.5 w-3.5 text-[#63B7B7]" />
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-xs text-gray-600">{label}</span>
        {value}
      </div>
    </div>
  )

  return (
    <div className="mb-5 w-full space-y-3">
      <StatItem
        icon={CheckCircle}
        label="Projects Completed"
        value={
          <span className="text-xs font-medium text-gray-800">
            {projectsCompleted ?? 'N/A'}
          </span>
        }
      />
      <StatItem
        icon={Award}
        label="Success Rate"
        value={
          <span className="text-xs font-medium text-gray-800">
            {successRate !== null && successRate !== undefined
              ? `${successRate}%`
              : 'N/A'}
          </span>
        }
      />
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
          <Clock className="h-3.5 w-3.5 text-[#63B7B7]" />
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-gray-600">Weekly Availability</span>
          {isEditing ? (
            <form.Field
              name="weeklyAvailability"
              children={(field) => (
                <div className="relative flex w-1/2 items-center">
                  <Input
                    name={field.name}
                    type="number"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value))
                    }}
                    className={cn(
                      'h-7 text-right !text-xs',
                      field.state.meta.errors &&
                        'border-red-500 focus:ring-red-500',
                    )}
                    placeholder="0"
                    min="0"
                  />
                  <span className="ml-1 flex-shrink-0 text-xs text-gray-500">
                    hrs/week
                  </span>
                  {field.state.meta.errors ? (
                    <p className="absolute -bottom-4 right-0 mt-1 text-xs text-red-500">
                      {Array.isArray(field.state.meta.errors)
                        ? field.state.meta.errors.join(', ')
                        : field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            />
          ) : (
            <span className="text-xs font-medium text-gray-800">
              {weeklyAvailability !== null && weeklyAvailability !== undefined
                ? `${weeklyAvailability}+ hrs/week`
                : 'N/A'}{' '}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
