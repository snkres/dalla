import { useState } from 'react'
import { Layers, Edit, Check, X } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Checkbox } from '@dallah/design-system'

export function AreasSection({
  areas,
  isPublicView,
  isOwner,
  onUpdate,
}: {
  areas: string[]
  isPublicView?: boolean
  isOwner: boolean
  onUpdate?: (selectedAreas: string[]) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    areas.slice(0, 3),
  )

  const handleEdit = () => {
    setSelectedAreas(areas.slice(0, 3))
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate?.(selectedAreas)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    } else {
      if (selectedAreas.length < 3) {
        setSelectedAreas([...selectedAreas, area])
      }
    }
  }

  const displayAreas = isEditing ? selectedAreas : areas.slice(0, 3)

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
            Select up to 3 areas to highlight:
          </p>
          <div className="max-h-[300px] overflow-y-auto pr-2">
            {areas.map((area, index) => (
              <div
                key={index}
                className="mb-2 flex items-center rounded-lg border border-gray-100 p-2 hover:bg-gray-50"
              >
                <Checkbox
                  id={`area-${index}`}
                  checked={selectedAreas.includes(area)}
                  onCheckedChange={() => toggleArea(area)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-[#3A97A0]"
                />
                <label
                  htmlFor={`area-${index}`}
                  className="flex-1 cursor-pointer text-xs font-medium text-gray-700"
                >
                  {area}
                </label>
              </div>
            ))}
          </div>
          {selectedAreas.length === 0 && (
            <p className="text-xs italic text-amber-600">
              Please select at least one area
            </p>
          )}
          {selectedAreas.length === 3 && (
            <p className="text-xs italic text-gray-500">
              Maximum selection reached (3)
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {displayAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-lg bg-[#BEDDF1]/10 p-3 transition-colors duration-200 hover:bg-[#BEDDF1]/25"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-3 w-3 rounded-full bg-[#3A97A0]"></div>
                <div>
                  <h4 className="text-xs font-medium text-gray-800">{area}</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    Anim laboris eiusmod irure mollit reprehenderit quis sunt
                    ullamco sint dolor in fugiat eu.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
