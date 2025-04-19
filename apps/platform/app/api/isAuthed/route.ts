import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  const hasAccessToken = !!accessToken?.value

  return NextResponse.json({ ok: hasAccessToken })
}
