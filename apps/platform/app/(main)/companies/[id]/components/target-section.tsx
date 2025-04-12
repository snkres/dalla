'use client'

import { useState, useRef } from 'react'
import { Target, Edit, Check, X } from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Checkbox } from '@dalla/design-system'
import { toast } from '@dalla/design-system/ui/toast/use-toast'

interface Industry {
  name: string
  description: string
}

const PREDEFINED_INDUSTRIES: Industry[] = [
  {
    name: 'Technology',
    description: 'Software, hardware, IT services, and digital solutions.',
  },
  {
    name: 'Healthcare',
    description:
      'Medical services, pharmaceuticals, and healthcare technology.',
  },
  {
    name: 'Finance',
    description: 'Banking, investment, insurance, and financial technology.',
  },
  {
    name: 'Education',
    description:
      'Schools, universities, e-learning, and educational technology.',
  },
  {
    name: 'Manufacturing',
    description: 'Production of goods, industrial equipment, and supply chain.',
  },
]

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
  const MAX_INDUSTRIES = 3
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>([])

  const handleEdit = () => {
    // Find indices of existing industries in the predefined list
    const initialSelectedIds = industries
      .map((industry) =>
        PREDEFINED_INDUSTRIES.findIndex(
          (predefined) =>
            predefined.name === industry.name &&
            predefined.description === industry.description,
        ),
      )
      .filter((index) => index !== -1)

    setSelectedIndustryIds(initialSelectedIds)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedIndustryIds.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one industry',
        variant: 'destructive',
      })
      return
    }

    // Convert selected IDs to actual industry objects
    const selectedIndustries = selectedIndustryIds.map(
      (id) => PREDEFINED_INDUSTRIES[id],
    )

    onUpdate?.({ targetIndustries: selectedIndustries })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const toggleIndustrySelection = (index: number) => {
    setSelectedIndustryIds((prev) => {
      // If already selected, remove it
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index)
      }

      // If not selected and we haven't reached the limit, add it
      if (prev.length < MAX_INDUSTRIES) {
        return [...prev, index]
      }

      // If we've reached the limit, show a toast and don't change
      toast({
        title: 'Selection Limit Reached',
        description: `You can only select up to ${MAX_INDUSTRIES} industries`,
        variant: 'destructive',
      })
      return prev
    })
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
            Select up to {MAX_INDUSTRIES} target industries:
          </p>

          <div className="space-y-3">
            {PREDEFINED_INDUSTRIES.map((industry, index) => (
              <div
                key={index}
                onClick={() => toggleIndustrySelection(index)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedIndustryIds.includes(index)
                    ? 'border-[#3A97A0] bg-[#3A97A0]/5'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`industry-${index}`}
                    checked={selectedIndustryIds.includes(index)}
                    disabled={
                      !selectedIndustryIds.includes(index) &&
                      selectedIndustryIds.length >= MAX_INDUSTRIES
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`industry-${index}`}
                      className="block cursor-pointer text-xs font-medium text-gray-700"
                    >
                      {industry.name}
                    </label>
                    <p className="mt-1 text-xs text-gray-600">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500">
            {selectedIndustryIds.length}/{MAX_INDUSTRIES} industries selected
          </p>
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
