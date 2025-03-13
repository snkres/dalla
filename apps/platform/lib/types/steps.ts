import type { Project } from '@lib/api/pro/projects'
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
  milestones: Array<{ name: string; price: number; duration: string }>
  handleAddMilestone: () => void
  handleRemoveMilestone: (index: number) => void
  updateMilestone: (
    index: number,
    field: string,
    value: string | number,
  ) => void
  serviceFee: number
  youllReceive: number
  totalMilestonesAmount: number
  project: Project
}

export interface StepThreeProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  dragActive: boolean
  setDragActive: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ApplicationSidebarProps {
  project: Project
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
  milestones: Array<{ name: string; price: number; duration: string }>
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
