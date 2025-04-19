'use client'

import { motion, AnimatePresence } from 'motion/react'
import { CompanyOnboardingOne } from './components/company/one'
import { ButtonsContainer } from '@lib/constants/ButtonsContianer'
import { CompanyOnboardingTwo } from './components/company/two'
import { CompanyOnboardingThree } from './components/company/three'
import { CompletionDialog } from './components/completion-dialog'
import { useOnboarding } from './hooks/use-onboarding'
import { ProOnboardingOne } from './components/professional/one'
import { ProOnboardingTwo } from './components/professional/two'
import { ProOnboardingThree } from './components/professional/three'
import { ProOnboardingFour } from './components/professional/four'
import { useTranslation } from '../../../hooks/use-translation'

export default function Page() {
  const t = useTranslation()
  const {
    step,
    mode,
    companyData,
    proData,
    isAbleToProceed,
    showCompleteDialog,
    isSubmitting,
    companySteps,
    proSteps,
    currentStep,
    setCompanyData,
    setProData,
    setIsAbleToProceed,
    setShowCompleteDialog,
    handlePrevious,
    handleStepAction,
    handleComplete,
    isLoading,
  } = useOnboarding()

  return (
    <AnimatePresence mode="wait">
      {showCompleteDialog ? (
        <CompletionDialog
          onComplete={handleComplete}
          open={showCompleteDialog}
          onOpenChange={setShowCompleteDialog}
        />
      ) : mode === 'company' ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/80 pb-4 pt-2 backdrop-blur-sm">
            <div className="flex gap-2">
              {companySteps.map((step) => (
                <div
                  key={step.id}
                  className={`h-[3px] w-[20px] rounded-full transition-all duration-300 ${
                    companySteps.findIndex((s) => s.id === currentStep) >=
                    companySteps.findIndex((s) => s.id === step.id)
                      ? 'bg-[#234d64]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="py-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyOnboardingOne
                    data={companyData}
                    updateData={setCompanyData}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyOnboardingTwo
                    data={companyData}
                    setData={setCompanyData}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyOnboardingThree
                    data={companyData}
                    setData={setCompanyData}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ButtonsContainer
            continueText={
              step === 3
                ? t.onboarding.buttonSubmit
                : t.onboarding.buttonProceed
            }
            handlePrevious={handlePrevious}
            previousText={
              step === 1 ? t.onboarding.buttonSkip : t.onboarding.buttonBack
            }
            handleSubmit={handleStepAction}
            isSubmitting={isSubmitting}
            isAbleToProceed={true}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/80 pb-4 pt-2 backdrop-blur-sm">
            <div className="flex gap-2">
              {proSteps.map((step) => (
                <div
                  key={step.id}
                  className={`h-[3px] w-[20px] rounded-full transition-all duration-300 ${
                    proSteps.findIndex((s) => s.id === currentStep) >=
                    proSteps.findIndex((s) => s.id === step.id)
                      ? 'bg-[#234d64]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-full py-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProOnboardingOne
                    data={proData}
                    updateData={setProData}
                    setIsAbleToProceed={setIsAbleToProceed}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProOnboardingTwo
                    data={proData}
                    updateData={setProData}
                    setIsAbleToProceed={setIsAbleToProceed}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProOnboardingThree
                    data={proData}
                    updateData={setProData}
                    setIsAbleToProceed={setIsAbleToProceed}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProOnboardingFour
                    data={proData}
                    updateData={setProData}
                    setIsAbleToProceed={setIsAbleToProceed}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-full">
            <ButtonsContainer
              continueText={
                step === 4
                  ? t.onboarding.buttonSubmit
                  : t.onboarding.buttonProceed
              }
              handlePrevious={handlePrevious}
              isAbleToProceed={isAbleToProceed}
              previousText={step === 1 ? null : t.onboarding.buttonBack}
              handleSubmit={handleStepAction}
              isSubmitting={isSubmitting}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
