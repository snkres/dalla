import { Button } from '@dallah/design-system'
import { Link } from 'next-view-transitions'

export function CTA() {
  return (
    <div className="bg-sunshine-yellow my-20 flex w-full flex-col items-center justify-around px-14 py-14 md:flex-row xl:px-44">
      <h3 className="text-slate-blue text-heading-sm lg:text-heading-md xl:text-heading-lg text-center font-semibold md:text-left">
        A High-Quality Solution Tailored for Businesses Across MENA
      </h3>
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <Button
          className="border-slate-blue bg-slate-blue text-sunshine-yellow text-text-md !rounded-full !px-10 !py-6"
          size="lg"
          asChild
        >
          <Link href="/login">Get Started</Link>
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
