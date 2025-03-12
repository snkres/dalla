import { atomWithLocalForage } from '../atom-with-localforge'

export interface CompanyProfile {
  id: string
  name: string
  email: string
  domain: any
  onboarded: boolean
  suspended: boolean
  verified: boolean
  CompanyProfile: {
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
    headline: any
    bio: any
    logo: any
    meta: {
      [key: string]: any
      size: string
      type: string
      phone: string
      industry: string
      socialLinks: {
        [key: string]: string
      }
    }
  }
  createdAt: string
}

export const companyProfileAtom = atomWithLocalForage<CompanyProfile>(
  'dalla:company:profile',
  {} as CompanyProfile,
)
