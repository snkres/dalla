import { axiosInstance } from '../instance'
import { normalizeAuthResponse } from './normalize-auth-response'

interface Payload {
  email: string
  password: string
  userType: 'company' | 'user'
}

interface AuthPayload {
  access_token: string
  refresh_token: string
}

export async function login(payload: Payload) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: AuthPayload
    }>('/auth/login', payload)
    .then((res) => {
      return normalizeAuthResponse(res)
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
      data: AuthPayload
    }>('/auth/google', payload)
    .then((res) => {
      return normalizeAuthResponse(res)
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return res
}

export async function loginWithLinkedIn(payload: {
  code: string
  redirectUrl: string
  userType: 'company' | 'user'
}) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
      data: AuthPayload
    }>('/auth/linkedin', payload)
    .then((res) => {
      return normalizeAuthResponse(res)
    })
    .catch((err) => {
      console.log(err)
      throw err
    })

  return res
}
