'use client'

import type React from 'react'

import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import {
  Input,
  Textarea,
  Label,
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@dalla/design-system'
import { MapPin, Globe2 } from 'lucide-react'
import { motion } from 'motion/react'
import AvatarUpload from '@components/shared/avatar-upload'
import { expertiseOptions } from '../data'
import ExpertiseSelect from '../expertise-select'
import type { CompanyOnboardingData } from '../../hooks/use-onboarding'
import PhoneInput from '@dalla/components/phoneInput'
import { COMPANY_SIZE_RANGES } from '@dalla/components/company-sizeSelector'
import { LocationSelector } from '@dalla/components/locationSelector'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

export function CompanyOnboardingOne({
  data,
  updateData,
}: {
  data: CompanyOnboardingData
  updateData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  const t = useTranslation()
  const { locale } = useLocale()

  const formatIndustryLimitText = () => {
    return t.onboarding.companyStep1.targetIndustriesLimit.replace(
      '{count}',
      data.targetIndustries.length.toString(),
    )
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto min-h-full w-full max-w-3xl px-6"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <motion.div variants={fadeInUpVariants} className="mb-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {t.onboarding.companyStep1.title}
        </h1>
        <p className="text-sm font-light text-gray-500">
          {t.onboarding.companyStep1.description}
        </p>
      </motion.div>

      <motion.div variants={fadeInVariants} className="pb-2">
        <motion.div variants={fadeInUpVariants}>
          <AvatarUpload
            setUploadedURL={(url) => {
              updateData({ ...data, logo: url })
            }}
            required={false}
          />
        </motion.div>

        <div className="flex w-full flex-col gap-8">
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="space-y-4">
              <Label>{t.onboarding.companyStep1.basicInfoLabel}</Label>
              <div className="flex gap-4">
                <Input
                  value={data.headline}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      headline: e.target.value,
                    })
                  }
                  placeholder={t.onboarding.companyStep1.headlinePlaceholder}
                  className="h-11"
                />

                <Input
                  value={data.industry}
                  onChange={(e) =>
                    updateData({ ...data, industry: e.target.value })
                  }
                  placeholder={t.onboarding.companyStep1.industryPlaceholder}
                  className="h-11"
                />
                <Select
                  value={data.companySize}
                  onValueChange={(value) =>
                    updateData({ ...data, companySize: value })
                  }
                >
                  <SelectTrigger
                    className="!h-11"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <SelectValue
                      placeholder={
                        t.onboarding.companyStep1.companySizePlaceholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZE_RANGES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="w-full min-w-full gap-8"
          >
            <div className="space-y-4">
              <Label>{t.onboarding.companyStep1.companyDetailsLabel}</Label>
              <div className="flex gap-2">
                <div className="relative w-full">
                  <PhoneInput
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    defaultValue={data.phoneNumber}
                    onChange={(value) => {
                      updateData({
                        ...data,
                        phoneNumber: value,
                      })
                    }}
                  />
                </div>
                <div className="relative w-full">
                  <Globe2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={data.website}
                    onChange={(e) =>
                      updateData({ ...data, website: e.target.value })
                    }
                    placeholder={t.onboarding.companyStep1.websitePlaceholder}
                    className="h-11 pl-10"
                  />
                </div>
                <div className="relative">
                  <LocationSelector
                    value={data.address}
                    onChange={(value: string) =>
                      updateData({ ...data, address: value })
                    }
                    placeholder={{
                      country:
                        t.onboarding.companyStep1.locationCountryPlaceholder,
                      city: t.onboarding.companyStep1.locationCityPlaceholder,
                    }}
                    required={false}
                    selectClassName="!rounded-xl h-11"
                    showLabels={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="w-full space-y-4">
              <Label>{t.onboarding.companyStep1.preferencesLabel}</Label>
              <div className="flex w-full gap-2">
                <div className="w-full space-y-2">
                  <Label>
                    {t.onboarding.companyStep1.targetIndustriesLabel}
                  </Label>
                  <ExpertiseSelect
                    value={data.targetIndustries}
                    onChange={(
                      value: { name: string; description: string }[],
                    ) => {
                      const limitedValue = value.slice(0, 5)
                      updateData({ ...data, targetIndustries: limitedValue })
                    }}
                    expertiseOptions={expertiseOptions.map(
                      (option) => option.label,
                    )}
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formatIndustryLimitText()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="mt-8 space-y-2">
            <Label>{t.onboarding.companyStep1.bioLabel}</Label>
            <Textarea
              value={data.bio}
              onChange={(e) => updateData({ ...data, bio: e.target.value })}
              placeholder={t.onboarding.companyStep1.bioPlaceholder}
              className="h-28"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
