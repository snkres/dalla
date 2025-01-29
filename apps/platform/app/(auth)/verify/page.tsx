'use client'
import { Button } from '@dallah/design-system'
import { EmailOTPDoneIcon, EmailOTPIcon } from '@components/shared/icons'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import OTPInputComponent from '@components/auth/otp/otp-input'
import { cn } from '@dallah/utils'

const mode = 'professional' as 'companies' | 'professional'

export default function page() {
  const [manually, setManually] = useState(false)
  const [otp, setOtp] = useState('')
  const [done, setDone] = useState(false)
  const onChangeOTP = (value: string) => {
    setOtp(value)
  }
  const onCompleteOTP = (value: string) => {
    if (value.length === 4) {
      setDone(true)
    }
  }
  return (
    <main className="bg-sunshine-yellow-10 flex min-h-screen w-full flex-col items-center justify-center gap-6">
      {!done ? (
        <>
          <EmailOTPIcon />
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-slate-blue-100 text-heading-xl font-semibold">
              Check your email
            </h1>
            <p className="text-slate-blue-50 text-text-lg flex flex-col items-center justify-center">
              <span> We sent a verification link to</span>
              <span className="font-medium"> salmamahdy234@gmail.com</span>
            </p>
          </div>
          {!manually ? (
            <Button
              className={
                cn(
                  "!w-[22.5rem] mx-auto text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[0.1px] px-[1rem] py-[10px] shadow-sm",
                  mode === 'professional'
                    ? 'bg-coral-red-100 border-[#9F5055] hover:bg-coral-red-80' : ''

                )
              }
              style={{
                boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
              }}
              onClick={() => setManually(true)}
            >
              Enter code manually
            </Button>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8">
              <OTPInputComponent onChange={onChangeOTP} value={otp} mode={mode} />
              <Button
                className={
                  cn(
                    "text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[0.1px] px-[1rem] py-[10px] shadow-sm",
                    mode === 'professional'
                      ? 'bg-coral-red-100 border-[#9F5055] hover:bg-coral-red-80' : ''

                  )
                }
                style={{
                  boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
                }}
                onClick={() => onCompleteOTP(otp)}
              >
                Verify email
              </Button>
              <p className="text-text-md flex items-center gap-1">
                <span className="text-slate-blue-50">
                  Didn’t receive the email?
                </span>
                <span className={
                  cn(" cursor-pointer font-semibold",
                    mode === 'professional' ? 'text-coral-red-100' : 'text-sunshine-yellow-100'
                  )
                }>
                  Click to resend
                </span>
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <EmailOTPDoneIcon />
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-slate-blue-100 text-heading-xl font-semibold">
              Email verified
            </h1>
            <p className="text-slate-blue-50 text-text-lg flex flex-col items-center justify-center">
              <span> Your password has been successfully reset.</span>
              <span> Click below to log in magically.</span>
            </p>
          </div>
          <Button
            className={
              cn(
                "!w-[22.5rem] mx-auto text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[0.1px] px-[1rem] py-[10px] shadow-sm",
                mode === 'professional'
                  ? 'bg-coral-red-100 border-[#9F5055] hover:bg-coral-red-80' : ''

              )
            }
            style={{
              boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
            }}
            onClick={() => setManually(true)}
          >
            Continue
          </Button>
        </>
      )}
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
