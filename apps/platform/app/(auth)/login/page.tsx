'use client'
import { useQueryState } from 'nuqs'
import { LogoHorizontal } from '@dallah/design-system'

export default function Login(): React.ReactNode {
  const [mode, setMode] = useQueryState('')

  return (
    <main className="flex max-h-screen w-full justify-between">
      <section className="flex flex-1 flex-col">
        <LogoHorizontal className="[&_path]:fill-slate-blue w-44" />
      </section>
      <section className="relative hidden h-full w-1/2 flex-1 text-white lg:flex">
        <img
          src="/company.webp"
          alt="company"
          className="h-screen w-full rounded-l-[3.5rem] object-cover brightness-75"
        />
        <div className="absolute inset-0 top-0 flex flex-col items-end justify-between">
          <h1 className="text-heading-2xl line-clamp-3 px-20 py-12 font-semibold">
            Manage your consulting in style!
          </h1>
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
    </main>
  )
}
