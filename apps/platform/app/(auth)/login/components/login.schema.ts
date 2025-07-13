import { useTranslation } from '@hooks/use-translation'
import type { TranslationKeys } from '@lib/utils/get-translations'
import { z } from 'zod'

export function createLoginSchema(
  t: ReturnType<typeof useTranslation> | TranslationKeys,
) {
  const emailMessage =
    t?.login?.validationEmailInvalid &&
    typeof t.login.validationEmailInvalid === 'string'
      ? t.login.validationEmailInvalid
      : 'Invalid email address'

  const passwordMessage =
    t?.login?.validationPasswordMinLength &&
    typeof t.login.validationPasswordMinLength === 'string'
      ? t.login.validationPasswordMinLength
      : 'Password must be at least 8 characters long'

  return z.object({
    email: z.string().email(emailMessage),
    password: z.string().min(8, passwordMessage),
    rememberMe: z.boolean(),
  })
}
