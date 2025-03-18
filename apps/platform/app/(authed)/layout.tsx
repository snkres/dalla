'use client'
import { Navbar } from '@components/layout/navbar'
import { getCompanyMeta } from '@lib/api/company/profile'
import { getProMeta } from '@lib/api/pro/profile'
import { CompanyMeta, companyMetaAtom } from '@lib/atoms/company/meta'
import { ProMeta, proMetaAtom } from '@lib/atoms/pro/meta'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@dallah/utils'
import { useEffect, useState } from 'react'
import { globalAtom } from '@lib/atoms/global'
import { getDbReadyPromise } from '@lib/atoms/atom-with-localforge'

export default function Layout({ children }: { children: React.ReactNode }) {
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

  useEffect(() => {
    if (!isDbReady) return

    if (!global.mode) {
      console.log('No auth mode detected, redirecting to login')
      router.push('/login')
    } else {
      console.log('Auth mode detected:', global.mode)
    }
  }, [isDbReady, global.mode, router])

  const { data, isFetched, isError, error } = useQuery({
    queryKey: ['meta', global.mode],
    staleTime: Infinity,
    queryFn: async () => {
      try {
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
    enabled: Boolean(global.mode) && isDbReady,
    retry: 1,
  })

  useEffect(() => {
    if (!isFetched && Boolean(global.mode)) {
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
        if (!proData.data.onboarded) {
          router.push('/onboard')
        }
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

        console.log('Company onboarded status:', companyData.data?.onboarded)
        console.log('Company data:', companyData.data)
        if (
          companyData.data?.onboarded !== undefined &&
          !companyData.data?.onboarded
        ) {
          router.push('/onboard')
        }
      }
    } catch (err) {
      console.error('Error processing profile data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [data, isFetched, isError, global.mode])

  // Show loading state either when waiting for DB or profile data
  if ((isLoading && Boolean(global.mode)) || !isDbReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-[#63B7B7]"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn('flex-1 bg-gray-50')}>{children}</main>
    </div>
  )
}
