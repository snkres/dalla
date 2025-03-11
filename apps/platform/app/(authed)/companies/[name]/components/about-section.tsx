import { useState, useRef, useEffect } from 'react'
import { Badge, Button, Textarea, Input } from '@dallah/design-system'
import { Briefcase, Users, Building, Edit, Check, X } from 'lucide-react'
import { SkillSelector } from '@components/shared/skill-selector'

export function AboutSection({
  data,
  isPublicView = true,
  isOwner = false,
  onUpdate,
}: {
  data: {
    name: string
    size: string
    industry: string
    headline: string
    bio: string
    areas: string[]
  }
  isPublicView: boolean
  isOwner: boolean
  onUpdate: (data: { headline: string; bio: string; areas: string[] }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ ...data })
  const [showAllAreas, setShowAllAreas] = useState(false)

  const headlineRef = useRef<HTMLInputElement>(null)
  const areasContainerRef = useRef<HTMLDivElement>(null)

  const handleEdit = () => {
    setEditedData({ ...data })
    setIsEditing(true)
    setTimeout(() => headlineRef.current?.focus(), 100)
  }

  const handleSave = () => {
    onUpdate?.(editedData)
    setIsEditing(false)
  }

  const handleAreas = (areas: string[]) => {
    // Limit areas to 30
    const limitedAreas = areas.slice(0, 30)
    setEditedData((prev) => ({ ...prev, areas: limitedAreas }))
  }

  // Check if areas container has overflow
  const [hasAreasOverflow, setHasAreasOverflow] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      const container = areasContainerRef.current
      if (container) {
        // Check if content height is greater than container height
        const hasOverflow = container.scrollHeight > container.clientHeight
        setHasAreasOverflow(hasOverflow && data.areas.length > 0)
      }
    }

    checkOverflow()
    window.addEventListener('resize', () => checkOverflow())
    return () => window.removeEventListener('resize', () => checkOverflow())
  }, [data.areas, showAllAreas])

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Building className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          About {data.name}
        </h2>

        {!isPublicView && isOwner && (
          <>
            {!isEditing && (
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

            {isEditing && (
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
          </>
        )}
      </div>

      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="companyHeadline"
                className="mb-1 block text-xs font-medium text-gray-500"
              >
                Headline
              </label>
              <Input
                id="companyHeadline"
                ref={headlineRef}
                value={editedData.headline}
                onChange={(e) =>
                  setEditedData({ ...editedData, headline: e.target.value })
                }
                className="rounded-lg border border-gray-200 text-sm"
                placeholder="Enter a short headline for your company"
              />
            </div>

            <div>
              <label
                htmlFor="companyBio"
                className="mb-1 block text-xs font-medium text-gray-500"
              >
                Company Bio
              </label>
              <Textarea
                id="companyBio"
                value={editedData.bio}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    bio: e.target.value,
                  })
                }
                className="min-h-[120px] rounded-lg border border-gray-200 text-sm"
                placeholder="Write a brief description about your company"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">
                Focus Areas
              </label>
              <SkillSelector
                skills={editedData.areas}
                handleSkills={handleAreas}
                maxSkills={30}
              />
              <p className="mt-1 text-xs text-gray-500">
                Maximum 30 areas allowed
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              {data.headline}
            </h4>

            <p className="text-xs leading-relaxed text-gray-600">{data.bio}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div
          ref={areasContainerRef}
          className={`flex flex-wrap gap-2 p-4 ${!showAllAreas ? 'max-h-[60px] overflow-hidden' : ''}`}
        >
          {data.areas.map((area, index) => (
            <Badge
              key={index}
              variant="outline"
              className="!rounded-full border-[#BEDDF1]/30 !bg-[#BEDDF1]/10 text-xs !text-[#3A97A0] transition-colors duration-200 hover:!bg-[#BEDDF1]/20"
            >
              {area}
            </Badge>
          ))}
        </div>

        {hasAreasOverflow && (
          <button
            onClick={() => setShowAllAreas(!showAllAreas)}
            className="mx-4 mb-2 self-start text-xs font-medium text-[#3A97A0] hover:text-[#63B7B7]"
          >
            {showAllAreas ? 'Show less' : 'Show all areas'}
          </button>
        )}
      </div>
    </div>
  )
}
