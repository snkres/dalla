import { useState } from 'react'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { useEffect } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { loginWithGoogle } from '@lib/api/auth/login'
import { loginWithLinkedIn } from '@lib/api/auth/login'
import { LinkedInProfile } from '@lib/api/auth/linkedin'

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

const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ''
const LINKEDIN_REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/login'
    : 'https://platform.dev.dalla.app/login'

const LINKEDIN_SCOPE = 'openid profile email'

export function initLinkedInAuth() {
  if (typeof window === 'undefined') {
    return Promise.reject(
      new Error('LinkedIn auth can only be used in browser'),
    )
  }

  const state = Math.random().toString(36).substring(2)

  const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(LINKEDIN_SCOPE)}`

  const width = 600
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const popup = window.open(
    oauthUrl,
    'LinkedIn Authorization',
    `width=${width},height=${height},left=${left},top=${top}`,
  )

  return new Promise<LinkedInProfile>((resolve, reject) => {
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === 'linkedin_auth_success') {
        window.removeEventListener('message', messageListener)
        if (popup) popup.close()
        resolve(event.data.profile)
      }

      if (event.data.type === 'linkedin_auth_error') {
        window.removeEventListener('message', messageListener)
        if (popup) popup.close()
        reject(new Error(event.data.error || 'LinkedIn authentication failed'))
      }
    }

    window.addEventListener('message', messageListener)

    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopupClosed)
        window.removeEventListener('message', messageListener)
        reject(new Error('Authentication was cancelled'))
      }
    }, 1000)

    setTimeout(() => {
      clearInterval(checkPopupClosed)
      window.removeEventListener('message', messageListener)
      if (popup) popup.close()
      reject(new Error('Authentication timed out'))
    }, 120000)
  })
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
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)

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

  const handleLinkedInSignIn = async (code?: string) => {
    setIsLinkedInLoading(true)
    try {
      await initLinkedInAuth()

      const response = await loginWithLinkedIn({
        code: code || '',
        redirectUri: 'http://localhost:3000/login',
        userType: global.mode === 'company' ? 'company' : 'user',
      })

      if (response.status === 200) {
        setGlobal({
          ...global,
          id: response.data.id || '',
          mode: global.mode === 'company' ? 'company' : 'user',
          // email: profile.email,
        })
        window.location.href = '/'
      } else {
        throw new Error(response.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('LinkedIn sign-in error:', error)
      toast({
        title: 'LinkedIn Sign-In Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to sign in with LinkedIn',
        variant: 'destructive',
      })
    } finally {
      setIsLinkedInLoading(false)
    }
  }

  return {
    handleGoogleSignIn,
    handleLinkedInSignIn,
    isGoogleLoading,
    isLinkedInLoading,
  }
}
