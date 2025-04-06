'use client'

import { motion } from 'motion/react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import Link from 'next/link'
import { fadeInVariants, fadeInUpVariants } from '@dallah/utils'
import { useQueryState } from 'nuqs'
import { AccountTypeToggle } from '@components/auth/AccountTypeToggle'
import type { AccountType } from '@lib/types/auth'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@lib/api/auth/login'
import { resendOTP } from '@lib/api/auth/otp-verify'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { GoogleIcon, LinkedInIcon } from '@lib/constants/social-media-icons'
import { useSSO } from '@lib/hooks/use-sso'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [global, setGlobal] = useAtom(globalAtom)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleGoogleSignIn } = useSSO()

  if (global.id) {
    return redirect('/')
  }
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      setGlobal({
        ...global,
        id: '',
        mode: mode === 'company' ? 'company' : 'user',
        email: data.email,
      })
      const res = await login({
        email: data.email,
        password: data.password,
        userType: mode === 'company' ? 'company' : 'user',
      })
      if (res.success) {
        window.location.href = '/'
      }
    } catch (e) {
      if (e instanceof Error && 'status' in e) {
        if (e.status === 403) {
          await resendOTP({
            email: data.email,
            userType: mode === 'company' ? 'company' : 'user',
          })
          window.location.href = '/verify'
        } else if (e.status === 422) {
          toast({
            title: 'Invalid Mode',
            description: 'Please select the correct mode of your account.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Invalid credentials',
            description: 'Please check your email and password and try again.',
            variant: 'destructive',
          })
        }
      }
    } finally {
      setIsSubmitting(false)
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
              className="h-11"
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
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                className="h-11 pl-10 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
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
          disabled={isSubmitting}
          className="h-11 w-full bg-[#234d64] font-medium text-white hover:bg-[#1a3b4d]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs lowercase">
            <span className="bg-white px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: LinkedInIcon, label: 'LinkedIn' },
            { icon: GoogleIcon, label: 'Google' },
          ].map(({ icon: Icon, label }) => (
            <Button
              key={label}
              type="button"
              variant="outline"
              className="!h-11"
              onClick={() => {
                if (label === 'LinkedIn') {
                  //TODO: Implement LinkedIn login
                } else if (label === 'Google') {
                  handleGoogleSignIn()
                }
              }}
            >
              <Icon className="h-6 w-6" />
            </Button>
          ))}
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-slate-blue-90 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

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
