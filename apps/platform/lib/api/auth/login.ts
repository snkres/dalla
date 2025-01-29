import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
}

export async function login(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/company/login', payload)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))

  return res.success
}
