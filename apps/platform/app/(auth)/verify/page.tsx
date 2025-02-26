'use client'
import { Button } from '@dallah/design-system'
import { EmailOTPDoneIcon, EmailOTPIcon } from '@components/shared/icons'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import OTPInputComponent from '@components/auth/otp/otp-input'
import { verify } from '@lib/api/auth/otp-verify'
import { Link } from 'next-view-transitions'
import { cn } from '@dallah/utils'

export default function page() {
  const [manually, setManually] = useState(true)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [mode, setMode] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail(localStorage.getItem('email') || '')
      setMode(localStorage.getItem('mode') || '')
    }
  }, [])

  const onChangeOTP = (value: string) => {
    setOtp(value)
  }
  const onCompleteOTP = async (value: string) => {
    if (value.length === 4) {
      const res = await verify({
        email: email,
        otp: value,
        userType: mode as 'company' | 'professional',
      })
      if (res.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', res.data.access_token)
        }
      }
      if (res) {
        setDone(true)
      }
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
              <span className="font-medium">
                {
                  email
                }
              </span>
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
              <OTPInputComponent onChange={onChangeOTP} value={otp} mode={
                mode as 'company' | 'professional'
              } />
              <Button
                className={
                  cn(
                    "text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg  mx-auto mt-2 flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-2 border-solid  px-[1rem] py-[10px] shadow-sm",
                    mode === 'company' ? 'bg-sunshine-yellow-100 border-[#D0B981]' : 'bg-coral-red-100 border-coral-red-90',
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
                  cn(
                    "cursor-pointer font-semibold",
                    mode === 'company' ? 'text-sunshine-yellow-100' : 'text-coral-red-100',
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
                "text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] text-text-lg mx-auto mt-2 flex w-[22.5rem] items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid stroke-[2px] px-[1rem] py-[10px] shadow-sm",
                mode === 'company' ? 'border-[#CEB67B] bg-[#F4D283] ' : 'bg-coral-red-100 border-coral-red-90',
              )
            }
            style={{
              boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
            }}
            onClick={() => setManually(true)}
            asChild
          >
            <Link href='/onboard'>
              Continue
            </Link>
          </Button>
        </>
      )}
      <Button
        className="text-slate-blue-90 text-text-md flex items-center gap-[0.375rem] font-semibold"
        variant="ghost"
        asChild
      >
        <Link href='/login'>
          <ArrowLeft className="h-5 w-5" />
          <span>Back to log in</span>
        </Link>
      </Button>
    </main>
  )
}
