import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Badge,
} from '@dallah/design-system'
import {
  Briefcase,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  MessageCircleMore,
} from 'lucide-react'
import ActiveProjectView from './active-project-view'
import ProjectProposalsView from './project-proposals-view'
import EmptyProjectView from './empty-project-view'
import sampleProjects from '@lib/data/sampleProjects'

interface ProjectOverviewProps {
  onPostJob: () => void
  onHireConsultant: () => void
}
export function ProjectOverview({
  onPostJob,
  onHireConsultant,
}: ProjectOverviewProps) {
  const [hasActiveProject, setHasActiveProject] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [showProposals, setShowProposals] = useState(false)
  const [selectedProjectForProposals, setSelectedProjectForProposals] =
    useState<{ id: string; title: string } | null>(null)

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null)
    } else {
      setExpandedProject(projectId)
    }
  }

  const handleViewProposals = (projectId: string, projectTitle: string) => {
    setSelectedProjectForProposals({ id: projectId, title: projectTitle })
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
              Project Overview
            </h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHasActiveProject(!hasActiveProject)}
              className="h-8 border-[#63B7B7]/30 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
            >
              Toggle Demo View
            </Button>
            <Button
              size="sm"
              onClick={onPostJob}
              className="h-8 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]"
            >
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
              New Project
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {hasActiveProject ? (
            <div key="projects-list">
              <div className="divide-y divide-gray-100">
                {sampleProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <div className="p-4 transition-colors hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              project.hasConsultant
                                ? 'bg-[#E0F2F2]'
                                : 'bg-amber-50'
                            }`}
                          >
                            <Briefcase
                              className={`h-3.5 w-3.5 ${
                                project.hasConsultant
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
                                  project.hasConsultant
                                    ? 'border-[#63B7B7]/30 bg-[#E0F2F2] text-[#1D8489]'
                                    : 'border-amber-200 bg-amber-50 text-amber-700'
                                }`}
                              >
                                {project.hasConsultant
                                  ? 'Consultant Hired'
                                  : 'Seeking Consultant'}
                              </Badge>
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {project.id}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">
                                Posted: {project.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!project.hasConsultant && (
                            <Badge
                              variant="outline"
                              className="border-amber-200 bg-white text-xs font-normal text-amber-700"
                            >
                              {project.proposalCount} Proposals
                            </Badge>
                          )}

                          <div className="flex items-center gap-1">
                            {!project.hasConsultant && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-[#63B7B7]/30 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                                onClick={() =>
                                  handleViewProposals(project.id, project.title)
                                }
                              >
                                <MessageCircleMore className="h-3.5 w-3.5" />
                                View Proposals
                              </Button>
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

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[180px]"
                              >
                                {!project.hasConsultant && (
                                  <DropdownMenuItem
                                    className="cursor-pointer text-xs"
                                    onClick={() =>
                                      handleViewProposals(
                                        project.id,
                                        project.title,
                                      )
                                    }
                                  >
                                    View Proposals
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer text-xs">
                                  Edit Project
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-xs">
                                  Project Dashboard
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                          <ActiveProjectView />
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
