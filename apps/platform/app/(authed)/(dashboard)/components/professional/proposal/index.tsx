'use client'

import { useState, useCallback, useMemo } from 'react'
import { createProjectProposal } from '@lib/api/pro/proposals'
import { ApplicationHeader } from './header'
import { StepOne } from './step-one'
import { StepTwo } from './step-two'
import { StepThree } from './step-three'
import { SuccessScreen } from './success-screen'
import { ApplicationSidebar } from './sidebar'
import { NavigationButtons } from './navigation-buttons'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
import { upload } from '@lib/api/shared/upload'
import { Modal } from '@dalla/design-system'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProjectApplicationProps {
  project: GetAllProjectsProfessionalViewRes['data'][0][number]
  onClose: () => void
}

interface Milestone {
  name: string
  description: string
  price: number
  duration: string
  durationValue?: number
  durationUnit?: 'days' | 'weeks' | 'months'
}

export function ApplyProposal({ project, onClose }: ProjectApplicationProps) {
  const translations = useTranslation()
  const t = translations.dashboard.applyProposal
  const t_shared = translations.dashboard.shared
  const t_proHome = translations.dashboard.professionalHome

  const { toast } = useToast()
  const [activeStep, setActiveStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [showCoverLetterTips, setShowCoverLetterTips] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)
  const [bidType, setBidType] = useState<'fixed' | 'milestone'>('fixed')
  const [bidAmount, setBidAmount] = useState(project.meta.budget)

  const [estimatedDuration, setEstimatedDuration] = useState(
    project.meta?.duration || '2 weeks',
  )
  const [durationValue, setDurationValue] = useState(2)
  const [durationUnit, setDurationUnit] = useState<'days' | 'weeks' | 'months'>(
    'weeks',
  )

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      name: '',
      description: '',
      price: 0,
      duration: '',
      durationValue: 0,
      durationUnit: 'weeks',
    },
  ])
  const [relatedProjects, setRelatedProjects] = useState<
    Array<{ title: string; selected: boolean }>
  >([
    { title: 'E-commerce platform with payment integration', selected: false },
    {
      title: 'Responsive portfolio website with Framer Motion animations',
      selected: true,
    },
    { title: 'SaaS dashboard with real-time analytics', selected: false },
  ])
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  // Store scroll position for restoration
  const [scrollPosition, setScrollPosition] = useState(0)

  const totalMilestonesAmount = useMemo(
    () => milestones.reduce((sum, milestone) => sum + milestone.price, 0),
    [milestones],
  )

  const serviceFee = useMemo(
    () =>
      bidType === 'fixed'
        ? Math.round(bidAmount * 0.1)
        : Math.round(totalMilestonesAmount * 0.1),
    [bidType, bidAmount, totalMilestonesAmount],
  )

  const youllReceive = useMemo(
    () =>
      bidType === 'fixed'
        ? bidAmount - serviceFee
        : totalMilestonesAmount - serviceFee,
    [bidType, bidAmount, serviceFee, totalMilestonesAmount],
  )

  const completionPercentage = useMemo(() => {
    let total = 0
    let completed = 0
    total += 30
    completed +=
      coverLetter.length > 150 ? 30 : coverLetter.length > 50 ? 15 : 0
    total += 30
    if (bidType === 'fixed') {
      completed += bidAmount > 0 ? 15 : 0
      completed += durationValue > 0 && durationUnit ? 15 : 0
    } else {
      // Check if any milestones have been started
      const milestonesStarted = milestones.some(
        (m) =>
          m.name.trim() !== '' ||
          m.description.trim() !== '' ||
          m.price > 0 ||
          (m.durationValue || 0) > 0,
      )

      completed += milestonesStarted ? 15 : 0

      // Check if all started milestones are complete
      const startedMilestones = milestones.filter(
        (m) =>
          m.name.trim() !== '' ||
          m.description.trim() !== '' ||
          m.price > 0 ||
          (m.durationValue || 0) > 0,
      )

      const allStartedMilestonesComplete =
        startedMilestones.length > 0 &&
        startedMilestones.every(
          (m) =>
            m.name.trim() !== '' &&
            m.description.trim() !== '' &&
            m.price > 0 &&
            (m.durationValue || 0) > 0 &&
            !!m.durationUnit,
        )

      completed += allStartedMilestonesComplete ? 15 : 0
    }
    total += 40
    completed += relatedProjects.some((p) => p.selected) ? 20 : 0
    completed += files.length > 0 ? 20 : 0
    return Math.round((completed / total) * 100)
  }, [
    coverLetter,
    bidAmount,
    durationValue,
    durationUnit,
    bidType,
    milestones,
    relatedProjects,
    files,
  ])

  const canSubmit = useMemo(() => {
    // Step 1: Cover letter validation
    const isCoverLetterValid = coverLetter.length >= 100 // Require at least 100 characters

    // Step 2: Pricing validation
    let isPricingValid = false
    if (bidType === 'fixed') {
      isPricingValid = bidAmount > 0 && durationValue > 0 && !!durationUnit
    } else {
      // Need at least one milestone and all milestones must be complete
      const activeCount = milestones.filter(
        (m) =>
          m.name.trim() !== '' ||
          m.description.trim() !== '' ||
          m.price > 0 ||
          (m.durationValue || 0) > 0,
      ).length

      isPricingValid =
        activeCount > 0 &&
        milestones.every((m) => {
          // Skip validation for empty milestones (not yet started)
          const isEmptyMilestone =
            m.name.trim() === '' &&
            m.description.trim() === '' &&
            m.price === 0 &&
            (m.durationValue || 0) === 0

          if (isEmptyMilestone) {
            return true
          }

          // Validate filled or partially filled milestones
          return (
            m.name.trim() !== '' &&
            m.description.trim() !== '' &&
            m.price > 0 &&
            (m.durationValue || 0) > 0 &&
            !!m.durationUnit
          )
        })
    }

    // Step 3: Portfolio validation
    const isPortfolioValid =
      relatedProjects.some((p) => p.selected) || files.length > 0

    // Only allow submission if all steps are valid and we're on the last step
    return (
      isCoverLetterValid &&
      isPricingValid &&
      isPortfolioValid &&
      activeStep === 3
    )
  }, [
    coverLetter,
    bidAmount,
    durationValue,
    durationUnit,
    bidType,
    milestones,
    relatedProjects,
    files,
    activeStep,
  ])

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) {
      toast({
        title: t.toastSubmitErrorTitle,
        description: t.toastSubmitErrorDesc,
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const media = await Promise.all(files.map((file) => upload(file)))

      // Filter out empty milestones
      const validMilestones = milestones.filter(
        (m) =>
          m.name.trim() !== '' &&
          m.description.trim() !== '' &&
          m.price > 0 &&
          (m.durationValue || 0) > 0,
      )

      // Calculate total duration for milestone-based projects
      const calculateTotalDuration = (milestones: Milestone[]) => {
        // Convert all durations to days for accurate calculation
        const daysMap = { days: 1, weeks: 7, months: 30 }
        const totalDays = milestones.reduce((sum, milestone) => {
          const value = milestone.durationValue || 0
          const unit = milestone.durationUnit || 'days'
          return sum + value * daysMap[unit]
        }, 0)

        // Convert back to most appropriate unit
        if (totalDays >= 60) {
          return `${Math.round(totalDays / 30)} months`
        } else if (totalDays >= 14) {
          return `${Math.round(totalDays / 7)} weeks`
        } else {
          return `${totalDays} days`
        }
      }

      // Submit the proposal
      await createProjectProposal(project.id, {
        type:
          bidType === 'fixed'
            ? ('AllInOne' as const)
            : ('MilestoneBased' as const),
        price: bidType === 'fixed' ? bidAmount : totalMilestonesAmount,
        timeline:
          bidType === 'fixed'
            ? `${durationValue} ${durationUnit}`
            : calculateTotalDuration(validMilestones),
        description: coverLetter,
        relevantProjects: [],
        media: media.map((m) => m.data.fileUrl),
        // Add milestones data if bid type is milestone
        ...(bidType === 'milestone' && {
          milestones: validMilestones.map((milestone, index) => ({
            order: index + 1,
            title: milestone.name,
            description: milestone.description || milestone.name,
            price: milestone.price,
            timeline: milestone.duration,
          })),
        }),
      })

      // Handle successful submission
      setIsSubmitted(true)
      toast({
        title: t_proHome.proposalSuccessToastTitle,
        description: t_proHome.proposalSuccessToastDescription,
      })
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast({
        title: t.toastGenericErrorTitle,
        description: t.toastGenericErrorDesc,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [
    canSubmit,
    bidType,
    bidAmount,
    totalMilestonesAmount,
    durationValue,
    durationUnit,
    milestones,
    coverLetter,
    project.id,
    files,
    toast,
    t,
    t_proHome,
  ])

  const simulateAiSuggestions = useCallback(() => {
    setShowAiSuggestions(true)
    setAiSuggestions([t.aiSuggestion1, t.aiSuggestion2, t.aiSuggestion3])
  }, [t])

  const handleBidChange = useCallback((value: number) => {
    setBidAmount(value)
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, index) => {
        let percentage = 0.2
        if (index === 0) percentage = 0.3
        else if (index === 1) percentage = 0.5

        return {
          ...milestone,
          price: Math.round(value * percentage),
        }
      }),
    )
  }, [])

  const toggleRelatedProject = useCallback((index: number) => {
    setRelatedProjects((projects) =>
      projects.map((project, i) =>
        i === index ? { ...project, selected: !project.selected } : project,
      ),
    )
  }, [])

  const handleAddMilestone = useCallback(() => {
    if (milestones.length < 5) {
      setMilestones([
        ...milestones,
        {
          name: '',
          description: '',
          price: 0,
          duration: '',
          durationValue: 0,
          durationUnit: 'weeks' as 'days' | 'weeks' | 'months',
        },
      ])
    }
  }, [milestones, bidAmount, t])

  const handleRemoveMilestone = useCallback(
    (index: number) => {
      if (milestones.length > 1) {
        setMilestones((prevMilestones) =>
          prevMilestones.filter((_, i) => i !== index),
        )
      }
    },
    [milestones],
  )

  const updateMilestone = useCallback(
    (index: number, field: string, value: string | number) => {
      setMilestones((prevMilestones) =>
        prevMilestones.map((milestone, i) =>
          i === index ? { ...milestone, [field]: value } : milestone,
        ),
      )
    },
    [],
  )
  const { locale } = useLocale()

  return (
    <Modal isOpen={true} onClose={onClose} title={t.modalTitle} width="xl">
      {/* <ApplicationHeader activeStep={activeStep} isSubmitted={isSubmitted} /> */}
      <div className="flex h-fit flex-col justify-end md:flex-row">
        <div
          className="w-[70%] overflow-y-auto p-4 sm:p-6"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="max-w-3xl">
            {isSubmitted ? (
              <SuccessScreen project={project} onClose={onClose} />
            ) : (
              <div className="h-fit space-y-6 overflow-y-scroll">
                <h1 className="mb-2 text-xl font-semibold text-gray-900">
                  {t.modalTitle}
                </h1>
                <p className="mb-6 text-sm text-gray-600">
                  {t.applyingTo.replace('{title}', '')}
                  <span className="font-medium text-gray-800">
                    {project.title}
                  </span>
                </p>
                {activeStep === 1 && (
                  <StepOne
                    coverLetter={coverLetter}
                    setCoverLetter={setCoverLetter}
                    showCoverLetterTips={showCoverLetterTips}
                    setShowCoverLetterTips={setShowCoverLetterTips}
                    aiSuggestions={aiSuggestions}
                    showAiSuggestions={showAiSuggestions}
                    setShowAiSuggestions={setShowAiSuggestions}
                    simulateAiSuggestions={simulateAiSuggestions}
                  />
                )}
                {activeStep === 2 && (
                  <StepTwo
                    setMilestones={setMilestones}
                    bidType={bidType}
                    setBidType={setBidType}
                    bidAmount={bidAmount}
                    handleBidChange={handleBidChange}
                    estimatedDuration={estimatedDuration}
                    setEstimatedDuration={setEstimatedDuration}
                    durationValue={durationValue}
                    setDurationValue={setDurationValue}
                    durationUnit={durationUnit}
                    setDurationUnit={setDurationUnit}
                    milestones={milestones}
                    handleAddMilestone={handleAddMilestone}
                    handleRemoveMilestone={handleRemoveMilestone}
                    updateMilestone={updateMilestone}
                    serviceFee={serviceFee}
                    youllReceive={youllReceive}
                    totalMilestonesAmount={totalMilestonesAmount}
                    project={project}
                  />
                )}
                {activeStep === 3 && (
                  <StepThree
                    files={files}
                    setFiles={setFiles}
                    dragActive={dragActive}
                    setDragActive={setDragActive}
                  />
                )}

                <div className="flex justify-end" dir={'ltr'}>
                  <NavigationButtons
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    onClose={onClose}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <ApplicationSidebar
          project={project}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleSubmit={handleSubmit}
          canSubmit={canSubmit as boolean}
          completionPercentage={completionPercentage}
          coverLetter={coverLetter}
          bidAmount={bidAmount}
          estimatedDuration={estimatedDuration}
          bidType={bidType}
          milestones={milestones}
          relatedProjects={relatedProjects}
          files={files}
          totalMilestonesAmount={totalMilestonesAmount}
          onClose={onClose}
        />
      </div>
    </Modal>
  )
}
