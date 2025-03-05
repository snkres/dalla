import { setCookie } from 'cookies-next'
import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
  userType: 'company' | 'user'
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
    setCookie('access_token', res.data.data.access_token)
    setCookie('mode', payload.userType)
    setCookie('email', payload.email)
  }

  return res
}
