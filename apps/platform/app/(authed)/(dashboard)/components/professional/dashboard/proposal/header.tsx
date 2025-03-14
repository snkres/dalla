import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface ApplicationHeaderProps {
  onClose: () => void
  activeStep: number
  isSubmitted: boolean
}

export function ApplicationHeader({
  onClose,
  activeStep,
  isSubmitted,
}: ApplicationHeaderProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
      <button
        onClick={onClose}
        className="flex items-center text-[#234d64] transition-colors hover:text-[#234d64]/80"
      >
        <ArrowLeft className="mr-1 h-5 w-5" />
        <span className="font-medium">Back to project</span>
      </button>

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
