import { CompanyProfile } from '@lib/atoms/company/profile'
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
    socialLinks: {
      name: string
      url: string
    }
  }
}

export async function companyOnboarding(payload: CompanyPayload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: CompanyProfile
    }>('/company/onboarding', payload)
    .then((res) => res.data)

  return res
}
