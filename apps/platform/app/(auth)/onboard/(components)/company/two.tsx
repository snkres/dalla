'use client'

import { motion } from 'motion/react'
import { GoalCard } from '../goal-card'
import { focusAreaOptions } from '@lib/data/focus-options'
import { GoalOption } from '@lib/types/goals'
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import { CompanyOnboardingData } from '../../page'

export function CompanyOnboardingTwo({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const handleToggle = (goal: string) => {
    setData((prev: CompanyOnboardingData) => ({
      ...prev,
      areas: prev.areas.includes(goal)
        ? prev.areas.filter((area: string) => area !== goal)
        : [...prev.areas, goal],
    }))
  }

  return (
    <div className="bg-gray-50/30">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-3xl px-4"
      >
        <motion.div
          variants={fadeInUpVariants}
          className="mb-12 space-y-4 text-center"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            Choose Your Focus Areas
          </h1>
          <p className="text-sm font-light text-gray-500">
            Select the key areas that align with your professional goals and
            expertise
          </p>
        </motion.div>

        <motion.div
          className="mb-12 grid gap-4"
          variants={fadeInVariants}
          initial="hidden"
          animate="show"
        >
          {focusAreaOptions.map((option, index) => (
            <motion.div
              key={option.id}
              variants={fadeInUpVariants}
              custom={index}
            >
              <GoalCard
                option={option as GoalOption}
                isSelected={data.areas.includes(option.label)}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-6 text-center text-gray-500">
          {data.areas.length > 0 ? (
            <span className="text-sm font-light text-gray-500">
              {data.areas.length} area{data.areas.length > 1 ? 's' : ''}{' '}
              selected
            </span>
          ) : (
            <span className="text-sm font-light text-gray-500">
              Select at least one focus area to continue
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
