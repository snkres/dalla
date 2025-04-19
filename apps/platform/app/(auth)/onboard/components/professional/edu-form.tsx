'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, School } from 'lucide-react'
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { motion } from 'motion/react'
import { fadeInVariants } from '@dalla/utils'
import { DatePicker } from './date-picker'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'
import { cn } from '@dalla/utils'
interface EducationFormProps {
  onSubmit: (education: any) => void
  onCancel: () => void
  initialData?: any
}

export function EducationForm({
  onSubmit,
  onCancel,
  initialData,
}: EducationFormProps) {
  const t = useTranslation()
  const { locale } = useLocale()
  const [school, setSchool] = useState(initialData?.school || '')
  const [degree, setDegree] = useState(initialData?.degree || '')
  const [field, setField] = useState(initialData?.field || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(
    initialData?.endDate === 'Present' || false,
  )
  const [startMonth, setStartMonth] = useState(
    initialData?.startDate ? initialData.startDate.split(' ')[0] : '',
  )
  const [startYear, setStartYear] = useState(
    initialData?.startDate ? initialData.startDate.split(' ')[1] : '',
  )
  const [endMonth, setEndMonth] = useState(
    initialData?.endDate && initialData.endDate !== 'Present'
      ? initialData.endDate.split(' ')[0]
      : '',
  )
  const [endYear, setEndYear] = useState(
    initialData?.endDate && initialData.endDate !== 'Present'
      ? initialData.endDate.split(' ')[1]
      : '',
  )
  const [degreeTypeOpen, setDegreeTypeOpen] = useState(false)

  const degreeTypes = [
    t.onboarding.proStep4.educationForm.degreeTypeBachelors,
    t.onboarding.proStep4.educationForm.degreeTypeMasters,
    t.onboarding.proStep4.educationForm.degreeTypePhd,
    t.onboarding.proStep4.educationForm.degreeTypeAssociate,
    t.onboarding.proStep4.educationForm.degreeTypeDiploma,
    t.onboarding.proStep4.educationForm.degreeTypeCertificate,
    t.onboarding.proStep4.educationForm.degreeTypeHighSchool,
    t.onboarding.proStep4.educationForm.degreeTypeOther,
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !school ||
      !degree ||
      !field ||
      !startMonth ||
      !startYear ||
      ((!endMonth || !endYear) && !isCurrentlyStudying)
    ) {
      alert(t.onboarding.proStep4.educationForm.validationAlert)
      return
    }

    const formData = {
      school,
      degree,
      field,
      description,
      startDate: `${startMonth} ${startYear}`,
      endDate: isCurrentlyStudying ? 'Present' : `${endMonth} ${endYear}`,
    }

    onSubmit(formData)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-h-[80vh] overflow-y-auto p-8"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-2 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
          <School />
        </div>
      </div>

      <h2 className="mb-1 text-center text-xl font-semibold">
        {t.onboarding.proStep4.educationForm.title}
      </h2>
      <p className="mb-6 text-center text-gray-600">
        {t.onboarding.proStep4.educationForm.description}
      </p>

      <div className="space-y-6">
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            {t.onboarding.proStep4.educationForm.schoolLabel}{' '}
            <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder={
                t.onboarding.proStep4.educationForm.schoolPlaceholder
              }
              required
            />
          </div>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            {t.onboarding.proStep4.educationForm.degreeLabel}{' '}
            <span className="text-red-500">*</span>
          </Label>
          <Select value={degree} onValueChange={(value) => setDegree(value)}>
            <SelectTrigger
              className={cn(
                locale === 'ar' ? 'flex-row-reverse' : '',
                '!h-11 w-full rounded-xl',
              )}
            >
              <SelectValue
                placeholder={
                  t.onboarding.proStep4.educationForm.degreePlaceholder
                }
              />
            </SelectTrigger>
            <SelectContent
              className={cn(locale === 'ar' ? 'flex-row-reverse' : '')}
            >
              {degreeTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className={cn(
                    locale === 'ar' ? 'flex-row-reverse' : '',
                    '!h-11 w-full rounded-xl',
                  )}
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            {t.onboarding.proStep4.educationForm.fieldLabel}{' '}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder={t.onboarding.proStep4.educationForm.fieldPlaceholder}
            required
          />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            {t.onboarding.proStep4.educationForm.descriptionLabel}{' '}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              t.onboarding.proStep4.educationForm.descriptionPlaceholder
            }
            rows={4}
          />
        </div>

        <div>
          <Label className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrentlyStudying}
              onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
            />
            <span className="text-gray-700">
              {t.onboarding.proStep4.educationForm.currentlyStudyingLabel}
            </span>
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label={t.onboarding.proStep4.educationForm.startDateLabel}
              selectedMonth={startMonth}
              selectedYear={startYear}
              onMonthChange={setStartMonth}
              onYearChange={setStartYear}
              limitToCurrentYear={true}
              required
            />

            <DatePicker
              label={t.onboarding.proStep4.educationForm.endDateLabel}
              selectedMonth={endMonth}
              selectedYear={endYear}
              onMonthChange={setEndMonth}
              onYearChange={setEndYear}
              disabled={isCurrentlyStudying}
              limitToCurrentYear={true}
              required
            />
          </div>
        </div>

        <div
          className={cn(
            locale === 'ar' ? 'flex-row-reverse' : '',
            'flex gap-2',
          )}
        >
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="w-full"
            type="button"
          >
            {t.onboarding.proStep4.educationForm.cancelButton}
          </Button>
          <Button
            variant="default"
            size="lg"
            className="text-sunshine-yellow-10 bg-coral-red-100 w-full border-[#CEB67B]"
            type="submit"
          >
            {initialData
              ? t.onboarding.proStep4.educationForm.updateButton
              : t.onboarding.proStep4.educationForm.addButton}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}
