import { Button } from '@dallah/design-system'

export function CTA() {
  return (
    <div className="bg-sunshine-yellow my-[77px] flex w-full flex-col items-center justify-around gap-4 px-[7.5rem] py-14 md:flex-row">
      <h3 className="text-slate-blue text-center text-[2.5rem] font-semibold md:text-left">
        A High-Quality Solution Tailored <br /> for Businesses Across MENA
      </h3>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Button
          className="border-slate-blue bg-slate-blue text-sunshine-yellow text-text-lg h-[56px] !rounded-full !px-10 !py-6 font-bold"
          size="lg"
        >
          Get Started
        </Button>
        <Button
          className="border-slate-blue text-slate-blue text-text-lg hover:text-sunshine-yellow hover:bg-slate-blue h-[56px] !rounded-full border-2 bg-transparent !px-10 !py-6 font-bold"
          variant="outline"
          size="lg"
        >
          Learn More
        </Button>
      </div>
    </div>
  )
}
