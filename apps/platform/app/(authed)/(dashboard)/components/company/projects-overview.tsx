'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button, Badge, Skeleton } from '@dallah/design-system'
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageCircleMore,
} from 'lucide-react'
import ActiveProjectView from './active-project-view'
import ProjectProposalsView from './project-proposals-view'
import EmptyProjectView from './empty-project-view'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'

interface ProjectOverviewProps {
  projects: GetAllCompanyProjectsRes['data']['0']
  isLoading: boolean
  onPostJob: () => void
  onHireConsultant: () => void
}
export function ProjectsOverview({
  projects,
  isLoading,
  onPostJob,
  onHireConsultant,
}: ProjectOverviewProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [showProposals, setShowProposals] = useState(false)
  const [selectedProjectForProposals, setSelectedProjectForProposals] =
    useState<{
      id: string
      title: string
      proposals: GetAllCompanyProjectsRes['data'][0][number]['proposals']
    } | null>(null)

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null)
    } else {
      setExpandedProject(projectId)
    }
  }

  const handleViewProposals = (projectId: string, projectTitle: string) => {
    setSelectedProjectForProposals({
      id: projectId,
      title: projectTitle,
      proposals: projects.find((p) => p.id === projectId)?.proposals || [],
    })
    setShowProposals(true)
  }

  const closeProposals = () => {
    setShowProposals(false)
    setSelectedProjectForProposals(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
              <Briefcase className="h-4 w-4 text-[#1D8489]" />
            </div>
            <h2 className="text-base font-medium text-gray-900">
              Projects Overview
            </h2>
          </div>

          {/* <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onPostJob}
              className="h-8 !bg-[#63B7B7] text-xs !text-white hover:!bg-[#1D8489]"
            >
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
              Start a Project
            </Button>
          </div> */}
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-gray-100"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={`skeleton-${item}`}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <Skeleton className="h-3 w-16" />
                            <span className="text-xs text-gray-400">•</span>
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : projects.length > 0 ? (
            <div key="projects-list">
              <div className="divide-y divide-gray-100">
                {projects
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .slice(0, 5)
                  .map((project) => (
                    <div
                      key={project.id + project.title}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <div className="p-4 transition-colors hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                project.proposals.length > 0
                                  ? 'bg-[#E0F2F2]'
                                  : 'bg-amber-50'
                              }`}
                            >
                              <Briefcase
                                className={`h-3.5 w-3.5 ${
                                  project.proposals.length > 0
                                    ? 'text-[#1D8489]'
                                    : 'text-amber-600'
                                }`}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-gray-900">
                                  {project.title}
                                </h3>
                                <Badge
                                  className={`py-0.15 px-1.5 text-xs font-normal ${
                                    project.proposals.length > 0
                                      ? '!border-[#63B7B7]/30 !bg-[#E0F2F2] !text-[#1D8489]'
                                      : '!border-amber-200 !bg-amber-50 !text-amber-700'
                                  }`}
                                >
                                  {project.approved
                                    ? project.professional
                                      ? 'Consultant Hired'
                                      : project.proposals.length > 0
                                        ? 'Recieved Proposals'
                                        : 'No Proposals Yet'
                                    : 'Not Approved Yet'}
                                </Badge>
                              </div>
                              <div className="mt-0.5 flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {project.id}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">
                                  Posted:{' '}
                                  {new Date(
                                    project.createdAt,
                                  ).toLocaleDateString('en-GB', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {project.proposals.length > 0 &&
                              project.status !== 'InProgress' && (
                                <Badge
                                  variant="outline"
                                  className="!border-amber-200 !bg-white !text-xs !font-normal !text-amber-700"
                                >
                                  {project.proposals.length} Proposals
                                </Badge>
                              )}

                            <div className="flex items-center gap-1">
                              {project.status === 'Open' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-[#63B7B7]/30 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                                    onClick={() =>
                                      handleViewProposals(
                                        project.id,
                                        project.title,
                                      )
                                    }
                                  >
                                    <MessageCircleMore className="h-3.5 w-3.5" />
                                    View Proposals
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleProject(project.id)}
                              >
                                {expandedProject === project.id ? (
                                  <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <ActiveProjectView project={project} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <EmptyProjectView
              key="empty"
              onPostJob={onPostJob}
              onHireConsultant={onHireConsultant}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {showProposals && selectedProjectForProposals && (
          <ProjectProposalsView
            projectTitle={selectedProjectForProposals.title}
            onBack={closeProposals}
          />
        )}
      </AnimatePresence>
    </>
  )
}
