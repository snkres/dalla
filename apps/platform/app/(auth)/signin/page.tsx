import * as motion from 'motion/react-client'
import { fadeInVariants } from '@dalla/utils'
import { getTranslations } from '@lib/utils/get-translations'
import { getLocale } from '@lib/utils/get-locale'
import { SigninPageClient } from './page.client'

export default async function SigninPage() {
  const locale = await getLocale()
  const t = getTranslations(locale)

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md space-y-8"
    >
      <div id="google-signin-button" style={{ display: 'none' }}></div>
      <SigninPageClient translations={t} locale={locale} />
    </motion.div>
  )
}
