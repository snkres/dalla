import { Button } from '@dallah/design-system'

interface ButtonsContainerProps {
  handlePrevious: () => void
  handleSubmit: () => void | Promise<void>
  isSubmitting: boolean
  previousText: string | null
  continueText: string
  isNextDisabled?: boolean
  isAbleToProceed?: boolean
}

export function ButtonsContainer({
  handlePrevious,
  handleSubmit,
  isSubmitting,
  previousText,
  continueText,
  isAbleToProceed,
}: ButtonsContainerProps) {
  return (
    <div className="flex justify-between gap-4">
      {previousText && (
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrevious}
          className="w-full"
        >
          {previousText}
        </Button>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !isAbleToProceed}
        onClick={handleSubmit}
        className="w-full bg-[#234d64] text-white hover:bg-[#1a3b4d]"
      >
        {continueText}
      </Button>
    </div>
  )
}
