import { atomWithStorage } from 'jotai/utils'

interface CompanyProfile {
  id: string
  name: string
  email: string
  domain: any
  onboarded: boolean
  suspended: boolean
  verified: boolean
  CompanyProfile: {
    location: string
    areas: Array<string>
    goals: Array<string>
    targetIndustries: Array<string>
    website: string
    headline: any
    bio: any
    logo: any
    meta: {
      size: string
      type: string
      phone: string
      industry: string
      socialLinks: {
        url: string
        name: string
      }
    }
  }
}

export const companyProfileAtom = atomWithStorage<CompanyProfile>(
  'profile',
  {} as CompanyProfile,
)
