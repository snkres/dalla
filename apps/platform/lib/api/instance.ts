import axios from 'axios'
import {
  clearStoredAuthTokens,
  getStoredAuthTokens,
  setStoredAuthTokens,
} from '@lib/auth/token-storage'

export const axiosInstance = axios.create({
  baseURL: 'https://apidalla.snkres.com',
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = getStoredAuthTokens()

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }

    if (tokens?.refreshToken) {
      config.headers['x-refresh-token'] = tokens.refreshToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['x-access-token']
    const refreshToken = response.headers['x-refresh-token']

    if (accessToken && refreshToken) {
      setStoredAuthTokens({ accessToken, refreshToken })
    }

    return response
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      error.status = error.response.status

      if (
        error.response.status === 401 &&
        !String(error.config?.url || '').startsWith('/auth/')
      ) {
        clearStoredAuthTokens()
      }
    }

    return Promise.reject(error)
  },
)
