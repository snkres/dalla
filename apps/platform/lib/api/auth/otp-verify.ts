import { axiosInstance } from '../instance'
import { normalizeAuthResponse } from './normalize-auth-response'

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
        access_token: string
        refresh_token: string
      }
    }>('/auth/verify', payload)
    .then((res) => normalizeAuthResponse(res))
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
