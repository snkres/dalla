'use client'

import { Badge } from '@dallah/design-system'
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Info,
} from 'lucide-react'

export function ProjectSharedDetails({ project }: { project: any }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-gray-400" />
                Posted{' '}
                {new Date(project.createdAt).toLocaleDateString('en-UK', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {project.company?.CompanyProfile?.location && (
                <span className="flex items-center">
                  <Globe className="mr-1 h-4 w-4 text-gray-400" />
                  {project.company.CompanyProfile.location}
                </span>
              )}
              <span className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4 text-gray-400" />
                {project.jobTitle || 'Project'}
              </span>
            </div>
          </div>
          <Badge className="rounded-md bg-[#edecea]/30 text-sm text-[#234d64]/80 shadow-none">
            Fixed-Price
          </Badge>
        </div>

        <div className="prose mb-6 max-w-none text-sm text-gray-700 sm:text-base">
          <p>{project.description}</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-1 text-xs text-gray-500">Budget</div>
            <div className="flex items-center text-base font-medium text-gray-900">
              <DollarSign className="mr-1 h-4 w-4 text-gray-500" />$
              {project.meta?.budget || 0}
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-1 text-xs text-gray-500">Experience Level</div>
            <div className="text-base font-medium text-gray-900">
              {project.scope || 'Intermediate'}
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-1 text-xs text-gray-500">Project Duration</div>
            <div className="flex items-center text-base font-medium text-gray-900">
              <Calendar className="mr-1 h-4 w-4 text-gray-500" />
              {project.meta?.duration || 'Not specified'}
            </div>
          </div>
        </div>

        {project.skills && project.skills.length > 0 && (
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-[#63B7B7]" />
              <h2 className="text-base font-medium text-gray-900">
                Skills and Expertise
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill: any) => (
                <Badge
                  key={skill}
                  className="rounded-md bg-[#edecea]/30 text-xs text-[#234d64]/80 shadow-none hover:bg-[#BEDDF1]/60"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {project.deliverables && (
          <div className="mt-6">
            <h3 className="mb-2 text-base font-medium text-gray-900">
              Deliverables
            </h3>
            <p className="text-sm text-gray-700">{project.deliverables}</p>
          </div>
        )}
      </div>
    </div>
  )
}
