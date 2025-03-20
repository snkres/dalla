import { axiosInstance } from '../instance'
import localForage from 'localforage'

export async function logout(queryClient?: any) {
  try {
    const res = await axiosInstance.post('/auth/logout')

    await localForage.clear()

    // Clear the passed queryClient if provided
    if (queryClient) {
      queryClient.clear()
    }

    return res
  } catch (err) {
    console.error('Logout error:', err)

    try {
      await localForage.clear()
      if (queryClient) {
        queryClient.clear()
      }
    } catch (clearError) {
      console.error('Failed to clear local storage:', clearError)
    }

    throw err
  }
}
