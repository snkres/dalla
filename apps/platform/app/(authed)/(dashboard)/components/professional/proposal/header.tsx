import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '@hooks/use-translation'

interface ApplicationHeaderProps {
  activeStep: number
  isSubmitted: boolean
}

export function ApplicationHeader({
  activeStep,
  isSubmitted,
}: ApplicationHeaderProps) {
  const translations = useTranslation()
  const t = translations.dashboard.applyProposal

  return (
    <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
      {!isSubmitted && (
        <div className="ml-auto flex items-center text-sm text-gray-500">
          <span>
            {t.stepCounter.replace('{activeStep}', activeStep.toString())}
          </span>
          <span className="mx-2">•</span>
          <span>
            {activeStep === 1
              ? t.step1Name
              : activeStep === 2
                ? t.step2Name
                : t.step3Name}
          </span>
        </div>
      )}
    </div>
  )
}
