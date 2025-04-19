'use client'

import { Button } from '@dalla/design-system'
import { useLocale } from '@hooks/use-locale'
import { Languages } from 'lucide-react'
import { useEffect } from 'react'

export function LangToggle() {
  const { locale, setLocale } = useLocale()

  // Log when LangToggle renders with a new locale
  useEffect(() => {
    console.log('[LangToggle] Rendered with locale:', locale)
  }, [locale])

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    console.log('[LangToggle] Toggling from', locale, 'to', newLocale)

    // Use both approaches for maximum reliability
    setLocale(newLocale)

    // Also use the global function if available
    if (typeof window !== 'undefined' && window.dallaChangeLocale) {
      window.dallaChangeLocale(newLocale)
      console.log('[LangToggle] Called global dallaChangeLocale')
    } else {
      console.log('[LangToggle] Global dallaChangeLocale not available')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="rounded-full"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
