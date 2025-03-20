import { ProMeta, ProProfile } from '@lib/atoms/pro/meta'
import { axiosInstance } from '../instance'

export async function getOwnProProfile() {
  let res = await axiosInstance.get<ProProfile>('/professionals/profile')

  return res
}

export async function getProMeta() {
  let res = await axiosInstance.get<ProMeta>('/professionals/profile/meta')

  return res
}

export async function getProProfile(username: string) {
  let res = await axiosInstance
    .get<ProProfile>(`/company/professional/${username}`)
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  return res
}

export async function updateProProfile(
  profile: Partial<{
    bio?: string
    education?: Omit<
      ProProfile['data']['education'][number],
      'id' | 'profileId' | 'createdAt' | 'updatedAt'
    >[]
    experience?: Omit<
      ProProfile['data']['experience'][number],
      'id' | 'profileId' | 'createdAt' | 'updatedAt'
    >[]
    gender?: string
    headline?: string
    meta?: ProProfile['data']['meta']
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

export async function createShowCaseProject(
  proId: string,
  payload: Omit<ProProfile['data']['User']['projects'][number], 'id'>,
) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: ProProfile['data']['User']['projects'][number]
    }>(`/professionals/profile/${proId}/projects`, payload)
    .catch((err) => {
      throw err
    })

  return res
}

export async function deleteShowCaseProject(proId: string, projectId: string) {
  let res = await axiosInstance
    .delete<{
      success: boolean
      message: string
      data: ProProfile['data']['User']['projects'][number]
    }>(`/professionals/profile/${proId}/projects/${projectId}`)
    .catch((err) => {
      throw err
    })

  return res
}

export async function updateShowCaseProject(
  proId: string,
  projectId: string,
  payload: Omit<ProProfile['data']['User']['projects'][number], 'id'>,
) {
  let res = await axiosInstance.put(
    `/professionals/profile/${proId}/projects/${projectId}`,
    payload,
  )
}
