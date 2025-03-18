'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@dallah/design-system'
import { Briefcase, ArrowUpDown, CalendarDays, DollarSign } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dallah/design-system'
import { ProjectCardProfessional } from './project-card'
import { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
import { GetAllProposalsRes, ProposalStatus } from '@lib/api/pro/proposals'

interface ProjectsListProps {
  projects: (GetAllProposalsRes['data'][0][number]['project'] & {
    appliedAt: string
    proposalStatus: ProposalStatus
  })[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('newest')

  // const sortedProjects = [...projects].sort((a, b) => {
  //   switch (sortBy) {
  //     case 'newest':
  //       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     case 'oldest':
  //       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     case 'budget-high':
  //       return (b.meta?.budget || 0) - (a.meta?.budget || 0)
  //     case 'budget-low':
  //       return (a.meta?.budget || 0) - (b.meta?.budget || 0)
  //     default:
  //       return 0
  //   }
  // })

  const handleProjectClick = (project: any) => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {projects.length} Project{projects.length !== 1 ? 's' : ''}
        </h2>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-sm"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>Sort by: </span>
              <span className="font-medium">
                {sortBy === 'newest'
                  ? 'Newest'
                  : sortBy === 'oldest'
                    ? 'Oldest'
                    : sortBy === 'budget-high'
                      ? 'Highest Budget'
                      : 'Lowest Budget'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy('newest')}>
              <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('oldest')}>
              <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('budget-high')}>
              <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
              Highest Budget
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('budget-low')}>
              <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
              Lowest Budget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {projects.map(
          (
            project: GetAllProposalsRes['data'][0][number]['project'] & {
              appliedAt: string
              proposalStatus: ProposalStatus
            },
          ) => (
            <ProjectCardProfessional
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ),
        )}
      </div>
    </div>
  )
}
