import { useState } from 'react'

import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { useEffect } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { loginWithGoogle } from '@lib/api/auth/login'

interface GoogleTokenResponse {
  access_token: string
  error?: string
  expires_in: number
  scope: string
  token_type: string
}

interface GoogleUserInfo {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

const GOOGLE_CLIENT_ID =
  '633251838183-s9eaujn7vg0iv32ovdbg4fql9a5i2o50.apps.googleusercontent.com'

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: GoogleTokenResponse) => void
          }) => {
            requestAccessToken: () => void
          }
        }
      }
    }
  }
}
export function useSSO() {
  const [global, setGlobal] = useAtom(globalAtom)
  const { toast } = useToast()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  useEffect(() => {
    const loadGoogleScript = () => {
      const existingScript = document.getElementById('google-auth-script')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.id = 'google-auth-script'
        script.async = true
        script.defer = true
        document.body.appendChild(script)
      }
    }
    loadGoogleScript()
  }, [])

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      if (typeof window !== 'undefined' && window.google?.accounts) {
        const google = window.google

        const client = google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile',
          callback: async (tokenResponse: GoogleTokenResponse) => {
            if (tokenResponse.error) {
              throw new Error(tokenResponse.error)
            }

            const userInfoResponse = await fetch(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              },
            )
            const userInfo = (await userInfoResponse.json()) as GoogleUserInfo

            const response = await loginWithGoogle({
              idToken: tokenResponse.access_token,
              userType: global.mode === 'company' ? 'company' : 'user',
            })

            if (response.status === 200) {
              setGlobal({
                ...global,
                id: response.data.id || '',
                mode: global.mode === 'company' ? 'company' : 'user',
                email: userInfo.email,
              })
              window.location.href = '/'
            } else {
              throw new Error(response.message || 'Authentication failed')
            }
          },
        })

        client.requestAccessToken()
      } else {
        throw new Error('Google API not loaded')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      toast({
        title: 'Google Sign-In Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to sign in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return { handleGoogleSignIn }
}
