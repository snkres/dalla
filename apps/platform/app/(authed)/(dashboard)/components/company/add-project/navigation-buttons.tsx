import React from 'react'
import { Button } from '@dalla/design-system'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from '@hooks/use-translation'

interface NavigationButtonsProps {
  activeStep: number
  setActiveStep: (step: number) => void
  onClose: () => void
  validateStep: (step: number) => boolean
}

export function NavigationButtons({
  activeStep,
  setActiveStep,
  onClose,
  validateStep,
}: NavigationButtonsProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject

  const handleContinue = () => {
    if (validateStep(activeStep)) {
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <div className="mt-8 flex justify-between" dir="ltr">
      {activeStep > 1 ? (
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-50"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          {t.previousButton || 'Previous'}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="text-gray-500 hover:bg-gray-50"
          onClick={onClose}
        >
          {t.cancelButton || 'Cancel'}
        </Button>
      )}

      {activeStep < 3 && (
        <Button
          className="!bg-[#63B7B7] hover:!bg-[#63B7B7]/90"
          onClick={handleContinue}
        >
          {t.continueButton || 'Continue'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
