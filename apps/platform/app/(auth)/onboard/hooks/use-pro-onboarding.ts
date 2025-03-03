import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { CVParseResponse, parseCV } from '@lib/api/pro/parse-cv'
import { useState, useEffect, Dispatch, useCallback } from 'react'
import {
  calculateYearsOfExperience,
  extractEducation,
  extractWorkExperience,
} from '@lib/utils/parse-cv'
import { ProOnboardingData } from './use-onboarding'

// Form validation helpers
function validatePhone(phone: string | undefined): boolean {
  if (!phone) return false
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10
}

function validateBasicInfo(data: ProOnboardingData): boolean {
  const requiredFields = {
    avatar: !!data.avatar,
    headline: !!data.headline,
    gender: !!data.gender,
    location: !!data.meta.location,
    bio: !!data.bio,
  }
  return Object.values(requiredFields).every(Boolean)
}

function validateProfessionalDetails(data: ProOnboardingData): boolean {
  const isPhoneValid = validatePhone(data.meta.phone)

  const requiredFields = {
    skills: data.meta.skills.length > 0,
    yearsOfExperience: data.meta.yearsOfExperience > 0,
    portfolio: !!data.meta.socialLinks?.portfolio,
    phone: isPhoneValid,
  }

  return Object.values(requiredFields).every(Boolean)
}

function validateEntryDates(
  entries: Array<{ startDate: any; endDate: string }>,
): boolean {
  return entries.every(
    (entry) =>
      entry.startDate && (entry.endDate || entry.endDate === 'Present'),
  )
}

export const useProOnboarding = ({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) => {
  const { toast } = useToast()

  // CV parsing state
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [cvData, setCVData] = useState<CVParseResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form validation state
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [isAllValid, setIsAllValid] = useState(false)

  // Form dialogs state
  const [isExpOpen, setIsExpOpen] = useState(false)
  const [isEduOpen, setIsEduOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // CV upload and parsing
  useEffect(() => {
    if (!(uploadedCV instanceof File)) return

    const parseAndUpdateCV = async () => {
      setIsLoading(true)
      try {
        const res = await parseCV(uploadedCV)

        if (res.success && res.data) {
          setCVData(res.data)
          updateCVData(res.data)
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

    parseAndUpdateCV()
  }, [uploadedCV, updateData, toast])

  // Update data with CV parsed information
  const updateCVData = useCallback(
    (cvData: CVParseResponse['data']) => {
      const yoe = calculateYearsOfExperience(cvData.workExperiences)
      const extractedSkills = cvData.skills.featuredSkills.map(
        (skill) => skill.skill,
      )
      const educationEntries = extractEducation(cvData.educations)
      const workExperience = extractWorkExperience(cvData.workExperiences)

      // Enrich work experience with skills
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
        cvData.profile.summary ||
        `Professional with ${yoe} years of experience. ${workExperience[0]?.title || ''} at ${workExperience[0]?.company || ''}.`

      updateData((prev) => ({
        ...prev,
        headline: `${cvData.profile.name}'s Professional Profile`,
        bio,
        gender: prev.gender,
        meta: {
          ...prev.meta,
          skills: extractedSkills,
          location: cvData.profile.location || prev.meta.location,
          yearsOfExperience: yoe,
          socialLinks: {
            ...(prev.meta.socialLinks || {}),
            [cvData.profile.url || '']: cvData.profile.url || '',
          },
        },
        education: educationEntries,
        experience: workExperience,
        resume: cvData.url,
      }))
    },
    [updateData],
  )

  // Validation effects

  // Step 1: Basic info validation
  useEffect(() => {
    const isBasicInfoValid = validateBasicInfo(data)
    setIsAbleToProceed(isBasicInfoValid)
  }, [
    data.avatar,
    data.headline,
    data.gender,
    data.meta.location,
    data.bio,
    setIsAbleToProceed,
  ])

  // Step 2: Professional details validation
  useEffect(() => {
    const isPhoneValid = validatePhone(data.meta.phone)

    if (data.meta.phone && !isPhoneValid) {
      setPhoneError('Please enter a valid phone number')
      setIsAbleToProceed(false)
      return
    }

    setPhoneError(null)
    const isProfessionalDetailsValid = validateProfessionalDetails(data)
    setIsAbleToProceed(isProfessionalDetailsValid)

    if (!isProfessionalDetailsValid) {
      const missingFields = Object.entries({
        skills: data.meta.skills.length > 0,
        yearsOfExperience: data.meta.yearsOfExperience > 0,
        portfolio: !!data.meta.socialLinks?.portfolio,
        phone: isPhoneValid,
      })
        .filter(([_, value]) => !value)
        .map(([key]) => key)
      console.log('Missing fields:', missingFields)
    }
  }, [
    data.meta.skills,
    data.meta.yearsOfExperience,
    data.meta.socialLinks?.portfolio,
    data.meta.phone,
    setIsAbleToProceed,
  ])

  // Step 3: Experience validation
  useEffect(() => {
    const isExperienceValid = validateEntryDates(data.experience)
    setIsAllValid(isExperienceValid)
    setIsAbleToProceed(isExperienceValid)
  }, [data.experience, setIsAbleToProceed])

  // Step 4: Education validation
  useEffect(() => {
    const isEducationValid = validateEntryDates(data.education)
    setIsAllValid(isEducationValid)
    setIsAbleToProceed(isEducationValid)
  }, [data.education, setIsAbleToProceed])

  // Form handlers
  const handleSkills = useCallback(
    (skills: string[]) => {
      updateData((prev) => ({ ...prev, meta: { ...prev.meta, skills } }))
    },
    [updateData],
  )

  const handleExperienceSubmit = useCallback(
    (experience: ProOnboardingData['experience'][0]) => {
      updateData((prevData) => {
        const newExperience = [...prevData.experience]
        if (editingIndex !== null) {
          newExperience[editingIndex] = experience
        } else {
          newExperience.push(experience)
        }
        return { ...prevData, experience: newExperience }
      })
      setIsExpOpen(false)
      setEditingIndex(null)
    },
    [updateData, editingIndex],
  )

  const handleEducationSubmit = useCallback(
    (education: ProOnboardingData['education'][0]) => {
      updateData((prevData) => {
        const newEducation = [...prevData.education]
        if (editingIndex !== null) {
          newEducation[editingIndex] = education
        } else {
          newEducation.push(education)
        }
        return { ...prevData, education: newEducation }
      })
      setIsEduOpen(false)
      setEditingIndex(null)
    },
    [updateData, editingIndex],
  )

  const handleEditExp = useCallback((index: number) => {
    setEditingIndex(index)
    setIsExpOpen(true)
  }, [])

  const handleEduEdit = useCallback((index: number) => {
    setEditingIndex(index)
    setIsEduOpen(true)
  }, [])

  return {
    // CV parsing
    isLoading,
    uploadedCV,
    setUploadedCV,
    cvData,

    // Form validation
    phoneError,
    validatePhone,
    isAllValid,
    setIsAllValid,

    // Skill management
    handleSkills,

    // Experience form management
    isExpOpen,
    setIsExpOpen,
    handleExperienceSubmit,
    handleEditExp,

    // Education form management
    isEduOpen,
    setIsEduOpen,
    handleEduEdit,
    handleEducationSubmit,

    // Shared form state
    editingIndex,
    setEditingIndex,
  }
}
