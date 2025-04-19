'use client'

import { motion } from 'motion/react'
import { GoalCard } from '../goal-card'
import { focusAreaOptions } from '@lib/data/focus-options'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import { CompanyOnboardingData } from '../../hooks/use-onboarding'
import { useTranslation } from '@hooks/use-translation'

export function CompanyOnboardingTwo({
  data,
  setData,
}: {
  data: CompanyOnboardingData
  setData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const t = useTranslation()

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

  const formatSelectedCountText = () => {
    const count = data.areas.length
    const plural = count > 1 ? 's' : ''
    const maximum = count === 3 ? '(maximum)' : '(maximum 3)'
    return t.onboarding.companyStep2.selectedCount
      .replace('{count}', count.toString())
      .replace('{plural}', plural)
      .replace('{maximum}', maximum)
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
            {t.onboarding.companyStep2.title}
          </h1>
          <p className="text-sm font-light text-gray-500">
            {t.onboarding.companyStep2.description}
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
              {formatSelectedCountText()}
            </span>
          ) : (
            <span className="text-sm font-light text-gray-500">
              {t.onboarding.companyStep2.selectionPrompt}
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
