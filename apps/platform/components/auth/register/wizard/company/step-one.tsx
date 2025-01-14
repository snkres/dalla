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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          What is your focus area?
        </h2>
        <p className="text-paragraph-md text-gray-500">
          Make a selection below
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
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
              'h-auto justify-start !rounded-full px-6 py-4',
              !data.focusArea.includes(area)
                ? 'bg-transparent'
                : 'text-sunshine-yellow',
            )}
          >
            {area}
          </Button>
        ))}
      </div>
    </div>
  )
}
