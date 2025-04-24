'use client'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

const LOCALE_CHANGE_EVENT = 'dalla:locale-internal-change'

export function useLocale() {
  const locale = getCookie('lang') as string
  const initialLocale = locale ?? 'en'
  const [currentLocale, setCurrentLocale] = useState(initialLocale)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (locale && locale !== currentLocale) {
      setCurrentLocale(locale)
    }
    if (locale) {
      setIsReady(true)
    }
  }, [locale, currentLocale])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleLocaleChange = (event: CustomEvent) => {
      const newLocale = event.detail?.locale
      if (newLocale && (newLocale === 'en' || newLocale === 'ar')) {
        setCurrentLocale(newLocale)
        if (locale !== newLocale) {
          setCookie('lang', newLocale, {
            domain:
              process.env.NODE_ENV === 'production'
                ? '.dev.dalla.app'
                : undefined,
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === 'production',
          })
        }
      }
    }

    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange as any)
    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange as any)
    }
  }, [locale])

  const setLocale = (locale: string) => {
    setCurrentLocale(locale)
    setCookie('lang', locale, {
      domain:
        process.env.NODE_ENV === 'production' ? '.dev.dalla.app' : undefined,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
    })
    if (typeof window !== 'undefined') {
      const event = new CustomEvent(LOCALE_CHANGE_EVENT, {
        detail: { locale },
      })
      window.dispatchEvent(event)
    }

    setIsReady(true)
  }

  return {
    locale: currentLocale,
    setLocale,
    isReady,
  }
}
