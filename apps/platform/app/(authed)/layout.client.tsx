'use client'
import { Navbar } from '@components/layout/navbar'
import { getCompanyMeta } from '@lib/api/company/profile'
import { getProMeta } from '@lib/api/pro/profile'
import { CompanyMeta, companyMetaAtom } from '@lib/atoms/company/meta'
import { ProMeta, proMetaAtom } from '@lib/atoms/pro/meta'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cn } from '@dalla/utils'
import { useEffect, useState, useRef } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { getDbReadyPromise } from '@lib/atoms/atom-with-localforge'
import { DallaLoading } from '@components/shared/dalla-loading'
import { useNotifications } from '@hooks/use-notifications'
import { useSocketNotifications } from '@hooks/use-socket-notifications'
import { reconnectSocket } from '@lib/services/socket'

export default function AuthedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [global, setGlobal] = useAtom(globalAtom)
  const router = useTransitionRouter()
  const [_, setProMeta] = useAtom(proMetaAtom)
  const [__, setCompanyMeta] = useAtom(companyMetaAtom)
  const [isLoading, setIsLoading] = useState(true)
  const [isDbReady, setIsDbReady] = useState(false)

  // Initialize notifications and socket notifications
  useNotifications()
  const { disconnectSocket } = useSocketNotifications() // Add real-time notification listening via Socket.IO

  // Add socket reconnection for visibility changes and online status
  useEffect(() => {
    // Handle visibility change (user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab became visible, reconnecting socket if needed')
        reconnectSocket()
      }
    }

    // Handle when the computer wakes from sleep or user returns online
    const handleOnline = () => {
      console.log('Browser is online, reconnecting socket')
      reconnectSocket()
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('online', handleOnline)

    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const initializeApp = async () => {
      try {
        await getDbReadyPromise()

        if (isMounted) {
          setIsDbReady(true)
        }
      } catch (err) {
        console.error('Error initializing app:', err)
      }
    }

    initializeApp()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isDbReady) return

    if (!global.mode) {
      console.log('No auth mode detected client-side despite DB ready')
    } else {
      console.log('Auth mode detected client-side:', global.mode)
    }
  }, [isDbReady, global.mode])

  const { data, isFetched, isError, error } = useQuery({
    queryKey: ['meta', global.mode],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        if (!global.mode) {
          console.log('Skipping meta fetch: global.mode not set.')
          return null
        }
        if (global.mode === 'user') {
          const res = await getProMeta()
          return res.data
        } else if (global.mode === 'company') {
          const res = await getCompanyMeta()
          return res.data
        }
        return null
      } catch (err) {
        console.error('Error fetching profile:', err)
        throw err
      }
    },
    enabled: isDbReady && Boolean(global.mode),
    retry: 1,
  })

  useEffect(() => {
    if (!isFetched && Boolean(global.mode) && isDbReady) {
      setIsLoading(true)
      return
    }

    if (isError) {
      console.error('Profile fetch error:', error)
      setIsLoading(false)
      return
    }

    if (!data || !global.mode) {
      setIsLoading(false)
      return
    }

    if (!data.data.onboarded) {
      if (window.location.pathname !== '/onboard') {
        console.log('User not onboarded, redirecting to /onboard')
        router.push('/onboard')

        setIsLoading(true)
        return
      }
    }

    try {
      if (global.mode === 'user') {
        const proData = data as ProMeta
        setGlobal({
          ...global,
          id: proData.data.id,
          email: proData.data.email,
          username: proData.data.username,
          name: proData.data.name,
          mode: 'user',
          avatar: proData.data.UserProfile.avatar,
        })
        setProMeta(proData)
      } else {
        const companyData = data as CompanyMeta
        setGlobal({
          ...global,
          id: companyData.data?.id || '',
          email: companyData.data?.email || '',
          username: '',
          name: companyData.data?.name || 'Company',
          mode: 'company',
          avatar: companyData.data?.CompanyProfile.logo || '',
        })
        setCompanyMeta(companyData)
      }
    } catch (err) {
      console.error('Error processing profile data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [
    data,
    isFetched,
    isError,
    global.mode,
    isDbReady,
    router,
    setGlobal,
    setProMeta,
    setCompanyMeta,
  ])

  if (isLoading || !isDbReady) {
    return <DallaLoading />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn('flex-1 bg-gray-50')}>{children}</main>
    </div>
  )
}
