import { setCookie } from 'cookies-next'
import { axiosInstance } from '../instance'

interface Payload {
  email: string
  otp: string
  userType: 'company' | 'user'
}

export async function verify(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        id: string
        access_token: string
        refresh_token: string
      }
    }>('/auth/verify', payload)
    .then((res) => {
      if (res.data.success) {
        setCookie('access_token', res.data.data.access_token, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })

        setCookie('refresh_token', res.data.data.refresh_token, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })

        setCookie('id', res.data.data.id, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })
      }

      return res.data
    })
  return res
}

export async function resendOTP(payload: {
  email: string
  userType: 'company' | 'user'
}) {
  const res = await axiosInstance
    .post<{}>('/auth/resend-otp', payload)
    .then((res) => res.data)

  return res
}
