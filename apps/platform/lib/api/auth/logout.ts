import { axiosInstance } from '../instance'
import localForage from 'localforage'
import { QueryClient } from '@tanstack/react-query'

// Create a queryClient instance or import it from where it's defined
const queryClient = new QueryClient()

export async function logout() {
  try {
    // Call the logout API endpoint
    const res = await axiosInstance.post('/auth/logout')

    // Clear all data from localForage
    await localForage.clear()

    // Clear React Query cache
    queryClient.clear()

    // Remove auth cookies if any
    document.cookie =
      'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    return res
  } catch (err) {
    console.error('Logout error:', err)

    // Even if the API call fails, try to clear local storage
    try {
      await localForage.clear()
      queryClient.clear()
      document.cookie =
        'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    } catch (clearError) {
      console.error('Failed to clear local storage:', clearError)
    }

    throw err
  }
}
