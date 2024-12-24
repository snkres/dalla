import { ModeToggle } from '@components/landing/features/mode-toggle'
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
        'motion-ease-spring-smooth flex flex-1 flex-col items-center justify-center gap-6 transition-all duration-200',
        mode === 'professional'
          ? 'bg-slate-blue text-sunshine-yellow'
          : 'text-slate-blue bg-white',
      )}
    >
      <LogoHorizontal
        className={cn(
          'w-56 transition-colors duration-500',
          mode === 'professional'
            ? 'fill-foreground'
            : '[&_path]:fill-slate-blue',
        )}
      />
      <div className="space-y-2">
        <h1
          className={cn(
            'text-heading-md text-center font-semibold transition-colors duration-500',
            mode === 'professional'
              ? 'text-sunshine-yellow'
              : 'text-slate-blue',
          )}
        >
          Log In to Your Dalla Account
        </h1>
        <p className="text-paragraph-md mx-auto max-w-md text-center text-[#9A9A9A]">
          Access your dashboard to connect with experts or manage your
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
