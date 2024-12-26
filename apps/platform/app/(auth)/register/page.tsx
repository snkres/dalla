'use client'

import { LogoHorizontal } from '@dallah/design-system'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { cn } from '@dallah/utils'
import { useQueryState } from 'nuqs'
import { ModeToggle } from '@components/shared/mode-toggle'
import { CompanyRegisterForm } from '@components/auth/register/company-form'
import { ProRegisterForm } from '@components/auth/register/pro-form'
import { motion, AnimatePresence } from 'motion/react'

export default function Register() {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'companies',
  })

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden bg-[#1a3244]">
        <Image
          src={
            mode === 'companies'
              ? '/RegisterCompany.webp'
              : '/RegisterProfessional.webp'
          }
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 w-full max-w-2xl space-y-8">
        <div className="mb-8 flex justify-center">
          <LogoHorizontal
            className={cn(
              'motion-ease-spring-bouncy z-50 w-56 transition-colors duration-500',
              mode === 'companies'
                ? 'fill-foreground'
                : '[&_path]:fill-slate-blue',
            )}
          />
        </div>

        <div
          className={cn(
            'rounded-3xl p-6 shadow-lg',
            mode === 'companies' ? 'bg-white' : 'bg-slate-blue text-white',
          )}
        >
          <div className="space-y-6">
            <div className="mx-auto w-fit">
              <ModeToggle
                mode={mode as 'companies' | 'professional'}
                onModeChange={setMode}
              />
            </div>

            <div className="space-y-1 text-center">
              <h1
                className={cn(
                  'text-heading-lg font-bold',
                  mode === 'companies'
                    ? 'text-slate-blue'
                    : 'text-sunshine-yellow',
                )}
              >
                Join Dalla Today!
              </h1>
              <p
                className={cn(
                  'text-text-md mx-auto w-5/6 py-1',
                  mode === 'companies' ? 'text-gray-500' : 'text-white',
                )}
              >
                Whether you're a professional or a company, Dalla connects you
                to endless opportunities in consulting and collaboration.
              </p>
            </div>
            <AnimatePresence mode="wait">
              {mode === 'companies' ? (
                <motion.div
                  key="company"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="h-[33rem]"
                >
                  <CompanyRegisterForm />
                </motion.div>
              ) : (
                <motion.div
                  key="professional"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="h-[33rem]"
                >
                  <ProRegisterForm />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className={cn(
                  'font-semibold hover:underline',
                  mode === 'companies'
                    ? 'text-slate-blue'
                    : 'text-sunshine-yellow',
                )}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
