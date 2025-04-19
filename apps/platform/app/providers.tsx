'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'jotai'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useLocale } from '@hooks/use-locale'

const LOCALE_CHANGE_EVENT = 'dalla:locale-change'

function updateFontsForLocale(
  locale: string,
  nebulaClassName: string,
  madaniArabicClassName: string,
) {
  const isArabic = locale === 'ar'
  const root = document.documentElement
  const body = document.body

  root.lang = locale

  root.classList.remove(nebulaClassName, madaniArabicClassName)
  root.classList.add(isArabic ? madaniArabicClassName : nebulaClassName)

  body.classList.remove('font-sans', 'font-arabic')
  body.classList.add(isArabic ? 'font-arabic' : 'font-sans')

  const event = new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale } })
  window.dispatchEvent(event)
}

interface ProvidersProps {
  children: React.ReactNode
  nebulaClassName: string
  madaniArabicClassName: string
}

export default function Providers({
  children,
  nebulaClassName,
  madaniArabicClassName,
}: ProvidersProps) {
  const [global] = useAtom(globalAtom)
  const [isReady, setIsReady] = useState(false)
  const { setLocale } = useLocale()

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.dallaChangeLocale = (newLocale: string) => {
      if (newLocale === 'en' || newLocale === 'ar') {
        setLocale(newLocale)
        updateFontsForLocale(newLocale, nebulaClassName, madaniArabicClassName)
      }
    }

    return () => {
      delete window.dallaChangeLocale
    }
  }, [setLocale, nebulaClassName, madaniArabicClassName])

  useEffect(() => {
    if (Boolean(global.mode)) {
      setIsReady(true)
    }
  }, [global.mode])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: isReady && Boolean(global.mode),
      },
    },
  })

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NuqsAdapter>
          <main>{children}</main>
        </NuqsAdapter>
      </QueryClientProvider>
      <Script src="https://accounts.google.com/gsi/client" async defer />
    </Provider>
  )
}

declare global {
  interface Window {
    dallaChangeLocale?: (locale: string) => void
  }
}
