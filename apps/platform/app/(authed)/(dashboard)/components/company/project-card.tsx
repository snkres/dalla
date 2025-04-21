import React from 'react'
import { Calendar, Clock, Users, ArrowUpRight } from 'lucide-react'
import { Badge, Riyal } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { Progress } from '@dalla/design-system'
import { Project } from '@lib/types/project'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslation()
  const { locale } = useLocale()

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
      onClick={() => onClick(project)}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <Badge
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              project.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : project.status === 'Completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
            }`}
          >
            {project.status}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0"
          >
            <ArrowUpRight className="h-4 w-4 text-[#63B7B7]" />
          </Button>
        </div>

        <h3 className="mb-2 text-lg font-medium text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {project.description}
        </p>

        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {t.dashboard.companyComponents.projectCard.progressLabel}
            </span>
            <span className="font-medium text-[#63B7B7]">
              {project.progress}
              {t.dashboard.companyComponents.projectCard.progressSuffix}
            </span>
          </div>
          <Progress
            value={project.progress}
            className="h-1.5 bg-gray-100"
            indicatorClassName="bg-[#63B7B7]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Riyal className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{project.budget}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{project.deadline}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{project.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {project.team}{' '}
              {t.dashboard.companyComponents.projectCard.teamSuffix}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
