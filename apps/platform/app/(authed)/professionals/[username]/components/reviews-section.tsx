'use client'

import React, { useState } from 'react'
import {
  Star,
  Quote,
  MoreHorizontal,
  Download,
  Share,
  Archive,
  Trash2,
  Briefcase,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@dallah/design-system'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@dallah/utils'
import { Project, ProjectStatus } from '@lib/types/profile'
import { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'

export function ReviewsSection({
  projects,
}: {
  projects: GetAllProjectsProfessionalViewRes['data'][0][number][]
}) {
  const [activeTab, setActiveTab] = useState<ProjectStatus>('completed')

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Completed Projects
        </h2>
      </div>

      <div className="px-5 pb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    'rounded-lg border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50/50',
                    'group',
                  )}
                >
                  <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {project.title}
                      </h4>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-gray-600">
                          {project.jobTitle}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="font-medium text-[#63B7B7]">
                          {project.meta.budget}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:space-x-3">
                      <span className="rounded-full bg-[#f5fafa] px-3 py-1 text-xs text-gray-500">
                        {project.meta.duration}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full opacity-70 group-hover:bg-[#e6f3f3] group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 rounded-lg"
                        >
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                            <Share className="h-4 w-4" />
                            <span>Share Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Export as PDF</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Export as Docx</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                            <Archive className="h-4 w-4" />
                            <span>Archive project</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-500 focus:text-red-500">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* {project?.testimonial && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 rounded-lg border-l-2 border-[#63B7B7]/30 bg-[#f5fafa] px-4 py-3"
                    >
                      <div className="flex items-start gap-2">
                        <Quote className="mt-1 h-4 w-4 flex-shrink-0 text-[#63B7B7] opacity-70" />
                        <div className="flex-1">
                          <div className="mb-1 flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const rating = project?.testimonial?.rating || 0
                              return (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-[#FFD580] text-[#FFD580]' : i < rating ? 'fill-[#FFD580]/50 text-[#FFD580]' : 'text-gray-200'}`}
                                />
                              )
                            })}
                          </div>
                          <p className="mb-1 text-sm italic text-gray-700">
                            {project?.testimonial?.text}
                          </p>
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">
                              {project?.testimonial.author}
                            </span>{' '}
                            · {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )} */}
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-[#f5fafa] p-3">
                  <Briefcase className="h-6 w-6 text-[#63B7B7]" />
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-900">
                  No {activeTab} projects
                </h3>
                <p className="max-w-md text-sm text-gray-500">
                  {activeTab === 'ongoing'
                    ? "You don't have any ongoing projects at the moment."
                    : "You don't have any completed projects yet."}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
