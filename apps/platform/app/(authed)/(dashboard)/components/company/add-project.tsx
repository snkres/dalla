import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Save,
  DollarSign,
  Briefcase,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { createProject, CreateProjectReq } from '@lib/api/company/projects'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { SkillSelector } from '@components/shared/skill-selector'

const SLIDE_ANIMATION = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 300 },
}

const SELECTED_SKILLS = [
  'React',
  'TypeScript',
  'CSS',
  'UI/UX Design',
  'Testing',
]

export function AddProject({
  onClose,
  onProjectCreated,
}: {
  onClose: () => void
  onProjectCreated?: () => void
}) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    jobTitle: '',
    description: '',
    scope: '',
    deliverables: '',
    skills: [] as string[],
    meta: {
      budget: '',
      timelineValue: '1',
      timelineUnit: 'months',
      priority: 'medium',
    },
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target

    if (id.includes('meta.')) {
      const metaField = id.split('.')[1]
      setFormData({
        ...formData,
        meta: {
          ...formData.meta,
          [metaField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [id]: value,
      })
    }
  }

  const handleTimelineUnitChange = (value: string) => {
    setFormData({
      ...formData,
      meta: {
        ...formData.meta,
        timelineUnit: value,
      },
    })
  }

  const handleSkillsChange = (skills: string[]) => {
    setFormData({
      ...formData,
      skills,
    })
  }

  const validateForm = () => {
    const requiredFields = ['title', 'description']
    const requiredMetaFields = ['budget', 'timelineValue']

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: 'Missing required field',
          description: `Please fill in the ${field} field.`,
          variant: 'destructive',
        })
        return false
      }
    }

    for (const field of requiredMetaFields) {
      if (!formData.meta[field as keyof typeof formData.meta]) {
        toast({
          title: 'Missing required field',
          description: `Please fill in the ${field.replace('Value', '')} field.`,
          variant: 'destructive',
        })
        return false
      }
    }

    if (formData.skills.length === 0) {
      toast({
        title: 'Skills required',
        description: 'Please add at least one skill for the project.',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Format the timeline string from the value and unit
      const timeline = `${formData.meta.timelineValue} ${formData.meta.timelineUnit}`

      const projectData: CreateProjectReq = {
        title: formData.title,
        jobTitle: formData.jobTitle || formData.title,
        description: formData.description,
        scope: formData.scope || formData.description,
        deliverables: formData.deliverables || 'To be determined',
        skills: formData.skills,
        meta: {
          budget: Number(formData.meta.budget),
          duration: timeline,
          // priority: formData.meta.priority,
        },
      }

      const response = await createProject(projectData)

      toast({
        title: 'Project created successfully',
        description: 'Your new project has been created.',
      })

      if (onProjectCreated) {
        onProjectCreated()
      }

      onClose()
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: 'Error creating project',
        description:
          'There was an error creating your project. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      {...SLIDE_ANIMATION}
      className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-gray-200 bg-white shadow-xl md:w-[1000px]"
    >
      <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
        <button
          className="flex items-center text-[#234d64] transition-colors hover:text-[#234d64]/80"
          onClick={onClose}
        >
          <ArrowLeft className="mr-1 h-5 w-5" />
        </button>
        <h1 className="ml-2 text-lg font-medium text-gray-900">
          Add New Project
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="mb-6 flex items-center rounded-lg bg-[#BEDDF1]/10 p-4">
            <AlertCircle className="mr-2 h-5 w-5 text-[#63B7B7]" />
            <p className="text-sm text-gray-700">
              Fill in the project details below. Fields marked with * are
              required.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Project Title*
                </label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="jobTitle"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Frontend Developer"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Project Description*
              </label>
              <Textarea
                id="description"
                placeholder="Describe the project in detail"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="scope"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Project Scope
              </label>
              <Textarea
                id="scope"
                placeholder="Define the scope of work"
                value={formData.scope}
                onChange={handleInputChange}
                rows={3}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meta.budget"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Budget*
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="meta.budget"
                    placeholder="e.g. 5000"
                    value={formData.meta.budget}
                    onChange={handleInputChange}
                    className="pl-9"
                    type="number"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="meta.timeline"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Timeline*
                </label>
                <div className="flex gap-2">
                  <div className="relative w-1/3">
                    <Input
                      id="meta.timelineValue"
                      placeholder="e.g. 3"
                      value={formData.meta.timelineValue}
                      onChange={handleInputChange}
                      className="w-full"
                      type="number"
                      min="1"
                    />
                  </div>
                  <div className="w-2/3">
                    <Select
                      value={formData.meta.timelineUnit}
                      onValueChange={handleTimelineUnitChange}
                    >
                      <SelectTrigger className="!h-10 w-full">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="deliverables"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Deliverables
              </label>
              <Textarea
                id="deliverables"
                placeholder="List expected deliverables"
                value={formData.deliverables}
                onChange={handleInputChange}
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Skills Required*
              </label>
              <SkillSelector
                skills={formData.skills}
                handleSkills={handleSkillsChange}
                maxSkills={10}
              />
              <p className="mt-1 text-xs text-gray-500">
                Add up to 10 skills that are required for this project
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                className="!border-gray-300 !text-gray-500 hover:!bg-gray-50"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Saving...' : 'Save Project'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
