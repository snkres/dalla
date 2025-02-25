import { axiosInstance } from '../instance'

interface Payload {
  email: string
  otp: string
}

export async function companyVerify(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        access_token: string
        refresh_token: string
      }
    }>('/auth/company/verify', payload)
    .then((res) => res.data)

  return res.success
}
