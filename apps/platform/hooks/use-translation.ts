'use client'

import type { GlobalAtom } from '../lib/atoms/global'
import { useLocale } from './use-locale'
import { en } from '../locales/en'
import ar from '../locales/ar'

type TranslationKeys = typeof en

const translations: Record<GlobalAtom['locale'], TranslationKeys> = {
  en,
  // @ts-expect-error
  ar,
}

export function useTranslation() {
  const { locale } = useLocale()

  const currentTranslations =
    translations[locale as keyof typeof translations] ?? translations.en

  return currentTranslations as TranslationKeys
}

export type { TranslationKeys }
