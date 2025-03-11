import { atomWithStorage, createJSONStorage } from 'jotai/utils'

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
    areas: Array<string>
    goals: Array<string>
    targetIndustries: Array<string>
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
        url: string
        name: string
      }
    }
  }
}

const storage = createJSONStorage<CompanyProfile>(() => sessionStorage)

export const companyProfileAtom = atomWithStorage<CompanyProfile>(
  'profile',
  {} as CompanyProfile,
  storage,
)
