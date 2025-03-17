'use client'

import { Button } from '@dallah/design-system'
import {
  Edit,
  GraduationCap,
  Calendar,
  Plus,
  Check,
  X,
  BookText,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import type { ProProfile } from '@lib/atoms/pro/profile'
import { MonthYearPicker } from './month-year-date-picker'

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
  const [editedEducation, setEditedEducation] =
    useState<ProProfile['data']['education']>(education)
  const [isEditing, setIsEditing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { [field: string]: boolean }
  }>({})

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleEdit = () => {
    setEditedEducation(JSON.parse(JSON.stringify(education)))
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    // Validate required fields
    const errors: { [key: number]: { [field: string]: boolean } } = {}
    let hasErrors = false

    editedEducation.forEach((edu, index) => {
      const indexErrors: { [field: string]: boolean } = {}

      if (!edu.degree.trim()) {
        indexErrors.degree = true
        hasErrors = true
      }

      if (!edu.school.trim()) {
        indexErrors.school = true
        hasErrors = true
      }

      if (!edu.startDate) {
        indexErrors.startDate = true
        hasErrors = true
      }

      if (Object.keys(indexErrors).length > 0) {
        errors[index] = indexErrors
      }
    })

    setValidationErrors(errors)

    if (hasErrors) {
      // Don't save if there are validation errors
      return
    }

    onUpdateEducation(editedEducation)
    setIsEditing(false)
  }

  const addEducation = () => {
    setEditedEducation([
      ...editedEducation,
      {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
        id: '',
        profileId: '',
        createdAt: '',
        updatedAt: '',
      },
    ])
    setTimeout(() => {
      const inputs = document.querySelectorAll(
        'input[placeholder="Degree or certification"]',
      )
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement
      lastInput?.focus()
    }, 100)
  }

  const removeEducation = (index: number) => {
    setEditedEducation(editedEducation.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...editedEducation]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setEditedEducation(updatedEducation)

    // Clear validation error for this field if it exists
    if (validationErrors[index]?.[field]) {
      const updatedErrors = { ...validationErrors }
      delete updatedErrors[index][field]
      if (Object.keys(updatedErrors[index]).length === 0) {
        delete updatedErrors[index]
      }
      setValidationErrors(updatedErrors)
    }
  }

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
              .map((edu, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative border-l-2 border-gray-200',
                    padding,
                    'pb-2',
                  )}
                >
                  <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>

                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-3 w-3 text-white" />

                      <Input
                        ref={index === 0 ? inputRef : undefined}
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(index, 'degree', e.target.value)
                        }
                        placeholder="Degree or certification"
                        className={cn(
                          'h-7 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto',
                          validationErrors[index]?.degree
                            ? 'border-b-2 border-red-500'
                            : '',
                        )}
                      />
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
                          onChange={(value) =>
                            updateEducation(index, 'startDate', value)
                          }
                          placeholder="Start date"
                          className={
                            validationErrors[index]?.startDate
                              ? 'border-red-500'
                              : ''
                          }
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 flex-shrink-0 text-gray-400" />
                        <MonthYearPicker
                          value={edu.endDate || 'Present'}
                          onChange={(value) =>
                            updateEducation(index, 'endDate', value)
                          }
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
                </div>
              ))}

            <div className={cn('relative border-l-2 border-gray-200', padding)}>
              <div className="absolute -left-[5px] top-3 h-[10px] w-[10px] rounded-full bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={addEducation}
                className="h-9 w-full rounded-md py-5 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add education
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
              Add education
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
                <div
                  key={index}
                  className="group -ml-2 rounded-md px-2 py-2 transition-colors hover:bg-gray-50/50"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#63B7B7]">
                      <GraduationCap className="h-3 w-3 text-white" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {edu.degree}
                    </h4>
                  </div>

                  <div className="ml-7">
                    <div className="flex flex-wrap items-baseline justify-between">
                      <p className="text-sm text-gray-600">{edu.school}</p>

                      <div className="mt-1 flex items-center text-xs text-gray-500 sm:mt-0">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(edu.startDate).toLocaleDateString('en-UK', {
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          -{' '}
                          {edu.endDate === 'present'
                            ? 'Present'
                            : new Date(edu.endDate).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  year: 'numeric',
                                },
                              )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      {edu.field && (
                        <div className="flex items-center">
                          <svg
                            className="mr-1 h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 20v-6M12 8V2M4.93 10A8 8 0 0 0 4 14a8 8 0 0 0 16 0 8 8 0 0 0-.93-4" />
                          </svg>
                          <span>{edu.field}</span>
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="mt-2 text-xs leading-relaxed text-gray-600">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
