import { cn } from '@dalla/utils'
import { Input, Button, Textarea } from '@dalla/design-system'
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  X,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { MonthYearPicker } from '../month-year-date-picker'
import type { ProProfile } from '@lib/atoms/pro/meta'

export function EduCardEdit({
  edu,
  index,
  expandedItems,
  updateEducation,
  removeEducation,
  setExpandedItems,
  validationErrors,
  degreeInputRef,
  padding,
}: {
  edu: ProProfile['data']['education'][number]
  index: number
  expandedItems: Record<string, boolean>
  updateEducation: (index: number, field: string, value: string) => void
  removeEducation: (index: number) => void
  setExpandedItems: Dispatch<
    SetStateAction<{
      [key: string]: boolean
    }>
  >

  validationErrors: {
    [key: number]: {
      [field: string]: boolean
    }
  }
  degreeInputRef: React.RefObject<HTMLInputElement>
  padding: string
}) {
  const eduKey = `edu-${edu.id || index}`
  const isExpanded = expandedItems[eduKey] || false

  return (
    <div
      key={index}
      className={cn('relative border-l-2 border-gray-200', padding, 'pb-2')}
    >
      <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <GraduationCap className="h-3 w-3 text-white" />

          <Input
            ref={index === 0 ? degreeInputRef : undefined}
            value={edu.degree}
            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
            placeholder="Degree or certification"
            className={cn(
              'h-7 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto',
              validationErrors[index]?.degree
                ? 'border-b-2 border-red-500'
                : '',
            )}
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setExpandedItems((prev) => ({
                ...prev,
                [eduKey]: !isExpanded,
              }))
            }
            className="ml-2 h-7 rounded-full px-2 text-xs text-gray-400 hover:text-[#63B7B7]"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                Expand
              </>
            )}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeEducation(index)}
          className="-mt-1 h-6 w-6 rounded-full text-gray-300 hover:bg-transparent hover:text-red-500"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {isExpanded && (
        <div className="ml-1 space-y-3 pb-2 sm:ml-2">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div className="flex items-center gap-1">
              <svg
                className="h-3 w-3 flex-shrink-0 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M12 10v6" />
                <path d="M12 7h.01" />
              </svg>
              <Input
                value={edu.school}
                onChange={(e) =>
                  updateEducation(index, 'school', e.target.value)
                }
                placeholder="Institution name"
                className={cn(
                  'h-7 rounded-none border-0 border-b border-gray-200 px-0 text-xs focus:border-[#63B7B7] focus:ring-0',
                  validationErrors[index]?.school
                    ? 'border-b-2 border-red-500'
                    : '',
                )}
              />
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0 text-gray-400" />
              <MonthYearPicker
                value={edu.startDate}
                onChange={(value) => updateEducation(index, 'startDate', value)}
                placeholder="Start date"
                className={
                  validationErrors[index]?.startDate ? 'border-red-500' : ''
                }
              />
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0 text-gray-400" />
              <MonthYearPicker
                value={edu.endDate || 'Present'}
                onChange={(value) => updateEducation(index, 'endDate', value)}
                placeholder="End date"
              />
            </div>

            <div className="flex items-center gap-1">
              <svg
                className="h-3 w-3 flex-shrink-0 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20v-6M12 8V2M4.93 10A8 8 0 0 0 4 14a8 8 0 0 0 16 0 8 8 0 0 0-.93-4" />
              </svg>
              <Input
                value={edu.field || ''}
                onChange={(e) =>
                  updateEducation(index, 'field', e.target.value)
                }
                placeholder="Field of study (optional)"
                className="h-7 rounded-none border-0 border-b border-gray-200 px-0 text-xs focus:border-[#63B7B7] focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500">
              Description
            </label>
            <Textarea
              value={edu.description || ''}
              onChange={(e) =>
                updateEducation(index, 'description', e.target.value)
              }
              placeholder="Brief description of your studies or notable courses (optional)"
              className="h-24 rounded-md border border-gray-200 !text-xs focus:border-[#63B7B7] focus:ring-0"
            />
          </div>
        </div>
      )}
    </div>
  )
}
