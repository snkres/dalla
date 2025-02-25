'use client'
import { OnboardingWizard } from '@components/auth/register/wizard'


export default function Wizard() {
  return (
    <main className="bg-[#FFFDF9]  flex min-h-screen flex-col items-center justify-center p-4">
      <OnboardingWizard />
    </main >
  )
}
