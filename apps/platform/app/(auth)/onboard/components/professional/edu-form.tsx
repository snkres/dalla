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
} from '@dallah/design-system'
import { motion } from 'motion/react'
import { fadeInVariants } from '@dallah/utils'
import { DatePicker } from './date-picker'

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
    "Bachelor's",
    "Master's",
    'Ph.D.',
    'Associate',
    'Diploma',
    'Certificate',
    'High School',
    'Other',
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
      alert('Please fill in all required fields')
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

      <h2 className="mb-1 text-center text-xl font-semibold">Add education</h2>
      <p className="mb-6 text-center text-gray-600">
        Share your educational background on your profile.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            School <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="School name"
              required
            />
          </div>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Degree <span className="text-red-500">*</span>
          </Label>
          <Select value={degree} onValueChange={(value) => setDegree(value)}>
            <SelectTrigger className="!h-11 w-full rounded-xl">
              <SelectValue placeholder="Select degree type" />
            </SelectTrigger>
            <SelectContent>
              {degreeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Field of Study <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="e.g. Computer Science, Business Administration"
            required
          />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Activities, societies, achievements, or relevant coursework"
            rows={4}
          />
        </div>

        <div>
          <Label className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isCurrentlyStudying}
              onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
            />
            <span className="text-gray-700">I'm currently studying here</span>
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              selectedMonth={startMonth}
              selectedYear={startYear}
              onMonthChange={setStartMonth}
              onYearChange={setStartYear}
              limitToCurrentYear={true}
              required
            />

            <DatePicker
              label="End Date"
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

        <div className="flex gap-2">
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="w-full"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="lg"
            className="text-sunshine-yellow-10 bg-coral-red-100 w-full border-[#CEB67B]"
            type="submit"
          >
            {initialData ? 'Update education' : 'Add education'}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}
