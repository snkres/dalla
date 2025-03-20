import { CompanyProfile } from '@lib/atoms/company/meta'
import { axiosInstance } from '../instance'

export interface CompanyPayload {
  areas?: { name: string; description: string }[]
  bio?: string
  goals?: { name: string; description: string }[]
  headline?: string
  location?: string
  logo?: string
  targetIndustries?: { name: string; description: string }[]
  website?: string
  meta: {
    phone: string
    size: string
    type: string
    industry: string
    socialLinks: { [key: string]: string }
  }
}
export type CompanyOnboardingRes = {
  statusCode: number
  success: boolean
  message: string
  data: {
    id: string
    name: string
    email: string
    domain: any
    password: string
    onboarded: boolean
    suspended: boolean
    verified: boolean
    createdAt: string
    updatedAt: string
    CompanyProfile: {
      id: string
      companyId: string
      location: string
      areas: Array<{
        name: string
        description: string
      }>
      goals: Array<{
        name: string
        description: string
      }>
      targetIndustries: Array<{
        name: string
        description: string
      }>
      website: string
      meta: {
        size: string
        type: string
        phone: string
        industry: string
        socialLinks: {}
      }
      headline: string
      bio: string
      logo: string
      createdAt: string
      updatedAt: string
    }
  }
  error: any
  path: string
  timestamp: string
}

export async function companyOnboarding(payload: CompanyPayload) {
  const res = await axiosInstance
    .post<CompanyOnboardingRes>('/company/onboarding', payload)
    .then((res) => res.data)

  return res
}
