import { CompanyProfile } from '@lib/atoms/company/profile'
import { axiosInstance } from '../instance'

export async function getCompanyProfile() {
  let res = await axiosInstance.get<CompanyProfile>('/company/profile')

  return res
}

export async function updateCompanyProfile(
  payload: Partial<CompanyProfile['data']['CompanyProfile']>,
) {
  let res = await axiosInstance.patch<{
    success: boolean
    message: string
    data: CompanyProfile['data']['CompanyProfile']
  }>('/company/profile', payload)

  console.log('payload', payload)
  console.log('res', res)

  return res
}
