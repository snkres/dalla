import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')

  const hasAccessToken = !!accessToken?.value

  return Response.json({ ok: hasAccessToken })
}
