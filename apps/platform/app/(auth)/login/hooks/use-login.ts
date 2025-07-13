import { toast } from '@dalla/design-system/ui/toast/use-toast'
import { useTranslation } from '@hooks/use-translation'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { login } from '@lib/api/auth/login'
import { resendOTP } from '@lib/api/auth/otp-verify'
import { globalAtom } from '@lib/atoms/global'
import { useSSO } from 'app/(auth)/hooks/use-sso'
import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { createLoginSchema } from '../components/login.schema'

type FormData = z.infer<ReturnType<typeof createLoginSchema>>

type UseLoginProps = {
  translations?: TranslationKeys
}

export function useLogin({ translations }: UseLoginProps = {}) {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'professional',
  })
  const [global, setGlobal] = useAtom(globalAtom)
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false)

  const fallbackTranslations = useTranslation()
  const t =
    translations && translations.login ? translations : fallbackTranslations

  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as FormData,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }: { value: FormData }) => {
      try {
        setGlobal({
          ...global,
          id: '',
          mode: mode === 'company' ? 'company' : 'user',
          email: value.email,
        })

        const res = await login({
          email: value.email,
          password: value.password,
          userType: mode === 'company' ? 'company' : 'user',
        })

        if (res.success) {
          window.location.href = '/'
        }
      } catch (e) {
        if (e instanceof Error && 'status' in e) {
          if (e.status === 403) {
            await resendOTP({
              email: value.email,
              userType: mode === 'company' ? 'company' : 'user',
            })
            window.location.href = '/verify'
          } else if (e.status === 422) {
            toast({
              title: t.login.errorInvalidModeTitle,
              description: t.login.errorInvalidModeDescription,
              variant: 'destructive',
            })
          } else {
            toast({
              title: t.login.errorInvalidCredentialsTitle,
              description: t.login.errorInvalidCredentialsDescription,
              variant: 'destructive',
            })
          }
        }
      }
    },
  })

  const handleGoogleSignInClick = () => {
    triggerGoogleSignIn(mode === 'company' ? 'company' : 'user')
  }

  const handleLinkedInSignInClick = () => {
    setIsProcessingLinkedIn(true)
    handleLinkedInSignIn(mode === 'company' ? 'company' : 'user').catch(() => {
      setIsProcessingLinkedIn(false)
    })
  }

  const {
    triggerGoogleSignIn,
    isGoogleLoading,
    isLinkedInLoading,
    handleLinkedInSignIn,
  } = useSSO({
    mode: mode === 'company' ? 'company' : 'user',
  })

  return {
    form,
    mode,
    setMode,
    isProcessingLinkedIn,
    isGoogleLoading,
    isLinkedInLoading,
    handleLinkedInSignInClick,
    handleGoogleSignInClick,
  }
}
