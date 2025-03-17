import { axiosInstance } from '../instance'
import localForage from 'localforage'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export async function logout() {
  try {
    const res = await axiosInstance.post('/auth/logout')

    await localForage.clear()

    queryClient.clear()

    return res
  } catch (err) {
    console.error('Logout error:', err)

    try {
      await localForage.clear()
      queryClient.clear()
    } catch (clearError) {
      console.error('Failed to clear local storage:', clearError)
    }

    throw err
  }
}
