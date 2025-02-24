'use client'
import { OnboardingWizard } from '@components/auth/register/wizard'
import { useQueryState } from 'nuqs'

export default function Wizard() {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })
  return (
    <main className="bg-[#FFFDF9]  flex min-h-screen flex-col items-center justify-center p-4">
      <OnboardingWizard mode={mode as 'pro' | 'company'} />
    </main >
  )
}
