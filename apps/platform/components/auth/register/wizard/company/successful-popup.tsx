import { Button } from '@dallah/design-system'
import { Link } from 'next-view-transitions'

export function SuccessfulPopUp() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-3xl bg-white px-8 py-8 bg-sunshine-yellow-10">
      <svg className="h-12 w-h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#FCF9F4" />
        <path d="M19.5 24L22.5 27L28.5 21M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z" stroke="#F4D283" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="text-text-xl  font-bold text-[#234D64]">
        Profile Setup Complete!
      </h2>
      <p className="text-paragraph-md text-center text-slate-blue-100">
        Your profile is ready! Start exploring professionals now.
      </p>
      <Button
        asChild
        className=" text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)]  flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[0.1px] px-[1rem] py-[10px] shadow-sm mt-2 text-sunshine-yellow-10"
        style={{
          boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
        }}>

        <Link className="text-text-lg font-semibold" href={'/'}>Explore Projects</Link>
      </Button>
    </div>
  )
}
