import { string } from 'zod'
import { axiosInstance } from '../instance'

export async function getProProfile() {
  let res = await axiosInstance.get<{
    success: boolean
    message: string
    data: {
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
  }>('/professionals/profile')

  return res
}
