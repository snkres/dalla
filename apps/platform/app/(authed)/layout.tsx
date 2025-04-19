import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthedLayoutClient from './AuthedLayoutClient'

export const dynamic = 'force-dynamic'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  console.log('cookieStore', cookieStore)
  console.log('cookieStore', cookieStore.has('access_token'))
  if (!cookieStore.has('access_token')) {
    console.log('redirecting to login')
    redirect('/login')
  }

  return <AuthedLayoutClient>{children}</AuthedLayoutClient>
}
