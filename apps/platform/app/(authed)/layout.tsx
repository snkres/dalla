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
import { useEffect } from 'react'
import { globalAtom } from '@lib/atoms/global'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [global, setGlobal] = useAtom(globalAtom)
  const router = useTransitionRouter()
  const [_, setProProfile] = useAtom(proProfileAtom)
  const [__, setCompanyProfile] = useAtom(companyProfileAtom)

  const { data, isFetched } = useQuery({
    queryKey: ['profile'],
    staleTime: Infinity,
    //@ts-ignore
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    queryFn: async () => {
      if (global.mode === 'user') {
        const res = await getProProfile()
        return res.data.data
      } else if (global.mode === 'company') {
        const res = await getCompanyProfile()
        return res.data.data
      }
    },
    enabled: !!global.mode,
  })

  useEffect(() => {
    if (!data) return

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
  }, [data, isFetched])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className={cn('transition-all duration-200 ease-in-out')}>
        {children}
      </main>
    </div>
  )
}
