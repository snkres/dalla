'use client'

import { useState } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useTransitionRouter } from 'next-view-transitions'
import { companyOnboarding } from '@lib/api/company/onboarding'
import { proOnboarding } from '@lib/api/pro/onboarding'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCompanyMeta } from '@lib/api/company/profile'
import { getProMeta } from '@lib/api/pro/profile'
import { ensureHttpsPrefix } from '@dalla/utils'

export interface CompanyOnboardingData {
  // Step 1
  targetIndustries: {
    name: string
    description: string
  }[]
  // Step 3
  goals: {
    name: string
    description: string
  }[]
  areas: {
    name: string
    description: string
  }[]
  website: string
  industry: string
  businessType: string
  companySize: string
  phoneNumber: string
  address: string
  logo: string | null
  headline: string
  bio: string
  socialLinks: { [key: string]: string }
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
  const router = useTransitionRouter()
  const [global, setGlobal] = useAtom(globalAtom)

  useQuery({
    queryKey: ['meta', global.mode, 'onboarding'],
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        if (global.mode === 'user') {
          const res = await getProMeta()
          if (res.data.data.onboarded) {
            router.push('/')
          } else {
            return res.data
          }
          return res.data
        } else if (global.mode === 'company') {
          const res = await getCompanyMeta()

          if (res.data.data.onboarded) {
            router.push('/')
          } else {
            return res.data
          }
        }
        return null
      } catch (err) {
        console.error('Error fetching profile:', err)
        throw err
      }
    },
    retry: 1,
  })
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [isAbleToProceed, setIsAbleToProceed] = useState<boolean>(false)
  const { toast } = useToast()

  const [companyData, setCompanyData] = useState<CompanyOnboardingData>({
    areas: [],
    targetIndustries: [],
    goals: [],
    website: '',
    industry: '',
    businessType: '',
    companySize: '',
    phoneNumber: '',
    address: '',
    logo: null,
    headline: '',
    bio: '',
    socialLinks: {},
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

  const companySteps = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const proSteps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const currentStep = step

  const companyOnboardingMutation = useMutation({
    mutationFn: companyOnboarding,
    onSuccess: (res) => {
      if (res.success) {
        setGlobal({
          ...global,
          id: res.data.CompanyProfile.id,
          name: res.data.name,
        })
        setShowCompleteDialog(true)
      } else {
        toast({
          title: 'Error',
          description:
            process.env.NODE_ENV === 'development'
              ? 'Make sure to fill all fields'
              : 'Something went wrong, Please check all fields and try again',
          variant: 'destructive',
        })
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? 'Make sure to fill all fields'
            : 'Something went wrong, Please check all fields and try again',
        variant: 'destructive',
      })
    },
  })

  const proOnboardingMutation = useMutation({
    mutationFn: proOnboarding,
    onSuccess: (res) => {
      if (res.success) {
        setGlobal({
          ...global,
          id: res.data.id,
          name: res.data.User.name,
          username: res.data.User.username,
        })
        setShowCompleteDialog(true)
      } else {
        toast({
          title: 'Error',
          description:
            process.env.NODE_ENV === 'development'
              ? 'Make sure to fill all fields'
              : 'Something went wrong, Please check all fields and try again',
          variant: 'destructive',
        })
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? 'Make sure to fill all fields'
            : 'Something went wrong, Please check all fields and try again',
        variant: 'destructive',
      })
    },
  })

  const handlePrevious = () => {
    setStep((prev) =>
      prev === 1 ? 1 : (((prev as number) - 1) as 1 | 2 | 3 | 4),
    )
  }

  const handleNext = () => {
    const maxStep = global.mode === 'company' ? 3 : 4
    setStep((prev) =>
      prev === maxStep ? maxStep : (((prev as number) + 1) as 1 | 2 | 3 | 4),
    )
  }

  const handleSubmit = async () => {
    if (global.mode === 'company') {
      companyOnboardingMutation.mutate({
        headline: companyData.headline,
        bio: companyData.bio,
        areas: companyData.areas.map((area) => ({
          name: area.name,
          description: area.description,
        })),
        goals: companyData.goals.map((goal) => ({
          name: goal.name,
          description: goal.description,
        })),
        targetIndustries: companyData.targetIndustries.map((ind) => ({
          name: ind.name,
          description: ind.description,
        })),
        website: ensureHttpsPrefix(companyData.website),
        location: companyData.address,
        logo: companyData.logo ?? undefined,
        meta: {
          phone: companyData.phoneNumber,
          size: companyData.companySize,
          type: companyData.businessType,
          industry: companyData.industry,
          socialLinks: companyData.socialLinks,
        },
      })
    } else {
      const formattedProData: ProOnboardingData = {
        ...proData,
        education: proData.education.map((edu) => ({
          ...edu,
          startDate: new Date(`${edu.startDate} 01`).toISOString(),
          endDate:
            edu.endDate === 'Present'
              ? 'present'
              : new Date(`${edu.endDate} 01`).toISOString(),
        })),
        experience: proData.experience.map((exp) => ({
          ...exp,
          startDate: new Date(`${exp.startDate} 01`).toISOString(),
          endDate:
            exp.endDate === 'Present'
              ? 'present'
              : new Date(`${exp.endDate} 01`).toISOString(),
        })),
      }
      proOnboardingMutation.mutate(formattedProData)
    }
  }

  const handleStepAction = () => {
    const isLastStep =
      (global.mode === 'company' && step === 3) ||
      (global.mode === 'user' && step === 4)

    if (isLastStep) {
      handleSubmit()
    } else {
      handleNext()
    }
  }

  const handleComplete = () => {
    router.push('/')
  }

  return {
    step,
    mode: global.mode,
    companyData,
    proData,
    isAbleToProceed,
    showCompleteDialog,
    isSubmitting:
      companyOnboardingMutation.isPending || proOnboardingMutation.isPending,
    isLoading:
      companyOnboardingMutation.isPending || proOnboardingMutation.isPending,
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
