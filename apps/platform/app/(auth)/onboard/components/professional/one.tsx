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
} from '@dalla/design-system'
import { UploadCloudIcon, Linkedin, FileUp } from 'lucide-react'
import { useState, type Dispatch } from 'react'
import AvatarUpload from '@components/shared/avatar-upload'
import { motion } from 'motion/react'
import { fadeInVariants, cn } from '@dalla/utils'
import { useProfessionalOnboarding } from '../../hooks/use-professional-onboarding'
import { RequiredIndicator } from '@components/shared/required-indicator'
import { ProOnboardingData } from '../../hooks/use-onboarding'
import { LocationSelector } from '@dalla/components/locationSelector'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@dalla/design-system'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

export function ProOnboardingOne({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const t = useTranslation()
  const { locale } = useLocale()
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

  const formatExtractedText = (template: string, name: string | undefined) => {
    return name ? template.replace('{name}', name) : ''
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-6',
        locale === 'ar' ? 'text-right' : '',
      )}
    >
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className={cn('text-heading-sm mb-2 font-semibold text-[#1F4D5D]')}>
          {t.onboarding.proStep1.title}
        </h2>
        <p
          className={cn(
            'text-slate-blue-70 mt-1 text-xs',
            locale === 'ar' ? 'text-right' : '',
          )}
        >
          {t.onboarding.requiredFieldsNote}
        </p>
        <p
          className={cn(
            'text-paragraph-md text-slate-blue-90',
            locale === 'ar' ? 'text-right' : '',
          )}
        >
          {t.onboarding.proStep1.description}
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <Label className={cn('mb-1', locale === 'ar' ? 'text-right' : '')}>
            {t.onboarding.proStep1.avatarLabel}
          </Label>
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
                    ? t.onboarding.proStep1.uploadCVProcessing
                    : cvData && !isLinkedInUpload
                      ? t.onboarding.proStep1.uploadCVSuccess
                      : t.onboarding.proStep1.uploadCVLabel}
                </span>{' '}
                {(!cvData || isLinkedInUpload) &&
                  t.onboarding.proStep1.uploadCVHelpText}
              </p>
              <div className="h-6">
                {(!cvData || isLinkedInUpload) && (
                  <p className="text-sm text-[#98a2b3]">
                    {t.onboarding.proStep1.uploadCVFormat}
                  </p>
                )}
                {cvData && !isLinkedInUpload && (
                  <p className="text-sm text-green-600">
                    {formatExtractedText(
                      t.onboarding.proStep1.uploadCVExtracted,
                      cvData.profile.name,
                    )}
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
                    ? t.onboarding.proStep1.importLinkedInProcessing
                    : cvData && isLinkedInUpload
                      ? t.onboarding.proStep1.importLinkedInSuccess
                      : linkedInData
                        ? t.onboarding.proStep1.importLinkedInSuccess
                        : t.onboarding.proStep1.importLinkedInLabel}
                </span>
              </p>
              <div className="h-6">
                {!isLoading &&
                  !linkedInData &&
                  !(cvData && isLinkedInUpload) && (
                    <p className="text-sm text-[#98a2b3]">
                      {t.onboarding.proStep1.importLinkedInHelpText}
                    </p>
                  )}
                {!isLoading &&
                  (linkedInData || (cvData && isLinkedInUpload)) && (
                    <p className="text-sm text-[#0077B5]">
                      {formatExtractedText(
                        t.onboarding.proStep1.importLinkedInExtracted,
                        cvData && isLinkedInUpload
                          ? cvData.profile.name
                          : linkedInData?.profile.name,
                      )}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <div className="relative w-full">
          <div
            className={cn(
              'mb-1 flex w-full items-center',
              locale === 'ar' ? 'flex-row-reverse gap-0.5' : '',
            )}
          >
            <Label
              htmlFor="headline"
              className={cn('mb-1', locale === 'ar' ? 'text-right' : '')}
            >
              {t.onboarding.proStep1.headlineLabel}
            </Label>
            <RequiredIndicator />
          </div>
          <Input
            id="headline"
            className={cn('h-11', locale === 'ar' ? 'text-right' : '')}
            placeholder={t.onboarding.proStep1.headlinePlaceholder}
            type="name"
            value={data.headline}
            onChange={(e) => updateData({ ...data, headline: e.target.value })}
          />
        </div>
        <div className="relative w-full">
          <div
            className={cn(
              'mb-1 flex w-full items-center',
              locale === 'ar' ? 'flex-row-reverse gap-0.5' : '',
            )}
          >
            <Label htmlFor="location">
              {t.onboarding.proStep1.locationLabel}
            </Label>
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
              country: t.onboarding.proStep1.locationCountryPlaceholder,
              city: t.onboarding.proStep1.locationCityPlaceholder,
            }}
            required={true}
            className={cn(locale === 'ar' ? '!flex-row-reverse' : '')}
            selectClassName={cn(
              '!rounded-xl h-11',
              locale === 'ar' ? '!text-right flex-row-reverse gap-2' : '',
            )}
            showLabels={false}
          />
        </div>
        <div className="relative w-full">
          <div
            className={cn(
              'mb-1 flex w-full items-center',
              locale === 'ar' ? 'flex-row-reverse gap-0.5' : '',
            )}
          >
            <Label htmlFor="gender">{t.onboarding.proStep1.genderLabel}</Label>
            <RequiredIndicator />
          </div>
          <Select
            value={data.gender}
            onValueChange={(value: string) =>
              updateData({ ...data, gender: value })
            }
          >
            <SelectTrigger
              id="gender"
              className={cn(
                '!h-11',
                locale === 'ar' ? 'flex-row-reverse !text-right' : '',
              )}
            >
              <SelectValue
                placeholder={t.onboarding.proStep1.genderPlaceholder}
                className={cn(locale === 'ar' ? '!text-right' : '')}
              />
            </SelectTrigger>
            <SelectContent className={cn(locale === 'ar' ? 'text-end' : '')}>
              <SelectItem value="Male">
                {t.onboarding.proStep1.genderMale}
              </SelectItem>
              <SelectItem value="Female">
                {t.onboarding.proStep1.genderFemale}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <div
            className={cn(
              'mb-1 flex items-center',
              locale === 'ar' ? 'flex-row-reverse gap-0.5' : '',
            )}
          >
            <Label htmlFor="bio">{t.onboarding.proStep1.bioLabel}</Label>
            <RequiredIndicator />
          </div>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => updateData({ ...data, bio: e.target.value })}
            placeholder={t.onboarding.proStep1.bioPlaceholder}
            className={cn('h-28', locale === 'ar' ? 'text-right' : '')}
          />
        </div>
      </div>

      <Dialog open={showLinkedInDialog} onOpenChange={setShowLinkedInDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t.onboarding.proStep1.linkedInDialog.title}
            </DialogTitle>
            <DialogDescription>
              {t.onboarding.proStep1.linkedInDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0077B5] text-xs text-white">
                  1
                </span>
                {t.onboarding.proStep1.linkedInDialog.downloadStepTitle}
              </h3>
              <ol className="ml-7 list-decimal text-sm text-gray-600">
                <li className="mb-1">
                  {t.onboarding.proStep1.linkedInDialog.downloadStep1}
                </li>
                <li className="mb-1">
                  {t.onboarding.proStep1.linkedInDialog.downloadStep2}
                </li>
                <li className="mb-1">
                  {t.onboarding.proStep1.linkedInDialog.downloadStep3}
                </li>
                <li className="mb-1">
                  {t.onboarding.proStep1.linkedInDialog.downloadStep4}
                </li>
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
                  {t.onboarding.proStep1.linkedInDialog.goToLinkedInButton}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0077B5] text-xs text-white">
                  2
                </span>
                {t.onboarding.proStep1.linkedInDialog.uploadStepTitle}
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                {t.onboarding.proStep1.linkedInDialog.uploadStepDescription}
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
                  {t.onboarding.proStep1.linkedInDialog.uploadButton}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-md bg-blue-50 p-3 text-xs text-blue-800">
            <p>
              <strong>{t.onboarding.proStep1.linkedInDialog.tipTitle}</strong>{' '}
              {t.onboarding.proStep1.linkedInDialog.tipDescription}
            </p>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLinkedInDialog(false)}
            >
              {t.onboarding.proStep1.linkedInDialog.closeButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
