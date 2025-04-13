'use client'

import { motion } from 'motion/react'
import { GoalCard } from '../goal-card'
import { focusAreaOptions } from '@lib/data/focus-options'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import { CompanyOnboardingData } from '../../hooks/use-onboarding'

export function CompanyOnboardingTwo({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const handleToggle = (area: { name: string; description: string }) => {
    setData((prev: CompanyOnboardingData) => {
      if (prev.areas.includes(area)) {
        return {
          ...prev,
          areas: prev.areas.filter((a) => a !== area),
        }
      }

      if (prev.areas.length < 3) {
        return {
          ...prev,
          areas: [...prev.areas, area],
        }
      }

      return prev
    })
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
            Select the key areas that align with your company goals and
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
              key={option.name}
              variants={fadeInUpVariants}
              custom={index}
            >
              <GoalCard
                option={option}
                isSelected={data.areas.includes(option)}
                onToggle={() => handleToggle(option)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-6 text-center text-gray-500">
          {data.areas.length > 0 ? (
            <span className="text-sm font-light text-gray-500">
              {data.areas.length} area{data.areas.length > 1 ? 's' : ''}{' '}
              selected {data.areas.length === 3 ? '(maximum)' : '(maximum 3)'}
            </span>
          ) : (
            <span className="text-sm font-light text-gray-500">
              Select 1-3 focus areas to continue
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
