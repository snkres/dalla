import { toast } from '@dalla/design-system/ui/toast/use-toast'
import { useTranslation } from '@hooks/use-translation'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { signin } from '@lib/api/auth/signin'
import { resendOTP } from '@lib/api/auth/otp-verify'
import { globalAtom } from '@lib/atoms/global'
import { useSSO } from 'app/(auth)/hooks/use-sso'
import { useAtom } from 'jotai'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { createsigninSchema } from '../components/signin.schema'

type FormData = z.infer<ReturnType<typeof createsigninSchema>>

type UseSigninProps = {
  translations?: TranslationKeys
}

export function useSignin({ translations }: UseSigninProps = {}) {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'professional',
  })
  const [global, setGlobal] = useAtom(globalAtom)
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false)

  const fallbackTranslations = useTranslation()
  const t =
    translations && translations.signin ? translations : fallbackTranslations

  const signinSchema = useMemo(() => createsigninSchema(t), [t])

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as FormData,
    validators: {
      onSubmit: signinSchema,
    },
    onSubmit: async ({ value }: { value: FormData }) => {
      try {
        setGlobal({
          ...global,
          id: '',
          mode: mode === 'company' ? 'company' : 'user',
          email: value.email,
        })

        const res = await signin({
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
              title: t.signin.errorInvalidModeTitle,
              description: t.signin.errorInvalidModeDescription,
              variant: 'destructive',
            })
          } else {
            toast({
              title: t.signin.errorInvalidCredentialsTitle,
              description: t.signin.errorInvalidCredentialsDescription,
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
