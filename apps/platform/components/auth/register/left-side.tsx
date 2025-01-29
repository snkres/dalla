import { ModeToggle } from '@components/shared/mode-toggle'
import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { RegisterForm } from './form'


export function RegisterLeftSide({
  mode,
  setMode,
}: {
  mode: 'companies' | 'professional'
  setMode: (mode: 'companies' | 'professional') => void
}) {
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth flex flex-1 flex-col items-center justify-center gap-8 transition-all duration-200 bg-[#FFFDF9]',
        // mode === 'professional'
        //   ? 'bg-slate-blue text-sunshine-yellow'
        //   : 'text-slate-blue bg-white',
      )}
    >
      <LogoHorizontal
        className={
          cn(
            mode === 'companies' ? '[&_path]:fill-sunshine-yellow-100' : '[&_path]:fill-coral-red-100',
          )
        }
      />
      <div className="flex max-w-[30.125rem] flex-col items-center justify-center gap-3">
        <h1
          className={cn(
            'font-sora text-center text-[2.0625rem] font-semibold leading-[130%] text-[#2D4C5C]',
            // mode === 'professional'
            // ? 'text-sunshine-yellow'
            'text-slate-blue-100',
          )}
        >
          Join Dalla Today!
        </h1>
        <p className="font-inter mx-auto self-stretch text-center text-[1rem] leading-[150%] tracking-[-0.48px] text-[#7FADBE]">
          Whether you’re a professional or a company, Dalla connects you to
          endless opportunities in consulting and collaboration.
        </p>
      </div>
      <ModeToggle
        mode={mode as 'companies' | 'professional'}
        onModeChange={(mode) => setMode(mode as 'companies' | 'professional')}
      />
      <RegisterForm mode={mode} />
    </section>
  )
}
