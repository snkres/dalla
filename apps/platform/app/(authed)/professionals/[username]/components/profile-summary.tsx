'use client'

import React, { useState, useRef } from 'react'
import { Edit, Check, X, User } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { SkillSelector } from '@components/shared/skill-selector'

export function ProfileSummary({
  summary,
  isPublicView,
  isOwner,
  onUpdate,
}: {
  summary: {
    title: string
    content: string
    skills: string[]
  }
  isPublicView: boolean
  isOwner: boolean
  onUpdate: (summary: {
    title: string
    content: string
    skills: string[]
  }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSummary, setEditedSummary] = useState({ ...summary })
  const [showAllSkills, setShowAllSkills] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const skillsContainerRef = useRef<HTMLDivElement>(null)

  const handleEdit = () => {
    setEditedSummary({ ...summary })
    setIsEditing(true)
    setTimeout(() => titleRef.current?.focus(), 100)
  }

  const handleSave = () => {
    onUpdate({
      title: editedSummary.title,
      content: editedSummary.content,
      skills: editedSummary.skills,
    })
    setIsEditing(false)
  }

  const handleSkills = (skills: string[]) => {
    // Limit skills to 30
    const limitedSkills = skills.slice(0, 30)
    setEditedSummary((prev) => ({ ...prev, skills: limitedSkills }))
  }

  // Check if skills container has overflow
  const [hasSkillsOverflow, setHasSkillsOverflow] = useState(false)

  React.useEffect(() => {
    const checkOverflow = () => {
      const container = skillsContainerRef.current
      if (container) {
        // Check if content height is greater than container height
        const hasOverflow = container.scrollHeight > container.clientHeight
        setHasSkillsOverflow(hasOverflow && summary.skills.length > 0)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [summary.skills, showAllSkills])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <User className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Professional Summary
        </h2>

        {!isPublicView && isOwner && (
          <>
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
          </>
        )}
      </div>

      <div className="p-5">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="summaryTitle"
                className="mb-1 block text-xs font-medium text-gray-500"
              >
                Title
              </label>
              <Input
                id="summaryTitle"
                ref={titleRef}
                value={editedSummary.title}
                onChange={(e) =>
                  setEditedSummary({ ...editedSummary, title: e.target.value })
                }
                className="rounded-lg border border-gray-200 text-sm"
                placeholder="Enter your professional title"
              />
            </div>

            <div>
              <label
                htmlFor="summaryContent"
                className="mb-1 block text-xs font-medium text-gray-500"
              >
                Summary
              </label>
              <Textarea
                id="summaryContent"
                value={editedSummary.content}
                onChange={(e) =>
                  setEditedSummary({
                    ...editedSummary,
                    content: e.target.value,
                  })
                }
                className="min-h-[120px] rounded-lg border border-gray-200 text-sm"
                placeholder="Write a brief summary about yourself, your expertise and experience"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">
                Skills
              </label>
              <SkillSelector
                skills={editedSummary.skills}
                handleSkills={handleSkills}
                maxSkills={30}
              />
              <p className="mt-1 text-xs text-gray-500">
                Maximum 30 skills allowed
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="mb-3 text-lg font-medium text-gray-900 sm:text-2xl">
              {summary.title}
            </h1>
            <p className="text-xs leading-relaxed text-gray-600">
              {summary.content}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div
          ref={skillsContainerRef}
          className={`flex flex-wrap gap-2 p-4 ${!showAllSkills ? 'max-h-[60px] overflow-hidden' : ''}`}
        >
          {summary.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="!rounded-full border-[#BEDDF1]/30 !bg-[#BEDDF1]/10 text-xs !text-[#3A97A0] transition-colors duration-200 hover:!bg-[#BEDDF1]/20"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {hasSkillsOverflow && (
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="mx-4 mb-2 self-start text-xs font-medium text-[#3A97A0] hover:text-[#63B7B7]"
          >
            {showAllSkills ? 'Show less' : 'Show all skills'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProfileSummary
