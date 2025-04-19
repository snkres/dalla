'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { goalOptions } from '@lib/data/focus-options'
import { GoalCard } from '../goal-card'
import { GoalOption } from '@lib/types/goals'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import { CompanyOnboardingData } from '../../hooks/use-onboarding'
import { useTranslation } from '@hooks/use-translation'

export function CompanyOnboardingThree({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const t = useTranslation()

  const handleToggle = (pref: { name: string; description: string }) => {
    setData((prev) => {
      if (prev.goals.includes(pref)) {
        return {
          ...prev,
          goals: prev.goals.filter((p) => p !== pref),
        }
      }

      if (prev.goals.length < 3) {
        return {
          ...prev,
          goals: [...prev.goals, pref],
        }
      }

      return prev
    })
  }
  return (
    <div className="bg-background">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto max-w-5xl px-4"
      >
        <motion.div
          variants={fadeInUpVariants}
          className="mb-12 space-y-4 text-center"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            {t.onboarding.companyStep3.title}
          </h1>
          <p className="text-sm font-light text-gray-500">
            {t.onboarding.companyStep3.description}
          </p>
        </motion.div>

        <motion.div
          className="mb-12 grid gap-6 sm:grid-cols-2"
          variants={fadeInVariants}
          initial="hidden"
          animate="show"
        >
          {goalOptions.map((option, index) => (
            <motion.div
              key={option.name}
              variants={fadeInUpVariants}
              custom={index}
            >
              <GoalCard
                option={option}
                isSelected={data.goals.some(
                  (goal) => goal.name === option.name,
                )}
                onToggle={() => handleToggle(option)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
