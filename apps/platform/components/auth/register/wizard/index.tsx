'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { StepOne } from './company/step-one'
import { StepTwo } from './company/step-two'
import { StepThree } from './company/step-three'
import { SuccessfulPopUp } from './company/successful-popup'
import { companyOnboarding } from '@lib/api/company/onboarding'

export interface CompanyOnboardingData {
  // Step 1
  focusArea: string[]
  // Step 2
  workPreference: string[]
  targetIndustry: string
  // Step 3
  website: string
  industry: string
  businessType: string
  companySize: string
  phoneNumber: string
  address: string
  logo: string | null
}

const initialData: CompanyOnboardingData = {
  focusArea: [],
  workPreference: [],
  targetIndustry: '',
  website: '',
  industry: '',
  businessType: '',
  companySize: '',
  phoneNumber: '',
  address: '',
  logo: null,
}

export function OnboardingWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1)
  const [data, setData] = useState<CompanyOnboardingData>(initialData)

  const handleNext = () => {
    if (step === 3) {
      setStep('success')
    } else {
      setStep((prev) => (prev === 'success' ? 1 : ((prev + 1) as 1 | 2 | 3)))
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your API
      console.log('Submitting data:', data)
      const res = await companyOnboarding({
        areas: data.focusArea,
        goals: data.workPreference,
        targetIndustries: [data.targetIndustry],
        website: data.website,
        location: data.address,
        logo: data.logo ?? undefined,
        meta: {
          phone: data.phoneNumber,
          size: data.companySize,
          type: data.businessType,
          industry: data.industry,
          socialLinks: {
            name: 'Facebook',
            url: 'https://facebook.com',
          },
        }
      })
      // if (res) {
      //   setStep('success')
      // }
      console.log('Response:', res)
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {step === 'success' ? (
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
        <div className="mx-auto max-w-[43rem] rounded-xl bg-[#FFFDF9] shadow-lg">
          <div className="h-2 overflow-hidden rounded-t-xl bg-[#F9E9CF]/50">
            <div
              className="h-full bg-sunshine-yellow transition-all duration-300 ease-in-out"
              style={{ width: `${(Number(step) / 3) * 100}%` }}
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
                  <StepOne
                    data={data}
                    updateData={setData}
                    onNext={handleNext}
                    onSkip={handleSkip}
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
                  <StepTwo
                    data={data}
                    updateData={setData}
                    onNext={handleNext}
                    onSkip={handleSkip}
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
                  <StepThree
                    data={data}
                    updateData={setData}
                    onSubmit={handleSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}