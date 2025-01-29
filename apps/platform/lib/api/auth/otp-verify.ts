import { axiosInstance } from '../instance'

interface Payload {
  email: string
  otp: string
}

export async function verify(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/company/verify', payload)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))

  return res.success
}
