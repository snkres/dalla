'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { cn } from '@dalla/utils'
import type { ProfileCardFormInstance } from '../../hooks/use-profile-card'

interface ProfileAvailabilityBadgeProps {
  isEditing: boolean
  availability: string | null | undefined
  form: ProfileCardFormInstance
}

export function ProfileAvailabilityBadge({
  isEditing,
  availability,
  form,
}: ProfileAvailabilityBadgeProps) {
  if (isEditing) {
    return (
      <form.Field
        name="availability"
        children={(field) => (
          <div className="flex flex-col items-end">
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger className="h-7 w-36 rounded-full text-xs">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="limited">Limited Availability</SelectItem>
                <SelectItem value="unavailable">Not Available</SelectItem>
              </SelectContent>
            </Select>
            {field.state.meta.errors ? (
              <em className="mt-1 block text-xs text-red-500">
                {Array.isArray(field.state.meta.errors)
                  ? field.state.meta.errors.join(', ')
                  : field.state.meta.errors}
              </em>
            ) : null}
          </div>
        )}
      />
    )
  }

  const badgeClasses = cn(
    'flex items-center gap-1 rounded-full px-3 py-1 text-xs',
    availability === 'available'
      ? 'bg-[#00A58C]/10 text-[#00A58C]'
      : availability === 'limited'
        ? 'bg-amber-50 text-amber-600'
        : 'bg-gray-50 text-gray-600',
  )

  const dotClasses = cn(
    'h-2 w-2 rounded-full',
    availability === 'available'
      ? 'animate-pulse bg-[#00A58C]'
      : availability === 'limited'
        ? 'bg-amber-500'
        : 'bg-gray-500',
  )

  const textMap: { [key: string]: string } = {
    available: 'Available now',
    limited: 'Limited Availability',
    unavailable: 'Not Available',
  }

  const displayText = availability ? textMap[availability] : 'Not Determined'

  return (
    <div className={badgeClasses}>
      {availability === 'available' && <div className={dotClasses}></div>}
      {displayText}
    </div>
  )
}
