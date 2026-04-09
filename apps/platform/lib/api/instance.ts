import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://apidalla.kroking.dev',
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
