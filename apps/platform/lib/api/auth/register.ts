import { axiosInstance } from '../instance'

interface Payload {
  email: string
  name: string
  password: string
}

export async function companyRegister(payload: Payload) {
  const res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/company/register', {
      ...payload,
      domain: 'lll.com',
    })
    .then((res) => res.data)

  return res
}
