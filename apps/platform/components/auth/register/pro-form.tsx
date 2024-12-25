import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  yearsOfExperience: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type FormData = z.infer<typeof schema>

export function ProRegisterForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // handle login logic here
  }

  return (
    <form
      className="mx-auto max-w-lg space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="group relative w-full">
        <label
          className={cn(
            'absolute start-1 top-0 z-10 block -translate-y-1/2 rounded-md px-2 text-xs font-medium text-[#232323] transition-colors duration-500 group-has-[:disabled]:opacity-50',

            'bg-slate-blue text-sunshine-yellow',
          )}
        >
          Full Name
        </label>
        <Input
          className={cn(
            'text-text-sm h-12 rounded-xl pe-9 transition-colors duration-500 focus:outline-none',
            'bg-foreground text-zinc-900',
          )}
          placeholder="Name"
          type="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="group relative">
        <label
          htmlFor="select-28"
          className={cn(
            'absolute start-1 top-0 z-10 block -translate-y-1/2 rounded-md px-2 text-xs font-medium text-[#232323] transition-colors duration-500 group-has-[:disabled]:opacity-50',
            'bg-slate-blue text-sunshine-yellow',
          )}
        >
          Years of Experience
        </label>

        <Select defaultValue="s1">
          <SelectTrigger
            id="select-17"
            className="relative bg-white ps-9 text-zinc-900"
          >
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[[disabled]]:opacity-50">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.0769V4.3269"
                  stroke="#9A9A9A"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 2.0769V4.3269"
                  stroke="#9A9A9A"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.625 7.39441H15.375"
                  stroke="#9A9A9A"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 6.9519V13.3269C15.75 15.5769 14.625 17.0769 12 17.0769H6C3.375 17.0769 2.25 15.5769 2.25 13.3269V6.9519C2.25 4.7019 3.375 3.2019 6 3.2019H12C14.625 3.2019 15.75 4.7019 15.75 6.9519Z"
                  stroke="#9A9A9A"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.7713 10.8519H11.778"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.7713 13.1019H11.778"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.99588 10.8519H9.00262"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.99588 13.1019H9.00262"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.22049 10.8519H6.22723"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.22049 13.1019H6.22723"
                  stroke="#9A9A9A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s1">1-2 years</SelectItem>
            <SelectItem value="s2">3-5 years</SelectItem>
            <SelectItem value="s3">6-8 years</SelectItem>
            <SelectItem value="s4">9-11 years</SelectItem>
            <SelectItem value="s5">12+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="group relative w-full">
        <label
          className={cn(
            'absolute start-1 top-0 z-10 block -translate-y-1/2 rounded-md px-2 text-xs font-medium text-[#232323] transition-colors duration-500 group-has-[:disabled]:opacity-50',
            'bg-slate-blue text-sunshine-yellow',
          )}
        >
          Email Address
        </label>
        <Input
          className={cn(
            'text-text-sm h-12 rounded-xl pe-9 transition-colors duration-500 focus:outline-none',
            'bg-foreground text-zinc-900',
          )}
          placeholder="Email"
          type="email"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <div className="group relative w-full">
            <label
              className={cn(
                'absolute start-1 top-0 z-10 block -translate-y-1/2 rounded-md px-2 text-xs font-medium text-[#232323] transition-colors duration-500 group-has-[:disabled]:opacity-50',
                'bg-slate-blue text-sunshine-yellow',
              )}
            >
              Password
            </label>
            <Input
              placeholder="Password"
              type={isVisible ? 'text' : 'password'}
              className={cn(
                'text-text-sm h-12 rounded-xl pe-9 transition-colors duration-500 focus:outline-none',
                'bg-foreground text-zinc-900',
              )}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className={cn(
              'focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-zinc-900 outline-offset-2 transition-colors hover:text-zinc-700 focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            )}
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

      <Button
        className="text-text-md bg-sunshine-yellow hover:bg-sunshine-yellow/80 text-slate-blue w-full rounded-xl"
        size="lg"
      >
        Create Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="border-sunshine-yellow w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-sunshine-yellow text-slate-blue px-2">
            Or sign up with
          </span>
        </div>
      </div>

      <Button
        className="text-text-md w-full rounded-xl bg-white text-zinc-900 hover:bg-white/80"
        size="lg"
      >
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
  )
}
