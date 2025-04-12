'use client'

import { Button } from '@dalla/design-system'
import { Edit, Briefcase, Plus, Check, X } from 'lucide-react'
import { cn } from '@dalla/utils'
import type { ProProfile } from '@lib/atoms/pro/meta'
import { useExp } from '../../hooks/use-exp'
import { ExpCardEdit } from './exp-card.edit'
import { ExpCard } from './exp-card'

export function ExperienceSection({
  experiences,
  onUpdate,
  isPublicView,
  isOwner,
}: {
  experiences: ProProfile['data']['experience']
  onUpdate?: (updatedExperiences: ProProfile['data']['experience']) => void
  isPublicView: boolean
  isOwner: boolean
}) {
  const {
    editedExperiences,
    setEditedExperiences,
    isEditing,
    setIsEditing,
    isMobile,
    inputRef,
    skillsInput,
    setSkillsInput,
    expandedItems,
    setExpandedItems,
    validationErrors,
    handleEdit,
    handleSave,
    addExperience,
    removeExperience,
    groupedExperiences,
    addRole,
    findExperienceIndex,
    updateExperience,
    updateSkills,
    updateAchievement,
    updateMeta,
    setValidationErrors,
  } = useExp({
    experiences,
    onUpdate,
  })

  const padding = isMobile ? 'pl-5' : 'pl-7'
  const posPadding = isMobile ? 'pl-3' : 'pl-5'

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Professional Experience
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
        {isEditing && (
          <div className="space-y-8">
            {Object.keys(validationErrors).length > 0 && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                Please fill in all required fields before saving.
              </div>
            )}
            {Object.entries(groupedExperiences()).map(
              ([company, companyExps], groupIndex) => (
                <ExpCardEdit
                  key={groupIndex}
                  company={company}
                  companyExps={companyExps}
                  groupIndex={groupIndex}
                  editedExperiences={editedExperiences}
                  expandedItems={expandedItems}
                  setExpandedItems={setExpandedItems}
                  validationErrors={validationErrors}
                  padding={padding}
                  posPadding={posPadding}
                  inputRef={inputRef}
                  skillsInput={skillsInput}
                  setSkillsInput={setSkillsInput}
                  setEditedExperiences={setEditedExperiences}
                  setValidationErrors={setValidationErrors}
                  findExperienceIndex={findExperienceIndex}
                  updateExperience={updateExperience}
                  updateSkills={updateSkills}
                  updateAchievement={updateAchievement}
                  updateMeta={updateMeta}
                  removeExperience={removeExperience}
                  addRole={addRole}
                />
              ),
            )}

            <div className={cn('relative border-l-2 border-gray-200', padding)}>
              <div className="absolute -left-[5px] top-3 h-[10px] w-[10px] rounded-full bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={addExperience}
                className="h-9 w-full rounded-md py-5 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add Experience
              </Button>
            </div>
          </div>
        )}

        {experiences?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-2 text-sm text-gray-500">
              No professional experience added yet
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add experience
            </Button>
          </div>
        )}

        {experiences?.length > 0 && !isEditing && (
          <div className="space-y-8">
            {(() => {
              const grouped: {
                [company: string]: ProProfile['data']['experience']
              } = {}
              ;[...experiences]
                .sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime(),
                )
                .forEach((exp) => {
                  if (!grouped[exp.company]) {
                    grouped[exp.company] = []
                  }
                  grouped[exp.company].push(exp)
                })

              return Object.entries(grouped).map(
                ([company, companyExps], index) => (
                  <ExpCard
                    key={index}
                    company={company}
                    companyExps={companyExps}
                    index={index}
                    padding={padding}
                    posPadding={posPadding}
                  />
                ),
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
