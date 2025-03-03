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
} from '@dallah/design-system'
import { MapPin, UploadCloudIcon } from 'lucide-react'
import { useState, type Dispatch } from 'react'
import AvatarUpload from '@components/shared/AvatarUpload'
import { motion } from 'motion/react'
import { fadeInVariants } from '@components/aniamtion/animate'
import { useProOnboarding } from '../../hooks/use-pro-onboarding'
import { RequiredIndicator } from '@components/shared/required-indicator'
import { ProOnboardingData } from '../../hooks/use-onboarding'

export function ProOnboardingOne({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData

  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const { isLoading, uploadedCV, setUploadedCV, cvData } = useProOnboarding({
    data,
    updateData,
    setIsAbleToProceed,
  })
  const [dragActive, setDragActive] = useState(false)

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
              console.log(url)
              console.log(data)
            }}
            initialURL={data.avatar}
            required={true}
          />
        </div>
        <div
          className={`w-full flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors ${
            isLoading
              ? 'border-slate-blue-100 bg-[#f8eacf]/10 opacity-70'
              : dragActive
                ? 'border-slate-blue-100 bg-[#f8eacf]/10'
                : uploadedCV
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
                setUploadedCV(file)
              }
            }
            input.click()
          }}
        >
          <div className="space-y-1 text-center">
            <div className="mx-auto w-fit rounded-lg border border-[#E4E7EC] p-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
              {isLoading ? (
                <div className="border-slate-blue-100 mx-auto h-6 w-6 animate-spin rounded-full border-4 border-t-transparent"></div>
              ) : (
                <UploadCloudIcon size={24} className="mx-auto" />
              )}
            </div>
            <p>
              <span className="text-slate-blue-90 font-semibold">
                {isLoading
                  ? 'Processing CV...'
                  : cvData
                    ? 'CV Uploaded Successfully'
                    : 'Upload Your CV'}
              </span>{' '}
              {!isLoading && !cvData && 'or drag and drop'}
            </p>
            {!isLoading && !cvData && (
              <p className="text-sm text-[#98a2b3]">PDF (max. 2MB)</p>
            )}
            {cvData && (
              <p className="text-sm text-green-600">
                Extracted details from {cvData.profile.name}'s CV
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4">
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
        <div className="relative w-full">
          <Label htmlFor="location">
            Location
            <RequiredIndicator />
          </Label>

          <MapPin className="absolute left-3 top-[2.1rem] h-5 w-5 text-gray-400" />
          <Input
            id="location"
            className="h-11 pl-10"
            placeholder="Location"
            type="name"
            value={data.meta.location}
            onChange={(e) =>
              updateData({
                ...data,
                meta: { ...data.meta, location: e.target.value },
              })
            }
          />
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
    </motion.div>
  )
}
