'use client'

import type React from 'react'
import {
  Input,
  Label,
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
  Textarea,
  Button,
} from '@dallah/design-system'
import { MapPin, UploadCloudIcon, Linkedin, FileUp } from 'lucide-react'
import { useState, type Dispatch, useCallback } from 'react'
import AvatarUpload from '@components/shared/avatar-upload'
import { motion } from 'motion/react'
import { fadeInVariants } from '@dallah/utils'
import { useProfessionalOnboarding } from '../../hooks/use-professional-onboarding'
import { RequiredIndicator } from '@components/shared/required-indicator'
import { ProOnboardingData } from '../../hooks/use-onboarding'
import { LocationSelector } from '@dallah/components/locationSelector'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@dallah/design-system'

export function ProOnboardingOne({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData

  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const { isLoading, uploadedCV, setUploadedCV, cvData } =
    useProfessionalOnboarding({
      data,
      updateData,
      setIsAbleToProceed,
      currentStep: 1,
    })
  const [dragActive, setDragActive] = useState(false)
  const [linkedInData, setLinkedInData] = useState<null | {
    profile: { name: string }
  }>(null)
  const [showLinkedInDialog, setShowLinkedInDialog] = useState(false)
  const [isLinkedInUpload, setIsLinkedInUpload] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-6"
    >
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Finalize Your Profile
        </h2>
        <p className="text-slate-blue-70 mt-1 text-xs">
          Fields marked with <span className="text-red-500">*</span> are
          required
        </p>
        <p className="text-paragraph-md text-slate-blue-90">
          Whether you're a professional or a company, Dalla connects you to
          endless opportunities in consulting and collaboration.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <AvatarUpload
            setUploadedURL={(url: string) => {
              updateData({ ...data, avatar: url })
            }}
            initialURL={data.avatar}
            required={true}
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div
            className={`flex min-h-[160px] w-full flex-1 cursor-pointer flex-col justify-center rounded-lg border-2 border-solid p-6 transition-colors ${
              isLoading && !isLinkedInUpload
                ? 'border-slate-blue-100 bg-[#f8eacf]/10 opacity-70'
                : dragActive
                  ? 'border-slate-blue-100 bg-[#f8eacf]/10'
                  : uploadedCV && !isLinkedInUpload
                    ? 'border-slate-blue-100 bg-[#f8eacf]/5'
                    : 'border-[#E4E7EC]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
              setIsLinkedInUpload(false)
              const file = e.dataTransfer.files[0]
              if (file) {
                setUploadedCV(file)
              }
            }}
            onClick={() => {
              if (isLoading) return
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'application/pdf'
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  setIsLinkedInUpload(false)
                  setUploadedCV(file)
                }
              }
              input.click()
            }}
          >
            <div className="w-full space-y-1 text-center">
              <div className="mx-auto w-fit rounded-lg border border-[#E4E7EC] p-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                {isLoading && !isLinkedInUpload ? (
                  <div className="border-slate-blue-100 mx-auto h-6 w-6 animate-spin rounded-full border-4 border-t-transparent"></div>
                ) : (
                  <UploadCloudIcon size={24} className="mx-auto" />
                )}
              </div>
              <p>
                <span className="text-slate-blue-90 font-semibold">
                  {isLoading && !isLinkedInUpload
                    ? 'Processing CV...'
                    : cvData && !isLinkedInUpload
                      ? 'CV Uploaded Successfully'
                      : 'Upload Your CV'}
                </span>{' '}
                {!isLoading &&
                  (!cvData || isLinkedInUpload) &&
                  'or drag and drop'}
              </p>
              <div className="h-6">
                {!isLoading && (!cvData || isLinkedInUpload) && (
                  <p className="text-sm text-[#98a2b3]">PDF (max. 2MB)</p>
                )}
                {cvData && !isLinkedInUpload && (
                  <p className="text-sm text-green-600">
                    Extracted details from {cvData.profile.name}'s CV
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`flex min-h-[160px] w-full flex-1 cursor-pointer flex-col justify-center rounded-lg border-2 border-solid p-6 transition-colors ${
              isLoading && isLinkedInUpload
                ? 'border-[#0077B5] bg-[#0077B5]/5 opacity-70'
                : linkedInData || (cvData && isLinkedInUpload)
                  ? 'border-[#0077B5] bg-[#0077B5]/5'
                  : 'border-[#E4E7EC]'
            }`}
            onClick={
              !linkedInData && !isLoading && !cvData && !isLinkedInUpload
                ? () => setShowLinkedInDialog(true)
                : undefined
            }
          >
            <div className="w-full space-y-1 text-center">
              <div className="mx-auto w-fit rounded-lg border border-[#E4E7EC] p-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                {isLoading && isLinkedInUpload ? (
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-4 border-[#0077B5] border-t-transparent"></div>
                ) : (
                  <Linkedin size={24} className="mx-auto text-[#0077B5]" />
                )}
              </div>
              <p>
                <span className="text-slate-blue-90 font-semibold">
                  {isLoading && isLinkedInUpload
                    ? 'Processing LinkedIn PDF...'
                    : cvData && isLinkedInUpload
                      ? 'LinkedIn Profile Imported'
                      : linkedInData
                        ? 'LinkedIn Profile Imported'
                        : 'Import from LinkedIn'}
                </span>
              </p>
              <div className="h-6">
                {!isLoading &&
                  !linkedInData &&
                  !(cvData && isLinkedInUpload) && (
                    <p className="text-sm text-[#98a2b3]">
                      Download and upload your LinkedIn profile
                    </p>
                  )}
                {!isLoading &&
                  (linkedInData || (cvData && isLinkedInUpload)) && (
                    <p className="text-sm text-[#0077B5]">
                      Imported details from{' '}
                      {cvData && isLinkedInUpload
                        ? cvData.profile.name
                        : linkedInData?.profile.name}
                      's LinkedIn
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="headline">Headline</Label>
            <RequiredIndicator />
          </div>
          <Input
            id="headline"
            className="h-11"
            placeholder="Headline"
            type="name"
            value={data.headline}
            onChange={(e) => updateData({ ...data, headline: e.target.value })}
          />
        </div>
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="location">Location</Label>
            <RequiredIndicator />
          </div>
          <LocationSelector
            value={data.meta.location}
            onChange={(location) =>
              updateData({
                ...data,
                meta: { ...data.meta, location },
              })
            }
            placeholder={{
              country: 'Country',
              city: 'City',
            }}
            required={true}
            selectClassName="!rounded-xl h-11"
          />
        </div>
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="gender">Gender</Label>
            <RequiredIndicator />
          </div>
          <Select
            value={data.gender}
            onValueChange={(value: string) =>
              updateData({ ...data, gender: value })
            }
          >
            <SelectTrigger id="gender" className="!h-11">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="bio">Bio</Label>
            <RequiredIndicator />
          </div>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => updateData({ ...data, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="h-28"
          />
        </div>
      </div>

      <Dialog open={showLinkedInDialog} onOpenChange={setShowLinkedInDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import LinkedIn Profile</DialogTitle>
            <DialogDescription>
              Follow these steps to import your LinkedIn profile data
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0077B5] text-xs text-white">
                  1
                </span>
                Download your profile from LinkedIn
              </h3>
              <ol className="ml-7 list-decimal text-sm text-gray-600">
                <li className="mb-1">Go to your LinkedIn profile</li>
                <li className="mb-1">
                  Click the "Resources" button below your profile header
                </li>
                <li className="mb-1">Select "Save to PDF"</li>
                <li className="mb-1">Save the PDF file to your computer</li>
              </ol>
              <div className="mt-2 text-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open('https://www.linkedin.com/in/me/', '_blank')
                  }
                  className="mt-2 gap-2 text-sm"
                >
                  <Linkedin size={16} className="text-[#0077B5]" />
                  Go to LinkedIn
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0077B5] text-xs text-white">
                  2
                </span>
                Upload your LinkedIn PDF
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                Upload the PDF to automatically fill your profile information
              </p>
              <div className="text-center">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowLinkedInDialog(false)
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'application/pdf'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        setIsLinkedInUpload(true)
                        setUploadedCV(file)
                      }
                    }
                    input.click()
                  }}
                  className="gap-2"
                >
                  <FileUp size={16} />
                  Upload LinkedIn PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-md bg-blue-50 p-3 text-xs text-blue-800">
            <p>
              <strong>Tip:</strong> LinkedIn PDFs contain your complete
              professional history including education and experience details.
            </p>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLinkedInDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
