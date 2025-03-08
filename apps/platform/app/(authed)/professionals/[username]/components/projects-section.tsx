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

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectStatus>('completed')

  const projects: Project[] = [
    {
      date: 'March 05, 2024',
      title: 'Digital Marketing Strategy',
      subtask: 'Campaign Development',
      progress: 60,
      daysLeft: 2,
      status: 'ongoing',
      price: '$2,800',
    },
    {
      date: 'March 08, 2024',
      title: 'Social Media Campaign',
      subtask: 'Content Creation',
      progress: 80,
      daysLeft: 5,
      status: 'ongoing',
      price: '$3,400',
    },
    {
      date: 'Jan 15, 2024',
      title: 'SEO Optimization',
      subtask: 'Keyword Research',
      progress: 100,
      daysLeft: 0,
      status: 'completed',
      price: '$1,950',
      testimonial: {
        text: 'Outstanding SEO work that significantly improved our search rankings.',
        author: 'Michael Chen',
        company: 'GlobalReach Solutions',
        rating: 5,
      },
    },
    {
      date: 'Feb 20, 2024',
      title: 'Brand Identity Redesign',
      subtask: 'Visual Identity',
      progress: 100,
      daysLeft: 0,
      status: 'completed',
      price: '$4,200',
      testimonial: {
        text: 'Exceptional strategy that transformed our online presence. The new brand looks amazing!',
        author: 'Sarah Johnson',
        company: 'TechGrowth Inc.',
        rating: 4.8,
      },
    },
    {
      date: 'Dec 10, 2023',
      title: 'Email Marketing Campaign',
      subtask: 'Lead Generation',
      progress: 100,
      daysLeft: 0,
      status: 'completed',
      price: '$2,500',
    },
  ]

  const filteredProjects = projects.filter(
    (project) => project.status === activeTab,
  )

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Client Projects
        </h2>
      </div>

      <div className="px-5 pb-4 pt-6">
        <div className="flex max-w-fit rounded-lg bg-[#e6f3f3] p-0.5">
          {(['completed', 'ongoing'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative rounded-md px-4 py-2 text-sm font-medium capitalize transition-all duration-200',
                activeTab === tab
                  ? 'text-white'
                  : 'text-[#63B7B7] hover:text-[#4a8a8a]',
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-md bg-[#63B7B7] shadow-sm"
                  transition={{ type: 'spring', duration: 0.5 }}
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10">{tab} Projects</span>
            </button>
          ))}
        </div>
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
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
                        <span className="text-gray-600">{project.subtask}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="font-medium text-[#63B7B7]">
                          {project.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:space-x-3">
                      <span className="rounded-full bg-[#f5fafa] px-3 py-1 text-xs text-gray-500">
                        {project.date}
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

                  {project.testimonial && (
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
                              const rating = project.testimonial?.rating || 0
                              return (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-[#FFD580] text-[#FFD580]' : i < rating ? 'fill-[#FFD580]/50 text-[#FFD580]' : 'text-gray-200'}`}
                                />
                              )
                            })}
                          </div>
                          <p className="mb-1 text-sm italic text-gray-700">
                            {project.testimonial.text}
                          </p>
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">
                              {project.testimonial.author}
                            </span>{' '}
                            · {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
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

export default ProjectsSection
