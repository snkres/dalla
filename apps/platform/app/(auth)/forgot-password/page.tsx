'use client'

import { useState } from 'react'
import { Input, Button, Logomark } from '@dallah/design-system'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { forgotPassword } from '@lib/api/auth/password'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { fadeInUpVariants } from '@dallah/utils'
import { AccountType } from '@lib/types/auth'
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<AccountType>('company')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      await forgotPassword({
        email,
        userType: mode === 'professional' ? 'user' : 'company',
        redirectTo: `${
          process.env.NODE_ENV === 'development' ? 'http' : 'https'
        }://${
          process.env.NODE_ENV === 'development'
            ? 'localhost:3000'
            : window.location.hostname
        }/reset-password`,
      }).then((res) => {
        if (res.status === 200) {
          setIsSuccess(true)
          toast({
            title: 'Password reset email sent',
            description:
              'Please check your email for password reset instructions',
          })
        }
      })
    } catch (error) {
      toast({
        title: 'Request failed',
        description:
          'Double check your email and mode then try again. If the issue persists, contact support.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
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

        <div className="mb-6 w-full text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="text-sm text-gray-600">
            {isSuccess
              ? "We've sent you an email with a link to reset your password."
              : "Enter your email and we'll send you instructions to reset your password."}
          </p>
        </div>

        {isSuccess ? (
          <div className="w-full space-y-6">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-sm text-green-800">
                Password reset link has been sent to{' '}
                <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSuccess(false)}
              >
                Try different email
              </Button>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-slate-blue-90 text-sm hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <AccountTypeToggle
              value={mode as AccountType}
              onChange={(type) => {
                setMode(type)
              }}
            />
            <form onSubmit={handleSubmit} className="mt-4 w-full space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="pl-10"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="hover:!bg-slate-blue-100/90 !bg-slate-blue-100 w-full !text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? 'Sending...' : 'Send reset link'}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-slate-blue-90 text-sm hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
