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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          What are your goals or needs?
        </h2>
        <p className="text-gray-500">Make a selection below</p>
      </div>
      <div className="flex flex-wrap gap-4">
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
              'h-auto justify-start !rounded-full px-6 py-4',
              !data.workPreference.includes(pref)
                ? 'bg-transparent'
                : 'text-sunshine-yellow',
            )}
          >
            {pref}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Target Industries</label>
        <Select
          value={data.targetIndustry}
          onValueChange={(value) => updateData('targetIndustry', value)}
        >
          <SelectTrigger className="w-full bg-transparent">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cultural">Cultural Consulting</SelectItem>
            <SelectItem value="corporate">Corporate Strategy</SelectItem>
            <SelectItem value="sports">Sports Management</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
