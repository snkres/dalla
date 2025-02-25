import { Dispatch } from "react"
import { ProOnboardingData } from ".."

export function ProWizardStepThree({ data,
  updateData,
  handleNext,
}: {
  data: ProOnboardingData
  updateData: Dispatch<
    React.SetStateAction<ProOnboardingData>
  >
  handleNext: () => void,
}) {

  return (
    <div>
      <div>

      </div>
      <h1>Step 3</h1>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}