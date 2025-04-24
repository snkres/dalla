import React from 'react'
import { cn } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'

interface ProjectHeaderProps {
  activeStep: number
}

export function ProjectHeader({ activeStep }: ProjectHeaderProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject

  const steps = [
    { id: 1, title: t.stepOneTitle || 'Project Details' },
    { id: 2, title: t.stepTwoTitle || 'Skills & Budget' },
    { id: 3, title: t.stepThreeTitle || 'Media & Documents' },
  ]

  return (
    <div className="border-b border-gray-100 bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        {t.modalTitle || 'Create New Project'}
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                activeStep >= step.id
                  ? 'bg-[#63B7B7] text-white'
                  : 'bg-gray-100 text-gray-500',
              )}
            >
              {step.id}
            </div>
            <span
              className={cn(
                'text-sm font-medium',
                activeStep >= step.id ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="mx-2 h-0.5 w-6 bg-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
