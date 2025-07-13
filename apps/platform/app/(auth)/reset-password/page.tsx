'use client'

import { useState, useEffect } from 'react'
import { Input, Button } from '@dalla/design-system'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { resetPassword } from '@lib/api/auth/password'
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { fadeInUpVariants } from '@dalla/utils'
import { useTranslation } from '../../../hooks/use-translation'

export default function ResetPasswordPage() {
  const t = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<'company' | 'user'>('company')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    const codeParam = searchParams.get('code')
    const modeParam = searchParams.get('mode')

    if (!emailParam || !codeParam || !modeParam) {
      setError(t.resetPassword.errorInvalidLinkDescription)
    } else {
      setEmail(emailParam)
      setCode(codeParam)
      setMode(modeParam as 'company' | 'user')
    }

    setIsLoading(false)
  }, [searchParams, t])

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return t.resetPassword.errorValidationPasswordLength
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast({
        title: 'Invalid password',
        description: passwordError,
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: t.resetPassword.errorValidationPasswordMatchTitle,
        description: t.resetPassword.errorValidationPasswordMatchDescription,
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      await resetPassword({
        email,
        newPassword: password,
        code,
        userType: mode,
      })

      setIsSuccess(true)
      toast({
        title: t.resetPassword.successToastTitle,
        description: t.resetPassword.successToastDescription,
      })

      setTimeout(() => {
        router.push('/signin')
      }, 3000)
    } catch (error) {
      console.error(error)
      toast({
        title: t.resetPassword.errorResetFailedTitle,
        description: t.resetPassword.errorResetFailedDescription,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#63B7B7]" />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-4 *:w-full">
        <div className="mb-4 w-full text-center">
          <Link href="/" className="mx-auto inline-block">
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
          </Link>
        </div>

        {error ? (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                {t.resetPassword.errorInvalidLinkTitle}
              </h1>
              <p className="text-sm text-gray-600">{error}</p>
            </div>

            <Button
              className="bg-slate-blue-100 hover:bg-slate-blue-100/90 w-full text-white"
              onClick={() => router.push('/forgot-password')}
            >
              {t.resetPassword.buttonRequestNewLink}
            </Button>
          </div>
        ) : isSuccess ? (
          <div className="space-y-6 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

            <div>
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                {t.resetPassword.successTitle}
              </h1>
              <p className="text-sm text-gray-600">
                {t.resetPassword.successDescription}
              </p>
            </div>

            <Button
              className="bg-slate-blue-100 hover:bg-slate-blue-100/90 w-full text-white"
              onClick={() => router.push('/signin')}
            >
              {t.resetPassword.buttonGoTosignin}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                {t.resetPassword.title}
              </h1>
              <p className="text-sm text-gray-600">
                {t.resetPassword.description}
                <br />
                <span className="font-medium">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  {t.resetPassword.newPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.resetPassword.newPasswordPlaceholder}
                    className="pl-10 pr-10"
                    disabled={isSubmitting}
                    required
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
                <p className="text-xs text-gray-500">
                  {t.resetPassword.passwordHint}
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  {t.resetPassword.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.resetPassword.confirmPasswordPlaceholder}
                    className="pl-10"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-slate-blue-100 hover:bg-slate-blue-100/90 w-full text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                {isSubmitting
                  ? t.resetPassword.buttonResetting
                  : t.resetPassword.buttonReset}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
