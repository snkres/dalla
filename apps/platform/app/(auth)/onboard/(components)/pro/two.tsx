'use client'

import { fadeInVariants } from '@components/aniamtion/animate'
import { SkillSelector } from '@components/shared/skill-selector'
import PhoneInput from '@dallah/components/phoneInput'
import { motion } from 'motion/react'
import type { ProOnboardingData } from '../../page'
import type { Dispatch, SetStateAction } from 'react'
import { Globe2 } from 'lucide-react'
import { Input, Label } from '@dallah/design-system'
import { useEffect, useState } from 'react'

// Helper component for required field indicator
const RequiredIndicator = () => <span className="ml-1 text-red-500">*</span>

export function ProOnboardingTwo({
  data,
  setData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  setData: Dispatch<SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<SetStateAction<boolean>>
}) {
  const [phoneError, setPhoneError] = useState<string | null>(null)

  // Validate phone number format
  const validatePhone = (phone: string | undefined): boolean => {
    if (!phone) return false

    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '')

    // Basic validation: phone number should have at least 10 digits
    return digitsOnly.length >= 10
  }

  // Add validation to check if all required fields are filled
  useEffect(() => {
    const isPhoneValid = validatePhone(data.meta.phone)

    // Update phone error state
    if (data.meta.phone && !isPhoneValid) {
      setPhoneError('Please enter a valid phone number')
      setIsAbleToProceed(false)
    } else {
      setPhoneError(null)
    }

    const requiredFields = {
      skills: data.meta.skills.length > 0,
      yearsOfExperience: data.meta.yearsOfExperience > 0,
      portfolio: !!data.meta.socialLinks?.portfolio,
      phone: isPhoneValid,
    }

    const allFieldsFilled = Object.values(requiredFields).every(Boolean)
    setIsAbleToProceed(allFieldsFilled)

    // For debugging
    if (!allFieldsFilled) {
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key)
      console.log('Missing fields:', missingFields)
    }
  }, [data, setIsAbleToProceed]) // Removed validatePhone from dependencies

  const handleSkills = (skills: string[]) => {
    setData({ ...data, meta: { ...data.meta, skills } })
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex min-h-full w-[600px] max-w-3xl flex-col gap-8 px-6"
    >
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Professional Details
        </h2>
        <p className="text-slate-blue-70 mt-1 text-xs">
          Fields marked with <span className="text-red-500">*</span> are
          required
        </p>
      </div>

      <div className="w-full">
        <div className="mb-1 flex items-center">
          <Label htmlFor="skills">Skills</Label>
          <RequiredIndicator />
        </div>
        <SkillSelector
          className="w-full"
          skills={data.meta.skills}
          handleSkills={handleSkills}
        />
        {data.meta.skills.length === 0 && (
          <p className="mt-1 text-xs text-red-500">
            Please add at least one skill
          </p>
        )}
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <Label htmlFor="yearsOfExperience">
            Years of Experience <RequiredIndicator />
          </Label>

          <Input
            id="yearsOfExperience"
            className="h-11"
            placeholder="Years of Experience"
            type="number"
            min="0"
            value={
              data.meta.yearsOfExperience
                ? data.meta.yearsOfExperience.toString()
                : ''
            }
            onChange={(e) =>
              setData({
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
              Please enter your years of experience
            </p>
          )}
        </div>

        <div className="relative w-full">
          <Label htmlFor="portfolio">
            Portfolio <RequiredIndicator />
          </Label>
          <Globe2 className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <Input
            id="portfolio"
            value={data.meta.socialLinks?.portfolio || ''}
            onChange={(e) =>
              setData({
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
            placeholder="Portfolio URL"
            className="h-11 pl-10"
          />
          {!data.meta.socialLinks?.portfolio && (
            <p className="mt-1 text-xs text-red-500">
              Please enter your portfolio URL
            </p>
          )}
        </div>
      </div>

      <div className="relative w-full">
        <div className="mb-1 flex items-center">
          <Label htmlFor="phone">Phone Number</Label>
          <RequiredIndicator />
        </div>
        <PhoneInput
          defaultValue={data.meta.phone}
          onChange={(value) => {
            setData({
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
            Please enter your phone number
          </p>
        )}
      </div>
    </motion.div>
  )
}
