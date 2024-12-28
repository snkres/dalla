'use client'

import * as React from 'react'
import { ChevronDown, Upload, X } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'

interface OnboardingData {
  focusArea: string[]
  workPreference: string[]
  targetIndustry: string
  country: string
  phoneNumber: string
  address: string
}

export function OnboardingWizard() {
  const [step, setStep] = React.useState(1)
  const [data, setData] = React.useState<OnboardingData>({
    focusArea: [],
    workPreference: [],
    targetIndustry: '',
    country: '',
    phoneNumber: '',
    address: '',
  })

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handleSkip = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  return (
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
          {step === 2 && 'Define how you want to work and your target clients.'}
          {step === 3 &&
            'Add the finishing touches to showcase your profile to potential clients'}
        </p>
      </div>
      <div className="mx-auto max-w-3xl rounded-xl border bg-white">
        <div className="h-2 overflow-hidden rounded-t-xl bg-gray-200">
          <div
            className="bg-sunshine-yellow h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="p-16">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
                  What is your focus area?
                </h2>
                <p className="text-paragraph-md text-gray-500">
                  Make a selection below
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  'Cultural Consulting',
                  'Corporate Strategy',
                  'Sports Management',
                  'Franchising',
                  'Arts & Creativity',
                  'Others',
                ].map((area) => (
                  <Button
                    key={area}
                    variant={
                      data.focusArea.includes(area) ? 'default' : 'outline'
                    }
                    onClick={() => {
                      const newAreas = data.focusArea.includes(area)
                        ? data.focusArea.filter((a) => a !== area)
                        : [...data.focusArea, area]
                      updateData('focusArea', newAreas)
                    }}
                    className={cn(
                      'h-auto justify-start !rounded-full px-6 py-4',
                      !data.focusArea.includes(area)
                        ? 'bg-transparent'
                        : 'text-sunshine-yellow',
                    )}
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
                  What are your goals or needs?
                </h2>
                <p className="text-gray-500">Make a selection below</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  'Remote Projects',
                  'On-Site Work',
                  'Short-Term Projects',
                  'Long-Term Collaborations',
                ].map((pref) => (
                  <Button
                    key={pref}
                    variant={
                      data.workPreference.includes(pref) ? 'default' : 'outline'
                    }
                    onClick={() => {
                      const newPrefs = data.workPreference.includes(pref)
                        ? data.workPreference.filter((p) => p !== pref)
                        : [...data.workPreference, pref]
                      updateData('workPreference', newPrefs)
                    }}
                    className={cn(
                      'h-auto justify-start !rounded-full px-6 py-4',
                      !data.workPreference.includes(pref)
                        ? 'bg-transparent'
                        : 'text-sunshine-yellow',
                    )}
                  >
                    {pref}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Industries</label>
                <Select
                  value={data.targetIndustry}
                  onValueChange={(value) => updateData('targetIndustry', value)}
                >
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">
                      Cultural Consulting
                    </SelectItem>
                    <SelectItem value="corporate">
                      Corporate Strategy
                    </SelectItem>
                    <SelectItem value="sports">Sports Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
                  Finalize Your Profile
                </h2>
                <div className="mb-8 mt-6">
                  <div className="relative mx-auto h-24 w-24 rounded-full bg-gray-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-0 right-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    placeholder="Your country"
                    value={data.country}
                    onChange={(e) => updateData('country', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    placeholder="Your phone number"
                    value={data.phoneNumber}
                    onChange={(e) => updateData('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    placeholder="Your address"
                    value={data.address}
                    onChange={(e) => updateData('address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

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
  )
}
