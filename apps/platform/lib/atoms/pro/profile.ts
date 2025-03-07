import { atomWithStorage } from 'jotai/utils'

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
  }
}

export const proProfileAtom = atomWithStorage<ProProfile>('profile', {
  id: '',
  name: '',
  username: '',
  email: '',
  password: '', // Added missing password property
  onboarded: false,
  verified: true,
  suspended: false,
  createdAt: '',
  updatedAt: '',
  UserProfile: {
    id: '',
    userId: '',
    headline: '',
    gender: '',
    bio: '',
    avatar: '',
    meta: {
      phone: '',
      skills: [],
      location: '',
      socialLinks: {},
      yearsOfExperience: 0,
    },
    resume: '',
    precentage: 0,
    createdAt: '',
    updatedAt: '',
    education: [],
    experience: [],
  },
})
