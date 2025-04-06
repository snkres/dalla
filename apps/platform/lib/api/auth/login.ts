import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
  userType: 'company' | 'user'
}

export async function login(payload: Payload) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        id: string
        access_token: string
        refresh_token: string
      }
    }>('/auth/login', payload)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      }
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return res
}

export async function loginWithGoogle(payload: {
  idToken: string
  userType: 'company' | 'user'
}) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: {
        id: string
        access_token: string
        refresh_token: string
      }
    }>('/auth/google', payload)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      }
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return res
}
