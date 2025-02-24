'use client'
import { useQueryState } from 'nuqs'
import { LoginRightSide } from '@components/auth/login/right-side'
import { LoginLeftSide } from '@components/auth/login/left-side'

export default function Login(): React.ReactNode {
  const [mode, setMode] = useQueryState('mode', {
    defaultValue: 'company',
  })

  return (
    <main className="flex max-h-screen w-full justify-between bg-sunshine-yellow-10">
      <LoginLeftSide
        mode={mode as 'company' | 'pro'}
        setMode={(mode) => setMode(mode as 'company' | 'pro')}
      />
      <LoginRightSide proMode={mode === 'pro' ? true : false} />
    </main>
  )
}
