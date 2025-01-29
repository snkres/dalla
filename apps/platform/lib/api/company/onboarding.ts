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
  [property: string]: any
}

export async function companyOnboarding(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/company/onboarding', payload)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))

  return res.success
}
