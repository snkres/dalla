import Image from 'next/image'
import { Button } from '@dallah/design-system'
import { cn } from '@dallah/utils'

export function CompanyWizardStepOne({
  data,
  updateData,
}: {
  data: { focusArea: string[] }
  updateData: (field: keyof { focusArea: string[] }, value: any) => void
}) {
  return (
    <div className="flex flex-col">
      <Image
        src='/focus.svg'
        alt='Focus Area'
        width={800}
        height={800}
        className='w-[15.296rem] h-[15.296rem] mx-auto'
      />
      <div className="text-center flex flex-col items-center gap-1 px-6 mt-6">
        <h2 className="text-heading-sm mb-2 font-semibold text-slate-blue-100">
          What is your focus area?
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Make a selection below
        </p>
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] mt-5'>
      </div>
      <div className="flex flex-wrap gap-4 px-6 mt-5">
        {[
          'Cultural Consulting',
          'Corporate Strategy',
          'Sports Management',
          'Franchising',
          'Arts & Creativity',
          'Others',
        ].map((area) => (
          <Button
            key={area}
            variant={data.focusArea.includes(area) ? 'default' : 'outline'}
            onClick={() => {
              const newAreas = data.focusArea.includes(area)
                ? data.focusArea.filter((a) => a !== area)
                : [...data.focusArea, area]
              updateData('focusArea', newAreas)
            }}
            className={cn(
              'h-auto justify-start !rounded-md px-5  py-[14px] !border-[1.5px] text-text-lg',
              !data.focusArea.includes(area)
                ? '!bg-[#FFFDF9] text-slate-blue-100 border-sunshine-yellow-80'
                : 'text-sunshine-yellow-10 bg-sunshine-yellow-100',
            )}
          >
            {area}
          </Button>
        ))}
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] mt-8 mb-6'>
      </div>
    </div>
  )
}
