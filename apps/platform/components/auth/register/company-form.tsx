import { Button, Input } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  // industry: z.string(),
  // businessType: z.string(),
  // companySize: z.string(),
  // companyWebsite: z.string().url('Invalid URL'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type FormData = z.infer<typeof schema>

export function CompanyRegisterForm() {
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
      className="max-h-m mx-auto flex w-full max-w-[30.125rem] flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Company Name <span className="text-sunshine-yellow-100">*</span>
        </label>
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="Enter your company name"
          type="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      {/* <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Company Website <span className="text-sunshine-yellow-100">*</span>
        </label>
        <div className="flex">
          <div className="text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-s-[0.5rem] border-[0.0625rem] border-e-0 border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] text-[#475467] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none">
            https://
          </div>
          <Input
            className="text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-e-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none"
            placeholder="www.Dallaapp.com"
            type="text"
            {...register('companyWebsite')}
          />
        </div>

        {errors.companyWebsite && (
          <p className="mt-2 text-xs text-red-500">
            {errors.companyWebsite.message}
          </p>
        )}
      </div> */}
      {/* 
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full flex-col gap-[0.375rem]">
          <label
            className={cn(
              'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
            )}
          >
            Industry
          </label>
          <Input
            className="rounded-md"
            placeholder="Industry"
            type="industry"
            {...register('industry')}
          />
          {errors.industry && (
            <p className="mt-2 text-xs text-red-500">
              {errors.industry.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-[0.375rem]">
          <label className="text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]">
            Business Type
          </label>
          <Input
            className="rounded-md"
            placeholder="e.g. startup"
            type="businessType"
            {...register('businessType')}
          />
          {errors.businessType && (
            <p className="mt-2 text-xs text-red-500">
              {errors.businessType.message}
            </p>
          )}
        </div>
      </div> */}

      {/* <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Company Size
        </label>
        <Input
          className={cn(
            'text-text-lg flex h-12 items-center gap-[0.5rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] bg-[#FFFDF9] px-[0.875rem] py-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors duration-500 focus:outline-none',
          )}
          placeholder="Enter your company size"
          type="name"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div> */}
      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Email <span className="text-sunshine-yellow-100">*</span>
        </label>
        <div className="relative">
          <Input className={cn('rounded-md peer ps-10')}
            placeholder="Email"
            type="email"
            {...register('email')} />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <svg className='w-5 h-5' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 5.83301L8.47109 10.5959C9.02207 10.9816 9.29756 11.1744 9.59721 11.2491C9.8619 11.3151 10.1387 11.3151 10.4034 11.2491C10.7031 11.1744 10.9786 10.9816 11.5296 10.5959L18.3337 5.83301M5.66699 16.6663H14.3337C15.7338 16.6663 16.4339 16.6663 16.9686 16.3939C17.439 16.1542 17.8215 15.7717 18.0612 15.3013C18.3337 14.7665 18.3337 14.0665 18.3337 12.6663V7.33301C18.3337 5.93288 18.3337 5.23281 18.0612 4.69803C17.8215 4.22763 17.439 3.84517 16.9686 3.60549C16.4339 3.33301 15.7338 3.33301 14.3337 3.33301H5.66699C4.26686 3.33301 3.5668 3.33301 3.03202 3.60549C2.56161 3.84517 2.17916 4.22763 1.93948 4.69803C1.66699 5.23281 1.66699 5.93288 1.66699 7.33301V12.6663C1.66699 14.0665 1.66699 14.7665 1.93948 15.3013C2.17916 15.7717 2.56161 16.1542 3.03202 16.3939C3.5668 16.6663 4.26686 16.6663 5.66699 16.6663Z" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </div>
        </div>
        {errors.email && (
          <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-[0.375rem]">
        <label
          className={cn(
            'text-[0.875rem] font-medium leading-[1.25rem] text-[#344054]',
          )}
        >
          Password <span className="text-sunshine-yellow-100">*</span>
        </label>
        <div className="relative">
          <Input
            {...register('password')}
            className="rounded-md pe-9"
            placeholder="Create a password"
            type={isVisible ? 'text' : 'password'}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
        className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] mt-6 flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[2px] px-[1rem] py-[10px] shadow-sm"
        type="submit"
        style={{
          boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
        }}
      // variant={mode === 'professional' ? 'secondary' : 'default'}
      >
        Create Account
      </Button>

      <div className="flex items-center gap-1">
        <div className="h-0.5 w-full flex-1 bg-[#D9D9D9]"></div>
        <p
          className={cn(
            'text-text-sm rounded-md px-1 py-0.5 transition-colors duration-500',
            'text-[#9A9A9A]',
          )}
        >
          or
        </p>
        <div className="h-0.5 w-full flex-1 bg-[#D9D9D9]"></div>
      </div>
      <Button
        style={{
          boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
        }}
        variant="outline"
        className="shadow-[0px_0px_0px_1px_rgba(16,24,40,0.18))_inset,0px_-2px_0px_0px_var(--Colors-Effects-Shadows-shadow-skeumorphic-inner,rgba(16,24,40,0.05))_inset,0px_1px_2px_0px_var(--Colors-Effects-Shadows-shadow-xs,rgba(16,24,40,0.05)] flex items-center justify-center gap-[0.75rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] !bg-[#FFFDF9] bg-transparent px-[1rem] py-[10px] !shadow-[rgba(16, 24, 40, 0.18)]"
      >
        <svg
          className="h-6 w-6"
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
        <span>Sign up with Google</span>
      </Button>
      <Button
        style={{
          boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
        }}
        variant="outline"
        className="shadow-[0px_0px_0px_1px_rgba(16,24,40,0.18))_inset,0px_-2px_0px_0px_var(--Colors-Effects-Shadows-shadow-skeumorphic-inner,rgba(16,24,40,0.05))_inset,0px_1px_2px_0px_var(--Colors-Effects-Shadows-shadow-xs,rgba(16,24,40,0.05)] flex items-center justify-center gap-[0.75rem] self-stretch rounded-[0.5rem] border-[0.0625rem] border-solid border-[#D0D5DD] !bg-[#FFFDF9] bg-transparent px-[1rem] py-[10px]"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.7283 0H2.27167C1.80179 0 1.35116 0.186657 1.01891 0.518909C0.686657 0.851161 0.5 1.30179 0.5 1.77167V22.2283C0.5 22.6982 0.686657 23.1488 1.01891 23.4811C1.35116 23.8133 1.80179 24 2.27167 24H22.7283C23.1982 24 23.6488 23.8133 23.9811 23.4811C24.3133 23.1488 24.5 22.6982 24.5 22.2283V1.77167C24.5 1.30179 24.3133 0.851161 23.9811 0.518909C23.6488 0.186657 23.1982 0 22.7283 0ZM7.65333 20.445H4.045V8.98333H7.65333V20.445ZM5.84667 7.395C5.43736 7.3927 5.03792 7.2692 4.69873 7.04009C4.35955 6.81098 4.09584 6.48653 3.94088 6.10769C3.78591 5.72885 3.74665 5.31259 3.82803 4.91145C3.90941 4.51032 4.1078 4.14228 4.39816 3.85378C4.68851 3.56529 5.05782 3.36927 5.45947 3.29046C5.86112 3.21165 6.27711 3.25359 6.65495 3.41099C7.03279 3.56838 7.35554 3.83417 7.58247 4.17481C7.80939 4.51546 7.93032 4.91569 7.93 5.325C7.93386 5.59903 7.88251 5.87104 7.77901 6.1248C7.67551 6.37857 7.52198 6.6089 7.32757 6.80207C7.13316 6.99523 6.90185 7.14728 6.64742 7.24915C6.393 7.35102 6.12067 7.40062 5.84667 7.395ZM20.9533 20.455H17.3467V14.1933C17.3467 12.3467 16.5617 11.7767 15.5483 11.7767C14.4783 11.7767 13.4283 12.5833 13.4283 14.24V20.455H9.82V8.99167H13.29V10.58H13.3367C13.685 9.875 14.905 8.67 16.7667 8.67C18.78 8.67 20.955 9.865 20.955 13.365L20.9533 20.455Z"
            fill="#0A66C2"
          />
        </svg>
        <span>Sign up with LinkedIn</span>
      </Button>
    </form>
  )
}
