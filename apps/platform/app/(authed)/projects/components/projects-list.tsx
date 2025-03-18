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
import { ProjectCard } from './project-card'
import { GetAllCompanyProjectsRes } from '@lib/api/company/projects'

interface ProjectsListProps {
  projects: GetAllCompanyProjectsRes['data'][0]
  isCompany: boolean
  isProfessional: boolean
}

export function ProjectsList({
  projects,
  isCompany,
  isProfessional,
}: ProjectsListProps) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('newest')

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-8 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          No projects found
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          {isCompany
            ? "You haven't posted any projects yet. Create your first project to find professionals."
            : 'No projects match your current filters. Try adjusting your search criteria.'}
        </p>
        <Button
          onClick={() =>
            isCompany
              ? router.push('/dashboard?addProject=true')
              : router.back()
          }
          className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
        >
          {isCompany ? 'Post Your First Project' : 'Reset Filters'}
        </Button>
      </div>
    )
  }

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'budget-high':
        return (b.meta?.budget || 0) - (a.meta?.budget || 0)
      case 'budget-low':
        return (a.meta?.budget || 0) - (b.meta?.budget || 0)
      default:
        return 0
    }
  })

  const handleProjectClick = (project: any) => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {projects.length} Project{projects.length !== 1 ? 's' : ''}
        </h2>

        <DropdownMenu>
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
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {sortedProjects.map(
          (project: GetAllCompanyProjectsRes['data'][0][number]) => (
            <ProjectCard
              key={project.id}
              project={project}
              isCompany={isCompany}
              isProfessional={isProfessional}
              onClick={() => handleProjectClick(project)}
            />
          ),
        )}
      </div>
    </div>
  )
}
