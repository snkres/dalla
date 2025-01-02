'use client'
import Image from 'next/image'
import { OtpComponent } from '../../../../components/auth/register/otp'
import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'

const mode = 'companies'

export default function page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden bg-[#1a3244]">
        <Image
          src={
            mode === 'companies'
              ? '/RegisterCompany.webp'
              : '/RegisterProfessional.webp'
          }
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
              'motion-ease-spring-bouncy z-50 w-56 transition-colors duration-500',
              mode === 'companies'
                ? 'fill-foreground'
                : '[&_path]:fill-slate-blue',
            )}
          />
        </div>
        <OtpComponent />
      </div>
    </main>
  )
}
