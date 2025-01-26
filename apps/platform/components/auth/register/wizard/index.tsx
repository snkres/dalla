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
          <div className="mx-auto max-w-[43rem] rounded-xl  bg-[#FFFDF9] shadow-lg ">
            <div className="h-2 overflow-hidden rounded-t-xl bg-[#F9E9CF]/50">
              <div
                className="bg-sunshine-yellow h-full transition-all duration-300 ease-in-out"
                style={{ width: `${((step as 1 | 2 | 3) / 3) * 100}%` }}
              />
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

              <div className=" flex items-center justify-center gap-4 px-6">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  size="lg"
                  className="text-text-lg w-full "
                >
                  Skip
                </Button>
                <Button
                  onClick={handleNext}
                  variant="default"
                  size="lg"

                  className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)]  flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.125rem] border-solid border-[#CEB67B] bg-[#F4D283] stroke-[2px] px-[1rem] py-[10px] shadow-sm"
                  type="submit"
                  style={{
                    boxShadow: '0px -2px 1px 1px rgba(16, 24, 40, 0.05) inset',
                  }}
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
