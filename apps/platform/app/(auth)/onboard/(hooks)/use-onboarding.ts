import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { CVParseResponse, parseCV } from '@lib/api/pro/parse-cv'
import { useState, useEffect, Dispatch } from 'react'
import { ProOnboardingData } from '../page'
import {
  calculateYearsOfExperience,
  extractEducation,
  extractWorkExperience,
} from '@lib/utils/parse-cv'

export const useOnboarding = ({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) => {
  const { toast } = useToast()
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [cvData, setCVData] = useState<CVParseResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (uploadedCV instanceof File) {
        setIsLoading(true)
        try {
          const res = await parseCV(uploadedCV)

          if (res.success && res.data) {
            setCVData(res.data)

            const yoe = calculateYearsOfExperience(res.data.workExperiences)
            const extractedSkills = res.data.skills.featuredSkills.map(
              (skill) => skill.skill,
            )

            const educationEntries = extractEducation(res.data.educations)

            const workExperience = extractWorkExperience(
              res.data.workExperiences,
            )

            workExperience.forEach((exp) => {
              exp.meta.skills = extractedSkills.filter(
                (skill) =>
                  exp.meta.responsibilities
                    .toLowerCase()
                    .includes(skill.toLowerCase()) ||
                  exp.title.toLowerCase().includes(skill.toLowerCase()),
              )
            })

            const bio =
              res.data.profile.summary ||
              `Professional with ${yoe} years of experience. ${workExperience[0]?.title || ''} at ${workExperience[0]?.company || ''}.`

            updateData((prev) => ({
              ...prev,
              headline: `${res.data.profile.name}'s Professional Profile`,
              bio: bio,
              gender: prev.gender,
              meta: {
                ...prev.meta,
                skills: extractedSkills,
                location: res.data.profile.location || prev.meta.location,
                yearsOfExperience: yoe,
                socialLinks: {
                  ...(prev.meta.socialLinks || {}),
                  [res.data.profile.url || '']: res.data.profile.url || '',
                },
              },
              education: educationEntries,
              experience: workExperience,
              resume: res.data.url,
            }))
          }
        } catch (error) {
          toast({
            title: 'Error parsing CV',
            description:
              error instanceof Error ? error.message : 'Unknown error occurred',
            variant: 'destructive',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [uploadedCV, updateData])

  useEffect(() => {
    const requiredFields = {
      avatar: !!data.avatar,
      headline: !!data.headline,
      gender: !!data.gender,
      location: !!data.meta.location,
      bio: !!data.bio,
    }

    const allFieldsFilled = Object.values(requiredFields).every(Boolean)
    setIsAbleToProceed(allFieldsFilled)
  }, [data, setIsAbleToProceed])

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
    updateData({ ...data, meta: { ...data.meta, skills } })
  }

  return {
    isLoading,
    uploadedCV,
    setUploadedCV,
    cvData,
    handleSkills,
    phoneError,
    validatePhone,
  }
}
