import axios from 'axios'
import { redirect } from 'next/navigation'
import localForage from 'localforage'
import { resendOTP } from './auth/otp-verify'

export const axiosInstance = axios.create({
  baseURL: 'https://devapi.dalla.app',
  withCredentials: true,
})

// Function to handle auth failures
const handleAuthFailure = async () => {
  try {
    // Clear local storage
    await localForage.clear()

    // Clear auth cookies
    document.cookie =
      'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    // Store a flag to indicate we're redirecting due to auth failure
    sessionStorage.setItem('auth_redirect_reason', 'session_expired')

    // Redirect to login
    window.location.href = '/login'
  } catch (error) {
    console.error('Error handling auth failure:', error)
    // Fallback redirect
    window.location.href = '/login'
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       await handleAuthFailure()

//       return Promise.reject(new Error('Authentication failed'))
//     }

//     return Promise.reject(error)
//   },
// )
