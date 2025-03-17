import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Badge } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import {
  FileText,
  ArrowUpRight,
  Calendar,
  DollarSign,
  BarChart,
  Users,
  CheckCircle,
  ChevronRight,
  Clock,
  MessageSquare,
  Plus,
} from 'lucide-react'
import Image from 'next/image'
import { GetAllCompanyProjectsRes } from '@lib/api/company/projects'

const ActiveProjectView = ({
  project,
}: {
  project: GetAllCompanyProjectsRes['data'][0][number]
}) => {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/company/projects/${project.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <Badge className="!border !border-[#63B7B7]/30 !bg-[#E0F2F2] !px-2 !py-0.5 !text-xs !text-[#1D8489]">
                {project.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500">Project ID: {project.id}</p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 !border-[#63B7B7]/30 !text-xs !text-[#1D8489] hover:bg-[#E0F2F2]"
              onClick={handleViewDetails}
            >
              <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
              Project Dashboard
            </Button>
          </div>
        </div>

        <p className="mb-5 text-sm text-gray-600">{project.description}</p>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#1D8489]" />
                <h4 className="text-sm font-medium text-[#1D8489]">Timeline</h4>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500">Duration</span>
                <span className="text-xs font-medium text-gray-700">
                  {project.meta.duration}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Remaining</span>
                <span className="text-sm font-medium text-[#1D8489]">
                  45 days
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="border-b border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-medium text-green-700">Budget</h4>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500">Total</span>
                <span className="text-sm font-medium text-gray-700">
                  {project.meta.budget}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Spent</span>
                <span className="text-sm font-medium text-green-600">
                  $7,800
                </span>
              </div>
            </div>
          </div>

          {project.assignedProfessionalId && (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-amber-100 bg-amber-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-amber-600" />
                  <h4 className="text-sm font-medium text-amber-700">
                    Progress
                  </h4>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Completion</span>
                  <span className="text-sm font-medium text-amber-600">
                    {/* {project.meta.completion}% */}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `100%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-amber-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {project.assignedProfessionalId && (
        <div className="px-5 pb-5">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-purple-100 bg-purple-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <h4 className="text-sm font-medium text-purple-700">
                  Assigned Consultant
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-purple-600 hover:bg-purple-100"
              >
                View Profile
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>

            <div className="bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-purple-100">
                  <Image
                    src={project.professional.avatar}
                    alt={project.professional.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h5 className="text-base font-medium text-gray-900">
                      {project.professional.name}
                    </h5>
                    <div className="flex items-center rounded-full border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                      <svg
                        className="h-3 w-3 fill-amber-500 text-amber-500"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="ml-0.5 text-xs font-medium text-amber-700">
                        {project.professional.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {project.professional.role}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="h-8 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ActiveProjectView
