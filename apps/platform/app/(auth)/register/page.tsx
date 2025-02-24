'use client'
import { useQueryState } from 'nuqs'
import { LoginRightSide } from '@components/auth/login/right-side'
import { RegisterLeftSide } from '@components/auth/register/left-side'

export default function RegisterPage(): React.ReactNode {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })

  return (
    <main className="bg-sunshine-yellow-10  flex max-h-screen w-full justify-between">
      <RegisterLeftSide
        mode={mode as 'companies' | 'pro'}
        setMode={(mode) => setMode(mode as 'companies' | 'pro')}
      />
      <LoginRightSide proMode={mode === 'pro' ? true : false} />
    </main>
  )
}
