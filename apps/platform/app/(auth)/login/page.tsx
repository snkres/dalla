'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useQueryState } from 'nuqs'
import { Button, Checkbox, Input, LogoHorizontal } from '@dallah/design-system'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ModeToggle } from '@components/landing/features/mode-toggle'
import Link from 'next/link'
import { LoginRightSide } from '@components/auth/login/right-side'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type FormData = z.infer<typeof schema>

export default function Login(): React.ReactNode {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'companies',
  })
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // handle login logic here
  }

  return (
    <main className="flex max-h-screen w-full justify-between">
      <section className="flex flex-1 flex-col items-center justify-center gap-6">
        <LogoHorizontal className="[&_path]:fill-slate-blue w-56" />
        <div className="space-y-2">
          <h1 className="text-heading-md text-slate-blue text-center font-semibold">
            Log In to Your Dalla Account
          </h1>
          <p className="text-paragraph-md mx-auto max-w-md text-center text-[#9A9A9A]">
            Access your dashboard to connect with experts or manage your
            consulting projects.
          </p>
        </div>
        <ModeToggle
          mode={mode as 'companies' | 'professional'}
          onModeChange={(mode) => setMode(mode as 'companies' | 'professional')}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="group relative w-full">
            <label className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium text-[#232323] group-has-[:disabled]:opacity-50">
              Email
            </label>
            <Input
              className="text-text-sm h-12 rounded-xl bg-transparent focus:outline-none"
              placeholder="Email"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <div className="group relative w-full">
                <label className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium text-[#232323] group-has-[:disabled]:opacity-50">
                  Password
                </label>
                <Input
                  placeholder="Password"
                  type={isVisible ? 'text' : 'password'}
                  className="text-text-sm h-12 rounded-xl bg-transparent pe-9 focus:outline-none"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                className="focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-zinc-900 outline-offset-2 transition-colors hover:text-zinc-700 focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-end space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-text-sm select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link className="text-slate-blue text-text-sm" href="#">
              Forget Password?
            </Link>
          </div>
          <Button className="w-full rounded-xl" type="submit">
            Log In
          </Button>
          <div className="flex items-center gap-1">
            <div className="h-0.5 w-full flex-1 bg-[#D9D9D9]"></div>
            <p className="text-text-sm text-[#9A9A9A]">or sign in with</p>
            <div className="h-0.5 w-full flex-1 bg-[#D9D9D9]"></div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="bg-transparent">
              <svg
                className="h-5 w-5"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.66 9.27013C16.66 8.6674 16.6059 8.08786 16.5055 7.53149H8.5V10.8195H13.0746C12.8775 11.882 12.2786 12.7822 11.3784 13.3849V15.5176H14.1255C15.7327 14.0379 16.66 11.8588 16.66 9.27013Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.50022 17.5769C10.7952 17.5769 12.7193 16.8158 14.1257 15.5176L11.3786 13.3849C10.6175 13.8949 9.64386 14.1962 8.50022 14.1962C6.28635 14.1962 4.41248 12.701 3.74407 10.6919H0.904297V12.8942C2.30294 15.6721 5.17749 17.5769 8.50022 17.5769Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.74387 10.6919C3.57387 10.1819 3.47728 9.63715 3.47728 9.07692C3.47728 8.51669 3.57387 7.97192 3.74387 7.46192V5.25964H0.904092C0.32841 6.40715 0 7.70533 0 9.07692C0 10.4485 0.32841 11.7467 0.904092 12.8942L3.74387 10.6919Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.50022 3.95759C9.74817 3.95759 10.8686 4.38646 11.7495 5.22873L14.1875 2.79077C12.7155 1.41918 10.7914 0.576904 8.50022 0.576904C5.17749 0.576904 2.30294 2.48168 0.904297 5.25964L3.74407 7.46192C4.41248 5.45282 6.28635 3.95759 8.50022 3.95759Z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </Button>
            <Button variant="outline" className="bg-transparent">
              <svg
                className="h-5 w-5"
                viewBox="0 0 22 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_194_2241)">
                  <path
                    d="M5.20156 21.0769H0.846875V7.05659H5.20156V21.0769ZM3.02187 5.14409C1.62969 5.14409 0.5 3.99097 0.5 2.59878C0.5 1.92994 0.765697 1.28849 1.23864 0.815544C1.71158 0.342601 2.35303 0.0769043 3.02187 0.0769043C3.69072 0.0769043 4.33217 0.342601 4.80511 0.815544C5.27805 1.28849 5.54375 1.92994 5.54375 2.59878C5.54375 3.99097 4.41406 5.14409 3.02187 5.14409ZM21.4953 21.0769H17.15V14.2519C17.15 12.6253 17.1172 10.5394 14.8859 10.5394C12.6219 10.5394 12.275 12.3066 12.275 14.1347V21.0769H7.925V7.05659H12.1016V8.96909H12.1625C12.7438 7.86753 14.1641 6.70503 16.2828 6.70503C20.6891 6.70503 21.5 9.60659 21.5 13.3753V21.0769H21.4953Z"
                    fill="#234D64"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_194_2241">
                    <rect
                      width="21"
                      height="24"
                      fill="white"
                      transform="translate(0.5 0.0769043)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Login with LinkedIn
            </Button>
          </div>
          <div>
            <p className="text-text-sm text-center text-[#9A9A9A]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-slate-blue font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
      <LoginRightSide proMode={mode === 'professional' ? true : false} />
    </main>
  )
}
