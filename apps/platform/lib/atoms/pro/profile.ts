import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { atomWithLocalForage } from '../atom-with-localforge'
import { Language } from '@lib/types/profile'

export type ProProfile = {
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
      hourlyRate: number
      totalEarned: number
      projectsCompleted: number
      successRate: number
      weeklyAvailability: number
      availability: string
      rating: number
      projectCompletion: string
      languages: Language[]
    }
    resume: string
    precentage: number
    createdAt: string
    updatedAt: string
    User: {
      id: string
      email: string
      name: string
      verified: boolean
      username: string
      projects: Array<any>
    }
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
        skills: Array<any>
        achievements: string
        employmentType: string
        responsibilities: string
        industry: string
      }
      startDate: string
      endDate: string
      createdAt: string
      updatedAt: string
    }>
    projects: Array<{
      id: string
      profileId: string
      title: string
      role: string
      description: string
      skills: Array<string>
      thumbnail: string
      link: string
      media: Array<string>
    }>
  }
  error: any
  path: string
  timestamp: string
}

export const proProfileAtom = atomWithLocalForage<ProProfile>(
  'dalla:pro:profile',
  {} as ProProfile,
)
