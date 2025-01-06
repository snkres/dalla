import { axiosInstance } from 'api/instance'

interface Payload {
  domain: string
  email: string
  industry: string
  name: string
  password: string
  size: string
}

export async function register(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/company/register', payload)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data))

  return res.success
}
