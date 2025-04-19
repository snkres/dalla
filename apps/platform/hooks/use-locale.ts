'use client'

import { useAtom } from 'jotai'
import { globalAtom, type GlobalAtom } from '../lib/atoms/global'
import { useEffect, useState } from 'react'

const LOCALE_CHANGE_EVENT = 'dalla:locale-internal-change'

export function useLocale() {
  const [global, setGlobal] = useAtom(globalAtom)

  const initialLocale = global?.locale ?? 'en'
  const [currentLocale, setCurrentLocale] = useState(initialLocale)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (global?.locale && global.locale !== currentLocale) {
      setCurrentLocale(global.locale)
    }
    if (global) {
      setIsReady(true)
    }
  }, [global, currentLocale])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleLocaleChange = (event: CustomEvent) => {
      const newLocale = event.detail?.locale
      if (newLocale && (newLocale === 'en' || newLocale === 'ar')) {
        setCurrentLocale(newLocale)
        if (global?.locale !== newLocale) {
          setGlobal({
            ...(global ?? { locale: 'en' }),
            locale: newLocale,
          })
        }
      }
    }

    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange as any)
    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange as any)
    }
  }, [global, setGlobal])

  const setLocale = (locale: GlobalAtom['locale']) => {
    setGlobal({
      ...(global ?? { locale: 'en' }),
      locale,
    })

    setCurrentLocale(locale)

    if (typeof window !== 'undefined') {
      const event = new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale } })
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
