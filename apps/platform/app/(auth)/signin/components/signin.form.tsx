import { Button } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { useLocale } from '@hooks/use-locale'
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'next-view-transitions'
import { GoogleIcon, LinkedInIcon } from '@lib/constants/social-media-icons'
import { useSignin } from '../hooks/use-signin'
import { AnimatePresence, motion } from 'motion/react'

type SigninFormProps = {
  translations?: TranslationKeys
  locale?: string
}

export function SigninForm({ translations, locale }: SigninFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const t = translations || useTranslation()
  const currentLocale = locale || useLocale().locale
  const {
    form,
    mode,
    handleLinkedInSignInClick,
    handleGoogleSignInClick,
    isGoogleLoading,
    isLinkedInLoading,
    isProcessingLinkedIn,
  } = useSignin({ translations })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <form.Field
          name="email"
          children={(field) => (
            <div
              className={cn(
                'space-y-2',
                currentLocale === 'ar' ? 'text-right' : '',
              )}
            >
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {t.signin.emailLabel}
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder={t.signin.emailPlaceholder}
                className={cn(
                  'h-11',
                  currentLocale === 'ar' ? 'text-right' : '',
                )}
              />
              <AnimatePresence mode="wait">
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="mt-1 text-xs text-red-500"
                    >
                      {field.state.meta.errors
                        .map((error: any) => error.message || error)
                        .join(', ')}
                    </motion.p>
                  )}
              </AnimatePresence>
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div
              className={cn(
                'space-y-2',
                currentLocale === 'ar' ? 'text-right' : '',
              )}
            >
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {t.signin.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? 'text' : 'password'}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t.signin.passwordPlaceholder}
                  className={cn(
                    'h-11 pl-10 pr-10',
                    currentLocale === 'ar' ? 'text-right' : '',
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
              <AnimatePresence mode="wait">
                {field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="mt-1 text-xs text-red-500"
                    >
                      {field.state.meta.errors
                        .map((error: any) => error.message || error)
                        .join(', ')}
                    </motion.p>
                  )}
              </AnimatePresence>
            </div>
          )}
        />

        <form.Field
          name="rememberMe"
          children={(field) => (
            <div
              className={cn(
                'flex items-center justify-between',
                currentLocale === 'ar' ? 'flex-row-reverse' : '',
              )}
            >
              <label
                className={cn(
                  'flex items-center gap-2',
                  currentLocale === 'ar' ? 'flex-row-reverse' : '',
                )}
              >
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  {t.signin.rememberMe}
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#234d64] hover:text-[#1a3b4d]"
              >
                {t.signin.forgotPassword}
              </Link>
            </div>
          )}
        />
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full bg-[#234d64] font-medium text-white hover:bg-[#1a3b4d]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.signin.signingInButton}
              </>
            ) : (
              t.signin.signInButton
            )}
          </Button>
        )}
      />

      {mode === 'professional' && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs lowercase">
              <span className="bg-white px-2 text-gray-400">
                {t.signin.continueWith}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-3">
            <Button
              key="LinkedIn"
              type="button"
              variant="outline"
              className="flex !h-11 w-full items-center justify-center gap-2"
              onClick={handleLinkedInSignInClick}
              disabled={isLinkedInLoading || isProcessingLinkedIn}
            >
              {isLinkedInLoading || isProcessingLinkedIn ? (
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
                onClick={handleGoogleSignInClick}
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
  )
}
