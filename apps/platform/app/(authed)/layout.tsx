import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthedLayoutClient from './AuthedLayoutClient' // Import the new client component

export const dynamic = 'force-dynamic'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthed = await fetch(
    `${process.env.NODE_ENV === 'production' ? 'https://platform.dev.dalla.app' : 'http://localhost:3000'}/api/isAuthed`,
  ).then((res) => res.json())

  console.log('isAuthed', isAuthed)

  if (!isAuthed.cookieStore.get('access_token')) {
    redirect('/login')
  }

  // If authenticated, render the client layout component which handles fetching meta, etc.
  return <AuthedLayoutClient>{children}</AuthedLayoutClient>
}
