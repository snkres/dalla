'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'motion/react'
import type { Project } from '@lib/api/pro/projects'
import { createProjectProposal } from '@lib/api/pro/proposals'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'
import { ApplicationHeader } from './header'
import { StepOne } from './step-one'
import { StepTwo } from './step-two'
import { StepThree } from './step-three'
import { SuccessScreen } from './success-screen'
import { ApplicationSidebar } from './sidebar'
import { NavigationButtons } from './navigation-buttons'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'

interface ProjectApplicationProps {
  project: Project
  onClose: () => void
}

export function ApplyProposal({ project, onClose }: ProjectApplicationProps) {
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
    project.meta?.timeline || '2-3 weeks',
  )
  const defaultMilestones = [
    {
      name: 'Initial design mockups',
      price: Math.round(bidAmount * 0.3),
      duration: '1 week',
    },
    {
      name: 'Implementation',
      price: Math.round(bidAmount * 0.5),
      duration: '1-2 weeks',
    },
  ]
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
        title: 'Cannot Submit Proposal',
        description: 'Please complete all required fields before submitting.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      // const media = await Promise.all(files.map((file) => upload(file)))
      // Prepare the proposal data
      const proposalData = {
        price: bidType === 'fixed' ? bidAmount : totalMilestonesAmount,
        timeline:
          bidType === 'fixed'
            ? estimatedDuration
            : milestones.map((m) => `${m.name}: ${m.duration}`).join(', '),
        description: coverLetter,
        relevantProjects: [],
        // media: media.map((m) => m.data.fileUrl),
        media: ['https://placehold.co/80x80/e6f3f3/63B7B7?text=Media'],
      }

      // Submit the proposal
      const response = await createProjectProposal(project.id, proposalData)

      // Handle successful submission
      setIsSubmitted(true)
      toast({
        title: 'Proposal Submitted',
        description: 'Your proposal has been submitted successfully!',
      })
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast({
        title: 'Error',
        description: 'Failed to submit proposal. Please try again.',
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
    relatedProjects,
    project.id,
  ])

  const simulateAiSuggestions = useCallback(() => {
    setShowAiSuggestions(true)
    setAiSuggestions([
      "I noticed your project requires a blend of design expertise and Hugo implementation. I've created 5+ websites with Hugo and have experience with Tailwind CSS for responsive designs.",
      'As a frontend developer specializing in fast, accessible websites, I can deliver your project with optimized performance and SEO best practices built-in.',
      'My background working with parent-focused websites gives me unique insight into creating engaging, intuitive interfaces that will resonate with your target audience.',
    ])
  }, [])

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
          name: 'New milestone',
          price: Math.round(bidAmount * 0.1),
          duration: '1 week',
        },
      ])
    }
  }, [milestones, bidAmount])

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

  return (
    <motion.div
      {...SLIDE_ANIMATION}
      className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-gray-200 bg-white shadow-xl md:w-[1000px]"
    >
      <ApplicationHeader
        onClose={onClose}
        activeStep={activeStep}
        isSubmitted={isSubmitted}
      />
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative mb-[100px] flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-3xl">
            {isSubmitted ? (
              <SuccessScreen project={project} onClose={onClose} />
            ) : (
              <div className="space-y-6">
                <h1 className="mb-2 text-xl font-semibold text-gray-900">
                  Submit a Proposal
                </h1>
                <p className="mb-6 text-sm text-gray-600">
                  You&apos;re applying to:{' '}
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

                <div className="flex justify-end">
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
    </motion.div>
  )
}
