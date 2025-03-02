import { Button } from '@dallah/design-system'

interface ButtonsContainerProps {
  handlePrevious: () => void
  handleSubmit: () => void | Promise<void>
  isSubmitting: boolean
  previousText: string
  continueText: string
}

export function ButtonsContainer({
  handlePrevious,
  handleSubmit,
  isSubmitting,
  previousText,
  continueText,
}: ButtonsContainerProps) {
  return (
    <div className="flex justify-between gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        className="w-full"
      >
        {previousText}
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        onClick={handleSubmit}
        className="w-full bg-[#234d64] text-white hover:bg-[#1a3b4d]"
      >
        {continueText}
      </Button>
    </div>
  )
}
