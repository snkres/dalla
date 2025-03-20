import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface ApplicationHeaderProps {
  activeStep: number
  isSubmitted: boolean
}

export function ApplicationHeader({
  activeStep,
  isSubmitted,
}: ApplicationHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
      {!isSubmitted && (
        <div className="ml-auto flex items-center text-sm text-gray-500">
          <span>Step {activeStep} of 3</span>
          <span className="mx-2">•</span>
          <span>
            {activeStep === 1
              ? 'Cover letter'
              : activeStep === 2
                ? 'Pricing'
                : 'Experience & Attachments'}
          </span>
        </div>
      )}
    </div>
  )
}
