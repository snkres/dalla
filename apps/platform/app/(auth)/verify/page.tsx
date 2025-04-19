'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './(components)/input-otp'
import { ButtonsContainer } from '@lib/constants/ButtonsContianer'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import { verify } from '@lib/api/auth/otp-verify'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { useTranslation } from '@hooks/use-translation'

export default function VerifyPage() {
  const t = useTranslation()
  const router = useRouter()
  const [global] = useAtom(globalAtom)
  const { toast } = useToast()
  const [verificationCode, setVerificationCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // useEffect(() => {
  //   const email = global.email
  //   const mode = global.mode
  //   if (!email || !mode) {
  //     router.push('/login')
  //     return
  //   }
  // }, [router, global])

  const handleVerificationSubmit = async () => {
    if (isSubmitting) return
    if (verificationCode.length !== 4) {
      toast({
        title: t.verify.errorInvalidCodeTitle,
        description: t.verify.errorInvalidCodeDescription,
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log(global)
      const res = await verify({
        email: global.email,
        otp: verificationCode,
        userType: global.mode,
      })

      if (res.success) {
        router.push('/onboard')
      } else {
        toast({
          title: t.verify.errorVerificationFailedTitle,
          description: t.verify.errorVerificationFailedDescription,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: t.verify.errorVerificationFailedTitle,
        description: t.verify.errorVerificationFailedDescription,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrevious = () => {
    router.back()
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[420px] px-4 py-8 sm:px-6 sm:py-12"
    >
      <div className="space-y-8">
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="space-y-3 text-center"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            {t.verify.title}
          </h1>
          <p className="text-sm font-light text-gray-500">
            {t.verify.description}
          </p>
        </motion.div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleVerificationSubmit()
          }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <label className="block text-center text-sm font-medium text-gray-700">
              {t.verify.label}
            </label>
            <InputOTP
              maxLength={4}
              value={verificationCode}
              onChange={setVerificationCode}
              disabled={isSubmitting}
              className="flex justify-center gap-2"
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-11 w-11 rounded border border-gray-200 text-lg font-medium transition-all duration-200 focus:border-[#234d64] focus:ring-1 focus:ring-[#234d64]"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </motion.div>

          <ButtonsContainer
            handlePrevious={handlePrevious}
            isSubmitting={isSubmitting}
            previousText={t.verify.buttonBack}
            continueText={t.verify.buttonVerify}
            handleSubmit={handleVerificationSubmit}
            isAbleToProceed={verificationCode.length === 4}
            isNextDisabled={verificationCode.length !== 4}
            isLoading={isSubmitting}
          />
        </form>
      </div>
    </motion.div>
  )
}
