import type { GlobalAtom } from '../../lib/atoms/global'
import { en } from '../../locales/en'
import ar from '../../locales/ar'

type TranslationKeys = typeof en

const translations: Record<GlobalAtom['locale'], TranslationKeys> = {
  en,
  // @ts-expect-error
  ar,
}

export function getTranslations(locale: string = 'en'): TranslationKeys {
  return translations[locale as keyof typeof translations] ?? translations.en
}

export type { TranslationKeys }
