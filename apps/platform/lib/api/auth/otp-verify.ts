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
    }>('/auth/verify', payload)
    .then((res) => {
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
