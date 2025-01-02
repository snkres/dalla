'use client'

import { Button } from '@dallah/design-system'
import { CompanyWizardStepOne } from './company/step-one'
import { CompanyWizardStepTwo } from './company/step-two'
import { CompanyWizardStepThird } from './company/step-third'
import { useState } from 'react'
import { SuccessfulPopUp } from './company/successful-popup'
import { motion, AnimatePresence } from 'motion/react'

interface OnboardingData {
  focusArea: string[]
  workPreference: string[]
  targetIndustry: string
  country: string
  phoneNumber: string
  address: string
  image: string | null
}

export function OnboardingWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | true>(1)
  const [data, setData] = useState<OnboardingData>({
    focusArea: [],
    workPreference: [],
    targetIndustry: '',
    country: '',
    phoneNumber: '',
    address: '',
    image: null,
  })

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) =>
      prev === 3 ? true : (Math.min((prev as 1 | 2 | 3) + 1, 3) as 1 | 2 | 3),
    )
  }

  const handleSkip = () => {
    setStep((prev) =>
      prev === true ? 1 : (Math.min(prev + 1, 3) as 1 | 2 | 3),
    )
  }

  return (
    <AnimatePresence mode="wait">
      {step === true ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessfulPopUp />
        </motion.div>
      ) : (
        <>
          <div className="mx-auto mb-12 max-w-2xl">
            <h1 className="text-sunshine-yellow mb-4 text-center text-4xl font-semibold">
              {step === 1 && 'Select Your Focus Area'}
              {step === 2 && 'Define Your Goals or Needs'}
              {step === 3 && 'Add Key Details'}
            </h1>
            <p className="text-center text-white/90">
              {step === 1 &&
                'Let us know your expertise to connect you with relevant projects.'}
              {step === 2 &&
                'Define how you want to work and your target clients.'}
              {step === 3 &&
                'Add the finishing touches to showcase your profile to potential clients'}
            </p>
          </div>
          <div className="mx-auto max-w-3xl rounded-xl border bg-white">
            <div className="h-2 overflow-hidden rounded-t-xl bg-gray-200">
              <div
                className="bg-sunshine-yellow h-full transition-all duration-300 ease-in-out"
                style={{ width: `${((step as 1 | 2 | 3) / 3) * 100}%` }}
              />
            </div>
            <div className="p-16">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CompanyWizardStepOne data={data} updateData={updateData} />
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
                    <CompanyWizardStepTwo data={data} updateData={updateData} />
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
                    <CompanyWizardStepThird
                      data={data}
                      updateData={updateData}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  size="lg"
                  className="text-text-md"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleNext}
                  variant="default"
                  size="lg"
                  className="text-text-md rounded-xl"
                >
                  {step === 3 ? 'Complete Setup' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
