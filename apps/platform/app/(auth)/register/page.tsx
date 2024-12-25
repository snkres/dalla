'use client'

import { LogoHorizontal } from '@dallah/design-system'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@dallah/utils'
import { useQueryState } from 'nuqs'
import { ModeToggle } from '@components/landing/features/mode-toggle'
import { CompanyRegisterForm } from '@components/auth/register/form'

export default function Register() {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'companies',
  })

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden bg-[#1a3244]">
        <Image
          src="/RegisterCompany.webp"
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
              'z-50 w-56 transition-colors duration-500',
              mode === 'companies'
                ? 'fill-foreground'
                : '[&_path]:fill-slate-blue',
            )}
          />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="space-y-6">
            <div className="mx-auto w-fit">
              <ModeToggle
                mode={mode as 'companies' | 'professional'}
                onModeChange={setMode}
              />
            </div>

            <div className="space-y-1 text-center">
              <h1 className="text-heading-lg text-slate-blue font-bold">
                Join Dalla Today!
              </h1>
              <p className="text-text-md mx-auto w-5/6 text-gray-500">
                Whether you're a professional or a company, Dalla connects you
                to endless opportunities in consulting and collaboration.
              </p>
            </div>
            <CompanyRegisterForm mode={mode as 'companies' | 'professional'} />
            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-[#1a3244] hover:underline"
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
