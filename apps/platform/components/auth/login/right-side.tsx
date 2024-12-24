import { cn } from '@dallah/utils'

export function LoginRightSide({ proMode }: { proMode?: boolean }) {
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth relative flex flex-1 items-center justify-center transition-all duration-200',
        proMode ? 'bg-slate-blue' : 'bg-white',
      )}
    >
      <img
        src={proMode ? '/pros.webp' : '/company.webp'}
        alt="company"
        className="h-screen w-full rounded-l-[3.5rem] object-cover brightness-75"
      />
      <div className="absolute inset-0 top-0 flex flex-col items-end justify-between">
        {proMode ? (
          <h1
            className={cn(
              'text-heading-2xl text-slate-blue motion-ease-spring-bounciest line-clamp-3 px-20 py-12 font-semibold transition-all duration-500',
            )}
          >
            Simplify Your Consulting Journey!
          </h1>
        ) : (
          <h1 className="text-heading-2xl motion-preset-fade text-foreground line-clamp-3 px-20 py-12 font-semibold transition-all duration-500">
            Manage your consulting in style!
          </h1>
        )}

        <div className="relative bottom-0 right-0 w-auto max-w-[60%]">
          <img
            src="/Dashboard.webp"
            alt="Dashboard Preview"
            className="z-10 h-auto w-full object-cover"
          />
          <img
            src="/Card.webp"
            alt="Card Preview"
            className="absolute -left-28 -top-20 z-20 h-auto max-w-[80%] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
