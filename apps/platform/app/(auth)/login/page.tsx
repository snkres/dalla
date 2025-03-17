'use client'

import { motion } from 'motion/react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { FaXTwitter, FaFacebookF, FaGoogle } from 'react-icons/fa6'
import { RiAppleFill } from 'react-icons/ri'
import Link from 'next/link'
import { fadeInVariants, fadeInUpVariants } from '@components/aniamtion/animate'
import { useQueryState } from 'nuqs'
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle'
import type { AccountType } from '@lib/types/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@lib/api/auth/login'
import { resendOTP } from '@lib/api/auth/otp-verify'
import { useTransitionRouter } from 'next-view-transitions'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [global, setGlobal] = useAtom(globalAtom)
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useTransitionRouter()
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    try {
      setGlobal({
        ...global,
        mode: mode === 'company' ? 'company' : 'user',
        email: data.email,
      })
      const res = await login({
        email: data.email,
        password: data.password,
        userType: mode === 'company' ? 'company' : 'user',
      })
      if (res.success) {
        router.push('/')
      }
    } catch (e) {
      if (e instanceof Error && 'status' in e) {
        if (e.status === 403) {
          await resendOTP({
            email: data.email,
            userType: mode === 'company' ? 'company' : 'user',
          })
          router.push('/verify')
        } else if (e.status === 422) {
          await resendOTP({
            email: data.email,
            userType: mode === 'company' ? 'company' : 'user',
          })
          router.push('/verify')
        }
      }
    }
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex flex-col items-center justify-center gap-2 space-y-2 text-center">
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
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="text-sm font-light text-gray-500">
          Sign in to your Dalla Solutions account
        </p>
      </div>

      <AccountTypeToggle
        value={mode as AccountType}
        onChange={(type) => {
          setMode(type)
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className="hx"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="h-11"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                {...register('rememberMe')}
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#234d64] hover:text-[#1a3b4d]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full bg-[#234d64] font-medium text-white hover:bg-[#1a3b4d]"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="text-center text-xs text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          href={`/signup?mode=${mode}`}
          className="font-medium text-[#234d64] hover:text-[#1a3b4d]"
        >
          Sign up
        </Link>
      </p>

      <p className="text-center text-xs text-gray-500">
        By signing in, you agree to our{' '}
        <Link href="/terms" className="text-[#234d64] hover:text-[#1a3b4d]">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-[#234d64] hover:text-[#1a3b4d]">
          Privacy Policy
        </Link>
      </p>
    </motion.div>
  )
}
