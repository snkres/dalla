'use client'
import { useQueryState } from 'nuqs'
import { LoginRightSide } from '@components/auth/login/right-side'
import { RegisterLeftSide } from '@components/auth/register/left-side'

export default function RegisterPage(): React.ReactNode {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'companies',
  })

  return (
    <main className="bg-sunshine-yellow-10  flex max-h-screen w-full justify-between">
      <RegisterLeftSide
        mode={mode as 'companies' | 'professional'}
        setMode={(mode) => setMode(mode as 'companies' | 'professional')}
      />
      <LoginRightSide proMode={mode === 'professional' ? true : false} />
    </main>
  )
}
