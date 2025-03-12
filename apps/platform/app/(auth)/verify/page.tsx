'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './(components)/input-otp'
import { ButtonsContainer } from '@lib/constants/ButtonsContianer'
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import { verify } from '@lib/api/auth/otp-verify'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'

export default function VerifyPage() {
  const router = useRouter()
  const [global] = useAtom(globalAtom)
  const { toast } = useToast()
  const [verificationCode, setVerificationCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const email = global.email
    const mode = global.mode
    if (!email || !mode) {
      router.push('/login')
      return
    }
  }, [router, global])

  const handleVerificationSubmit = async () => {
    if (isSubmitting) return
    if (verificationCode.length !== 4) {
      toast({
        title: 'Invalid code',
        description: 'Please enter a 4-digit verification code',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await verify({
        email: global.email,
        otp: verificationCode,
        userType: global.mode === 'company' ? 'company' : 'user',
      })

      if (res.success) {
        router.push('/onboard')
      } else {
        throw new Error('Verification failed')
      }
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: 'Please try again',
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
            Check your email
          </h1>
          <p className="text-sm font-light text-gray-500">
            We&apos;ve sent a verification code to your email
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
              Enter verification code
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
            previousText="Back"
            continueText="Verify email"
            handleSubmit={handleVerificationSubmit}
            isNextDisabled={verificationCode.length !== 4}
          />
        </form>
      </div>
    </motion.div>
  )
}
