'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { companyOnboarding } from '@lib/api/company/onboarding'
import { proOnboarding } from '@lib/api/pro/onboarding'
import { CompanyOnboardingOne } from './(components)/company/one'
import { ButtonsContainer } from '@lib/constants/ButtonsContianer'
import { CompanyOnboardingTwo } from './(components)/company/two'
import { CompanyOnboardingThree } from './(components)/company/three'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { CompletionDialog } from './(components)/CompletionDialog'
import { useTransitionRouter } from 'next-view-transitions'

export interface CompanyOnboardingData {
  // Step 1
  targetIndustries: string[]
  // Step 3
  workPreference: string[]
  areas: string[]
  website: string
  industry: string
  businessType: string
  companySize: string
  phoneNumber: string
  address: string
  logo: string | null
  headline: string
  bio: string
}

export interface ProOnboardingData {
  headline: string
  resume: string
  gender: string
  bio: string
  avatar: string
  meta: {
    phone: string
    location: string
    yearsOfExperience: number
    skills: Array<string>
    socialLinks: { [key: string]: string }
  }
  experience: Array<{
    title: string
    company: string
    location: string
    meta: {
      skills: Array<string>
      achievements: string
      responsibilities: string
      employmentType: string
    }
    startDate: string
    endDate: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    description: string
  }>
}

export default function Page() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const router = useTransitionRouter()
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [companyData, setCompanyData] = useState<CompanyOnboardingData>({
    areas: [],
    targetIndustries: [],
    workPreference: [],
    website: '',
    industry: '',
    businessType: '',
    companySize: '',
    phoneNumber: '',
    address: '',
    logo: null,
    headline: '',
    bio: '',
  })
  const [proData, setProData] = useState<ProOnboardingData>({
    headline: '',
    resume: '',
    bio: '',
    education: [],
    experience: [],
    gender: '',
    avatar: '',
    meta: {
      location: '',
      phone: '',
      skills: [],
      socialLinks: {},
      yearsOfExperience: 0,
    },
  })

  const [mode, setMode] = useState('company')
  const [showProgress, setShowProgress] = useState(true)
  const companySteps = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const currentStep = step

  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMode(localStorage.getItem('mode') || '')
    }
  }, [])

  const handleSubmit = async () => {
    try {
      if (mode === 'company' && 'areas' in companyData!) {
        const res = await companyOnboarding({
          areas: companyData.areas,
          goals: companyData.workPreference,
          targetIndustries: companyData.targetIndustries,
          website: companyData.website,
          location: companyData.address,
          logo: companyData.logo ?? undefined,
          meta: {
            phone: companyData.phoneNumber,
            size: companyData.companySize,
            type: companyData.businessType,
            industry: companyData.industry,
            socialLinks: {
              name: 'Facebook',
              url: 'https://facebook.com',
            },
          },
        })
        if (res.success) {
          setShowCompleteDialog(true)
        }
      } else {
        console.log('Pro data:', proData.experience[0].startDate)
        const submittedData: ProOnboardingData = {
          headline: proData.headline || 'mmm',
          resume: proData.resume || 'mmm',
          bio: proData.bio || 'mmm',
          education: proData.education.map((edu) => ({
            school: edu.school || 'mmm',
            degree: edu.degree || 'mmm',
            field: edu.field || 'mmm',
            startDate:
              new Date(`${edu.startDate} 01`).toISOString() ||
              new Date().toISOString(),
            endDate:
              new Date(`${edu.endDate} 01`).toISOString() ||
              new Date().toISOString(),
            description: edu.description || 'mmm',
          })),
          experience: proData.experience.map((exp) => ({
            title: exp.title || 'mmm',
            company: exp.company || 'mmm',
            location: exp.location || 'mmm',
            meta: {
              skills: exp.meta.skills || ['mmm'],
              achievements: exp.meta.achievements || 'mmm',
              responsibilities: exp.meta.responsibilities || 'mmm',
              employmentType: exp.meta.employmentType || 'mmm',
            },
            startDate:
              new Date(`${exp.startDate} 01`).toISOString() ||
              new Date().toISOString(),
            endDate:
              new Date(`${exp.endDate} 01`).toISOString() ||
              new Date().toISOString(),
          })),
          gender: 'Male',
          avatar: proData.avatar || 'mmm',
          meta: {
            socialLinks: proData.meta.socialLinks || { mmm: 'mmm' },
            phone: proData.meta.phone || 'mmm',
            location: proData.meta.location || 'mmm',
            yearsOfExperience: proData.meta.yearsOfExperience || 0,
            skills: proData.meta.skills || ['mmm'],
          },
        }
        console.log('Submitting data:', proData)
        const res = await proOnboarding(submittedData)

        console.log(res)
        if (res.success) {
          setShowCompleteDialog(true)
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showCompleteDialog ? (
        <CompletionDialog
          onComplete={() => {
            router.push('/companies/meza')
          }}
          open={showCompleteDialog}
          onOpenChange={setShowCompleteDialog}
        />
      ) : mode === 'company' ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/80 pb-4 pt-2 backdrop-blur-sm">
            {showProgress && (
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
            )}
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
                    setData={setCompanyData}
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
            continueText={step === 3 ? 'Submit' : 'Proceed'}
            handlePrevious={() => {
              setStep((prev) =>
                prev === 1 ? 1 : (((prev as number) - 1) as 1 | 2 | 3 | 4),
              )
            }}
            previousText={step === 1 ? 'Skip' : 'Back'}
            handleSubmit={() => {
              if (step === 3) {
                handleSubmit()
              } else {
                setStep((prev) =>
                  prev === 3 ? 3 : (((prev as number) + 1) as 1 | 2 | 3),
                )
              }
            }}
            isSubmitting={false}
          />
        </div>
      ) : (
        // <div className="mx-auto max-w-[43rem] rounded-xl bg-[#FFFDF9] shadow-lg">
        //   <div className="h-2 overflow-hidden rounded-t-xl bg-coral-red-30">
        //     <div
        //       className="h-full bg-coral-red-100 transition-all duration-300 ease-in-out"
        //       style={{ width: `${(Number(step) / 4) * 100}%` }}
        //     />
        //   </div>
        //   <div className="py-6">
        //     <AnimatePresence mode="wait">
        //       {step === 1 && (
        //         <motion.div
        //           key="step1"
        //           initial={{ opacity: 0, x: -50 }}
        //           animate={{ opacity: 1, x: 0 }}
        //           exit={{ opacity: 0, x: 50 }}
        //           transition={{ duration: 0.3 }}
        //         >
        //           <ProWizardStepOne data={proData} updateData={setProData} handleNext={handleNext} />
        //         </motion.div>
        //       )}

        //       {step === 2 && (
        //         <motion.div
        //           key="step2"
        //           initial={{ opacity: 0, x: -50 }}
        //           animate={{ opacity: 1, x: 0 }}
        //           exit={{ opacity: 0, x: 50 }}
        //           transition={{ duration: 0.3 }}
        //         >
        //           <ProWizardStepTwo data={proData} updateData={setProData} handleNext={handleNext} />
        //         </motion.div>
        //       )}

        //       {step === 3 && (
        //         <motion.div
        //           key="step3"
        //           initial={{ opacity: 0, x: -50 }}
        //           animate={{ opacity: 1, x: 0 }}
        //           exit={{ opacity: 0, x: 50 }}
        //           transition={{ duration: 0.3 }}
        //         >
        //           <ProWizardStepThree
        //             data={proData}
        //             updateData={setProData}
        //             handleNext={handleNext}
        //           />
        //         </motion.div>
        //       )}

        //       {step === 4 && (
        //         <motion.div
        //           key="step4"
        //           initial={{ opacity: 0, x: -50 }}
        //           animate={{ opacity: 1, x: 0 }}
        //           exit={{ opacity: 0, x: 50 }}
        //           transition={{ duration: 0.3 }}
        //         >
        //           <ProWizardStepFour data={proData} updateData={setProData} onSubmit={handleSubmit} />
        //         </motion.div>
        //       )}
        //     </AnimatePresence>
        //   </div>
        // </div>
        <></>
      )}
    </AnimatePresence>
  )
}
