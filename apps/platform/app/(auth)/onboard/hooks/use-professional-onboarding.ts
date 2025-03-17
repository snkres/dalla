import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { CVParseResponse, parseCV } from '@lib/api/pro/parse-cv'
import { useState, useEffect, Dispatch, useCallback } from 'react'
import {
  calculateYearsOfExperience,
  extractEducation,
  extractWorkExperience,
} from '@lib/utils/parse-cv'
import { ProOnboardingData } from './use-onboarding'

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

export const useProfessionalOnboarding = ({
  data,
  updateData,
  setIsAbleToProceed,
  currentStep,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
  currentStep?: number
}) => {
  const { toast } = useToast()

  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [cvData, setCVData] = useState<CVParseResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [isAllValid, setIsAllValid] = useState(false)

  const [isExpOpen, setIsExpOpen] = useState(false)
  const [isEduOpen, setIsEduOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // Add validation state trackers
  const [isBasicInfoValid, setIsBasicInfoValid] = useState(false)
  const [isProfessionalDetailsValid, setIsProfessionalDetailsValid] =
    useState(false)
  const [isExperienceValid, setIsExperienceValid] = useState(false)
  const [isEducationValid, setIsEducationValid] = useState(false)

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

  const updateCVData = useCallback(
    (cvData: CVParseResponse['data']) => {
      const yoe = calculateYearsOfExperience(cvData.workExperiences)
      const extractedSkills = cvData.skills.featuredSkills.every(
        (skill) => skill.skill.length > 0,
      )
        ? cvData.skills.featuredSkills
            .filter((skill) => skill.skill.length > 0)
            .map((skill) => skill.skill)
        : []
      const educationEntries = extractEducation(cvData.educations)
      const workExperience = extractWorkExperience(cvData.workExperiences)

      // Only add skills to experience if extractedSkills is not empty
      if (extractedSkills.length > 0) {
        workExperience.forEach((exp) => {
          exp.meta.skills = extractedSkills.filter(
            (skill) =>
              exp.meta.responsibilities
                .toLowerCase()
                .includes(skill.toLowerCase()) ||
              exp.title.toLowerCase().includes(skill.toLowerCase()),
          )
        })
      }

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

  // Consolidated validation effect that checks all requirements
  useEffect(() => {
    // Check basic info
    const basicInfoValid = validateBasicInfo(data)
    setIsBasicInfoValid(basicInfoValid)

    // Check phone and professional details
    const isPhoneValid = validatePhone(data.meta.phone)
    if (data.meta.phone && !isPhoneValid) {
      setPhoneError('Please enter a valid phone number')
    } else {
      setPhoneError(null)
    }

    const professionalDetailsValid = validateProfessionalDetails(data)
    setIsProfessionalDetailsValid(professionalDetailsValid)

    if (!professionalDetailsValid) {
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

    // Check experience and education
    const experienceValid = validateEntryDates(data.experience)
    setIsExperienceValid(experienceValid)

    const educationValid = validateEntryDates(data.education)
    setIsEducationValid(educationValid)

    // Calculate if all validations pass (for final submission)
    const allValid =
      basicInfoValid &&
      professionalDetailsValid &&
      experienceValid &&
      educationValid
    setIsAllValid(allValid)

    // Determine if user can proceed based on current step
    let canProceed = false

    // If currentStep is undefined or invalid, default to checking the basic info
    if (!currentStep) {
      canProceed = basicInfoValid
    } else {
      switch (currentStep) {
        case 1:
          canProceed = basicInfoValid
          break
        case 2:
          canProceed = professionalDetailsValid
          break
        case 3:
          canProceed = experienceValid
          break
        case 4:
          canProceed = educationValid
          break
        default:
          // For final submission or unknown step, require all validations
          canProceed = allValid
      }
    }

    setIsAbleToProceed(canProceed)
  }, [
    data.headline,
    data.bio,
    data.gender,
    data.meta.location,
    data.meta.skills,
    data.meta.yearsOfExperience,
    data.meta.socialLinks?.portfolio,
    data.meta.phone,
    data.experience,
    data.education,
    data.avatar,
    setIsAbleToProceed,
    currentStep,
  ])

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

    // Add validation state for UI feedback
    isBasicInfoValid,
    isProfessionalDetailsValid,
    isExperienceValid,
    isEducationValid,

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
