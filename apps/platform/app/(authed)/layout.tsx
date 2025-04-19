import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthedLayoutClient from './AuthedLayoutClient' // Import the new client component

export const dynamic = 'force-dynamic'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  if (!cookieStore.get('access_token')) {
    redirect('/login')
  }

  return <AuthedLayoutClient>{children}</AuthedLayoutClient>
}
