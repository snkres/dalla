import Link from 'next/link'
import OTPInput from './otp-input'
import { Button } from '@dallah/design-system'

export function OtpComponent() {
  return (
    <div className="max-w-2xl rounded-3xl bg-white px-12 py-7 shadow-md">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold text-[#234D64]">
          Verify Your Account
        </h1>
        <p className="mt-1 text-sm text-[#9A9A9A]">
          Enter the 6-digit code we sent to your email or phone to complete your
          registration.
        </p>
      </div>
      <p className="mt-6 text-center">Enter your code</p>
      <div className="mx-auto w-fit">
        <OTPInput />
      </div>

      <div className="my-5 text-center text-sm text-[#475569]">
        Didn’t receive the code?
        <Link href="#" className="ml-1 underline">
          re-send OTP
        </Link>
      </div>

      <Button className="my-3 w-full rounded-xl bg-[#234D64] py-6 text-[#ffffff] hover:bg-[#234D64] hover:text-[#ffffff]">
        Verify Account
      </Button>
    </div>
  )
}
