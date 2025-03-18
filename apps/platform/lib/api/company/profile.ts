import { CompanyMeta, CompanyProfile } from '@lib/atoms/company/meta'
import { axiosInstance } from '../instance'

export async function getOwnCompanyProfile() {
  let res = await axiosInstance.get<CompanyProfile>('/company/profile')

  return res
}

export async function getCompanyProfile(id: string) {
  let res = await axiosInstance.get<CompanyProfile>(
    `/professionals/company/${id}`,
  )

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

export async function getCompanyMeta() {
  let res = await axiosInstance.get<CompanyMeta>('/company/profile/meta')

  return res
}
