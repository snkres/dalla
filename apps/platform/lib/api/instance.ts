import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'

export const axiosInstance = axios.create({
  baseURL: 'https://devapi.dalla.app',
})

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/'
    console.log('Redirect to login')
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie('access_token')
      redirectToLogin()
    }
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use(
  (config) => {
    const currentToken = getCookie('access_token')
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
