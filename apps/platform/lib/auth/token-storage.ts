'use client'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

const AUTH_STORAGE_KEY = 'dalla:auth'
export const AUTH_TOKENS_CHANGED_EVENT = 'dalla:auth-tokens-changed'
const AUTH_SESSION_COOKIE = 'dalla_session'

function isBrowser() {
  return typeof window !== 'undefined'
}

function dispatchAuthTokensChanged() {
  if (!isBrowser()) return

  window.dispatchEvent(new CustomEvent(AUTH_TOKENS_CHANGED_EVENT))
}

export function getStoredAuthTokens(): AuthTokens | null {
  if (!isBrowser()) return null

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawValue) return null

  try {
    const parsed = JSON.parse(rawValue) as Partial<AuthTokens>

    if (!parsed.accessToken || !parsed.refreshToken) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    return {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function hasStoredAccessToken() {
  return Boolean(getStoredAuthTokens()?.accessToken)
}

export function setStoredAuthTokens(tokens: {
  accessToken?: string
  refreshToken?: string
  access_token?: string
  refresh_token?: string
}) {
  if (!isBrowser()) return

  const accessToken = tokens.accessToken ?? tokens.access_token
  const refreshToken = tokens.refreshToken ?? tokens.refresh_token

  if (!accessToken || !refreshToken) {
    return
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ accessToken, refreshToken }),
  )

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${AUTH_SESSION_COOKIE}=1; path=/; SameSite=Lax${secure}`

  dispatchAuthTokensChanged()
}

export function clearStoredAuthTokens() {
  if (!isBrowser()) return

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${AUTH_SESSION_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secure}`
  dispatchAuthTokensChanged()
}
