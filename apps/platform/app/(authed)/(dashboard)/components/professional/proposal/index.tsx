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
  const defaultMilestones = useMemo(
    () => [
      {
        name: t.defaultMilestone1Name,
        price: Math.round(bidAmount * 0.3),
        duration: t.defaultMilestone1Duration,
      },
      {
        name: t.defaultMilestone2Name,
        price: Math.round(bidAmount * 0.5),
        duration: t.defaultMilestone2Duration,
      },
    ],
    [bidAmount, t],
  )
  const [milestones, setMilestones] = useState(defaultMilestones)
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
      completed += estimatedDuration ? 15 : 0
    } else {
      completed += milestones.length > 0 ? 15 : 0
      completed += milestones.every((m) => m.name && m.price > 0) ? 15 : 0
    }
    total += 40
    completed += relatedProjects.some((p) => p.selected) ? 20 : 0
    completed += files.length > 0 ? 20 : 0
    return Math.round((completed / total) * 100)
  }, [
    coverLetter,
    bidAmount,
    estimatedDuration,
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
      isPricingValid = bidAmount > 0 && !!estimatedDuration
    } else {
      isPricingValid =
        milestones.length > 0 &&
        milestones.every(
          (m) =>
            m.name.trim() !== '' && m.price > 0 && m.duration.trim() !== '',
        )
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
    estimatedDuration,
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
      // Prepare the proposal data
      const proposalData = {
        price: bidType === 'fixed' ? bidAmount : totalMilestonesAmount,
        timeline:
          bidType === 'fixed'
            ? estimatedDuration
            : milestones.map((m) => `${m.name}: ${m.duration}`).join(', '),
        description: coverLetter,
        relevantProjects: [],
        media: media.map((m) => m.data.fileUrl),
      }

      // Submit the proposal
      const response = await createProjectProposal(project.id, proposalData)

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
    estimatedDuration,
    milestones,
    coverLetter,
    project.id,
    files,
    toast,
    t,
  ])

  const simulateAiSuggestions = useCallback(() => {
    setShowAiSuggestions(true)
    setAiSuggestions([t.aiSuggestion1, t.aiSuggestion2, t.aiSuggestion3])
  }, [t])

  const handleBidChange = useCallback((value: number) => {
    setBidAmount(value)
    setMilestones((milestones) =>
      milestones.map((milestone, index) => {
        let percentage
        if (index === 0) percentage = 0.3
        else if (index === 1) percentage = 0.5
        else percentage = 0.2
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
          name: t.newMilestoneDefaultName,
          price: Math.round(bidAmount * 0.1),
          duration: t.newMilestoneDefaultDuration,
        },
      ])
    }
  }, [milestones, bidAmount, t])

  const handleRemoveMilestone = useCallback(
    (index: number) => {
      if (milestones.length > 1) {
        setMilestones((milestones) => milestones.filter((_, i) => i !== index))
      }
    },
    [milestones],
  )

  const updateMilestone = useCallback(
    (index: number, field: string, value: string | number) => {
      setMilestones((milestones) =>
        milestones.map((milestone, i) =>
          i === index ? { ...milestone, [field]: value } : milestone,
        ),
      )
    },
    [],
  )
  const { locale } = useLocale()

  return (
    <Modal isOpen={true} onClose={onClose} title={t.modalTitle} width="xl">
      <ApplicationHeader activeStep={activeStep} isSubmitted={isSubmitted} />
      <div className="flex h-full flex-col justify-end md:flex-row">
        <div
          className="relative w-[70%] overflow-y-auto p-4 sm:p-6"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="max-w-3xl">
            {isSubmitted ? (
              <SuccessScreen project={project} onClose={onClose} />
            ) : (
              <div className="space-y-6">
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
                    bidType={bidType}
                    setBidType={setBidType}
                    bidAmount={bidAmount}
                    handleBidChange={handleBidChange}
                    estimatedDuration={estimatedDuration}
                    setEstimatedDuration={setEstimatedDuration}
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
