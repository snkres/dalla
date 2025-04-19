'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle'
import type { AccountType } from '@lib/types/auth'
import { fadeInUpVariants, fadeInVariants, cn } from '@dalla/utils'
import { Link } from 'next-view-transitions'
import { z } from 'zod'
import { register } from '@lib/api/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryState } from 'nuqs'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { redirect } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { LinkedInIcon } from '@lib/constants/social-media-icons'
import { GoogleIcon } from '@lib/constants/social-media-icons'
import { useSSO } from '@lib/hooks/use-sso'
import { useTranslation } from '../../../hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

type FormData = z.infer<ReturnType<typeof createSignupSchema>>

function createSignupSchema(
  t: ReturnType<typeof useTranslation>,
  mode: string,
) {
  return z.object({
    name: z.string().min(2, t.signup.validationNameMinLength),
    email: z.string().email(t.signup.validationEmailInvalid),
    password: z.string().min(8, t.signup.validationPasswordMinLength),
    username: z
      .string()
      .min(2, t.signup.validationUsernameMinLength)
      .optional(),
  })
}

export default function SignupPage() {
  const t = useTranslation()
  const { locale } = useLocale()
  const [global, setGlobal] = useAtom(globalAtom)
  const [showPassword, setShowPassword] = useState(false)

  if (global.id) {
    return redirect('/')
  }
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })

  const signupSchema = useMemo(() => createSignupSchema(t, mode), [t, mode])

  const {
    triggerGoogleSignIn,
    isGoogleLoading,
    isLinkedInLoading,
    handleLinkedInSignIn,
  } = useSSO({
    mode: mode === 'company' ? 'company' : 'user',
  })

  const { toast } = useToast()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      const userType = mode === 'company' ? 'company' : 'user'
      const res = await register({
        ...data,
        userType: userType,
        username: userType === 'user' ? data.username || '' : '',
      })
      if (res.success) {
        setGlobal({
          ...global,
          id: '',
          mode: userType,
          email: data.email,
          name: data.name,
          username: userType === 'user' ? data.username || '' : '',
        })
        window.location.href = '/verify'
      }
    } catch (error) {
      toast({
        title: t.signup.errorTitle,
        description:
          error instanceof Error ? error.message : t.signup.errorUnknown,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-8"
      >
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
            {t.signup.title}
          </h1>
          <p className="text-sm font-light text-gray-500">
            {t.signup.description}
          </p>
        </div>

        <div className="w-full">
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
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-4">
            <div
              className={cn('space-y-2', locale === 'ar' ? 'text-right' : '')}
            >
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                {t.signup.emailLabel}
              </label>
              <Input
                id="email"
                type="email"
                {...registerField('email')}
                placeholder={t.signup.emailPlaceholder}
                className={cn(
                  'h-11 w-full',
                  locale === 'ar' ? 'text-right' : '',
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:flex sm:gap-1.5 sm:space-y-0">
              <div
                className={cn(
                  'w-full space-y-2',
                  locale === 'ar' ? 'text-right' : '',
                )}
              >
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  {t.signup.nameLabel}
                </label>
                <Input
                  id="name"
                  type="text"
                  {...registerField('name')}
                  placeholder={t.signup.namePlaceholder}
                  className={cn(
                    'h-11 w-full',
                    locale === 'ar' ? 'text-right' : '',
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <AnimatePresence mode="sync">
                {mode === 'professional' && (
                  <motion.div
                    className={cn(
                      'w-full space-y-2',
                      locale === 'ar' ? 'text-right' : '',
                    )}
                    initial={{ opacity: 0, x: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t.signup.usernameLabel}
                    </label>
                    <Input
                      id="username"
                      type="text"
                      {...registerField('username')}
                      placeholder={t.signup.usernamePlaceholder}
                      className={cn(
                        'h-11 w-full',
                        locale === 'ar' ? 'text-right' : '',
                      )}
                    />
                    {errors.username && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.username.message}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className={cn('space-y-2', locale === 'ar' ? 'text-right' : '')}
            >
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                {t.signup.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...registerField('password')}
                  placeholder={t.signup.passwordPlaceholder}
                  className={cn(
                    'h-11 w-full pl-10 pr-10',
                    locale === 'ar' ? 'text-right' : '',
                  )}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-[#234d64] font-medium text-white hover:bg-[#1a3b4d]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.signup.creatingAccountButton}
              </>
            ) : (
              t.signup.createAccountButton
            )}
          </Button>
          {mode === 'professional' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs lowercase">
                  <span className="bg-white px-2 text-gray-400">
                    {t.signup.continueWith}
                  </span>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-3">
                <Button
                  key="LinkedIn"
                  type="button"
                  variant="outline"
                  className="flex !h-11 w-full items-center justify-center gap-2"
                  onClick={() => handleLinkedInSignIn()}
                  disabled={isLinkedInLoading}
                >
                  {isLinkedInLoading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </>
                  ) : (
                    <>
                      <LinkedInIcon className="h-6 w-6" />
                    </>
                  )}
                </Button>

                <div className="w-full">
                  <Button
                    key="Google"
                    type="button"
                    variant="outline"
                    className="flex !h-11 w-full items-center justify-center gap-2"
                    onClick={() => triggerGoogleSignIn()}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </>
                    ) : (
                      <>
                        <GoogleIcon className="h-6 w-6" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>

        <p className="text-center text-sm text-gray-500">
          {t.signup.alreadyHaveAccount}{' '}
          <Link
            href={`/login?mode=${mode}`}
            className="font-medium text-[#234d64] hover:text-[#1a3b4d] hover:underline"
          >
            {t.signup.signInLink}
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500">
          {t.signup.termsAgreement}{' '}
          <Link href="/terms" className="text-[#234d64] hover:text-[#1a3b4d]">
            {t.signup.termsLink}
          </Link>{' '}
          {locale === 'ar' ? 'و' : 'and'}{' '}
          <Link href="/privacy" className="text-[#234d64] hover:text-[#1a3b4d]">
            {t.signup.privacyLink}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
