// 'use client'

// import { use, useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'motion/react'
// import { StepOne } from './company/step-one'
// import { StepTwo } from './company/step-two'
// import { StepThree } from './company/step-three'
// import { SuccessfulPopUp } from './company/successful-popup'
// import { companyOnboarding } from '@lib/api/company/onboarding'
// import { ProWizardStepOne } from './pro/step-one'
// import { ProWizardStepTwo } from './pro/step-two'

// export interface CompanyOnboardingData {
//   // Step 1
//   targetIndustries: string[]
//   // Step 2
//   workPreference: string[]
//   areas: string[]
//   // Step 3
//   website: string
//   industry: string
//   businessType: string
//   companySize: string
//   phoneNumber: string
//   address: string
//   logo: string | null
// }

// export interface ProOnboardingData {
//   headline: string
//   resume: string
//   gender: string
//   bio: string
//   meta: {
//     phone: string
//     location: string
//     yearsOfExperience: number
//     skills: Array<string>
//     socialLinks: Array<string>
//   }
//   experience: Array<{
//     title: string
//     company: string
//     location: string
//     meta: {
//       skills: Array<string>
//       achievements: string
//       responsibilities: string
//       employmentType: string
//     }
//     startDate: string
//     endDate: string
//   }>
//   education: Array<{
//     school: string
//     degree: string
//     field: string
//     startDate: string
//     endDate: string
//     description: string
//   }>
// }

// export function OnboardingWizard() {
//   const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1)
//   const [data, setData] = useState<CompanyOnboardingData>({
//     areas: [],
//     workPreference: [],
//     targetIndustries: [],
//     website: '',
//     industry: '',
//     businessType: '',
//     companySize: '',
//     phoneNumber: '',
//     address: '',
//     logo: null,
//   })
//   const [proData, setProData] = useState<ProOnboardingData>({
//     headline: '',
//     resume: '',
//     bio: '',
//     education: [],
//     experience: [],
//     gender: '',
//     meta: {
//       location: '',
//       phone: '',
//       skills: [],
//       socialLinks: [],
//       yearsOfExperience: 0,
//     },
//   })
//   const [mode, setMode] = useState('')

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setMode(localStorage.getItem('mode') || '')
//     }
//   }, [])

//   const handleNext = () => {
//     if (step === 3) {
//       setStep('success')
//     } else {
//       setStep((prev) => (prev === 'success' ? 1 : ((prev + 1) as 1 | 2 | 3)))
//     }
//   }

//   const handleSkip = () => {
//     handleNext()
//   }

//   const handleSubmit = async () => {
//     try {
//       console.log('Submitting data:', data)

//       if (mode === 'company' && 'focusArea' in data!) {
//         const res = await companyOnboarding({
//           areas: data.areas,
//           goals: data.workPreference,
//           targetIndustries: data.targetIndustries,
//           website: data.website,
//           location: data.address,
//           logo: data.logo ?? undefined,
//           meta: {
//             phone: data.phoneNumber,
//             size: data.companySize,
//             type: data.businessType,
//             industry: data.industry,
//             socialLinks: {
//               name: 'Facebook',
//               url: 'https://facebook.com',
//             },
//           },
//         })
//         console.log('Response:', res)
//       } else {
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error)
//     }
//   }

//   return (
//     <AnimatePresence mode="wait">
//       {step === 'success' ? (
//         <motion.div
//           key="success"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.5 }}
//         >
//           <SuccessfulPopUp />
//         </motion.div>
//       ) : mode === 'company' ? (
//         <div className="mx-auto max-w-[43rem] rounded-xl bg-[#FFFDF9] shadow-lg">
//           <div className="h-2 overflow-hidden rounded-t-xl bg-[#F9E9CF]/50">
//             <div
//               className="bg-sunshine-yellow h-full transition-all duration-300 ease-in-out"
//               style={{ width: `${(Number(step) / 3) * 100}%` }}
//             />
//           </div>
//           <div className="py-6">
//             <AnimatePresence mode="wait">
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <StepOne
//                     data={data as CompanyOnboardingData}
//                     updateData={setData}
//                     onNext={handleNext}
//                     onSkip={handleSkip}
//                   />
//                 </motion.div>
//               )}

//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <StepTwo
//                     data={data as CompanyOnboardingData}
//                     updateData={setData}
//                     onNext={handleNext}
//                     onSkip={handleSkip}
//                   />
//                 </motion.div>
//               )}

//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <StepThree
//                     data={data as CompanyOnboardingData}
//                     updateData={setData}
//                     onSubmit={handleSubmit}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       ) : (
//         <div className="mx-auto max-w-[43rem] rounded-xl bg-[#FFFDF9] shadow-lg">
//           <div className="bg-coral-red-30 h-2 overflow-hidden rounded-t-xl">
//             <div
//               className="bg-coral-red-100 h-full transition-all duration-300 ease-in-out"
//               style={{ width: `${(Number(step) / 3) * 100}%` }}
//             />
//           </div>
//           <div className="py-6">
//             <AnimatePresence mode="wait">
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ProWizardStepOne
//                     data={proData}
//                     updateData={setProData}
//                     handleNext={handleNext}
//                   />
//                 </motion.div>
//               )}

//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ProWizardStepTwo
//                     data={proData}
//                     updateData={setProData}
//                     handleNext={handleNext}
//                   />
//                 </motion.div>
//               )}

//               {/* {step === 3 && (
//                   <motion.div
//                     key="step3"
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 50 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <StepThree
//                       data={data}
//                       updateData={setData}
//                       onSubmit={handleSubmit}
//                     />
//                   </motion.div>
//                 )} */}
//             </AnimatePresence>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   )
// }
