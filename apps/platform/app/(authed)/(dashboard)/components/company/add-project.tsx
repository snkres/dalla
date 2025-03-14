import React from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Save,
  X,
  FileText,
  PlusCircle,
  DollarSign,
  Calendar,
  Briefcase,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'

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

export function AddProject({ onClose }: { onClose: () => void }) {
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
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-500 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
          >
            <Save className="mr-1 h-4 w-4" />
            Save Project
          </Button>
        </div>
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
                  defaultValue="Website Redesign Project"
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
                    defaultValue="Senior Web Developer"
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
                defaultValue="Complete overhaul of company website with modern UI/UX"
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
                defaultValue="Redesign and implement new responsive website across all pages"
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
                    defaultValue="15000"
                    className="pl-9"
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
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="meta.timeline"
                    placeholder="e.g. 3 months"
                    defaultValue="3 months"
                    className="pl-9"
                  />
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
                defaultValue="Fully functional website, documentation, and testing reports"
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Required Skills*
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[#63B7B7] hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]/80"
                >
                  <PlusCircle className="mr-1 h-3.5 w-3.5" />
                  Add Skill
                </Button>
              </div>
              <div className="min-h-[80px] rounded-md border border-gray-200 p-3">
                <div className="flex flex-wrap gap-2">
                  {SELECTED_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      className="border-1 rounded-md bg-[#edecea]/30 py-1.5 text-xs text-[#234d64]/80 shadow-none hover:bg-[#BEDDF1]/60"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#63B7B7]" />
                <h2 className="text-sm font-medium text-gray-900">
                  Attachments (2)
                </h2>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="file-upload"
                  className="inline-flex cursor-pointer items-center rounded-md border border-[#63B7B7] bg-white px-4 py-2 text-sm font-medium text-[#63B7B7] hover:bg-[#BEDDF1]/20"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="sr-only"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center rounded-lg bg-[#BEDDF1]/20 px-3 py-2 text-xs sm:text-sm">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white">
                    <FileText className="h-4 w-4 text-[#63B7B7]" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium text-gray-800">
                      website_requirements.pdf
                    </p>
                    <p className="text-xs text-gray-500">245 KB</p>
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center rounded-lg bg-[#BEDDF1]/20 px-3 py-2 text-xs sm:text-sm">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white">
                    <FileText className="h-4 w-4 text-[#63B7B7]" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium text-gray-800">
                      mockups.zip
                    </p>
                    <p className="text-xs text-gray-500">1.2 MB</p>
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meta.priority"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <select
                    id="meta.priority"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white py-2 pl-9 text-sm placeholder:text-gray-400 focus:border-[#63B7B7] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]"
                    defaultValue="high"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600"
              >
                Cancel
              </Button>
              <Button className="bg-[#63B7B7] px-6 text-white hover:bg-[#63B7B7]/90">
                <Save className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
