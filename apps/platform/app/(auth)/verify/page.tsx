'use client'
import { Button } from '@dallah/design-system'
import { EmailOTPDoneIcon, EmailOTPIcon } from '@components/shared/icons'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import OTPInputComponent from '@components/auth/otp/otp-input'

export default function page() {
  const [manually, setManually] = useState(true)
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
              className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg mx-auto mt-2 flex w-[22.5rem] items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[2px] px-[1rem] py-[10px] shadow-sm"
              style={{
                boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
              }}
              onClick={() => setManually(true)}
            >
              Enter code manually
            </Button>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8">
              <OTPInputComponent onChange={onChangeOTP} value={otp} />
              <Button
                className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg bg-sunshine-yellow-100 mx-auto mt-2 flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-2 border-solid border-[#D0B981] px-[1rem] py-[10px] shadow-sm"
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
                <span className="text-sunshine-yellow-100 cursor-pointer font-semibold">
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
            className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg mx-auto mt-2 flex w-[22.5rem] items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[2px] px-[1rem] py-[10px] shadow-sm"
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
