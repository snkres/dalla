import React from 'react'
import {
  Clock,
  Send,
  AlertCircle,
  Users,
  ChevronRight,
  FileText,
  Image as ImageIcon,
} from 'lucide-react'
import { Button, Riyal } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { motion } from 'motion/react'
import { ApplicationSidebarProps } from '@lib/types/steps'
import { useTranslation } from '@hooks/use-translation'
import { formatCurrency } from '@lib/utils/format-currency'
import { useLocale } from '@hooks/use-locale'

export function ApplicationSidebar({
  project,
  isSubmitted,
  isSubmitting,
  activeStep,
  setActiveStep,
  handleSubmit,
  canSubmit,
  completionPercentage,
  coverLetter,
  bidAmount,
  estimatedDuration,
  bidType,
  milestones,
  relatedProjects,
  files,
  totalMilestonesAmount,
}: ApplicationSidebarProps) {
  const [showAllSkills, setShowAllSkills] = React.useState(false)
  const translations = useTranslation()
  const { locale } = useLocale()
  const t = translations.dashboard.applyProposal
  const t_shared = translations.dashboard.shared // For relative time

  if (isSubmitted) {
    return (
      <div
        className="sticky top-0 flex w-2/5 flex-col rounded-3xl border-t border-gray-100 bg-white md:w-[320px] md:border-l md:border-t-0"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="space-y-5 overflow-y-auto p-5">
          <div className="rounded-xl border border-[#63B7B7]/20 bg-[#63B7B7]/5 p-5">
            <div className="mb-4 flex items-start gap-1">
              <div className="mr-3 flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#63B7B7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-800">
                  {t.submittedTitle}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {t.submittedDescription}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-[#63B7B7]/10 bg-white p-3.5 text-sm text-gray-700">
              {t.submittedNotification}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="border-b border-gray-100 p-4">
              <h3 className="flex items-center gap-1 text-sm font-medium text-gray-800">
                <Users className="mr-2 h-4 w-4 text-[#63B7B7]" />
                {t.whatHappensNextTitle}
              </h3>
            </div>

            <div className="space-y-5 p-5">
              {[
                {
                  title: t.nextStep1Title,
                  description: t.nextStep1Desc,
                },
                {
                  title: t.nextStep2Title,
                  description: t.nextStep2Desc,
                },
                {
                  title: t.nextStep3Title,
                  description: t.nextStep3Desc,
                },
                {
                  title: t.nextStep4Title,
                  description: t.nextStep4Desc,
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 w-6 flex-shrink-0">
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-[#63B7B7] opacity-${100 - index * 20} mt-1.5`}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 flex h-fit w-full flex-col border-t border-gray-100 bg-white md:w-[320px] md:border-l md:border-t-0">
      <div className="space-y-5 overflow-y-auto p-5">
        <div>
          {isSubmitting ? (
            <Button
              className="relative w-full overflow-hidden rounded-xl !bg-[#63B7B7] py-5 font-medium text-white hover:!bg-[#63B7B7]/90"
              disabled
            >
              <span className="opacity-0">{t.submitButton}</span>
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
                {t.submitButton}
              </Button>
            </motion.div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800">
                {t.completionTitle}
              </h3>
              <span
                className={cn(
                  'text-xs font-medium',
                  completionPercentage >= 80
                    ? 'text-[#63B7B7]'
                    : completionPercentage >= 50
                      ? 'text-[#F8D568]'
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
                      ? 'bg-[#F8D568]'
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
                  title: t.sidebarStep1Title,
                  isComplete: coverLetter.length > 0,
                  status:
                    coverLetter.length > 0 ? t.statusAdded : t.statusRequired,
                  icon: <FileText className="h-3.5 w-3.5" />,
                },
                {
                  step: 2,
                  title: t.sidebarStep2Title,
                  isComplete:
                    (bidAmount > 0 && estimatedDuration) ||
                    (bidType === 'milestone' && milestones.length > 0),
                  statusNode:
                    (bidAmount > 0 && estimatedDuration) ||
                    (bidType === 'milestone' && milestones.length > 0) ? (
                      <span className="flex items-center">
                        {formatCurrency(
                          bidType === 'fixed'
                            ? bidAmount
                            : totalMilestonesAmount,
                        )}
                        &nbsp;
                        {bidType === 'fixed'
                          ? t.statusBidTypeFixed
                          : t.statusBidTypeMilestone}
                      </span>
                    ) : (
                      <span>{t.statusRequired}</span>
                    ),
                  icon: <Riyal className="h-3.5 w-3.5" />,
                },
                {
                  step: 3,
                  title: t.sidebarStep3Title,
                  isComplete:
                    relatedProjects.some((p) => p.selected) || files.length > 0,
                  status:
                    relatedProjects.some((p) => p.selected) && files.length > 0
                      ? t.statusComplete
                      : relatedProjects.some((p) => p.selected)
                        ? t.statusPortfolioAdded
                        : files.length > 0
                          ? t.statusFilesAdded
                              .replace('{count}', files.length.toString())
                              .replace(
                                '{plural}',
                                files.length > 1
                                  ? locale === 'ar'
                                    ? 'ات'
                                    : 's'
                                  : '',
                              )
                          : t.statusRecommended,
                  icon: <ImageIcon className="h-3.5 w-3.5" />,
                },
              ].map((item) => (
                <motion.button
                  key={item.step}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className={cn(
                    'flex w-full items-center rounded-lg p-3 text-left transition-all',
                    activeStep === item.step
                      ? 'bg-[#63B7B7]/10'
                      : 'hover:bg-gray-50',
                  )}
                  onClick={() => setActiveStep(item.step)}
                >
                  <div
                    className={cn(
                      'mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border',
                      activeStep === item.step
                        ? 'border-[#63B7B7] bg-white'
                        : item.isComplete
                          ? 'border-[#63B7B7] bg-[#63B7B7]/10'
                          : 'border-gray-200 bg-gray-50',
                    )}
                  >
                    <div
                      className={cn(
                        'text-xs font-medium',
                        activeStep === item.step
                          ? 'text-[#63B7B7]'
                          : item.isComplete
                            ? 'text-[#63B7B7]'
                            : 'text-gray-400',
                      )}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-xs font-medium',
                        activeStep === item.step
                          ? 'text-[#63B7B7]'
                          : 'text-gray-700',
                      )}
                    >
                      {item.title}
                    </p>
                    <div
                      className={cn(
                        'mt-0.5 text-xs',
                        activeStep === item.step
                          ? 'text-[#63B7B7]'
                          : item.isComplete
                            ? 'text-gray-600'
                            : 'text-gray-400',
                      )}
                    >
                      {item.step === 2 ? item.statusNode : item.status}
                    </div>
                  </div>
                  {activeStep !== item.step && (
                    <ChevronRight className="ml-2 h-3.5 w-3.5 text-gray-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="flex items-center text-sm font-medium text-gray-800">
              <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
              {t.projectInfoTitle}
            </h3>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500">
                {t.skillsRequiredTitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.skills
                  .slice(0, showAllSkills ? project.skills.length : 5)
                  .map((skill) => (
                    <Badge
                      key={skill}
                      className="!bg-[#63B7B7]/10 !text-[#63B7B7]"
                    >
                      {skill}
                    </Badge>
                  ))}
                {project.skills.length > 5 && (
                  <button
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="ml-auto text-xs font-medium text-[#63B7B7] hover:underline"
                  >
                    {showAllSkills
                      ? t.showLessSkills
                      : t.viewAllSkills.replace(
                          '{count}',
                          project.skills.length.toString(),
                        )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-lg bg-gray-50 p-3 text-xs text-gray-400"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          {t.agreementText}
        </div>
      </div>
    </div>
  )
}
