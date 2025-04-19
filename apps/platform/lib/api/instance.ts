import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://devapi.dalla.app',
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
