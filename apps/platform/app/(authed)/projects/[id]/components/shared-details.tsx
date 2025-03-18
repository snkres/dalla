'use client'

import { Badge, Button, Tabs, TabsContent } from '@dallah/design-system'
import { calculateDaysSince, getRemainingTime } from '@dallah/utils'
import { GetProjectRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'

import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  MessageCircle,
  Users,
} from 'lucide-react'
import { Link } from 'next-view-transitions'

export function ProjectSharedDetails({
  project,
  isCompany,
  setShowEditModal,
}: {
  project: GetProjectRes['data']
  isCompany: boolean
  setShowEditModal: (show: boolean) => void
}) {
  const getStatusBadge = () => {
    switch (project.status) {
      case 'Completed':
        return (
          <Badge className="flex items-center gap-1 !rounded-full border !border-green-200 !bg-green-50/80 !px-2.5 !py-1 !text-xs !font-medium !text-green-700 shadow-sm">
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
                  {/* {project.meta?.startDate} - {project.meta?.endDate} */}
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
              {project.status === 'Open' ? (
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
              ) : (
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
              )}
              {project.status === 'Open' && isCompany && (
                <Button
                  className="!bg-[#63B7B7] !text-sm font-normal hover:!bg-[#63B7B7]/90"
                  onClick={() => setShowEditModal(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <p className="mb-5 text-sm leading-relaxed text-gray-700">
              {project.description}
            </p>
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

            <div className="col-span-2 overflow-hidden rounded-xl border shadow-sm">
              <div className={`border-b px-4 py-3`}>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-[#1D8489]" />
                  <h3 className="text-sm font-medium text-[#1D8489]">Budget</h3>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex flex-col">
                  <div className="text-base font-semibold text-[#1D8489]">
                    {formatCurrency(project.meta?.budget)}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {formatCurrency(project.meta?.budget * 0.3)} from total
                    budget to activate the project
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="overflow-hidden rounded-xl border border-[#63B7B7]/20 shadow-sm">
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
                    {completedMilestones}/{totalMilestones}
                  </div>
                  <div className="text-xs text-gray-500">
                    Milestones completed
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
