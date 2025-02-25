import Image from 'next/image'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { CompanyOnboardingData } from '..'
import { Dispatch } from 'react'

interface StepTwoProps {
  data: CompanyOnboardingData
  updateData: (data: CompanyOnboardingData) => void
  onNext: () => void
  onSkip: () => void
}

const workPreferences = [
  'Remote Projects',
  'On-Site Work',
  'Short-Term Projects',
  'Long-Term Collaborations',
]

export function StepTwo({ data, updateData, onNext, onSkip }: StepTwoProps) {
  const toggleWorkPreference = (pref: string) => {
    const newPrefs = data.workPreference.includes(pref)
      ? data.workPreference.filter((p) => p !== pref)
      : [...data.workPreference, pref]
    updateData({ ...data, workPreference: newPrefs })
  }

  return (
    <div className="flex flex-col">
      <Image
        src="/goals.svg"
        alt="Goals and Needs"
        width={800}
        height={800}
        className="mx-auto h-12 w-12"
      />
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="mb-2 text-heading-sm font-semibold text-[#1F4D5D]">
          What are your goals or needs?
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Make a selection below
        </p>
      </div>
      <div className="mt-5 h-0.5 w-full bg-[#E3E7EB]" />
      <div className="mt-5 flex flex-wrap gap-4 px-6">
        {workPreferences.map((pref) => (
          <Button
            key={pref}
            variant={data.workPreference.includes(pref) ? 'default' : 'outline'}
            onClick={() => toggleWorkPreference(pref)}
            className={cn(
              'h-auto justify-start !rounded-md border-[1.5px] px-5 py-[14px] text-text-lg',
              !data.workPreference.includes(pref)
                ? '!bg-[#FFFDF9] border-sunshine-yellow-80 text-slate-blue-100'
                : 'bg-sunshine-yellow-100 text-sunshine-yellow-10'
            )}
          >
            {pref}
          </Button>
        ))}
      </div>
      <div className="mt-5 space-y-2 px-6">
        <label className="font-inter text-text-md font-medium">
          Target Industries
        </label>
        <Select
          value={data.targetIndustry}
          onValueChange={(value) => updateData({ ...data, targetIndustry: value })}
        >
          <SelectTrigger className="w-full !bg-[#FFFDF9] !text-text-lg border-slate-blue-20 !font-normal shadow-sm">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cultural">Cultural Consulting</SelectItem>
            <SelectItem value="corporate">Corporate Strategy</SelectItem>
            <SelectItem value="sports">Sports Management</SelectItem>
          </SelectContent>
        </Select>
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