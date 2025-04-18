'use client'

import { useAtom } from 'jotai'
import { globalAtom, type GlobalAtom } from '../lib/atoms/global'

export function useLocale() {
  const [global, setGlobal] = useAtom(globalAtom)

  const setLocale = (locale: GlobalAtom['locale']) => {
    const nextGlobal = { ...(global ?? { locale: 'en' }), locale } as GlobalAtom
    setGlobal(nextGlobal)
  }

  return {
    locale: global?.locale ?? 'en',
    setLocale,
  }
}
