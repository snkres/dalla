import { axiosInstance } from '../instance'

interface Payload {
  email: string
  otp: string
  userType: 'company' | 'professional'
}

export async function verify(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        access_token: string
        refresh_token: string
      }
    }>('/auth/verify', payload)
    .then((res) => res.data)

  return res
}

export async function resendOTP(payload: {
  email: string
  userType: 'company' | 'professional'
}) {
  const res = await axiosInstance
    .post<{}>('/auth/resend-otp', payload)
    .then((res) => res.data)

  return res
}
