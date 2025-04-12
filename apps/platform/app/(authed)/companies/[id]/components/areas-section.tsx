'use client'

import { useState, useRef } from 'react'
import { Layers, Edit, Check, X } from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Checkbox } from '@dalla/design-system'
import { toast } from '@dalla/design-system/ui/toast/use-toast'

interface Area {
  name: string
  description: string
}

const PREDEFINED_AREAS: Area[] = [
  {
    name: 'Software Development',
    description: 'Building and maintaining software applications and systems.',
  },
  {
    name: 'Data Analysis',
    description: 'Interpreting complex data sets to inform business decisions.',
  },
  {
    name: 'Project Management',
    description:
      'Planning, executing, and overseeing projects from initiation to completion.',
  },
  {
    name: 'UI/UX Design',
    description:
      'Creating intuitive and engaging user interfaces and experiences.',
  },
  {
    name: 'Digital Marketing',
    description:
      'Promoting products or services using digital channels and strategies.',
  },
]

export function AreasSection({
  areas,
  isPublicView,
  isOwner,
  onUpdate,
}: {
  areas: Area[]
  isPublicView?: boolean
  isOwner: boolean
  onUpdate?: (updatedData: { areas: Area[] }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAreas, setEditedAreas] = useState<Area[]>([])
  const MAX_AREAS = 3
  const [selectedAreaIds, setSelectedAreaIds] = useState<number[]>([])

  const handleEdit = () => {
    // Find indices of existing areas in the predefined list
    const initialSelectedIds = areas
      .map((area) =>
        PREDEFINED_AREAS.findIndex(
          (predefined) =>
            predefined.name === area.name &&
            predefined.description === area.description,
        ),
      )
      .filter((index) => index !== -1)

    setSelectedAreaIds(initialSelectedIds)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedAreaIds.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one area of expertise',
        variant: 'destructive',
      })
      return
    }

    // Convert selected IDs to actual area objects
    const selectedAreas = selectedAreaIds.map((id) => PREDEFINED_AREAS[id])

    onUpdate?.({ areas: selectedAreas })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const toggleAreaSelection = (index: number) => {
    setSelectedAreaIds((prev) => {
      // If already selected, remove it
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index)
      }

      // If not selected and we haven't reached the limit, add it
      if (prev.length < MAX_AREAS) {
        return [...prev, index]
      }

      // If we've reached the limit, show a toast and don't change
      toast({
        title: 'Selection Limit Reached',
        description: `You can only select up to ${MAX_AREAS} areas`,
        variant: 'destructive',
      })
      return prev
    })
  }

  // Display areas (either in edit mode or view mode)
  const displayAreas = isEditing ? editedAreas : areas.slice(0, MAX_AREAS)

  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
          <Layers className="h-4 w-4 text-[#3A97A0]" />
          Areas of Expertise
        </h3>

        {!isPublicView && isOwner && (
          <>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#3A97A0]"
              >
                <Edit className="mr-1 !h-4 !w-4" />
                Edit
              </Button>
            )}

            {isEditing && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
                >
                  <X className="mr-1 !h-4 !w-4" />
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="h-7 rounded-full px-3 text-xs text-[#3A97A0] hover:bg-[#3A97A0]/10"
                >
                  <Check className="mr-1 !h-4 !w-4" />
                  Save
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            Select up to {MAX_AREAS} areas of expertise:
          </p>

          <div className="space-y-3">
            {PREDEFINED_AREAS.map((area, index) => (
              <div
                key={index}
                onClick={() => toggleAreaSelection(index)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedAreaIds.includes(index)
                    ? 'border-[#3A97A0] bg-[#3A97A0]/5'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`area-${index}`}
                    checked={selectedAreaIds.includes(index)}
                    // onCheckedChange={() => toggleAreaSelection(index)}
                    disabled={
                      !selectedAreaIds.includes(index) &&
                      selectedAreaIds.length >= MAX_AREAS
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`area-${index}`}
                      className="block cursor-pointer text-xs font-medium text-gray-700"
                    >
                      {area.name}
                    </label>
                    <p className="mt-1 text-xs text-gray-600">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500">
            {selectedAreaIds.length}/{MAX_AREAS} areas selected
          </p>
        </div>
      ) : (
        // Keep the view mode as is
        <div className="space-y-3">
          {displayAreas.length > 0 ? (
            displayAreas.map((area, index) => (
              <div
                key={index}
                className="rounded-lg bg-[#BEDDF1]/10 p-3 transition-colors duration-200 hover:bg-[#BEDDF1]/25"
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-3 w-3 rounded-full bg-[#3A97A0]"></div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">
                      {area.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-600">
                      {area.description || 'No description provided.'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-24 items-center justify-center">
              <p className="text-center text-sm text-gray-500">
                No areas of expertise added yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
