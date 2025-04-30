'use client'

import { Badge, Button, Tabs, TabsContent } from '@dalla/design-system'
import { calculateDaysSince, formatDate, getRemainingTime } from '@dalla/utils'
import { GetProjectRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'

import { Riyal } from '@dalla/design-system'

import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  MessageCircle,
  Users,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import { ListDisplay } from '@dalla/components/listDisplay'

export function ProjectSharedDetails({
  project,
  isCompany,
  setShowEditModal,
  isAssignedProfessional,
}: {
  project: GetProjectRes['data']
  isCompany: boolean
  setShowEditModal: (show: boolean) => void
  isAssignedProfessional: boolean
}) {
  const getStatusBadge = () => {
    switch (project.status) {
      case 'Completed':
        return (
          <Badge className="flex items-center gap-1 !rounded-full border !border-[#64B7B7] !bg-green-50/80 !px-2.5 !py-1 !text-xs !font-medium !text-green-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Completed
          </Badge>
        )
      case 'InProgress':
        return (
          <Badge className="flex items-center gap-1 !rounded-full border !border-[#63B7B7]/30 !bg-[#E0F2F2] !px-2.5 !py-1 !text-xs !font-medium !text-[#1D8489] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1D8489]"></span>
            Ongoing
          </Badge>
        )
      case 'Open':
        return (
          <Badge className="flex items-center gap-1 !rounded-full border !border-[#63B7B7]/20 !bg-[#63B7B7]/10 !px-2.5 !py-1 !text-xs !font-medium !text-[#1D8489] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#63B7B7]"></span>
            Active
          </Badge>
        )
      default:
        return (
          <Badge className="flex items-center gap-1 !rounded-full border !border-amber-200 !bg-amber-50 !px-2.5 !py-1 !text-xs !font-medium !text-amber-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Draft
          </Badge>
        )
    }
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
                {project.title}
              </h1>
              {getStatusBadge()}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                {project.jobTitle}
              </div>
              {project.status === 'InProgress' ? (
                <div className="flex items-center">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                  {formatDate(new Date(project.meta?.startedAt))} -{' '}
                  {project.meta?.endedAt
                    ? formatDate(new Date(project.meta?.endedAt))
                    : 'N/A'}
                </div>
              ) : (
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                  {calculateDaysSince(new Date(project.createdAt))}
                </div>
              )}
              {project.status === 'InProgress' ? (
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                  {getRemainingTime(
                    project.meta?.timeline,
                    new Date(project.createdAt),
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                  {project.meta.duration ?? project.meta.timeline}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-3">
              {project.status === 'Open' && isCompany ? (
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/">
                    <Users className="mr-2 h-4 w-4" />
                    Find Professionals
                  </Link>
                </Button>
              ) : isCompany ? (
                <>
                  <Button
                    variant="outline"
                    className="!border-[#63B7B7] !text-[#63B7B7] hover:!bg-[#63B7B7]/10"
                    asChild
                  >
                    <Link href={`/messages/project/${project.id}`}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Professional
                    </Link>
                  </Button>
                  {isAssignedProfessional && (
                    <Button
                      className="!bg-[#63B7B7] !text-sm font-normal hover:!bg-[#63B7B7]/90"
                      onClick={() => setShowEditModal(true)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Project Scope
                </h3>
                <div className="rounded-md py-4 pl-1">
                  <ListDisplay
                    value={project.scope}
                    emptyText="No scope details provided"
                    className="text-gray-600"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Deliverables
                </h3>
                <div className="rounded-md py-4 pl-1">
                  <ListDisplay
                    value={project.deliverables}
                    emptyText="No deliverables specified"
                    className="text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3 md:w-72 lg:w-80">
            {/* <div className="col-span-2 overflow-hidden rounded-xl border border-[#63B7B7]/20 shadow-sm">
              <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-[#1D8489]" />
                  <h3 className="text-sm font-medium text-[#1D8489]">
                    Project Progress
                  </h3>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">Completion</div>
                    <div className="text-sm font-medium text-[#1D8489]">
                      {progress}%
                    </div>
                  </div>

                  <Progress
                    value={progress}
                    color="bg-[#63B7B7]"
                    indicatorClassName="!h-2.5"
                  />

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{startDate}</span>
                    <span>{endDate}</span>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-span-2 h-fit overflow-hidden rounded-xl border shadow-sm">
              <div className={`border-b px-4 py-3`}>
                <div className="flex items-center gap-2">
                  <Riyal className="h-4 w-4 text-[#1D8489]" />
                  <h3 className="text-sm font-medium text-[#1D8489]">Budget</h3>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex flex-col">
                  <div className="text-base font-semibold text-[#1D8489]">
                    <span className="flex items-center gap-1">
                      {formatCurrency(project.meta?.budget)}
                    </span>
                  </div>
                  {isCompany && (
                    <div className="mt-1 flex gap-1 text-xs text-gray-500">
                      {formatCurrency(project.meta?.budget * 0.3, 'h-3 w-3')}{' '}
                      from total budget to activate the project
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!project.professional ? (
              <div className="col-span-2 h-fit overflow-hidden rounded-xl border shadow-sm">
                <div className={`border-b px-4 py-3`}>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#1D8489]" />
                    <h3 className="text-sm font-medium text-[#1D8489]">
                      Timeline
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#1D8489]">
                      <span className="flex items-center gap-1">
                        {project.meta?.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-2 overflow-hidden rounded-xl border border-[#63B7B7]/20 shadow-sm">
                <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#1D8489]" />
                    <h3 className="text-sm font-medium text-[#1D8489]">
                      Milestones
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex flex-col">
                    <div className="text-base font-semibold text-[#1D8489]">
                      {
                        project.professional.proposals[0].milestones.filter(
                          (milestone) => milestone.status === 'Completed',
                        ).length
                      }{' '}
                      / {project.professional.proposals[0].milestones.length}
                    </div>
                    <div className="text-xs text-gray-500">
                      Milestones completed
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
