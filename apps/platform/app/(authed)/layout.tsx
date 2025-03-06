'use client'
import { Navbar } from '@components/layout/navbar'
import { getCompanyProfile } from '@lib/api/company/profile'
import { getProProfile } from '@lib/api/pro/profile'
import { companyProfileAtom } from '@lib/atoms/company/profile'
import { proProfileAtom } from '@lib/atoms/pro/profile'
import { getCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { useQuery } from '@tanstack/react-query'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useTransitionRouter()
  const mode = getCookie('mode')
  const [_, setProProfile] = useAtom(proProfileAtom)
  const [__, setCompanyProfile] = useAtom(companyProfileAtom)

  useQuery({
    queryKey: ['profile', mode],
    staleTime: Infinity,
    queryFn: async () => {
      if (mode === 'professional') {
        const res = await getProProfile()
        return res.data
      } else {
        const res = await getCompanyProfile()
        return res.data
      }
    },
    // @ts-ignore
    onSuccess: (data) => {
      if (mode === 'professional') {
        setProProfile(data.data)
        if (!data.data.onboarded) {
          router.push('/onboard')
        }
      } else {
        setCompanyProfile(data.data)
        if (!data.data.onboarded) {
          router.push('/onboard')
        }
      }
    },
    // @ts-ignore
    onError: (error) => {
      console.error('Failed to fetch profile:', error)
      // Handle error appropriately - could redirect to error page or show toast
    },
  })

  return (
    <div className="min-h-screen bg-[#F3F2F1]">
      {/* Main container */}
      <div className="mx-auto px-6 pt-3">
        {/* Top Navigation */}
        <Navbar />
        {children}
      </div>
    </div>
  )
}
