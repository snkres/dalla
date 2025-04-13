'use client'

import { Calendar } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import type { ProfileCardFormInstance } from '../../hooks/use-profile-card'

interface ProfileDeliveryProps {
  isEditing: boolean
  projectCompletion: string | null | undefined
  form: ProfileCardFormInstance
}

const completionDisplayMap: Record<string, string> = {
  '1 week': '1 Week',
  '2-3 weeks': '2-3 Weeks',
  '1 month': '1 Month',
  '1-2 months': '1-2 Months',
  undefined: 'Not Determined',
  null: 'N/A',
}

export function ProfileDelivery({
  isEditing,
  projectCompletion,
  form,
}: ProfileDeliveryProps) {
  const displayValue = projectCompletion
    ? completionDisplayMap[projectCompletion]
    : projectCompletion === undefined
      ? completionDisplayMap['undefined']
      : completionDisplayMap['null']

  return (
    <div className="w-full border-t border-gray-100 pt-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
        <Calendar className="h-4 w-4 text-[#63B7B7]" />
        Typical Project Delivery
      </h3>

      {isEditing ? (
        <form.Field
          name="projectCompletion"
          children={(field) => (
            <div className="flex flex-col items-start">
              <Select
                value={field.state.value ?? ''}
                onValueChange={field.handleChange}
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue placeholder="Select completion time" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(completionDisplayMap)
                    .filter(([key]) => key !== 'null' && key !== 'undefined')
                    .map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
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
      ) : (
        <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
          <span className="text-sm font-medium capitalize text-[#63B7B7]">
            {displayValue}
          </span>
        </div>
      )}
    </div>
  )
}
