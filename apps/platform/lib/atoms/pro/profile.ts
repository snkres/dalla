import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { atomWithLocalForage } from '../atom-with-localforge'

export interface ProProfile {
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
  UserProfile: {
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
      [key: string]: string | Array<string> | number | { [key: string]: string }
    }
    resume: string
    precentage: number
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
        [key: string]: string | Array<string>
      }
      startDate: string
      endDate: string
      createdAt: string
      updatedAt: string
    }>
    projects: Array<{
      id: string
      title: string
      role: string
      description: string
      skills: Array<string>
      thumbnail: string
      link: string
      media: Array<string>
    }>
  }
}

export const proProfileAtom = atomWithLocalForage<ProProfile>(
  'dalla:pro:profile',
  {} as ProProfile,
)
