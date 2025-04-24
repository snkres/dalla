import React from 'react'
import { Input } from '@dalla/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { SkillSelector } from '@components/shared/skill-selector'
import { motion } from 'motion/react'
import { Riyal } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'

interface StepTwoProps {
  formData: {
    skills: string[]
    meta: {
      budget: string
      timelineValue: string
      timelineUnit: string
    }
  }
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  handleSkillsChange: (skills: string[]) => void
  handleTimelineUnitChange: (value: string) => void
}

export function StepTwo({
  formData,
  handleInputChange,
  handleSkillsChange,
  handleTimelineUnitChange,
}: StepTwoProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <div className="mb-6">
            <label
              htmlFor="skills"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t.skillsLabel}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <SkillSelector
              skills={formData.skills}
              handleSkills={handleSkillsChange}
              maxSkills={10}
            />
            {formData.skills.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                {t.skillsRequiredMessage || 'At least one skill is required'}
              </p>
            )}
            <div className="mt-2 rounded-lg border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-4">
              <p className="text-xs text-gray-700">
                <span className="font-medium text-[#63B7B7]">
                  {t.proTipLabel || 'Pro Tip:'}
                </span>{' '}
                {t.skillsProTipContent ||
                  'Adding relevant skills will help match your project with the right professionals. Be specific to find the exact expertise you need.'}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              {t.budgetTimelineTitle || 'Budget & Timeline'}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meta.budget"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.budgetLabel}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <Riyal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="meta.budget"
                    type="number"
                    placeholder={t.budgetPlaceholder}
                    value={formData.meta.budget}
                    onChange={handleInputChange}
                    className={cn(
                      'pl-9',
                      formData.meta.budget
                        ? 'border-green-200 focus:border-green-300 focus:ring-green-200'
                        : '',
                    )}
                  />
                </div>
                {!formData.meta.budget && (
                  <p className="mt-1 text-xs text-amber-600">
                    {t.budgetRequiredMessage || 'Budget is required'}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="meta.timelineValue"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.timelineLabel}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    id="meta.timelineValue"
                    type="number"
                    value={formData.meta.timelineValue}
                    onChange={handleInputChange}
                    className={cn(
                      'w-24',
                      formData.meta.timelineValue
                        ? 'border-green-200 focus:border-green-300 focus:ring-green-200'
                        : '',
                    )}
                  />
                  <Select
                    value={formData.meta.timelineUnit}
                    onValueChange={handleTimelineUnitChange}
                  >
                    <SelectTrigger className="!h-10 flex-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">{t.timelineUnitDays}</SelectItem>
                      <SelectItem value="weeks">
                        {t.timelineUnitWeeks}
                      </SelectItem>
                      <SelectItem value="months">
                        {t.timelineUnitMonths}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
