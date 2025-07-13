'use client'

import { Link } from 'next-view-transitions'
import { LoginForm } from './components/login.form'
import { useLogin } from './hooks/use-login'
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle'
import type { AccountType } from '@lib/types/auth'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { redirect } from 'next/navigation'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { fadeInUpVariants } from '@dalla/utils'

type LoginPageClientProps = {
  translations: TranslationKeys
  locale: string
}

export function LoginPageClient({
  translations,
  locale,
}: LoginPageClientProps) {
  const [global, setGlobal] = useAtom(globalAtom)
  const clientTranslations = useTranslation()
  const { locale: currentLocale } = useLocale()
  const [activeTranslations, setActiveTranslations] = useState(translations)
  const [activeLocale, setActiveLocale] = useState(locale)

  useEffect(() => {
    if (
      currentLocale !== activeLocale &&
      clientTranslations &&
      clientTranslations.login
    ) {
      setActiveTranslations(clientTranslations)
      setActiveLocale(currentLocale)
    }
  }, [currentLocale, activeLocale, clientTranslations])

  const { mode, setMode } = useLogin({ translations: activeTranslations })

  if (global.id) {
    return redirect('/')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 space-y-2 text-center">
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 88.34 88.92"
            className="h-20 w-20 fill-[#234d64]"
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M0,.65l.83-.37c15.4.83,32.03-1.17,47.26.25,38.68,3.61,54.39,51.9,25.07,77.59-11.74,10.29-24.67,11.25-39.7,10.67-.29-.01-.89.18-.84-.24.37,0,.71-.11,1.05-.27,15.98-7.48,26.02-19.63,25.82-38-.03-2.53-.64-5.4-.73-7.91-.03-.81-.09-1.75.11-2.52.81-3.13,10.12-7.74,12.97-9.34.29-.44-1.51-2.5-1.94-2.88-1.27-1.13-3.35-1.96-5.03-2.16-.81-.1-1.84.16-2.58-.05-.47-.14-3.21-2.36-4.09-2.87-14.91-8.63-25.97.5-31.16,14.61-8.94,4.02-17.74,8.43-26.02,13.7l-.55-.07c-.09-.06-.48-.68-.48-.73V.65Z" />
              <path d="M48.39,28.17c3.75-.99,3.77,5.15-.19,3.91-1.68-.53-1.63-3.43.19-3.91Z" />
            </g>
          </svg>
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {activeTranslations.login.welcome}
        </h1>
        <p className="text-sm font-light text-gray-500">
          {activeTranslations.login.description}
        </p>
      </div>

      <AccountTypeToggle
        value={mode as AccountType}
        onChange={(type) => {
          setMode(type)
          setGlobal({
            ...global,
            mode: type === 'company' ? 'company' : 'user',
          })
        }}
      />

      <LoginForm translations={activeTranslations} locale={activeLocale} />
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          {activeTranslations.login.noAccount}{' '}
          <Link
            href={`/signup?mode=${mode}`}
            className="text-slate-blue-90 font-medium hover:underline"
          >
            {activeTranslations.login.signUpLink}
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-gray-500">
        {activeTranslations.login.termsAgreement}{' '}
        <Link
          href="https://dev.dalla.app/en/terms-of-service"
          className="text-[#234d64] hover:text-[#1a3b4d]"
        >
          {activeTranslations.login.termsLink}
        </Link>{' '}
        {activeLocale === 'ar' ? 'و' : 'and'}{' '}
        <Link
          href="https://dev.dalla.app/en/privacy-policy"
          className="text-[#234d64] hover:text-[#1a3b4d]"
        >
          {activeTranslations.login.privacyLink}
        </Link>
      </p>
    </>
  )
}
