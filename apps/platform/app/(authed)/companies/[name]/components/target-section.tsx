'use client'

import { useState, useRef } from 'react'
import { Target, Edit, Check, X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { toast } from '@dallah/design-system/ui/toast/use-toast'

interface Industry {
  name: string
  description: string
}

export function TargetIndustriesSection({
  industries,
  isPublicView,
  isOwner,
  onUpdate,
}: {
  industries: Industry[]
  isPublicView?: boolean
  isOwner: boolean
  onUpdate?: (updatedData: { targetIndustries: Industry[] }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedIndustries, setEditedIndustries] = useState<Industry[]>([])
  const nameInputRef = useRef<HTMLInputElement>(null)
  const MAX_INDUSTRIES = 3

  const handleEdit = () => {
    setEditedIndustries(
      industries.length > 0
        ? [...industries.slice(0, MAX_INDUSTRIES)]
        : [{ name: '', description: '' }],
    )
    setIsEditing(true)
    setTimeout(() => nameInputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    const validIndustries = editedIndustries.filter(
      (industry) => industry.name.trim() !== '',
    )

    if (validIndustries.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please add at least one industry with a name',
        variant: 'destructive',
      })
      return
    }

    onUpdate?.({ targetIndustries: validIndustries })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addIndustry = () => {
    if (editedIndustries.length < MAX_INDUSTRIES) {
      setEditedIndustries([...editedIndustries, { name: '', description: '' }])
      setTimeout(() => {
        const inputs = document.querySelectorAll(
          'input[placeholder="Industry name"]',
        )
        const lastInput = inputs[inputs.length - 1] as HTMLInputElement
        lastInput?.focus()
      }, 100)
    }
  }

  const removeIndustry = (index: number) => {
    setEditedIndustries(editedIndustries.filter((_, i) => i !== index))
  }

  const updateIndustry = (
    index: number,
    field: keyof Industry,
    value: string,
  ) => {
    const updatedIndustries = [...editedIndustries]
    updatedIndustries[index] = { ...updatedIndustries[index], [field]: value }
    setEditedIndustries(updatedIndustries)
  }

  const displayIndustries = isEditing
    ? editedIndustries
    : industries.slice(0, MAX_INDUSTRIES)

  return (
    <div className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
          <Target className="h-4 w-4 text-[#3A97A0]" />
          Target Industries
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
            Add up to {MAX_INDUSTRIES} target industries:
          </p>

          <div className="space-y-4">
            {editedIndustries.map((industry, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-100 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-medium text-gray-700">
                    Industry {index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIndustry(index)}
                    className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Input
                      ref={index === 0 ? nameInputRef : undefined}
                      value={industry.name}
                      onChange={(e) =>
                        updateIndustry(index, 'name', e.target.value)
                      }
                      placeholder="Industry name"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div>
                    <Textarea
                      value={industry.description}
                      onChange={(e) =>
                        updateIndustry(index, 'description', e.target.value)
                      }
                      placeholder="Brief description of this industry"
                      className="min-h-[80px] text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editedIndustries.length < MAX_INDUSTRIES && (
            <Button
              variant="outline"
              size="sm"
              onClick={addIndustry}
              className="mt-2 w-full border-dashed border-[#3A97A0]/30 text-xs text-[#3A97A0] hover:border-[#3A97A0] hover:bg-[#3A97A0]/5"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add Industry {editedIndustries.length + 1}
            </Button>
          )}

          {editedIndustries.length === MAX_INDUSTRIES && (
            <p className="text-center text-xs italic text-gray-500">
              Maximum of {MAX_INDUSTRIES} industries reached
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {displayIndustries.length > 0 ? (
            displayIndustries.map((industry, index) => (
              <div
                key={index}
                className="rounded-lg bg-[#BEDDF1]/10 p-3 transition-colors duration-200 hover:bg-[#BEDDF1]/25"
              >
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#BEDDF1]/40">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 text-[#3A97A0]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="8 12 12 16 16 12"></polyline>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">
                      {industry.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-600">
                      {industry.description || 'No description provided.'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-24 items-center justify-center">
              <p className="text-center text-sm text-gray-500">
                No target industries added yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
