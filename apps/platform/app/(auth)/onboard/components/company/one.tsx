'use client'

import type React from 'react'

import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import {
  Input,
  Textarea,
  Label,
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@dallah/design-system'
import { MapPin, Globe2 } from 'lucide-react'
import { motion } from 'motion/react'
import AvatarUpload from '@components/shared/avatar-upload'
import { expertiseOptions } from '../data'
import ExpertiseSelect from '../expertise-select'
import type { CompanyOnboardingData } from '../../hooks/use-onboarding'
import PhoneInput from '@dallah/components/phoneInput'
import { COMPANY_SIZE_RANGES } from '@dallah/components/company-sizeSelector'

export function CompanyOnboardingOne({
  data,
  updateData,
}: {
  data: CompanyOnboardingData
  updateData: React.Dispatch<React.SetStateAction<CompanyOnboardingData>>
}) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto min-h-full w-full max-w-3xl px-6"
    >
      <motion.div variants={fadeInUpVariants} className="mb-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Complete your profile
        </h1>
        <p className="text-sm font-light text-gray-500">
          This information will help us personalize your experience
        </p>
      </motion.div>

      <motion.div variants={fadeInVariants} className="pb-2">
        <motion.div variants={fadeInUpVariants}>
          <AvatarUpload
            setUploadedURL={(url) => {
              updateData({ ...data, logo: url })
              console.log(url)
              console.log(data)
            }}
            required={false}
          />
        </motion.div>

        <div className="flex w-full flex-col gap-8">
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="space-y-4">
              <Label>Basic Information</Label>
              <div className="flex gap-4">
                <Input
                  value={data.headline}
                  onChange={(e) =>
                    updateData({
                      ...data,
                      headline: e.target.value,
                    })
                  }
                  placeholder="Headline"
                  className="h-11"
                />

                <Input
                  value={data.industry}
                  onChange={(e) =>
                    updateData({ ...data, industry: e.target.value })
                  }
                  placeholder="Industry"
                  className="h-11"
                />
                <Select
                  value={data.companySize}
                  onValueChange={(value) =>
                    updateData({ ...data, companySize: value })
                  }
                >
                  <SelectTrigger className="!h-11">
                    <SelectValue placeholder="Company size" />
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

          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="space-y-4">
              <Label>Company Details</Label>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <PhoneInput
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
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={data.address}
                    onChange={(e) =>
                      updateData({ ...data, address: e.target.value })
                    }
                    placeholder="Location"
                    className="h-11 pl-10"
                  />
                </div>
                <div className="relative w-full">
                  <Globe2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={data.website}
                    onChange={(e) =>
                      updateData({ ...data, website: e.target.value })
                    }
                    placeholder="Website"
                    className="h-11 pl-10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpVariants} className="w-full gap-8">
            <div className="w-full space-y-4">
              <Label>Preferences</Label>
              <div className="flex w-full gap-2">
                <div className="w-full space-y-2">
                  <Label>Target Industries</Label>
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
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum 5 industries allowed {data.targetIndustries.length}
                    /5
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="mt-8 space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={data.bio}
              onChange={(e) => updateData({ ...data, bio: e.target.value })}
              placeholder="Tell us about the company..."
              className="h-28"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
