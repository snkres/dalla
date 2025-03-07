import { ProProfile } from '@lib/atoms/pro/profile'
import { axiosInstance } from '../instance'
import { Language } from '@lib/types/profile'

export async function getProProfile() {
  let res = await axiosInstance.get<{
    success: boolean
    message: string
    data: ProProfile
  }>('/professionals/profile')

  return res
}

export async function updateProProfile(
  profile: Partial<{
    bio?: string
    education?: Omit<
      ProProfile['UserProfile']['education'][number],
      'id' | 'profileId' | 'createdAt' | 'updatedAt'
    >[]
    experience?: Omit<
      ProProfile['UserProfile']['experience'][number],
      'id' | 'profileId' | 'createdAt' | 'updatedAt'
    >[]
    gender?: string
    headline?: string
    meta?: ProProfile['UserProfile']['meta']
    resume?: string

    [property: string]: any
  }>,
) {
  let res = await axiosInstance
    .patch<{
      success: boolean
      message: string
    }>('/professionals/profile', profile)
    .catch((err) => {
      throw err
    })

  return res
}
