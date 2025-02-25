import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
  userType: 'company' | 'professional'
}

export async function login(payload: Payload) {
  let res = await axiosInstance.post<{
    success: boolean
    message: string
    data: {
      access_token: string
    }
  }>('/auth/login', payload)

  if (res.data.data.access_token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', res.data.data.access_token)
    }
  }

  return res
}
