'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { goalOptions } from '@lib/data/focus-options'
import { GoalCard } from '../goal-card'
import { GoalOption } from '@lib/types/goals'
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import { CompanyOnboardingData } from '../../page'

export function CompanyOnboardingThree({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const handleToggle = (pref: string) => {
    setData((prev) => ({
      ...prev,
      workPreference: prev.workPreference.includes(pref)
        ? prev.workPreference.filter((p) => p !== pref)
        : [...prev.workPreference, pref],
    }))
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
            What are your Work Prefrences?
          </h1>
          <p className="text-sm font-light text-gray-500">
            Select the Prefrences that align with your professional journey
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
              key={option.id}
              variants={fadeInUpVariants}
              custom={index}
            >
              <GoalCard
                option={option as GoalOption}
                isSelected={data.workPreference.includes(option.label)}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
