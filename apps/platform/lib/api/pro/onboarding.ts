import type { ProOnboardingData } from 'app/(auth)/onboard/hooks/use-onboarding'
import { axiosInstance } from '../instance'
import { ProProfile } from '@lib/atoms/pro/meta'

export type ProOnboardingRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    userId: string
    headline: string
    gender: string
    bio: string
    avatar: string
    meta: {
      phone: string
      skills: Array<string>
      location: string
      socialLinks: {
        [key: string]: string
      }
      yearsOfExperience: number
    }
    resume: string
    percentage: number
    createdAt: string
    updatedAt: string
    education: Array<{
      id: string
      profileId: string
      school: string
      degree: string
      field: string
      startDate: string
      endDate: string
      description: string
      createdAt: string
      updatedAt: string
    }>
    experience: Array<{
      id: string
      profileId: string
      title: string
      company: string
      location: string
      meta: {
        skills: Array<string>
        achievements: string
        employmentType: string
        responsibilities: string
      }
      startDate: string
      endDate: string
      createdAt: string
      updatedAt: string
    }>
    User: {
      id: string
      name: string
      username: string
      email: string
      password: string
      onboarded: boolean
      verified: boolean
      suspended: boolean
      createdAt: string
      updatedAt: string
    }
  }
  error: any
  path: string
  timestamp: string
}

export async function proOnboarding(payload: ProOnboardingData) {
  const res = await axiosInstance
    .post<ProOnboardingRes>('/professionals/onboarding', payload)
    .then((res) => res.data)

  return res
}
