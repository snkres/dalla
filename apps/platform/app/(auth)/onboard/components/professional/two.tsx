'use client'

import { fadeInVariants } from '@dalla/utils'
import { SkillSelector } from '@components/shared/skill-selector'
import PhoneInput from '@dalla/components/phoneInput'
import { motion } from 'motion/react'
import type { ProOnboardingData } from '../../hooks/use-onboarding'
import type { Dispatch, SetStateAction } from 'react'
import { Globe2 } from 'lucide-react'
import { Input, Label } from '@dalla/design-system'
import { useProfessionalOnboarding } from '../../hooks/use-professional-onboarding'
import { RequiredIndicator } from '@components/shared/required-indicator'
import { ensureHttpsPrefix } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'

export function ProOnboardingTwo({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<SetStateAction<boolean>>
}) {
  const t = useTranslation()
  const { handleSkills, phoneError } = useProfessionalOnboarding({
    data,
    updateData,
    setIsAbleToProceed,
    currentStep: 2,
  })

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex min-h-full w-[600px] max-w-3xl flex-col gap-8 px-6"
    >
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          {t.onboarding.proStep2.title}
        </h2>
        <p className="text-slate-blue-70 mt-1 text-xs">
          {t.onboarding.requiredFieldsNote}
        </p>
      </div>

      <div className="w-full">
        <div className="mb-1 flex items-center">
          <Label htmlFor="skills">{t.onboarding.proStep2.skillsLabel}</Label>
          <RequiredIndicator />
        </div>
        <SkillSelector
          className="w-full"
          skills={data.meta.skills}
          handleSkills={handleSkills}
        />
        {data.meta.skills.length === 0 && (
          <p className="mt-1 text-xs text-red-500">
            {t.onboarding.proStep2.skillsError}
          </p>
        )}
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <Label htmlFor="yearsOfExperience">
            {t.onboarding.proStep2.yearsExperienceLabel} <RequiredIndicator />
          </Label>

          <Input
            id="yearsOfExperience"
            className="h-11"
            placeholder={t.onboarding.proStep2.yearsExperiencePlaceholder}
            type="number"
            min="0"
            value={
              data.meta.yearsOfExperience
                ? data.meta.yearsOfExperience.toString()
                : ''
            }
            onChange={(e) =>
              updateData({
                ...data,
                meta: {
                  ...data.meta,
                  yearsOfExperience: Number(e.target.value) || 0,
                },
              })
            }
          />
          {data.meta.yearsOfExperience <= 0 && (
            <p className="mt-1 text-xs text-red-500">
              {t.onboarding.proStep2.yearsExperienceError}
            </p>
          )}
        </div>

        <div className="relative w-full">
          <Label htmlFor="portfolio">
            {t.onboarding.proStep2.portfolioLabel}
          </Label>
          <Globe2 className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <Input
            id="portfolio"
            value={data.meta.socialLinks?.portfolio || ''}
            onChange={(e) =>
              updateData({
                ...data,
                meta: {
                  ...data.meta,
                  socialLinks: {
                    ...data.meta.socialLinks,
                    portfolio: e.target.value,
                  },
                },
              })
            }
            onBlur={(e) =>
              updateData({
                ...data,
                meta: {
                  ...data.meta,
                  socialLinks: {
                    ...data.meta.socialLinks,
                    portfolio: ensureHttpsPrefix(e.target.value),
                  },
                },
              })
            }
            placeholder={t.onboarding.proStep2.portfolioPlaceholder}
            className="h-11 pl-10"
          />
        </div>
      </div>

      <div className="relative w-full">
        <div className="mb-1 flex items-center">
          <Label htmlFor="phone">{t.onboarding.proStep2.phoneLabel}</Label>
          <RequiredIndicator />
        </div>
        <PhoneInput
          defaultValue={data.meta.phone}
          onChange={(value) => {
            updateData({
              ...data,
              meta: {
                ...data.meta,
                phone: value,
              },
            })
          }}
        />
        {phoneError && (
          <p className="mt-1 text-xs text-red-500">{phoneError}</p>
        )}
        {!data.meta.phone && (
          <p className="mt-1 text-xs text-red-500">
            {t.onboarding.proStep2.phoneErrorRequired}
          </p>
        )}
      </div>
    </motion.div>
  )
}
