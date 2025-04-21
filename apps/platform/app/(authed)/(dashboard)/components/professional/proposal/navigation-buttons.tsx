import React from 'react'
import { Button } from '@dalla/design-system'
import { NavigationButtonsProps } from '@lib/types/steps'
import { useTranslation } from '@hooks/use-translation'

export function NavigationButtons({
  activeStep,
  setActiveStep,
  onClose,
}: NavigationButtonsProps) {
  const translations = useTranslation()
  const t = translations.dashboard.applyProposal

  return (
    <div className="mt-4 flex justify-start space-x-3">
      {activeStep > 1 ? (
        <Button
          variant="ghost"
          className="text-[#1D8489] hover:bg-[#1D8489]/10"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          {t.previousButton}
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="text-gray-500 hover:bg-gray-100"
          onClick={onClose}
        >
          {t.cancelButton}
        </Button>
      )}

      {activeStep < 3 && (
        <Button
          className="!bg-[#1D8489] hover:!bg-[#1D8489]/90"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          {t.continueButton}
        </Button>
      )}
    </div>
  )
}
