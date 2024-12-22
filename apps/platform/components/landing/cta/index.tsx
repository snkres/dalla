import { Button } from '@dallah/design-system'

export function CTA() {
  return (
    <div className="bg-sunshine-yellow my-20 flex h-80 w-full flex-col items-center justify-around px-20 md:flex-row">
      <h3 className="text-slate-blue text-heading-lg text-center font-semibold md:max-w-[850px] md:text-left">
        A High-Quality Solution Tailored for Businesses Across MENA
      </h3>
      <div className="flex flex-col items-center justify-between gap-[30px] md:flex-row">
        <Button
          className="border-slate-blue bg-slate-blue text-sunshine-yellow text-text-md !rounded-full !px-10 !py-6"
          size="lg"
        >
          Get Started
        </Button>
        <Button
          className="border-slate-blue text-slate-blue text-text-md hover:text-sunshine-yellow hover:bg-slate-blue !rounded-full bg-transparent !px-10 !py-6"
          variant="outline"
          size="lg"
        >
          Learn More
        </Button>
      </div>
    </div>
  )
}
