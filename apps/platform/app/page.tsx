'use client'

import { useEffect } from "react"

export default function Home(): React.ReactNode {

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('access_token')
      if (token) {
        window.location.href = '/profile'
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
