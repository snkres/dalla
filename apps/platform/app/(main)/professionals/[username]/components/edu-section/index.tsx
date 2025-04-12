'use client'

import { Button } from '@dalla/design-system'
import {
  Edit,
  GraduationCap,
  Calendar,
  Plus,
  Check,
  X,
  BookText,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { Input } from '@dalla/design-system'
import { Textarea } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import type { ProProfile } from '@lib/atoms/pro/meta'
import { MonthYearPicker } from '../month-year-date-picker'
import { useEdu } from '../../hooks/use-edu'
import { EduCardEdit } from './edu-card.edit'
import { EduCard } from './edu-card'

export function EducationSection({
  education,
  onUpdateEducation,
  isPublicView,
  isOwner,
}: {
  education: ProProfile['data']['education']
  onUpdateEducation: (updatedEducation: ProProfile['data']['education']) => void
  isPublicView: boolean
  isOwner: boolean
}) {
  const {
    isEditing,
    setIsEditing,
    editedEducation,
    handleEdit,
    handleSave,
    validationErrors,
    expandedItems,
    updateEducation,
    addEducation,
    removeEducation,
    isMobile,
    degreeInputRef,
    setExpandedItems,
  } = useEdu({
    education,
    onUpdateEducation,
  })

  const padding = isMobile ? 'pl-5' : 'pl-7'

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <BookText className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Education
        </h2>

        {!isEditing && !isPublicView && isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
          >
            <Edit className="mr-1 !h-4 !w-4" />
            Edit
          </Button>
        )}

        {isEditing && !isPublicView && isOwner && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
            >
              <X className="mr-1 !h-4 !w-4" />
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Check className="mr-1 !h-4 !w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-8">
            {Object.keys(validationErrors).length > 0 && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                Please fill in all required fields before saving.
              </div>
            )}
            {editedEducation
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime(),
              )
              .map((edu, index) => {
                return (
                  <EduCardEdit
                    key={index}
                    edu={edu}
                    index={index}
                    expandedItems={expandedItems}
                    updateEducation={updateEducation}
                    removeEducation={removeEducation}
                    setExpandedItems={setExpandedItems}
                    validationErrors={validationErrors}
                    degreeInputRef={
                      degreeInputRef as React.RefObject<HTMLInputElement>
                    }
                    padding={padding}
                  />
                )
              })}
            <div className={cn('relative border-l-2 border-gray-200', padding)}>
              <div className="absolute -left-[5px] top-3 h-[10px] w-[10px] rounded-full bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={addEducation}
                className="h-9 w-full rounded-md py-5 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add Education
              </Button>
            </div>
          </div>
        ) : education.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-2 text-sm text-gray-500">
              No education history added yet
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add Education
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {education
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime(),
              )
              .map((edu, index) => (
                <EduCard key={index} edu={edu} index={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
