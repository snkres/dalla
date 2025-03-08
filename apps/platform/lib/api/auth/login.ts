import { setCookie } from 'cookies-next'
import { axiosInstance } from '../instance'

interface Payload {
  email: string
  password: string
  userType: 'company' | 'user'
}

export async function login(payload: Payload) {
  setCookie('email', payload.email, {
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  setCookie('mode', payload.userType, {
    httpOnly: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
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
      if (res.data.success) {
        setCookie('access_token', res.data.data.access_token, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })

        setCookie('refresh_token', res.data.data.refresh_token, {
          httpOnly: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
        })
      }

      return res.data
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return res
}
