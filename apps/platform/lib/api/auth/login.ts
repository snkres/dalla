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
    setCookie('access_token', res.data.data.access_token, {
      httpOnly: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    setCookie('mode', payload.userType, {
      httpOnly: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    setCookie('email', payload.email, {
      httpOnly: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
  }

  return res
}
