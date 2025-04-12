import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Notifications | Dalla',
  description: 'View and manage all your notifications',
}

export default function NotificationsLayout({ children }: PropsWithChildren) {
  return <main className="min-h-screen bg-gray-50 pb-12">{children}</main>
}
