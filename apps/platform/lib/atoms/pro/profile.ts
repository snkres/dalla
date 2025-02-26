import { atomWithStorage } from 'jotai/utils'

interface ProProfile {
  id: string
  name: string
  username: string
  email: string
  onboarded: false
  verified: true
  suspended: false
  createdAt: string
  updatedAt: string
  UserProfile: null
}

export const proProfileAtom = atomWithStorage<ProProfile>('profile', {
  id: '',
  name: '',
  username: '',
  email: '',
  onboarded: false,
  verified: true,
  suspended: false,
  createdAt: '',
  updatedAt: '',
  UserProfile: null,
})
