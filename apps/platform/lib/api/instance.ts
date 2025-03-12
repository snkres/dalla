import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://devapi.dalla.app',
  withCredentials: true,
})

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
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
