'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { Modal } from '@dalla/design-system'
import { useAtom } from 'jotai'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'
import { createProject, CreateProjectReq } from '@lib/api/company/projects'
import { StepOne } from './step-one'
import { StepTwo } from './step-two'
import { StepThree } from './step-three'
import { SuccessScreen } from './success-screen'
import { NavigationButtons } from './navigation-buttons'
import { ProjectSidebar } from './sidebar'
import { ProjectHeader } from './header'

export function AddProject({
  onClose,
  onProjectCreated,
}: {
  onClose: () => void
  onProjectCreated?: () => void
}) {
  const t = useTranslation()
  const { locale } = useLocale()
  const { toast } = useToast()
  const [activeStep, setActiveStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    jobTitle: '',
    description: '',
    scope: '',
    deliverables: '',
    skills: [] as string[],
    media: [] as string[],
    meta: {
      budget: '',
      timelineValue: '1',
      timelineUnit: 'months',
      priority: 'medium',
    },
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target

    if (id.includes('meta.')) {
      const metaField = id.split('.')[1]
      setFormData({
        ...formData,
        meta: {
          ...formData.meta,
          [metaField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [id]: value,
      })
    }
  }

  const handleTimelineUnitChange = (value: string) => {
    setFormData({
      ...formData,
      meta: {
        ...formData.meta,
        timelineUnit: value,
      },
    })
  }

  const handleSkillsChange = (skills: string[]) => {
    setFormData({
      ...formData,
      skills,
    })
  }

  const handleMediaChange = (media: string[]) => {
    setFormData({
      ...formData,
      media,
    })
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.title.trim() !== '' && formData.description.trim() !== ''
        )
      case 2:
        return formData.skills.length > 0 && formData.meta.budget !== ''
      case 3:
        return true // Media is optional but we could add validation if needed
      default:
        return false
    }
  }

  const completionPercentage = useMemo(() => {
    let total = 0
    let completed = 0

    // Step 1 - Basic Info (40%)
    total += 40
    completed += formData.title ? 15 : 0
    completed += formData.description ? 15 : 0
    completed += formData.scope ? 5 : 0
    completed += formData.deliverables ? 5 : 0

    // Step 2 - Skills and Budget (40%)
    total += 40
    completed += formData.skills.length > 0 ? 20 : 0
    completed += formData.meta.budget ? 10 : 0
    completed += formData.meta.timelineValue ? 10 : 0

    // Step 3 - Media (20%)
    total += 20
    completed += formData.media.length > 0 ? 20 : 0

    return Math.round((completed / total) * 100)
  }, [formData])

  const canSubmit = useMemo(() => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.skills.length > 0 &&
      formData.meta.budget !== '' &&
      activeStep === 3
    )
  }, [formData, activeStep])

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields before submitting.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const timeline = `${formData.meta.timelineValue} ${formData.meta.timelineUnit}`

      const projectData: CreateProjectReq = {
        title: formData.title,
        jobTitle: formData.jobTitle || formData.title,
        description: formData.description,
        scope: formData.scope || formData.description,
        deliverables: formData.deliverables || 'To be determined',
        skills: formData.skills,
        media: formData.media,
        meta: {
          budget: Number(formData.meta.budget),
          duration: timeline,
        },
      }

      const response = await createProject(projectData)

      setIsSubmitted(true)

      toast({
        title: t.dashboard.companyComponents.addProject.toastSuccessTitle,
        description:
          t.dashboard.companyComponents.addProject.toastSuccessDescription,
      })

      if (onProjectCreated) {
        setTimeout(() => {
          onProjectCreated()
        }, 1500)
      }
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: t.dashboard.companyComponents.addProject.toastErrorTitle,
        description:
          t.dashboard.companyComponents.addProject.toastErrorDescription,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [canSubmit, formData, toast, t, onProjectCreated])

  return (
    <Modal isOpen onClose={onClose} title="" width="xl" className="max-w-7xl">
      <div className="flex h-full flex-col md:flex-row">
        {!isSubmitted ? (
          <>
            <div
              className="flex-1 overflow-y-auto border-b border-gray-100 md:border-b-0 md:border-r"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              <ProjectHeader activeStep={activeStep} />

              <div className="h-fit p-6">
                {activeStep === 1 && (
                  <StepOne
                    formData={formData}
                    handleInputChange={handleInputChange}
                  />
                )}

                {activeStep === 2 && (
                  <StepTwo
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSkillsChange={handleSkillsChange}
                    handleTimelineUnitChange={handleTimelineUnitChange}
                  />
                )}

                {activeStep === 3 && (
                  <StepThree
                    formData={formData}
                    handleMediaChange={handleMediaChange}
                  />
                )}

                <NavigationButtons
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  onClose={onClose}
                  validateStep={validateStep}
                />
              </div>
            </div>

            <div className="h-fit overflow-hidden bg-red-900">
              <ProjectSidebar
                formData={formData}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                completionPercentage={completionPercentage}
                isSubmitting={isSubmitting}
                canSubmit={canSubmit}
                handleSubmit={handleSubmit}
              />
            </div>
          </>
        ) : (
          <SuccessScreen
            projectTitle={formData.title}
            onClose={onClose}
            isRtl={locale === 'ar'}
          />
        )}
      </div>
    </Modal>
  )
}
