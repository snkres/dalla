'use client'
import { LogoHorizontal } from '@dallah/design-system'
import { OnboardingWizard } from '@components/auth/register/wizard'

//TODO: Figure out how to handle the mode variable
const mode = 'company'

export default function Wizard() {
  return (
    <main className="bg-[#FFFDF9]  flex min-h-screen flex-col items-center justify-center p-4">
      <OnboardingWizard />
    </main >
  )
}
