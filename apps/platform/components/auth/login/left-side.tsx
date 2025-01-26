import { ModeToggle } from '@components/shared/mode-toggle'
import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { LoginForm } from './form'

export function LoginLeftSide({
  mode,
  setMode,
}: {
  mode: 'companies' | 'professional'
  setMode: (mode: 'companies' | 'professional') => void
}) {
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth flex flex-1 flex-col items-center justify-center gap-8 transition-all duration-200',
        mode === 'professional'
          ? 'bg-slate-blue text-sunshine-yellow'
          : 'text-slate-blue bg-white',
      )}
    >
      <LogoHorizontal
        className='[&_path]:fill-sunshine-yellow-100'
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <h1
          className={cn(
            'font-sora text-center text-[2.0625rem] font-semibold leading-[130%] text-[#2D4C5C]',
            mode === 'professional'
              ? 'text-sunshine-yellow'
              : 'text-slate-blue-100',
          )}
        >
          Log In to Your Dalla Account
        </h1>
        <p className="font-inter mx-auto self-stretch text-center text-[1rem] leading-[150%] tracking-[-0.48px] text-[#7FADBE]">
          Access your dashboard to connect with experts or manage your <br />
          consulting projects.
        </p>
      </div>
      <ModeToggle
        mode={mode as 'companies' | 'professional'}
        onModeChange={(mode) => setMode(mode as 'companies' | 'professional')}
      />
      <LoginForm mode={mode} />
    </section>
  )
}
