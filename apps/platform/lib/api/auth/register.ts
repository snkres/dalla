import { axiosInstance } from '../instance'

interface Payload {
  email: string
  name: string
  password: string
  username: string
  userType: 'company' | 'professional'
}

export async function register(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/register', payload)
    .then((res) => res.data)

  return res
}
