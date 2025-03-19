'use client'

import React from 'react'
import { ProjectCardProfessional } from './project-card'
import { GetAllProposalsRes, ProposalStatus } from '@lib/api/pro/proposals'

interface ProjectsListProps {
  projects: (GetAllProposalsRes['data'][0][number]['project'] & {
    appliedAt: string
    proposalStatus: ProposalStatus
  })[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const projectCards = React.useMemo(() => {
    if (!projects || projects.length === 0) {
      return (
        <div className="flex min-h-[200px] items-center justify-center text-gray-500">
          No projects found
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {projects.map((project) => (
          <ProjectCardProfessional
            key={`${project.id}-${project.proposalStatus}`}
            project={project}
          />
        ))}
      </div>
    )
  }, [projects])

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {projects?.length || 0} Project{projects?.length !== 1 ? 's' : ''}
        </h2>
      </div>

      <div className="relative min-h-[400px]">{projectCards}</div>
    </div>
  )
}
