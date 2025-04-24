import React from 'react'
import { Button } from '@dalla/design-system'
import { Send, FileText, Briefcase, Image as ImageIcon } from 'lucide-react'
import { cn } from '@dalla/utils'
import { motion } from 'motion/react'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProjectSidebarProps {
  formData: {
    title: string
    description: string
    skills: string[]
    meta: {
      budget: string
    }
    media: string[]
  }
  activeStep: number
  setActiveStep: (step: number) => void
  completionPercentage: number
  isSubmitting: boolean
  canSubmit: boolean
  handleSubmit: () => void
}

export function ProjectSidebar({
  formData,
  activeStep,
  setActiveStep,
  completionPercentage,
  isSubmitting,
  canSubmit,
  handleSubmit,
}: ProjectSidebarProps) {
  const translations = useTranslation()
  const { locale } = useLocale()
  const t = translations.dashboard.companyComponents.addProject

  return (
    <div
      className="w-full border-t border-gray-100 bg-white md:w-[320px] md:border-l md:border-t-0"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="space-y-5 p-5">
        <div>
          {isSubmitting ? (
            <Button
              className="relative w-full overflow-hidden rounded-xl !bg-[#63B7B7] py-5 font-medium text-white hover:!bg-[#63B7B7]/90"
              disabled
            >
              <span className="opacity-0">{t.createButton}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            </Button>
          ) : (
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                className={cn(
                  'w-full rounded-xl py-5 font-medium text-white',
                  canSubmit
                    ? '!bg-[#63B7B7] hover:!bg-[#63B7B7]/90'
                    : 'cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100',
                )}
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                <Send className="mr-2 h-4 w-4" />
                {t.createButton}
              </Button>
            </motion.div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800">
                {t.projectCompletionTitle || 'Project Completion'}
              </h3>
              <span
                className={cn(
                  'text-xs font-medium',
                  completionPercentage >= 80
                    ? 'text-[#63B7B7]'
                    : completionPercentage >= 50
                      ? 'text-amber-600'
                      : 'text-gray-400',
                )}
              >
                {completionPercentage}%
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  completionPercentage >= 80
                    ? 'bg-[#63B7B7]'
                    : completionPercentage >= 50
                      ? 'bg-amber-500'
                      : 'bg-gray-300',
                )}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="p-2">
            <div className="space-y-1">
              {[
                {
                  step: 1,
                  title: t.stepOneTitle || 'Project Details',
                  isComplete: formData.title && formData.description,
                  status:
                    formData.title && formData.description
                      ? t.completedStatus || 'Completed'
                      : t.requiredStatus || 'Required',
                  icon: <Briefcase className="h-3.5 w-3.5" />,
                },
                {
                  step: 2,
                  title: t.stepTwoTitle || 'Skills & Budget',
                  isComplete:
                    formData.skills.length > 0 && formData.meta.budget,
                  status:
                    formData.skills.length > 0 && formData.meta.budget
                      ? t.completedStatus || 'Completed'
                      : t.requiredStatus || 'Required',
                  icon: <FileText className="h-3.5 w-3.5" />,
                },
                {
                  step: 3,
                  title: t.stepThreeTitle || 'Media & Documents',
                  isComplete: formData.media.length > 0,
                  status:
                    formData.media.length > 0
                      ? (t.filesAddedStatus || '{count} files added').replace(
                          '{count}',
                          formData.media.length.toString(),
                        )
                      : t.optionalStatus || 'Optional',
                  icon: <ImageIcon className="h-3.5 w-3.5" />,
                },
              ].map((step) => (
                <button
                  key={step.step}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                    activeStep === step.step
                      ? 'bg-[#63B7B7]/10 text-[#63B7B7]'
                      : step.isComplete
                        ? 'hover:bg-gray-50'
                        : 'hover:bg-gray-50',
                  )}
                  onClick={() => step.isComplete && setActiveStep(step.step)}
                >
                  <div className="flex w-full items-center gap-2">
                    <div
                      className={cn(
                        'mr-3 flex h-7 w-7 items-center justify-center rounded-full',
                        activeStep === step.step
                          ? 'bg-[#63B7B7] text-white'
                          : step.isComplete
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400',
                      )}
                    >
                      {step.icon}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div
                        className={cn(
                          'text-xs',
                          step.isComplete
                            ? 'text-green-600'
                            : step.status === 'Optional'
                              ? 'text-gray-400'
                              : 'text-amber-600',
                        )}
                      >
                        {step.status}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="text-sm font-medium text-gray-800">
              {t.whatsNextTitle || 'What happens next?'}
            </h3>
          </div>
          <div className="space-y-4 p-4 text-sm">
            <div className="flex gap-1">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10 text-[#63B7B7]">
                1
              </div>
              <p className="text-gray-600">
                {t.whatsNextStep1 ||
                  'Your project will be visible to qualified professionals'}
              </p>
            </div>
            <div className="flex gap-1">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10 text-[#63B7B7]">
                2
              </div>
              <p className="text-gray-600">
                {t.whatsNextStep2 ||
                  'Review proposals from interested professionals'}
              </p>
            </div>
            <div className="flex gap-1">
              <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10 text-[#63B7B7]">
                3
              </div>
              <p className="text-gray-600">
                {t.whatsNextStep3 || 'Hire the best match for your project'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
