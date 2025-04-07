import { useState, useEffect, useCallback, useRef } from 'react'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { loginWithGoogle, loginWithLinkedIn } from '@lib/api/auth/login'
import { LinkedInProfile } from '@lib/api/auth/linkedin'
import { useSearchParams } from 'next/navigation'

const GOOGLE_CLIENT_ID =
  '633251838183-s9eaujn7vg0iv32ovdbg4fql9a5i2o50.apps.googleusercontent.com'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, options: any) => void
          prompt: (callback?: any) => void
          cancel?: () => void
        }
      }
    }
    googleSignInCallback?: (response: any) => void
    handleGoogleSignInCallback?: (response: any) => void
  }
}

const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ''
const LINKEDIN_REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/auth/linkedin/callback'
    : 'https://platform.dev.dalla.app/api/auth/linkedin/callback'

const LINKEDIN_SCOPE = 'openid profile email'

function generateCodeVerifier() {
  const array = new Uint8Array(32)
  window.crypto.getRandomValues(array)
  return base64UrlEncode(array)
}

function base64UrlEncode(buffer: Uint8Array) {
  return btoa(
    Array.from(buffer)
      .map((byte) => String.fromCharCode(byte))
      .join(''),
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(new Uint8Array(digest))
}

interface LinkedInAuthOptions {
  onSuccess?: (profile: LinkedInProfile) => void
  onError?: (error: Error) => void
  userType: 'company' | 'user'
}

export async function initLinkedInAuth({
  onSuccess,
  onError,
  userType,
}: LinkedInAuthOptions) {
  if (typeof window === 'undefined') {
    const error = new Error('LinkedIn auth can only be used in browser')
    if (onError) onError(error)
    return Promise.reject(error)
  }

  try {
    const codeVerifier = generateCodeVerifier()
    sessionStorage.setItem('linkedin_code_verifier', codeVerifier)

    const codeChallenge = await generateCodeChallenge(codeVerifier)

    const state = Math.random().toString(36).substring(2)
    sessionStorage.setItem('linkedin_auth_state', state)

    sessionStorage.setItem('linkedin_user_type', userType)

    const oauthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
    oauthUrl.searchParams.append('response_type', 'code')
    oauthUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID)
    oauthUrl.searchParams.append('redirect_uri', LINKEDIN_REDIRECT_URI)
    oauthUrl.searchParams.append('state', state)
    oauthUrl.searchParams.append('scope', LINKEDIN_SCOPE)
    oauthUrl.searchParams.append('code_challenge', codeChallenge)
    oauthUrl.searchParams.append('code_challenge_method', 'S256')

    window.location.href = oauthUrl.toString()

    return Promise.resolve({} as LinkedInProfile)
  } catch (error) {
    if (onError)
      onError(error instanceof Error ? error : new Error(String(error)))
    return Promise.reject(error)
  }
}

export function useSSO({ mode }: { mode: 'company' | 'user' }) {
  const { toast } = useToast()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false)
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false)
  const searchParams = useSearchParams()

  const processGoogleResponse = useCallback(
    (response: any) => {
      console.log('Processing Google response:', response)
      if (response?.credential) {
        setIsGoogleLoading(true)
        try {
          // Use the stored user type from the ref
          const userType = mode

          loginWithGoogle({
            idToken: response.credential,
            userType,
          })
            .then((result) => {
              console.log('Google login result:', result)
              if (result.success) {
                window.location.href = '/'
              } else {
                toast({
                  title: 'Sign-In Error',
                  description:
                    result.message || 'Failed to authenticate with Google',
                  variant: 'destructive',
                })
                setIsGoogleLoading(false)
              }
            })
            .catch((error) => {
              console.error('Error handling Google sign-in:', error)
              toast({
                title: 'Sign-In Error',
                description:
                  'Failed to process Google Sign-In. Please try again.',
                variant: 'destructive',
              })
              setIsGoogleLoading(false)
            })
        } catch (error) {
          console.error('Error handling Google sign-in:', error)
          toast({
            title: 'Sign-In Error',
            description: 'Failed to process Google Sign-In. Please try again.',
            variant: 'destructive',
          })
          setIsGoogleLoading(false)
        }
      } else {
        console.error('Invalid Google sign-in response:', response)
        toast({
          title: 'Sign-In Error',
          description: 'Invalid response from Google. Please try again.',
          variant: 'destructive',
        })
        setIsGoogleLoading(false)
      }
    },
    [toast],
  )

  const initializeGoogleSignIn = useCallback(() => {
    if (typeof window === 'undefined' || !window.google?.accounts?.id)
      return false

    try {
      try {
        if (window.google?.accounts?.id?.cancel) {
          window.google.accounts.id.cancel()
        }
      } catch (e) {}

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: window.googleSignInCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      console.log('Google Sign-In initialized successfully')
      setIsGoogleInitialized(true)

      const buttonEl = document.getElementById('google-signin-button')
      if (buttonEl) {
        window.google.accounts.id.renderButton(buttonEl, {
          type: 'standard',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 250,
        })
      }

      return true
    } catch (error) {
      console.error('Failed to initialize Google Sign-In:', error)
      return false
    }
  }, [])

  const handleDirectGoogleAuth = useCallback(
    (userType: 'company' | 'user' = 'user') => {
      console.log('Falling back to direct Google authentication')

      const redirectUri = encodeURIComponent(window.location.origin + '/login')
      const scope = encodeURIComponent('email profile openid')
      const nonce = Date.now().toString()

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=id_token&scope=${scope}&prompt=consent&nonce=${nonce}`

      window.location.href = authUrl
    },
    [],
  )

  // Function to trigger Google Sign-In
  const triggerGoogleSignIn = useCallback(
    (userType: 'company' | 'user' = 'user') => {
      setIsGoogleLoading(true)

      if (window.google?.accounts?.id) {
        try {
          if (!isGoogleInitialized) {
            console.log('Google Sign-In not initialized yet, initializing...')
            if (!initializeGoogleSignIn()) {
              handleDirectGoogleAuth(userType)
              return
            }
          }

          window.google.accounts.id.prompt((notification: any) => {
            console.log('Google prompt notification:', notification)

            if (notification.isNotDisplayed()) {
              console.log(
                'Google One Tap not displayed:',
                notification.getNotDisplayedReason(),
              )
              handleDirectGoogleAuth(userType)
            } else if (notification.isSkippedMoment()) {
              console.log(
                'Google One Tap skipped:',
                notification.getSkippedReason(),
              )
              handleDirectGoogleAuth(userType)
            } else if (notification.isDismissedMoment()) {
              console.log(
                'Google One Tap dismissed:',
                notification.getDismissedReason(),
              )
              setIsGoogleLoading(false)
            }
          })
        } catch (error) {
          console.error('Error triggering Google Sign-In:', error)
          toast({
            title: 'Sign-In Error',
            description:
              'Could not start Google Sign-In. Please try password login instead.',
            variant: 'destructive',
          })
          setIsGoogleLoading(false)
        }
      } else {
        handleDirectGoogleAuth(userType)
      }
    },
    [
      isGoogleInitialized,
      initializeGoogleSignIn,
      handleDirectGoogleAuth,
      toast,
    ],
  )

  useEffect(() => {
    const processGoogleRedirect = async () => {
      if (typeof window === 'undefined') return
      if (typeof window === 'undefined') return

      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const idToken = hashParams.get('id_token')

      const code = searchParams.get('code')

      if (idToken || code) {
        console.log('Detected Google redirect with authentication data')
        setIsGoogleLoading(true)

        try {
          const cleanUrl = new URL(window.location.href)
          cleanUrl.hash = ''
          if (cleanUrl.searchParams.has('code')) {
            cleanUrl.searchParams.delete('code')
          }
          window.history.replaceState({}, document.title, cleanUrl.toString())

          if (idToken) {
            const result = await loginWithGoogle({
              idToken: idToken,
              userType: mode,
            })

            console.log('Google login result:', result)

            if (result.success) {
              window.location.href = '/'
            } else {
              toast({
                title: 'Sign-In Error',
                description:
                  result.message || 'Failed to authenticate with Google',
                variant: 'destructive',
              })
            }
          } else if (code) {
            toast({
              title: 'Authentication Notice',
              description: 'Finishing Google authentication...',
            })

            const result = await loginWithGoogle({
              idToken: code,
              userType: mode,
            })

            console.log('Google login result:', result)

            if (result.success) {
              window.location.href = '/'
            } else {
              toast({
                title: 'Sign-In Error',
                description:
                  result.message || 'Failed to authenticate with Google',
                variant: 'destructive',
              })
            }
          }
        } catch (error) {
          console.error('Error processing Google redirect:', error)
          toast({
            title: 'Authentication Error',
            description:
              error instanceof Error
                ? error.message
                : 'Failed to complete Google authentication',
            variant: 'destructive',
          })
        } finally {
          setIsGoogleLoading(false)
        }
      }
    }

    processGoogleRedirect()
  }, [searchParams, toast])

  useEffect(() => {
    window.googleSignInCallback = (response: any) =>
      processGoogleResponse(response)

    const loadGoogleScript = () => {
      const existingScript = document.getElementById('google-auth-script')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.id = 'google-auth-script'
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log('Google Sign-In script loaded successfully')
          setIsGoogleScriptLoaded(true)

          if (window.google?.accounts?.id) {
            setTimeout(() => {
              initializeGoogleSignIn()
            }, 1000)
          }
        }
        script.onerror = () => {
          console.error('Failed to load Google Sign-In script')
          toast({
            title: 'Error',
            description:
              'Could not load Google Sign-In. Please use password login instead.',
            variant: 'destructive',
          })
        }
        document.body.appendChild(script)
      }
    }

    loadGoogleScript()

    if (window.google?.accounts?.id && !isGoogleInitialized) {
      setTimeout(() => {
        initializeGoogleSignIn()
      }, 1000)
    }

    return () => {
      if (window.google?.accounts?.id?.cancel) {
        try {
          window.google.accounts.id.cancel()
        } catch (e) {}
      }
    }
  }, [processGoogleResponse, initializeGoogleSignIn, toast])

  return {
    isGoogleLoading,
    isLinkedInLoading,
    isGoogleInitialized,

    triggerGoogleSignIn,
    handleDirectGoogleAuth,

    handleGoogleSignIn: (response: {
      clientId: string
      client_id: string
      credential: string
      select_by: string
    }) => {
      if (response.select_by === 'company') {
        processGoogleResponse({ credential: response.credential })
      }
      processGoogleResponse({ credential: response.credential })
    },
  }
}
