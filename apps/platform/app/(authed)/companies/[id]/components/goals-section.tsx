'use client'

import { useState, useRef } from 'react'
import { Goal, Edit, Check, X } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Checkbox } from '@dallah/design-system'
import { toast } from '@dallah/design-system/ui/toast/use-toast'

interface GoalType {
  name: string
  description: string
}

const PREDEFINED_GOALS: GoalType[] = [
  {
    name: 'Increase Revenue',
    description:
      'Grow company revenue through new customers and expanded services.',
  },
  {
    name: 'Market Expansion',
    description:
      'Enter new markets and geographic regions to increase customer base.',
  },
  {
    name: 'Product Innovation',
    description:
      'Develop new products or enhance existing ones to meet market demands.',
  },
  {
    name: 'Operational Efficiency',
    description:
      'Streamline processes and reduce costs to improve profit margins.',
  },
  {
    name: 'Talent Development',
    description:
      'Invest in employee growth and create a positive company culture.',
  },
]

export function GoalsSection({
  goals,
  isPublicView,
  isOwner,
  onUpdate,
}: {
  goals: GoalType[]
  isPublicView?: boolean
  isOwner: boolean
  onUpdate?: (updatedData: { goals: GoalType[] }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGoals, setEditedGoals] = useState<GoalType[]>([])

  const MAX_GOALS = 3
  const [selectedGoalIds, setSelectedGoalIds] = useState<number[]>([])

  const handleEdit = () => {
    // Find indices of existing goals in the predefined list
    const initialSelectedIds = goals
      .map((goal) =>
        PREDEFINED_GOALS.findIndex(
          (predefined) =>
            predefined.name === goal.name &&
            predefined.description === goal.description,
        ),
      )
      .filter((index) => index !== -1)

    setSelectedGoalIds(initialSelectedIds)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedGoalIds.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one goal',
        variant: 'destructive',
      })
      return
    }

    // Convert selected IDs to actual goal objects
    const selectedGoals = selectedGoalIds.map((id) => PREDEFINED_GOALS[id])

    onUpdate?.({ goals: selectedGoals })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const toggleGoalSelection = (index: number) => {
    setSelectedGoalIds((prev) => {
      // If already selected, remove it
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index)
      }

      // If not selected and we haven't reached the limit, add it
      if (prev.length < MAX_GOALS) {
        return [...prev, index]
      }

      // If we've reached the limit, show a toast and don't change
      toast({
        title: 'Selection Limit Reached',
        description: `You can only select up to ${MAX_GOALS} goals`,
        variant: 'destructive',
      })
      return prev
    })
  }

  const displayGoals = isEditing ? editedGoals : goals.slice(0, MAX_GOALS)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-1.5 text-base font-medium text-gray-800">
          <Goal className="h-4 w-4 text-[#3A97A0]" />
          Company Goals
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
            Select up to {MAX_GOALS} company goals:
          </p>

          <div className="space-y-3">
            {PREDEFINED_GOALS.map((goal, index) => (
              <div
                key={index}
                onClick={() => toggleGoalSelection(index)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  selectedGoalIds.includes(index)
                    ? 'border-[#3A97A0] bg-[#3A97A0]/5'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`goal-${index}`}
                    checked={selectedGoalIds.includes(index)}
                    disabled={
                      !selectedGoalIds.includes(index) &&
                      selectedGoalIds.length >= MAX_GOALS
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`goal-${index}`}
                      className="block cursor-pointer text-xs font-medium text-gray-700"
                    >
                      {goal.name}
                    </label>
                    <p className="mt-1 text-xs text-gray-600">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500">
            {selectedGoalIds.length}/{MAX_GOALS} goals selected
          </p>
        </div>
      ) : (
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {displayGoals.length > 0 ? (
            displayGoals.map((goal, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#BEDDF1]/10 p-4 transition-colors duration-200 hover:bg-[#BEDDF1]/15"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#BEDDF1]/30">
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
                      className="h-4 w-4 text-[#3A97A0]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h4 className="mb-1 text-xs font-medium text-gray-800">
                    {goal.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {goal.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 flex h-24 items-center justify-center">
              <p className="text-center text-sm text-gray-500">
                No company goals added yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
