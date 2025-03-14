export interface GoalOption {
  id: string
  name: string
  description: string
  icon?: React.ReactNode
}
export interface CompletionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}
