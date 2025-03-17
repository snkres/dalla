import axios from 'axios'
import { redirect } from 'next/navigation'
import localForage from 'localforage'

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

// Request interceptor to add auth headers if needed
axiosInstance.interceptors.request.use(
  async (config) => {
    // You can add token from localStorage/cookies here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      await handleAuthFailure()
      // Return a rejected promise to stop the request chain
      return Promise.reject(new Error('Authentication failed'))
    }

    // Handle 403 Forbidden errors (optional)
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error)
      // You can handle this differently if needed
    }

    return Promise.reject(error)
  },
)
