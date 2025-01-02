'use client'
import { LogoHorizontal } from '@dallah/design-system'
import { MultiStepForm, type FormStep } from '@dallah/components/multistep'
import { OnboardingWizard } from '@components/auth/register/wizard'

//TODO: Figure out how to handle the mode variable
const mode = 'company'

export default function Wizard() {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-start p-4">
      <div className="bg-slate-blue absolute inset-0 z-0 h-[50dvh] w-full overflow-hidden rounded-b-2xl"></div>
      <div className="relative inset-0 top-0 z-10 h-full w-full space-y-8">
        <div className="flex items-center justify-between px-16 py-8">
          <LogoHorizontal className="w-56 fill-white" />
          <span className="text-text-xl text-foreground font-semibold">
            Hello, <span>Amr Tamer</span>
          </span>
        </div>
        <OnboardingWizard />
      </div>
    </main>
  )
}
