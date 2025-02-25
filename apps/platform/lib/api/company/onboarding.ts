import { axiosInstance } from '../instance'

export interface Payload {
  areas?: string[]
  bio?: string
  goals?: string[]
  headline?: string
  location?: string
  logo?: string
  targetIndustries?: string[]
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

export async function companyOnboarding(payload: Payload) {
  const res = await axiosInstance
    .patch<{
      success: boolean
      message: string
    }>('/company/onboarding', payload)
    .then((res) => res.data)

  return res.success
}
