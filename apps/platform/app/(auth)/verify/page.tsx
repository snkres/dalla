'use client'
import Image from 'next/image'

import { Button, LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { EmailOTPIcon } from '@components/shared/icons'
import { ArrowLeft } from 'lucide-react'

const mode = 'companies'

export default function page() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
      <EmailOTPIcon />
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-slate-blue-100 text-heading-xl font-semibold">
          Check your email
        </h1>
        <p className="text-slate-blue-50 text-text-lg flex flex-col">
          <span> We sent a verification link to</span>
          <span className="font-medium"> salmamahdy234@gmail.com</span>
        </p>
      </div>
      <Button
        className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg mx-auto mt-2 flex w-[22.5rem] items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[2px] px-[1rem] py-[10px] shadow-sm"
        style={{
          boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
        }}
      >
        Enter code manually
      </Button>
      <Button
        className="text-slate-blue-90 text-text-md flex items-center gap-[0.375rem] font-semibold"
        variant="ghost"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to log in</span>
      </Button>
    </main>
  )
}
