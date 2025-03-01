'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@components/auth/otp/input-otp";
import { ButtonsContainer } from '@lib/constants/ButtonsContianer';
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate';

export default function VerifyPage() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {

      router.push('/onboard');
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    router.push('/signup');
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    handleVerificationSubmit(e);
  }


  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible" className="w-full max-w-[420px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="space-y-8">
        <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }} className="text-center space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Check your email
          </h1>
          <p className="text-gray-500 text-sm font-light">
            We&apos;ve sent a verification code to your email
          </p>
        </motion.div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="space-y-4">
            <label className="text-sm font-medium text-gray-700 block text-center">
              Enter verification code
            </label>
            <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode} disabled={isSubmitting} className="flex justify-center gap-2">
              <InputOTPGroup className="gap-2">
                {[0, 1, 2].map((index) => (
                  <InputOTPSlot key={index} index={index} className="w-11 h-11 text-lg font-medium rounded border border-gray-200  focus:ring-1 focus:ring-[#234d64] focus:border-[#234d64] transition-all duration-200" />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2" />
              <InputOTPGroup className="gap-2">
                {[3, 4, 5].map((index) => (
                  <InputOTPSlot key={index} index={index} className="w-11 h-11 text-lg font-medium rounded border border-gray-200  focus:ring-1 focus:ring-[#234d64] focus:border-[#234d64] transition-all duration-200" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </motion.div>

          <ButtonsContainer
            handlePrevious={handlePrevious}
            isSubmitting={isSubmitting}
            previousText="Back"
            continueText="Verify email"
            handleSubmit={handleContinue}
          />
        </form>
      </div>
    </motion.div>
  );
}