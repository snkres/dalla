import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
}

export async function companyLogin(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        access_token: string
      }
    }>('/auth/company/login', payload)
    .then((res) => res.data)

  if (res.data.access_token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', res.data.access_token)
    }
  }

  return res
}

export async function proLogin(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/professionals/login', payload)
    .then((res) => res.data)

  return res.success
}
