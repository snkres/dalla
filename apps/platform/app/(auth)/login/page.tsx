'use client'
import { useQueryState } from 'nuqs'
import { LoginRightSide } from '@components/auth/login/right-side'
import { LoginLeftSide } from '@components/auth/login/left-side'

export default function Login(): React.ReactNode {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'companies',
  })

  return (
    <main className="flex max-h-screen w-full justify-between">
      <LoginLeftSide
        mode={mode as 'companies' | 'professional'}
        setMode={(mode) => setMode(mode as 'companies' | 'professional')}
      />
      <LoginRightSide proMode={mode === 'professional' ? true : false} />
    </main>
  )
}
