'use client'

import { useState, useRef } from 'react'
import { Layers, Edit, Check, X, Plus, Trash2 } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Checkbox } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { toast } from '@dallah/design-system/ui/toast/use-toast'

interface Area {
  name: string
  description: string
}

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
  const nameInputRef = useRef<HTMLInputElement>(null)
  const MAX_AREAS = 3

  const handleEdit = () => {
    // Initialize with existing areas or an empty area if none exist
    setEditedAreas(areas.length > 0 ? [...areas.slice(0, MAX_AREAS)] : [{ name: '', description: '' }])
    setIsEditing(true)
    setTimeout(() => nameInputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    // Validate areas before saving
    const validAreas = editedAreas.filter(area => area.name.trim() !== '')
    
    if (validAreas.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one area with a name",
        variant: "destructive",
      })
      return
    }
    
    onUpdate?.({ areas: validAreas })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addArea = () => {
    if (editedAreas.length < MAX_AREAS) {
      setEditedAreas([...editedAreas, { name: '', description: '' }])
      setTimeout(() => {
        const inputs = document.querySelectorAll('input[placeholder="Area name"]')
        const lastInput = inputs[inputs.length - 1] as HTMLInputElement
        lastInput?.focus()
      }, 100)
    }
  }

  const removeArea = (index: number) => {
    setEditedAreas(editedAreas.filter((_, i) => i !== index))
  }

  const updateArea = (index: number, field: keyof Area, value: string) => {
    const updatedAreas = [...editedAreas]
    updatedAreas[index] = { ...updatedAreas[index], [field]: value }
    setEditedAreas(updatedAreas)
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
            Add up to {MAX_AREAS} areas of expertise:
          </p>
          
          <div className="space-y-4">
            {editedAreas.map((area, index) => (
              <div key={index} className="rounded-lg border border-gray-100 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-medium text-gray-700">Area {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArea(index)}
                    className="h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Input
                      ref={index === 0 ? nameInputRef : undefined}
                      value={area.name}
                      onChange={(e) => updateArea(index, 'name', e.target.value)}
                      placeholder="Area name"
                      className="h-9 text-xs"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      value={area.description}
                      onChange={(e) => updateArea(index, 'description', e.target.value)}
                      placeholder="Brief description of this area"
                      className="min-h-[80px] text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {editedAreas.length < MAX_AREAS && (
            <Button
              variant="outline"
              size="sm"
              onClick={addArea}
              className="mt-2 w-full border-dashed border-[#3A97A0]/30 text-xs text-[#3A97A0] hover:border-[#3A97A0] hover:bg-[#3A97A0]/5"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add Area {editedAreas.length + 1}
            </Button>
          )}
          
          {editedAreas.length === MAX_AREAS && (
            <p className="text-center text-xs italic text-gray-500">
              Maximum of {MAX_AREAS} areas reached
            </p>
          )}
        </div>
      ) : (
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
                    <h4 className="text-xs font-medium text-gray-800">{area.name}</h4>
                    <p className="mt-1 text-xs text-gray-600">
                      {area.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-24 items-center justify-center">
              <p className="text-center text-sm text-gray-500">No areas of expertise added yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
