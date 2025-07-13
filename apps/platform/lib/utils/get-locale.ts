import { cookies } from 'next/headers'

export async function getLocale(): Promise<string> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('lang')?.value
  return locale && (locale === 'en' || locale === 'ar') ? locale : 'en'
}
