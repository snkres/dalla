import axios from 'axios'
import { redirect } from 'next/navigation'

export const axiosInstance = axios.create({
  baseURL: 'https://devapi.dalla.app',
  withCredentials: true,
})

const redirectToLogin = () => {
  redirect('/login')
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      redirectToLogin()
    }
    return Promise.reject(error)
  },
)
