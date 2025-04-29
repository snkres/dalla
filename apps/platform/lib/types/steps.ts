import type { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
export interface StepOneProps {
  coverLetter: string
  setCoverLetter: (value: string) => void
  showCoverLetterTips: boolean
  setShowCoverLetterTips: (value: boolean) => void
  aiSuggestions: string[]
  showAiSuggestions: boolean
  setShowAiSuggestions: (value: boolean) => void
  simulateAiSuggestions: () => void
}

export interface StepTwoProps {
  bidType: 'fixed' | 'milestone'
  setBidType: (value: 'fixed' | 'milestone') => void
  bidAmount: number
  handleBidChange: (value: number) => void
  estimatedDuration: string
  setEstimatedDuration: (value: string) => void
  durationValue: number
  setDurationValue: (value: number) => void
  durationUnit: 'days' | 'weeks' | 'months'
  setDurationUnit: (value: 'days' | 'weeks' | 'months') => void
  milestones: Array<{
    name: string
    price: number
    duration: string
    description: string
    durationValue?: number
    durationUnit?: 'days' | 'weeks' | 'months'
  }>
  handleAddMilestone: () => void
  handleRemoveMilestone: (index: number) => void
  updateMilestone: (
    index: number,
    field: string,
    value: string | number,
  ) => void
  setMilestones: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string
        price: number
        duration: string
        description: string
        durationValue?: number
        durationUnit?: 'days' | 'weeks' | 'months'
      }>
    >
  >
  serviceFee: number
  youllReceive: number
  totalMilestonesAmount: number
  project: GetAllProjectsProfessionalViewRes['data'][0][number]
}

export interface StepThreeProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  dragActive: boolean
  setDragActive: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ApplicationSidebarProps {
  project: GetAllProjectsProfessionalViewRes['data'][0][number]
  isSubmitted: boolean
  isSubmitting: boolean
  activeStep: number
  setActiveStep: (step: number) => void
  handleSubmit: () => void
  canSubmit: boolean
  completionPercentage: number
  coverLetter: string
  bidAmount: number
  estimatedDuration: string
  bidType: 'fixed' | 'milestone'
  milestones: Array<{
    name: string
    price: number
    duration: string
    description: string
    durationValue?: number
    durationUnit?: 'days' | 'weeks' | 'months'
  }>
  relatedProjects: Array<{ title: string; selected: boolean }>
  files: File[]
  totalMilestonesAmount: number
  onClose: () => void
}

export interface NavigationButtonsProps {
  activeStep: number
  setActiveStep: (step: number) => void
  onClose: () => void
}
