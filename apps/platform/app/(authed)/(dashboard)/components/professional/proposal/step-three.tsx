import React, { ChangeEvent, useState } from 'react'
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
import { useAtom } from 'jotai'
import { proMetaAtom } from '@lib/atoms/pro/meta'

const MAX_TOTAL_SIZE = 20 * 1024 * 1024

export function StepThree({
  files,
  setFiles,
  dragActive,
  setDragActive,
}: StepThreeProps) {
  const [sizeError, setSizeError] = useState<string | null>(null)

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const newTotalSize =
        totalSize + newFiles.reduce((sum, file) => sum + file.size, 0)

      if (newTotalSize > MAX_TOTAL_SIZE) {
        setSizeError('Total file size exceeds the 20MB limit')
        return
      }

      setSizeError(null)
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
      const newTotalSize =
        totalSize + newFiles.reduce((sum, file) => sum + file.size, 0)

      if (newTotalSize > MAX_TOTAL_SIZE) {
        setSizeError('Total file size exceeds the 20MB limit')
        return
      }

      setSizeError(null)
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
                {/* {profile.data.projects.length > 0 ? (
                  <p className="mb-4 text-sm text-gray-700">
                    Select projects from your portfolio that showcase your
                    skills for this job.
                  </p>
                ) : (
                  <p className="mb-4 text-sm text-gray-700">
                    Your profile doesn't have any projects
                  </p>
                )} */}

                <div className="mb-4 space-y-3">
                  {/* {profile.data.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        'cursor-pointer rounded-xl border p-4 transition-all',
                        selectedProjects.includes(project.id)
                          ? '!border-[#63B7B7] !bg-[#63B7B7]/5 shadow-sm'
                          : '!border-gray-100 hover:!border-gray-200',
                      )}
                      onClick={() =>
                        setSelectedProjects((prev) => {
                          if (prev.includes(project.id)) {
                            return prev.filter((id) => id !== project.id)
                          } else {
                            return [...prev, project.id]
                          }
                        })
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={cn(
                              'mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                              selectedProjects.includes(project.id)
                                ? '!bg-[#63B7B7]'
                                : '!border border-gray-200 bg-gray-100',
                            )}
                          >
                            {selectedProjects.includes(project.id) && (
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
                        {selectedProjects.includes(project.id) && (
                          <Star className="h-4 w-4 text-[#63B7B7]" />
                        )}
                      </div>
                    </motion.div>
                  ))} */}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
              <div className="border-b border-gray-100 p-4">
                <h4 className="flex items-center text-sm font-medium">
                  <PaperclipIcon className="mr-2 h-4 w-4 text-[#63B7B7]" />
                  Attachments
                </h4>
              </div>
              <div
                className={cn(
                  'flex flex-col items-center justify-center p-6',
                  dragActive ? 'bg-gray-50' : '',
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {files.length === 0 ? (
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-3">
                      <Upload className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      Drag and drop your files here
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG up to 5MB
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 w-full space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-[#63B7B7]/10 p-2">
                            <FileText className="h-4 w-4 text-[#63B7B7]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(0)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {files.length > 0 && (
                  <div className="mb-4 w-full">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB
                      </span>
                      <span>Maximum: 20 MB</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          totalSize > MAX_TOTAL_SIZE
                            ? 'bg-red-500'
                            : 'bg-[#63B7B7]',
                        )}
                        style={{
                          width: `${Math.min(100, (totalSize / MAX_TOTAL_SIZE) * 100)}%`,
                        }}
                      ></div>
                    </div>
                    {sizeError && (
                      <p className="mt-1 text-xs text-red-500">{sizeError}</p>
                    )}
                  </div>
                )}

                <div className="flex w-full justify-center">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />

                  {/* Button that triggers the file input */}
                  <label htmlFor="file-upload">
                    <Button
                      variant={files.length === 0 ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        'cursor-pointer px-4 py-2.5 font-medium',
                        files.length === 0
                          ? '!bg-[#63B7B7] hover:!bg-[#63B7B7]/90'
                          : 'border-[#63B7B7]/30 text-[#63B7B7] hover:bg-[#63B7B7]/10',
                      )}
                      asChild
                    >
                      <span>
                        <PaperclipIcon className="mr-2 h-4 w-4" />
                        {files.length === 0 ? 'Browse files' : 'Add more files'}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
