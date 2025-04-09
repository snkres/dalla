'use client'

import { motion } from 'motion/react'
import { Badge } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import {
  Briefcase,
  Clock,
  Users,
  CheckCircle,
  Edit,
  Calendar,
  Star,
  ArrowUpRight,
} from 'lucide-react'
import { calculateDaysSince, cn } from '@dallah/utils'
import Image from 'next/image'
import { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { globalAtom } from '@lib/atoms/global'
import { useAtom } from 'jotai'
import { formatCurrency } from '@lib/utils/format-currency'

interface ProjectCardProps {
  project: GetAllCompanyProjectsRes['data'][0][number]
  isCompany: boolean
  isProfessional: boolean
  onClick: () => void
}

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export function ProjectCard({
  project,
  isCompany,
  isProfessional,
  onClick,
}: ProjectCardProps) {
  const [global] = useAtom(globalAtom)
  const hasApplied =
    isProfessional &&
    project.proposals?.some((p: any) => p.professionalId === global.id)

  const hasProposals =
    isCompany && project.proposals && project.proposals.length > 0

  const getStatusBadge = () => {
    if (project.status === 'Completed') {
      return (
        <Badge className="!rounded-md !bg-green-50 !px-2 !py-0.5 !text-xs !font-normal !text-green-700">
          Completed
        </Badge>
      )
    } else if (project.status === 'InProgress') {
      return (
        <Badge className="!rounded-md !bg-blue-50 !px-2 !py-0.5 !text-xs !font-normal !text-blue-700">
          In Progress
        </Badge>
      )
    } else if (project.approved && project.status === 'Open') {
      return (
        <Badge className="!rounded-md !bg-[#edecea]/30 !px-2 !py-0.5 !text-xs !font-normal !text-[#234d64]/80">
          Open
        </Badge>
      )
    } else {
      return (
        <Badge className="!rounded-md !bg-yellow-50 !px-2 !py-0.5 !text-xs !font-normal !text-yellow-700">
          Not Approved Yet
        </Badge>
      )
    }
  }

  return (
    <motion.div
      {...CARD_ANIMATION}
      className={cn(
        'cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md',
        hasApplied
          ? 'border-l-4 border-gray-100 !border-l-[#63B7B7]'
          : 'border-gray-200',
        isCompany && hasProposals
          ? 'border-l-4 border-gray-100 !border-l-[#63B7B7]'
          : '',
      )}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isCompany
                ? `Posted ${new Date(project.createdAt).toLocaleDateString(
                    'en-GB',
                    {
                      day: 'numeric',
                      month: 'short',
                    },
                  )} - ${calculateDaysSince(new Date(project.createdAt))}`
                : project.company?.name || 'Company Name'}
            </p>
          </div>

          {getStatusBadge()}
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-700">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.skills?.slice(0, 3).map((skill: any) => (
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
          )}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <span>{formatCurrency(project.meta?.budget || 0)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4 text-gray-400" />
            <span>{project.meta?.duration || 'Not specified'}</span>
          </div>
        </div>

        {/* Company-specific info */}
        {isCompany && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <Users className="mr-1.5 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {project.proposals?.length || 0} Proposal
                {project.proposals?.length !== 1 ? 's' : ''}
              </span>
            </div>
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
          </div>
        )}

        {/* Professional-specific info */}
        {isProfessional && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            {hasApplied ? (
              <Badge className="rounded-md border-none !bg-[#BEDDF1]/20 px-2 py-0.5 text-xs font-normal text-[#63B7B7]">
                <CheckCircle className="mr-1 h-3 w-3" />
                Applied
              </Badge>
            ) : (
              <span className="text-sm text-gray-500">
                <Clock className="mr-1 inline-block h-3.5 w-3.5" />
                {new Date(project.createdAt).toLocaleDateString('en-GB', {
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
          </div>
        )}
      </div>
    </motion.div>
  )
}
