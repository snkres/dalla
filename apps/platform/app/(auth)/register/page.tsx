'use client'

import { Button, LogoHorizontal } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@dallah/utils'
import { useQueryState } from 'nuqs'

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
      <div className="relative z-10 w-full max-w-[500px] space-y-8">
        <div className="mb-8 flex justify-center">
          <LogoHorizontal
            className={cn(
              'z-50 w-56 transition-colors duration-500',
              mode === 'company'
                ? 'fill-foreground'
                : '[&_path]:fill-slate-blue',
            )}
          />
        </div>

        <div className="rounded-lg bg-white p-6">
          <div className="space-y-6">
            <div className="mx-auto flex w-fit items-center justify-center rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setMode('company')}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  mode === 'company'
                    ? 'bg-[#1a3244] text-white'
                    : 'text-gray-600'
                }`}
              >
                Company
              </button>
              <button
                onClick={() => setMode('professional')}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  mode === 'professional'
                    ? 'bg-[#1a3244] text-white'
                    : 'text-gray-600'
                }`}
              >
                Professional
              </button>
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-[#1a3244]">
                Join Dalla Today!
              </h1>
              <p className="text-sm text-gray-500">
                Whether you're a professional or a company, Dalla connects you
                to endless opportunities in consulting and collaboration.
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="company-name">Company Name</label>
                <Input id="company-name" placeholder="Arfi" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="industry">Industry</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Franchising" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="franchising">Franchising</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="business-type">Business Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Startup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="smb">SMB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company-size">Company Size</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="11-50 employees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501+">501+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="email">Email Address</label>
                <Input id="email" type="email" placeholder="name@mail.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
              </div>

              <Button className="w-full bg-[#1a3244] hover:bg-[#264a63]">
                Create Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1a3244] hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
