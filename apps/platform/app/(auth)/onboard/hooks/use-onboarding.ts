'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { useTransitionRouter } from 'next-view-transitions'
import { companyOnboarding } from '@lib/api/company/onboarding'
import { proOnboarding } from '@lib/api/pro/onboarding'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'

export interface CompanyOnboardingData {
  // Step 1
  targetIndustries: string[]
  // Step 3
  workPreference: string[]
  areas: string[]
  website: string
  industry: string
  businessType: string
  companySize: string
  phoneNumber: string
  address: string
  logo: string | null
  headline: string
  bio: string
}

export interface ProOnboardingData {
  headline: string
  resume: string
  gender: string
  bio: string
  avatar: string
  meta: {
    phone: string
    location: string
    yearsOfExperience: number
    skills: Array<string>
    socialLinks: { [key: string]: string }
  }
  experience: Array<{
    title: string
    company: string
    location: string
    meta: {
      skills: Array<string>
      achievements: string
      responsibilities: string
      employmentType: string
    }
    startDate: string
    endDate: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    description: string
  }>
}

export function useOnboarding() {
  const [global] = useAtom(globalAtom)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const router = useTransitionRouter()
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [isAbleToProceed, setIsAbleToProceed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [companyData, setCompanyData] = useState<CompanyOnboardingData>({
    areas: [],
    targetIndustries: [],
    workPreference: [],
    website: '',
    industry: '',
    businessType: '',
    companySize: '',
    phoneNumber: '',
    address: '',
    logo: null,
    headline: '',
    bio: '',
  })

  const [proData, setProData] = useState<ProOnboardingData>({
    headline: '',
    resume: '',
    bio: '',
    education: [],
    experience: [],
    gender: '',
    avatar: '',
    meta: {
      location: '',
      phone: '',
      skills: [],
      socialLinks: {},
      yearsOfExperience: 0,
    },
  })

  const [mode, setMode] = useState('company')
  const companySteps = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const proSteps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const currentStep = step

  const { toast } = useToast()

  useEffect(() => {
    const mode = global.mode
    if (mode) {
      setMode(mode as string)
    }
  }, [])

  const handlePrevious = () => {
    setStep((prev) =>
      prev === 1 ? 1 : (((prev as number) - 1) as 1 | 2 | 3 | 4),
    )
  }

  const handleNext = () => {
    const maxStep = mode === 'company' ? 3 : 4
    setStep((prev) =>
      prev === maxStep ? maxStep : (((prev as number) + 1) as 1 | 2 | 3 | 4),
    )
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      if (mode === 'company' && 'areas' in companyData!) {
        const res = await companyOnboarding({
          headline: companyData.headline,
          bio: companyData.bio,
          areas: companyData.areas,
          goals: companyData.workPreference,
          targetIndustries: companyData.targetIndustries,
          website: companyData.website,
          location: companyData.address,
          logo: companyData.logo ?? undefined,
          meta: {
            phone: companyData.phoneNumber,
            size: companyData.companySize,
            type: companyData.businessType,
            industry: companyData.industry,
            socialLinks: {
              name: 'Facebook',
              url: 'https://facebook.com',
            },
          },
        })
        if (res.success) {
          setShowCompleteDialog(true)
        }
      } else {
        const submittedData: ProOnboardingData = {
          headline: proData.headline,
          resume: proData.resume,
          bio: proData.bio,
          education: proData.education.map((edu) => ({
            school: edu.school,
            degree: edu.degree,
            field: edu.field,
            startDate:
              new Date(`${edu.startDate} 01`).toISOString() ||
              new Date().toISOString(),
            endDate:
              new Date(`${edu.endDate} 01`).toISOString() ||
              new Date().toISOString(),
            description: edu.description,
          })),
          // @ts-ignore
          experience: proData.experience.map((exp) => ({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            skills: exp.meta.skills ?? [],
            achievements: exp.meta.achievements,
            responsibilities: exp.meta.responsibilities,
            employmentType: exp.meta.employmentType,

            startDate: new Date(`${exp.startDate} 01`).toISOString(),
            endDate:
              exp.endDate === 'present'
                ? 'present'
                : new Date(`${exp.endDate} 01`).toISOString(),
          })),
          gender: 'Male',
          avatar: proData.avatar,
          meta: {
            socialLinks: proData.meta.socialLinks,
            phone: proData.meta.phone,
            location: proData.meta.location,
            yearsOfExperience: proData.meta.yearsOfExperience,
            skills: proData.meta.skills ?? [],
          },
        }

        const res = await proOnboarding(submittedData)

        if (res.success) {
          setShowCompleteDialog(true)
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStepAction = () => {
    const isLastStep =
      (mode === 'company' && step === 3) || (mode === 'user' && step === 4)

    if (isLastStep) {
      handleSubmit()
    } else {
      handleNext()
    }
  }

  const handleComplete = () => {
    router.push('/companies/meza')
  }

  return {
    step,
    mode,
    companyData,
    proData,
    isAbleToProceed,
    showCompleteDialog,
    isSubmitting,
    companySteps,
    proSteps,
    currentStep,
    setCompanyData,
    setProData,
    setIsAbleToProceed,
    setShowCompleteDialog,
    handlePrevious,
    handleStepAction,
    handleComplete,
  }
}
