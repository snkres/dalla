'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, X, Plus, MapPin } from 'lucide-react'
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
import { fadeInVariants } from '@components/aniamtion/animate'
import { DatePicker } from './date-picker'

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
      skills: Array<string>
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
  const [selectedTools, setSelectedTools] = useState<Tool[]>(
    initialData?.meta.skills
      ? initialData.meta.skills.map((skill: string | Tool) =>
          typeof skill === 'string' ? { id: skill, name: skill } : skill,
        )
      : [
          { id: '1', name: 'Figma' },
          { id: '2', name: 'Jira' },
        ],
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
  const [toolInput, setToolInput] = useState('')

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

  const removeTool = (toolId: string) => {
    setSelectedTools((tools) => tools.filter((tool) => tool.id !== toolId))
  }

  const addTool = () => {
    if (toolInput.trim()) {
      const newTool = {
        id: Date.now().toString(),
        name: toolInput.trim(),
      }
      setSelectedTools((prev) => [...prev, newTool])
      setToolInput('')
    }
  }

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
      },
      responsibilities,
      achievements,
      tools: selectedTools,
      startDate: `${startMonth} ${startYear}`,
      endDate: isCurrentlyWorking ? 'Present' : `${endMonth} ${endYear}`,
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
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZMOSAxN0w0IDEyIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
            alt="Experience"
            className="h-6 w-6"
          />
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
            <div className="relative">
              <MapPin
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
            Used Tools <span className="text-red-500">*</span>
          </Label>
          <div className="rounded-lg border border-gray-300 p-2">
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedTools.map((tool) => (
                <span
                  key={tool.id}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {tool.name}
                  <button
                    type="button"
                    onClick={() => removeTool(tool.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <Input
                type="text"
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder="Add tools..."
                className="flex-1 border-none bg-transparent px-2 py-1 !ring-0 focus:!outline-none focus:!ring-0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTool()
                  }
                }}
              />
              <button
                type="button"
                onClick={addTool}
                className="text-blue-500 hover:text-blue-700"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
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
