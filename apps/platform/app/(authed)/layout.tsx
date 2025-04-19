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
  if (!cookieStore.has('access_token')) {
    redirect('/login')
  }

  return <AuthedLayoutClient>{children}</AuthedLayoutClient>
}
