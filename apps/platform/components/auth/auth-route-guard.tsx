'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DallaLoading } from '@components/shared/dalla-loading'
import {
  AUTH_TOKENS_CHANGED_EVENT,
  hasStoredAccessToken,
} from '@lib/auth/token-storage'

interface AuthRouteGuardProps {
  children: ReactNode
  redirectTo: string
  requireAuth: boolean
}

export default function AuthRouteGuard({
  children,
  redirectTo,
  requireAuth,
}: AuthRouteGuardProps) {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const syncAuthState = () => {
      const hasToken = hasStoredAccessToken()
      const allowed = requireAuth ? hasToken : !hasToken

      setIsAllowed(allowed)
      setIsReady(true)

      if (!allowed) {
        router.replace(redirectTo)
      }
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      syncAuthState()
    }

    syncAuthState()

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(
      AUTH_TOKENS_CHANGED_EVENT,
      syncAuthState as EventListener,
    )

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(
        AUTH_TOKENS_CHANGED_EVENT,
        syncAuthState as EventListener,
      )
    }
  }, [redirectTo, requireAuth, router])

  if (!isReady) {
    return requireAuth ? <DallaLoading /> : null
  }

  if (!isAllowed) {
    return requireAuth ? <DallaLoading /> : null
  }

  return <>{children}</>
}
