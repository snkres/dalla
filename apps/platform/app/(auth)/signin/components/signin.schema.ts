import { useTranslation } from '@hooks/use-translation'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { z } from 'zod'

export function createsigninSchema(
  t: ReturnType<typeof useTranslation> | TranslationKeys,
) {
  const emailMessage =
    t?.signin?.validationEmailInvalid &&
    typeof t.signin.validationEmailInvalid === 'string'
      ? t.signin.validationEmailInvalid
      : 'Invalid email address'

  const passwordMessage =
    t?.signin?.validationPasswordMinLength &&
    typeof t.signin.validationPasswordMinLength === 'string'
      ? t.signin.validationPasswordMinLength
      : 'Password must be at least 8 characters long'

  return z.object({
    email: z.string().email(emailMessage),
    password: z.string().min(8, passwordMessage),
    rememberMe: z.boolean(),
  })
}
