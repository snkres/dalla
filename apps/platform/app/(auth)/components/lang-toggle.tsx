'use client'

import { Button } from '@dalla/design-system'
import { useLocale } from '@hooks/use-locale'
import { Languages } from 'lucide-react'
import { useEffect } from 'react'

// Manual font update fallback function
function manualUpdateFonts(locale: string) {
  if (typeof window === 'undefined') return

  const isArabic = locale === 'ar'
  const html = document.documentElement
  const body = document.body

  // Get the applied class names from the HTML element
  const currentClassName = html.className
  const nebulaClassMatch = currentClassName.match(/(__)?nebula(__)?[^ ]*/)
  const arabicClassMatch = currentClassName.match(/(__)?madani(__)?[^ ]*/)

  const nebulaClassName = nebulaClassMatch ? nebulaClassMatch[0] : ''
  const arabicClassName = arabicClassMatch ? arabicClassMatch[0] : ''

  if (nebulaClassName && arabicClassName) {
    // Remove both font classes
    html.classList.remove(nebulaClassName, arabicClassName)
    // Add the correct one
    html.classList.add(isArabic ? arabicClassName : nebulaClassName)

    // Update body classes for Tailwind
    body.classList.remove('font-sans', 'font-arabic')
    body.classList.add(isArabic ? 'font-arabic' : 'font-sans')

    console.log(`[LangToggle] Manual font update for ${locale} completed`)
  } else {
    console.log(
      '[LangToggle] Could not identify font classes for manual update',
    )
  }
}

export function LangToggle() {
  const { locale, setLocale } = useLocale()

  // Log when LangToggle renders with a new locale
  useEffect(() => {
    console.log('[LangToggle] Rendered with locale:', locale)
  }, [locale])

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    console.log('[LangToggle] Toggling from', locale, 'to', newLocale)

    // Primary approach: use the hook's setLocale function
    setLocale(newLocale)

    // Secondary approach: use the global function
    if (typeof window !== 'undefined' && window.dallaChangeLocale) {
      window.dallaChangeLocale(newLocale)
      console.log('[LangToggle] Called global dallaChangeLocale')
    } else {
      console.log('[LangToggle] Global dallaChangeLocale not available')

      // Fallback approach: manually update fonts as a last resort
      setTimeout(() => {
        manualUpdateFonts(newLocale)
      }, 100) // Small delay to allow other methods to complete first
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
