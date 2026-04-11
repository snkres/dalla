import localForage from 'localforage'
import { clearStoredAuthTokens } from '@lib/auth/token-storage'

export async function logout(queryClient?: any) {
  try {
    clearStoredAuthTokens()

    await localForage.clear()

    // Clear the passed queryClient if provided
    if (queryClient) {
      queryClient.clear()
    }

    return { success: true }
  } catch (err) {
    console.error('Logout error:', err)

    try {
      clearStoredAuthTokens()
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
