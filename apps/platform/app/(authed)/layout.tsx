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
  const mode = global.mode
  const [__, setProProfile] = useAtom(proProfileAtom)
  const [___, setCompanyProfile] = useAtom(companyProfileAtom)

  const { data, isFetched } = useQuery({
    queryKey: ['profile', mode, global.email],
    staleTime: Infinity,
    queryFn: async () => {
      if (mode === 'user') {
        const res = await getProProfile()
        return res.data.data
      } else {
        const res = await getCompanyProfile()
        return res.data.data
      }
    },
  })

  useEffect(() => {
    if (!data) return

    if (mode === 'user') {
      setGlobal({
        ...global,
        email: data.email,
        username: (data as ProProfile).username || '',
        name: data.name,
        mode: 'user',
      })
      setProProfile(data as ProProfile)
      if (!data.onboarded) {
        router.push('/onboard')
      }
    } else {
      setCompanyProfile(data as CompanyProfile)
      if (!data.onboarded) {
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
