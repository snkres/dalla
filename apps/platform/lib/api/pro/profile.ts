import { ProProfile } from '@lib/atoms/pro/profile'
import { axiosInstance } from '../instance'

export async function getProProfile() {
  let res = await axiosInstance.get<{
    success: boolean
    message: string
    data: ProProfile
  }>('/professionals/profile')

  return res
}
