import React, { ChangeEvent } from 'react'
import { motion } from 'motion/react'
import {
  FileText,
  PaperclipIcon,
  X,
  CheckCircle,
  Star,
  LinkIcon,
  Upload,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { fadeIn } from '@components/aniamtion/animate'
import { StepThreeProps } from '@lib/types/steps'

export function StepThree({
  relatedProjects,
  toggleRelatedProject,
  files,
  setFiles,
  dragActive,
  setDragActive,
}: StepThreeProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 5))
    }
  }

  return (
    <motion.div {...fadeIn} className="mx-auto max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7] text-sm text-white">
              3
            </span>
            Showcase Your Work
          </h3>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
              <div className="border-b border-gray-100 p-4">
                <h4 className="flex items-center text-sm font-medium">
                  <Star className="mr-2 h-4 w-4 text-[#63B7B7]" />
                  Relevant Projects
                </h4>
              </div>
              <div className="p-4">
                <p className="mb-4 text-sm text-gray-700">
                  Select projects from your portfolio that showcase your skills
                  for this job.
                </p>

                <div className="mb-4 space-y-3">
                  {relatedProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        'cursor-pointer rounded-xl border p-4 transition-all',
                        project.selected
                          ? 'border-[#63B7B7] bg-[#63B7B7]/5 shadow-sm'
                          : 'border-gray-100 hover:border-gray-200',
                      )}
                      onClick={() => toggleRelatedProject(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={cn(
                              'mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                              project.selected
                                ? 'bg-[#63B7B7]'
                                : 'border border-gray-200 bg-gray-100',
                            )}
                          >
                            {project.selected && (
                              <CheckCircle className="h-3.5 w-3.5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {project.title}
                            </p>
                            <div className="mt-1.5 flex items-center gap-2">
                              <Badge className="bg-[#BEDDF1]/30 px-2 py-0.5 text-xs font-medium text-[#63B7B7] hover:bg-[#BEDDF1]/50">
                                Portfolio
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Completed Feb 2025
                              </span>
                            </div>
                          </div>
                        </div>
                        {project.selected && (
                          <Star className="h-4 w-4 text-[#63B7B7]" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button className="flex w-full items-center justify-center rounded-xl border border-dashed border-[#63B7B7]/40 bg-white py-3 font-medium text-[#63B7B7] transition-colors hover:bg-[#63B7B7]/5">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Add new portfolio project
                </motion.button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
              <div className="border-b border-gray-100 p-4">
                <h4 className="flex items-center text-sm font-medium">
                  <PaperclipIcon className="mr-2 h-4 w-4 text-[#63B7B7]" />
                  Additional Documents
                </h4>
              </div>
              <div className="p-4">
                <div
                  className={cn(
                    'rounded-xl border-2 border-dashed p-6 transition-colors',
                    dragActive
                      ? 'border-[#63B7B7] bg-[#63B7B7]/5'
                      : 'border-gray-200 bg-[#BEDDF1]/5 hover:border-[#63B7B7]/30',
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {files.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-3">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="group relative flex items-center rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm transition-colors hover:border-[#63B7B7]/30"
                        >
                          <FileText className="mr-2 h-4 w-4 text-[#63B7B7]" />
                          <span className="max-w-[150px] truncate font-medium text-gray-800">
                            {file.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {(file.size / 1024).toFixed(0)}KB
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(index)
                            }}
                            className="ml-2 rounded-full p-1 text-gray-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {files.length === 0 && (
                    <div className="py-8 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#63B7B7]/10">
                          <Upload className="h-8 w-8 text-[#63B7B7]" />
                        </div>
                      </div>
                      <p className="mb-2 text-sm font-medium text-gray-800">
                        Drag & drop files here
                      </p>
                      <p className="mb-4 text-xs text-gray-500">or</p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <label className="cursor-pointer">
                      <motion.div>
                        <Button
                          variant={files.length === 0 ? 'default' : 'outline'}
                          size="sm"
                          className={cn(
                            'px-4 py-2.5 font-medium',
                            files.length === 0
                              ? 'bg-[#63B7B7] hover:bg-[#63B7B7]/90'
                              : 'border-[#63B7B7]/30 text-[#63B7B7] hover:bg-[#63B7B7]/10',
                          )}
                        >
                          <PaperclipIcon className="mr-2 h-4 w-4" />
                          {files.length === 0
                            ? 'Browse files'
                            : 'Add more files'}
                        </Button>
                      </motion.div>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={files.length >= 5}
                      />
                    </label>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="rounded-lg bg-white px-3 py-1 text-xs text-gray-500">
                      PDF, DOC, DOCX, PNG, JPG or GIF (max 25MB each)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
