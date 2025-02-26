'use client'

import { companyProfileAtom } from "@lib/atoms/company/profile"
import { proProfileAtom } from "@lib/atoms/pro/profile"
import { useAtom } from "jotai"
import { useEffect } from "react"

export default function Home(): React.ReactNode {
  const [proProfile] = useAtom(proProfileAtom)
  const [companyProfile] = useAtom(companyProfileAtom)



  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('access_token')
      const mode = localStorage.getItem('mode')
      if (token) {
        if (mode === 'company') {
          window.location.href = `/companies/${companyProfile.id}`
        } else {
          window.location.href = `/professionals/${proProfile.username}`
        }
      } else {
        window.location.href = '/login'
      }

    }
  })

  return (
    <main>

    </main>
  )
}
