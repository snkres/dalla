import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.has('access_token')) {
    return NextResponse.json({ isLoggedIn: true })
  }
  return NextResponse.json({ isLoggedIn: false })
}
