'use client'
import { LogoHorizontal } from '@dallah/design-system'
import { MultiStepForm, type FormStep } from '@dallah/components/multistep'

const formSteps: FormStep[] = [
  {
    id: 'step-1',
    title: 'Choose Type',
    description: 'Optional step description',
    items: [
      {
        id: 'item-1',
        title: 'Option 1',
        description: 'Description for option 1',
        validNextSteps: ['next-item-1'], // Optional: Filter next step options
      },
      // More items...
    ],
    level: 0,
  },
  // More steps...
]

//TODO: Figure out how to handle the mode variable
const mode = 'company'

export default function Wizard() {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-start p-4">
      <div className="bg-slate-blue absolute inset-0 z-0 h-[50dvh] w-full overflow-hidden rounded-b-2xl"></div>
      <div className="relative inset-0 top-0 z-10 h-full w-full space-y-8">
        <div className="flex items-center justify-between px-16 py-8">
          <LogoHorizontal className="w-56 fill-white" />
          <span className="text-text-xl text-foreground font-semibold">
            Hello, <span>Amr Tamer</span>
          </span>
        </div>
        <div className="mx-auto flex w-fit flex-col items-center gap-2">
          <h1 className="text-heading-md text-sunshine-yellow font-semibold">
            Select Your Focus Area
          </h1>
          <p className="text-paragraph-md text-foreground">
            Let us know your expertise to connect you with relevant projects.
          </p>
        </div>
        <div>
          <MultiStepForm
            className="bg-foreground container mx-auto max-w-4xl rounded-xl"
            formSteps={formSteps}
            onComplete={function (
              selections: Record<number | string, string>,
            ): boolean {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      </div>
    </main>
  )
}
