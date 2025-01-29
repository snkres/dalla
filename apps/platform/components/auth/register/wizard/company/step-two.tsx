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

export function CompanyWizardStepTwo({
  data,
  updateData,
}: {
  data: { workPreference: string[]; targetIndustry: string }
  updateData: (
    field: keyof { workPreference: string[]; targetIndustry: string },
    value: any,
  ) => void
}) {
  return (
    <div className="flex flex-col">
      <Image
        src='/goals.svg'
        alt='Goals and Needs'
        width={800}
        height={800}
        className='w-12 h-12 mx-auto'
      />
      <div className="text-center flex flex-col items-center gap-1 px-6 mt-4">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          What are your goals or needs?
        </h2>
        <p className="text-paragraph-md text-slate-blue-90">
          Make a selection below</p>
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] mt-5'>
      </div>
      <div className="flex flex-wrap gap-4 px-6 mt-5">
        {[
          'Remote Projects',
          'On-Site Work',
          'Short-Term Projects',
          'Long-Term Collaborations',
        ].map((pref) => (
          <Button
            key={pref}
            variant={data.workPreference.includes(pref) ? 'default' : 'outline'}
            onClick={() => {
              const newPrefs = data.workPreference.includes(pref)
                ? data.workPreference.filter((p) => p !== pref)
                : [...data.workPreference, pref]
              updateData('workPreference', newPrefs)
            }}
            className={cn(
              'h-auto justify-start !rounded-md px-5  py-[14px] !border-[1.5px] text-text-lg',
              !data.workPreference.includes(pref)
                ? '!bg-[#FFFDF9] text-slate-blue-100 border-sunshine-yellow-80'
                : 'text-sunshine-yellow-10 bg-sunshine-yellow-100',
            )}
          >
            {pref}
          </Button>
        ))}
      </div>
      <div className="space-y-2 px-6 mt-5">
        <label className="text-text-md font-medium font-inter">Target Industries</label>
        <Select
          value={data.targetIndustry}
          onValueChange={(value) => updateData('targetIndustry', value)}
        >
          <SelectTrigger className="w-full  !text-text-lg !bg-[#FFFDF9] border-slate-blue-20 !font-normal shadow-sm">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cultural">Cultural Consulting</SelectItem>
            <SelectItem value="corporate">Corporate Strategy</SelectItem>
            <SelectItem value="sports">Sports Management</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='h-0.5 w-full bg-[#E3E7EB] mt-8 mb-6'>
      </div>
    </div>
  )
}
