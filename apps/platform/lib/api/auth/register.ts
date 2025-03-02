import { axiosInstance } from '../instance'

interface Payload {
  email: string
  name: string
  password: string
  username: string
  userType: 'company' | 'user'
}

export async function register(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/register', payload)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        err.response?.data?.message || 'An unknown error occurred',
      )
    })

  return res
}
