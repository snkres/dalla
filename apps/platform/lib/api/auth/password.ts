import { axiosInstance } from '../instance'

interface ForgotPasswordPayload {
  email: string
  userType: 'company' | 'user'
  redirectTo: string
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/forgot-password', payload)
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

interface ResetPasswordPayload {
  email: string
  userType: 'company' | 'user'
  code: string
  newPassword: string
}

export async function resetPassword(payload: ResetPasswordPayload) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/reset-password', payload)
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

interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
}

export async function changePassword(payload: ChangePasswordPayload) {
  let res = await axiosInstance
    .post<{
      success: boolean
      message: string
    }>('/auth/reset-old-password', payload)
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
