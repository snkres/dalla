'use client'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SkipForwardIcon,
  TypeIcon as type,
  LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { create } from 'zustand'
import { cn } from '@dallah/utils'
import { Button } from '@dallah/design-system'
import { Progress } from '@dallah/design-system'

interface FormStore {
  currentStep: number
  selections: Record<number | string, string[]>
  setStep: (step: number) => void
  setSelection: (step: number, selection: string, totalSteps: number) => void
  reset: () => void
  hasForm: boolean
}

const useFormStore = create<FormStore>((set) => ({
  currentStep: 0,
  selections: {},
  setStep: (step) => set({ currentStep: step }),
  setSelection: (step, selection, totalSteps) =>
    set((state) => {
      const currentSelections = state.selections[step] || []
      const newSelections = currentSelections.includes(selection)
        ? currentSelections.filter((s) => s !== selection)
        : [...currentSelections, selection]

      return {
        selections: { ...state.selections, [step]: newSelections },
        currentStep: step,
      }
    }),
  reset: () => set({ currentStep: 0, selections: {} }),
  hasForm: false,
}))

export type FormStep = {
  level: number
  id: string
  title: string
  description?: string
  items: FormItem[]
  minChoices?: number
}

export type FormItem = {
  id: string
  title: string
  description?: string
  icon?: LucideIcon
  image?: string
  validNextSteps?: string[]
}

interface OptionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  image?: string
  selected?: boolean
  onClick?: () => void
  variant?: 'default' | 'compact'
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
}

const OptionCard = React.forwardRef<HTMLDivElement, OptionCardProps>(
  (
    {
      title,
      description,
      icon: Icon,
      image,
      selected,
      onClick,
      variant = 'default',
      cardClassName,
      imageClassName,
      iconClassName,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'hover:ring-primary hover:ring-sunshine-yellow relative h-full cursor-pointer overflow-hidden rounded-full border transition-all hover:ring-2',
          selected ? 'bg-slate-blue text-sunshine-yellow' : undefined,
          cardClassName,
        )}
        onClick={onClick}
      >
        {variant === 'default' ? (
          <>
            {image ? (
              <div className={cn('relative h-32 md:h-44', imageClassName)}>
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                {Icon && (
                  <Icon
                    className={cn(
                      'absolute bottom-3 left-3 h-6 w-6 text-white',
                      iconClassName,
                    )}
                  />
                )}
              </div>
            ) : (
              Icon && (
                <div
                  className={cn(
                    'bg-muted flex h-32 items-center justify-center md:h-44',
                    imageClassName,
                  )}
                >
                  <Icon
                    className={cn(
                      'text-muted-foreground h-12 w-12',
                      iconClassName,
                    )}
                  />
                </div>
              )
            )}
            <div className="p-4">
              <h3 className="font-semibold">{title}</h3>
              {description && (
                <p className="text-muted-foreground text-sm">{description}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="p-2">
              <h3 className="text-center font-semibold">{title}</h3>
            </div>
            {image ? (
              <div className="relative h-32 md:h-44">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={cn('object-cover', imageClassName)}
                />
              </div>
            ) : (
              Icon && (
                <div
                  className={cn(
                    'bg-muted flex h-48 items-center justify-center',
                    imageClassName,
                  )}
                >
                  <Icon
                    className={cn(
                      'text-muted-foreground h-12 w-12',
                      iconClassName,
                    )}
                  />
                </div>
              )
            )}
          </>
        )}
      </div>
    )
  },
)
OptionCard.displayName = 'OptionCard'

interface FormCardProps {
  options: FormItem[]
  variant?: 'default' | 'compact'
  totalSteps?: number
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
  minChoices?: number
  onNextStep: () => void
  onSkip: () => void
}

const FormCard = React.forwardRef<HTMLDivElement, FormCardProps>(
  (
    {
      options,
      variant = 'default',
      cardClassName,
      imageClassName,
      iconClassName,
      totalSteps,
      minChoices = 0,
      onNextStep,
      onSkip,
    },
    ref,
  ) => {
    const currentStep = useFormStore((state) => state.currentStep)
    const selections = useFormStore((state) => state.selections)
    const setSelection = useFormStore((state) => state.setSelection)
    const visualOptions = options.filter(
      (option) => option.image || option.icon,
    )
    const textOptions = options.filter(
      (option) => !option.image && !option.icon,
    )
    const [isSelecting, setIsSelecting] = React.useState(false)

    const handleSelection = React.useCallback(
      (optionId: string) => {
        if (isSelecting) return
        setIsSelecting(true)
        setSelection(currentStep, optionId, totalSteps || 0)
        setTimeout(() => {
          setIsSelecting(false)
        }, 300)
      },
      [currentStep, isSelecting, setSelection, totalSteps],
    )

    const currentSelections = selections[currentStep] || []
    const canProceed = currentSelections.length >= minChoices

    return (
      <div ref={ref}>
        {visualOptions.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {visualOptions.map((option) => (
              <div className="w-1/2 p-2 md:w-1/4" key={option.id}>
                <OptionCard
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  image={option.image}
                  selected={currentSelections.includes(option.id)}
                  onClick={() => handleSelection(option.id)}
                  variant={variant}
                  cardClassName={cardClassName}
                  imageClassName={imageClassName}
                  iconClassName={iconClassName}
                />
              </div>
            ))}
          </div>
        )}

        {textOptions.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {textOptions.map((option) => (
              <div className="w-fit p-2" key={option.id}>
                <OptionCard
                  title={option.title}
                  description={option.description}
                  selected={currentSelections.includes(option.id)}
                  onClick={() => handleSelection(option.id)}
                  variant={variant}
                  cardClassName={cardClassName}
                  imageClassName={imageClassName}
                  iconClassName={iconClassName}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={onSkip} variant="outline">
            Skip <SkipForwardIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={onNextStep} disabled={!canProceed}>
            Next <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  },
)
FormCard.displayName = 'FormCard'

interface StepOptions {
  title: string
  options: FormStep['items']
}

export interface MultiStepFormProps {
  title?: React.ReactNode
  formSteps: FormStep[]
  onComplete: (selections: Record<number | string, string[]>) => boolean
  variant?: 'default' | 'compact'
  cardClassName?: string
  imageClassName?: string
  iconClassName?: string
  children?: React.ReactNode
  finalStep?: React.ReactNode
  className?: string
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  (
    {
      title,
      formSteps,
      onComplete,
      variant = 'default',
      cardClassName,
      imageClassName,
      iconClassName,
      children,
      finalStep,
      className,
      ...props
    },
    ref,
  ) => {
    const { currentStep, setStep, selections } = useFormStore()
    const [canFinish, setCanFinish] = React.useState(false)
    const [showSuccess, setShowSuccess] = React.useState(false)

    // Set hasForm on mount
    React.useEffect(() => {
      useFormStore.setState({ hasForm: Boolean(children) })
    }, [children])

    const handleBack = () => {
      if (showSuccess) {
        setShowSuccess(false)
        return
      }
      if (currentStep > 0) {
        setStep(currentStep - 1)
      }
    }

    const handleNextStep = () => {
      if (currentStep < formSteps.length - 1) {
        setStep(currentStep + 1)
      }
    }

    const handleSkip = () => {
      if (currentStep < formSteps.length - 1) {
        setStep(currentStep + 1)
      }
    }

    const getStepOptions = (
      currentStep: number,
      selections: Record<number | string, string[]>,
    ): StepOptions | null => {
      const step = formSteps[currentStep]
      if (!step) return null

      if (currentStep === 0) {
        return {
          title: step.title,
          options: step.items,
        }
      }

      const previousSelection = selections[currentStep - 1]
      if (!previousSelection) return null

      const previousStep = formSteps[currentStep - 1]
      const previousOption = previousStep.items.find((item) =>
        previousSelection.includes(item.id),
      )
      if (!previousOption) return null

      const validNextSteps = previousOption.validNextSteps || []
      const availableOptions = step.items.filter((item) =>
        validNextSteps.includes(item.id),
      )

      return {
        title: step.title,
        options: availableOptions,
      }
    }

    const isLastStep = currentStep === formSteps.length - 1
    const isSuccessStep = currentStep === formSteps.length
    const stepOptions = getStepOptions(currentStep, selections)
    const hasLastStepSelection =
      (selections[formSteps.length - 1] || []).length > 0

    const handleComplete = () => {
      if (finalStep) {
        // If no form, just use selections and show success
        const isValid = onComplete(selections)
        if (isValid) {
          setShowSuccess(true)
        }
      } else {
        onComplete(selections)
      }
    }

    const shouldShowOptions =
      stepOptions && (!isSuccessStep || (!children && !finalStep))
    const shouldShowComplete =
      isLastStep && !showSuccess && hasLastStepSelection && !children

    React.useEffect(() => {
      if (isLastStep) {
        const hasSelection = (selections[currentStep] || []).length > 0
        setCanFinish(hasSelection)
      }
    }, [isLastStep, currentStep, selections])

    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center', className)}
        {...props}
      >
        <div className="w-full max-w-5xl">
          <div className="mx-auto h-full w-full">
            <div className="mb-8 md:p-0">
              <Progress
                value={
                  isSuccessStep
                    ? 100
                    : ((currentStep + 1) / formSteps.length) * 100
                }
                className="w-full rounded-t-xl"
              />
              <div className="mt-16 text-center">
                {!isSuccessStep && stepOptions && (
                  <h1 className="text-heading-sm text-slate-blue mb-2 font-semibold">
                    {stepOptions.title}
                  </h1>
                )}
                {formSteps[currentStep]?.description && (
                  <p className="text-text-sm mx-auto max-w-md text-zinc-500">
                    {formSteps[currentStep].description}
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="p-4"
              >
                {showSuccess ? (
                  finalStep
                ) : isSuccessStep && children ? (
                  children
                ) : shouldShowOptions ? (
                  <FormCard
                    options={stepOptions?.options || []}
                    variant={variant}
                    totalSteps={formSteps.length}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    iconClassName={iconClassName}
                    minChoices={formSteps[currentStep].minChoices}
                    onNextStep={handleNextStep}
                    onSkip={handleSkip}
                    key={`form-card-${currentStep}`}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* Show Complete button when we have no form */}
            {shouldShowComplete && (
              <div className="mt-8 flex justify-end p-4">
                <Button onClick={handleComplete} disabled={!canFinish}>
                  Complete
                </Button>
              </div>
            )}
            {/* Show Submit/Complete button on form step */}
            {isSuccessStep && !showSuccess && children && (
              <div className="mt-8 flex justify-end">
                <Button onClick={handleComplete}>
                  {finalStep ? 'Submit' : 'Complete'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)
MultiStepForm.displayName = 'MultiStepForm'

export { MultiStepForm }
