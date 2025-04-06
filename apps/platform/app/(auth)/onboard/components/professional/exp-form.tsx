'use client'

import React, { useState } from 'react'
import { Briefcase, MapPin } from 'lucide-react'
import {
  Button,
  Input,
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  Textarea,
  Label,
} from '@dallah/design-system'
import { motion } from 'motion/react'
import { fadeInVariants } from '@dallah/utils'
import { DatePicker } from './date-picker'
import { Tag, TagInput } from 'emblor'
import { LocationSelector } from '@dallah/components/locationSelector'

interface Tool {
  id: string
  name: string
}

interface ExperienceFormProps {
  onSubmit: (experience: any) => void
  onCancel: () => void
  initialData?: {
    title: string
    company: string
    location: string
    meta: {
      skills: Array<Tag>
      achievements: string
      responsibilities: string
      employmentType: string
    }
    startDate: string
    endDate: string
  }
}

export function ExperienceForm({
  onSubmit,
  onCancel,
  initialData,
}: ExperienceFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [company, setCompany] = useState(initialData?.company || '')
  const [location, setLocation] = useState(initialData?.location || '')
  const [employmentType, setEmploymentType] = useState(
    initialData?.meta?.employmentType || 'Full time',
  )
  const [responsibilities, setResponsibilities] = useState(
    initialData?.meta?.responsibilities || '',
  )
  const [achievements, setAchievements] = useState(
    initialData?.meta.achievements || '',
  )
  const [selectedTools, setSelectedTools] = useState<Tag[]>(
    initialData?.meta.skills || [],
  )
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(
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

  const employmentTypes = [
    'Full-time',
    'Part-time',
    'Self-employed',
    'Freelance',
    'Contract',
    'Internship',
    'Apprenticeship',
    'Seasonal',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !title ||
      !company ||
      !startMonth ||
      !startYear ||
      ((!endMonth || !endYear) && !isCurrentlyWorking)
    ) {
      alert('Please fill in all required fields')
      return
    }

    const formData = {
      title,
      company,
      location,
      meta: {
        employmentType,
        responsibilities,
        achievements,
        skills: selectedTools.map((tool) => tool.text),
      },
      startDate: `${startMonth} ${startYear}`,
      endDate: isCurrentlyWorking ? 'Present' : `${endMonth} ${endYear}`,
    }

    console.log(formData)
    onSubmit(formData)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="custom-scrollbar max-h-[80vh] overflow-y-auto p-8"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-2 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
          <Briefcase />
        </div>
      </div>

      <h2 className="mb-1 text-center text-xl font-semibold">Add experience</h2>
      <p className="mb-6 text-center text-gray-600">
        Share where you've worked on your profile.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Job Title <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is your job title?"
            required
          />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Company <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Search for company"
              required
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <Label className="mb-1 block text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </Label>
            <LocationSelector
              value={location}
              onChange={setLocation}
              placeholder={{
                country: 'Select country',
                city: "Select city or 'Remote'",
              }}
              required={true}
              selectClassName="!rounded-xl h-11 [&_span]:!text-sm"
            />
          </div>
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Employment Type <span className="text-red-500">*</span>
          </Label>
          <Select
            value={employmentType}
            onValueChange={(value) => setEmploymentType(value)}
          >
            <SelectTrigger className="!h-11 w-full rounded-xl">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {employmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Tools & Skills
          </Label>
          <TagInput
            id="skills"
            tags={selectedTools}
            setTags={(newTags) => {
              setSelectedTools(newTags)
            }}
            placeholder="Add tools or skills, separated by comma"
            styleClasses={{
              tagList: {
                container: 'gap-1',
              },
              input:
                '!rounded-xl !h-11 !transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
              tag: {
                body: 'relative !h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs !ps-2 !pe-7',
                closeButton:
                  'absolute -inset-y-px end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
              },
            }}
            inlineTags={false}
            inputFieldPosition="top"
            activeTagIndex={null}
            setActiveTagIndex={(value) => {}}
          />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Responsibilities <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
            rows={4}
          />
        </div>

        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Achievements <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="e.g. Increased customer satisfaction by 25% through implementing a new onboarding process."
            rows={4}
          />
        </div>

        <div>
          <Label className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isCurrentlyWorking}
              onChange={(e) => setIsCurrentlyWorking(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">
              I'm currently still working here
            </span>
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
              disabled={isCurrentlyWorking}
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
            {initialData ? 'Update experience' : 'Add experience'}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}
