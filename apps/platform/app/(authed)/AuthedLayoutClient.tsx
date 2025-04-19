'use client'
import { Navbar } from '@components/layout/navbar'
import { getCompanyMeta } from '@lib/api/company/profile'
import { getProMeta } from '@lib/api/pro/profile'
import { CompanyMeta, companyMetaAtom } from '@lib/atoms/company/meta'
import { ProMeta, proMetaAtom } from '@lib/atoms/pro/meta'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@dalla/utils'
import { useEffect, useState } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { getDbReadyPromise } from '@lib/atoms/atom-with-localforge'
import { DallaLoading } from '@components/shared/dalla-loading'

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

  useEffect(() => {
    let isMounted = true

    const initializeApp = async () => {
      try {
        await getDbReadyPromise()

        if (isMounted) {
          setIsDbReady(true)

          console.log('Auth state after DB ready:', {
            mode: global.mode,
            id: global.id,
            email: global.email,
          })
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

  // This check is now primarily handled server-side, but we keep client-side logging
  useEffect(() => {
    if (!isDbReady) return

    if (!global.mode) {
      // Server component handles redirect, log potential issues here
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
        // Ensure mode is set before fetching
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
        // Consider how to handle fetch errors, maybe redirect or show error state
        throw err
      }
    },
    // Only enable query once DB is ready and mode is determined client-side
    enabled: isDbReady && Boolean(global.mode),
    retry: 1,
  })

  useEffect(() => {
    // Initial loading state until first fetch attempt completes or mode is known
    if (!isFetched && Boolean(global.mode) && isDbReady) {
      setIsLoading(true)
      return
    }

    if (isError) {
      console.error('Profile fetch error:', error)
      // Handle error state appropriately, maybe show an error message
      setIsLoading(false)
      return
    }

    // If fetch hasn't happened, data is not available, or mode isn't set, keep loading or stop
    if (!data || !global.mode) {
      setIsLoading(false)
      return
    }

    // Handle onboarding redirection
    if (!data.data.onboarded) {
      // Check if already on onboard page to prevent loop
      if (window.location.pathname !== '/onboard') {
        console.log('User not onboarded, redirecting to /onboard')
        router.push('/onboard')
        // Keep loading until redirect completes
        setIsLoading(true)
        return
      }
    }

    // Process fetched data
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
          username: '', // Company has no username
          name: companyData.data?.name || 'Company',
          mode: 'company',
          avatar: companyData.data?.CompanyProfile.logo || '',
        })
        setCompanyMeta(companyData)
      }
    } catch (err) {
      console.error('Error processing profile data:', err)
    } finally {
      // Loading finished after processing data or encountering final state
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

  // Show loading state while initializing DB, or fetching/processing meta data
  if (isLoading || !isDbReady) {
    return <DallaLoading />
  }

  // Render layout once everything is ready
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn('flex-1 bg-gray-50')}>{children}</main>
    </div>
  )
}
