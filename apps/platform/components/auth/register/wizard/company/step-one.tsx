import Image from 'next/image'
import { Button } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { Dispatch } from 'react'
import { CompanyOnboardingData } from '..'

interface StepOneProps {
  data: CompanyOnboardingData
  updateData: (data: CompanyOnboardingData) => void
  onNext: () => void
  onSkip: () => void
}


const focusAreas = [
  'Cultural Consulting',
  'Corporate Strategy',
  'Sports Management',
  'Franchising',
  'Arts & Creativity',
  'Others',
]


export function StepOne({ data, updateData, onNext, onSkip }: StepOneProps) {
  const toggleFocusArea = (area: string) => {
    const newAreas = data.focusArea.includes(area)
      ? data.focusArea.filter((a) => a !== area)
      : [...data.focusArea, area]
    updateData({ ...data, focusArea: newAreas })
  }

  return (
    <div className="flex flex-col">
      <Image
        src="/focus.svg"
        alt="Focus Area"
        width={800}
        height={800}
        className="mx-auto h-[15.296rem] w-[15.296rem]"
      />
      <div className="mt-6 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="mb-2 text-heading-sm font-semibold text-slate-blue-100">
          What is your focus area?
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Make a selection below
        </p>
      </div>
      <div className="mt-5 h-0.5 w-full bg-[#E3E7EB]" />
      <div className="mt-5 flex flex-wrap gap-4 px-6">
        {focusAreas.map((area) => (
          <Button
            key={area}
            variant={data.focusArea.includes(area) ? 'default' : 'outline'}
            onClick={() => toggleFocusArea(area)}
            className={cn(
              'h-auto justify-start !rounded-md border-[1.5px] px-5 py-[14px] text-text-lg',
              !data.focusArea.includes(area)
                ? '!bg-[#FFFDF9] border-sunshine-yellow-80 text-slate-blue-100'
                : 'bg-sunshine-yellow-100 text-sunshine-yellow-10'
            )}
          >
            {area}
          </Button>
        ))}
      </div>
      <div className="mb-6 mt-8 h-0.5 w-full bg-[#E3E7EB]" />
      <div className="flex items-center justify-center gap-4 px-6">
        <Button
          variant="ghost"
          onClick={onSkip}
          size="lg"
          className="w-full text-text-lg"
        >
          Skip
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="w-full bg-[#F4D283] text-sunshine-yellow-10 shadow-sm"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}