'use client'

import { motion } from 'motion/react'
import { Badge } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { Clock, Calendar, Building } from 'lucide-react'
import { calculateDaysSince, cn } from '@dallah/utils'
import { GetAllProposalsRes, ProposalStatus } from '@lib/api/pro/proposals'
import { formatCurrency } from '@lib/utils/format-currency'

import { useTransitionRouter } from 'next-view-transitions'
import { Riyal } from '@dallah/design-system'

interface ProjectCardProps {
  project: GetAllProposalsRes['data'][0][number]['project'] & {
    appliedAt: string
    proposalStatus: ProposalStatus
  }
}

const CARD_ANIMATION = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
  exit: { opacity: 1 },
}

export function ProjectCardProfessional({ project }: ProjectCardProps) {
  const router = useTransitionRouter()

  const getStatusBadge = () => {
    switch (project.proposalStatus) {
      case 'Accepted':
        return (
          <Badge className="!rounded-md !bg-green-50 !px-2 !py-0.5 !text-xs !font-normal !text-green-700">
            Accepted
          </Badge>
        )
      case 'Rejected':
        return (
          <Badge className="!rounded-md !bg-red-50 !px-2 !py-0.5 !text-xs !font-normal !text-red-700">
            Rejected
          </Badge>
        )
      case 'Pending':
      default:
        return (
          <Badge className="!rounded-md !bg-amber-50 !px-2 !py-0.5 !text-xs !font-normal !text-amber-700">
            Applied
          </Badge>
        )
    }
  }

  return (
    <motion.div
      {...CARD_ANIMATION}
      key={project.id}
      className={cn(
        'cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md',
        project.appliedAt
          ? 'border-l-4 border-gray-100 !border-l-[#63B7B7]'
          : 'border-gray-200',
      )}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {`Posted ${new Date(project.appliedAt).toLocaleDateString(
                'en-GB',
                {
                  day: 'numeric',
                  month: 'short',
                },
              )} - ${calculateDaysSince(new Date(project.appliedAt))}`}
            </p>
          </div>

          {getStatusBadge()}
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-700">
          {/* {project.description} */}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {/* {project.skills?.slice(0, 3).map((skill: any) => (
            <Badge
              key={skill}
              className="!rounded-md !bg-[#edecea]/30 !text-xs !text-[#234d64]/80 !shadow-none"
            >
              {skill}
            </Badge>
          ))}
          {project.skills?.length > 3 && (
            <Badge className="!rounded-md !bg-gray-50 !text-xs !text-gray-500 !shadow-none">
              +{project.skills.length - 3}
            </Badge>
          )} */}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              {formatCurrency(
                project.meta?.budget || 0,
                'h-4 w-4 mr-1 text-gray-400',
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4 text-gray-400" />
            <span>{project.meta?.duration || 'Not specified'}</span>
          </div>
        </div>

        {/* Company-specific info */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center">
            <Building className="mr-1.5 h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {project.company.name}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Applied {calculateDaysSince(new Date(project.appliedAt))}
            </span>
          </div>
        </div>
      </div>

      {/* Professional-specific info */}
      {/* <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        {project.appliedAt ? (
          <Badge className="rounded-md border-none !bg-[#BEDDF1]/20 px-2 py-0.5 text-xs font-normal text-[#63B7B7]">
            <CheckCircle className="mr-1 h-3 w-3" />
            Applied
          </Badge>
        ) : (
          <span className="text-sm text-gray-500">
            <Clock className="mr-1 inline-block h-3.5 w-3.5" />
            {new Date(project.appliedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="p-0 text-[#63B7B7] hover:bg-transparent hover:text-[#63B7B7]/80"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div> */}
    </motion.div>
  )
}
