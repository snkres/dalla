'use client'
import { Navbar } from '@components/layout/navbar'
import { getCompanyProfile } from '@lib/api/company/profile'
import { getProProfile } from '@lib/api/pro/profile'
import { CompanyProfile, companyProfileAtom } from '@lib/atoms/company/profile'
import { ProProfile, proProfileAtom } from '@lib/atoms/pro/profile'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@dallah/utils'
import { useEffect, useState } from 'react'
import { globalAtom } from '@lib/atoms/global'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [global, setGlobal] = useAtom(globalAtom)
  const router = useTransitionRouter()
  const [_, setProProfile] = useAtom(proProfileAtom)
  const [__, setCompanyProfile] = useAtom(companyProfileAtom)
  const [isLoading, setIsLoading] = useState(true)

  const { data, isFetched, isError, error } = useQuery({
    queryKey: ['profile'],
    staleTime: Infinity,
    //@ts-ignore
    cacheTime: 1000 * 60 * 60 * 24,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
    queryFn: async () => {
      try {
        if (global.mode === 'user') {
          const res = await getProProfile()
          return res.data.data
        } else if (global.mode === 'company') {
          const res = await getCompanyProfile()
          return res.data.data
        }
        return null
      } catch (err: unknown) {
        console.error('Error fetching profile:', err)
        if (err instanceof Error && err.message.includes('401')) {
          router.push('/login')
        }
        throw err
      }
    },
    enabled: Boolean(global.mode),
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
        setGlobal({
          ...global,
          email: (data as ProProfile).email,
          username: (data as ProProfile).username || '',
          name: (data as ProProfile).name || '',
          mode: 'user',
        })
        setProProfile(data as ProProfile)
        if (!(data as ProProfile).onboarded) {
          router.push('/onboard')
        }
      } else {
        setGlobal({
          ...global,
          email: (data as CompanyProfile).email,
          username: '',
          name: (data as CompanyProfile).name || '',
          mode: 'company',
        })
        setCompanyProfile(data as CompanyProfile)
        if (!(data as CompanyProfile).onboarded) {
          router.push('/onboard')
        }
      }
    } catch (err: unknown) {
      console.error('Error processing profile data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [data, isFetched, isError, global.mode])

  if (isLoading && Boolean(global.mode)) {
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
