'use client'

import { useState, useRef } from 'react'
import { Goal, Edit, Check, X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { toast } from '@dallah/design-system/ui/toast/use-toast'

interface GoalType {
  name: string
  description: string
}

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
  const nameInputRef = useRef<HTMLInputElement>(null)
  const MAX_GOALS = 3

  const handleEdit = () => {
    setEditedGoals(
      goals.length > 0
        ? [...goals.slice(0, MAX_GOALS)]
        : [{ name: '', description: '' }],
    )
    setIsEditing(true)
    setTimeout(() => nameInputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    const validGoals = editedGoals.filter((goal) => goal.name.trim() !== '')

    if (validGoals.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please add at least one goal with a name',
        variant: 'destructive',
      })
      return
    }

    onUpdate?.({ goals: validGoals })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addGoal = () => {
    if (editedGoals.length < MAX_GOALS) {
      setEditedGoals([...editedGoals, { name: '', description: '' }])
      setTimeout(() => {
        const inputs = document.querySelectorAll(
          'input[placeholder="Goal name"]',
        )
        const lastInput = inputs[inputs.length - 1] as HTMLInputElement
        lastInput?.focus()
      }, 100)
    }
  }

  const removeGoal = (index: number) => {
    setEditedGoals(editedGoals.filter((_, i) => i !== index))
  }

  const updateGoal = (index: number, field: keyof GoalType, value: string) => {
    const updatedGoals = [...editedGoals]
    updatedGoals[index] = { ...updatedGoals[index], [field]: value }
    setEditedGoals(updatedGoals)
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
            Add up to {MAX_GOALS} company goals:
          </p>

          <div className="space-y-4">
            {editedGoals.map((goal, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-100 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-medium text-gray-700">
                    Goal {index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGoal(index)}
                    className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Input
                      ref={index === 0 ? nameInputRef : undefined}
                      value={goal.name}
                      onChange={(e) =>
                        updateGoal(index, 'name', e.target.value)
                      }
                      placeholder="Goal name"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div>
                    <Textarea
                      value={goal.description}
                      onChange={(e) =>
                        updateGoal(index, 'description', e.target.value)
                      }
                      placeholder="Brief description of this goal"
                      className="min-h-[80px] text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editedGoals.length < MAX_GOALS && (
            <Button
              variant="outline"
              size="sm"
              onClick={addGoal}
              className="mt-2 w-full border-dashed border-[#3A97A0]/30 text-xs text-[#3A97A0] hover:border-[#3A97A0] hover:bg-[#3A97A0]/5"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add Goal {editedGoals.length + 1}
            </Button>
          )}

          {editedGoals.length === MAX_GOALS && (
            <p className="text-center text-xs italic text-gray-500">
              Maximum of {MAX_GOALS} goals reached
            </p>
          )}
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
