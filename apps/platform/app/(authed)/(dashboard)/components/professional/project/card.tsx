import React from 'react'
import { motion } from 'motion/react'
import {
  Award,
  Bookmark,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle,
  Calendar,
  Building,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dallah/design-system'
import { calculateDaysSince, cn } from '@dallah/utils'
import type { GetAllProjectsRes } from '@lib/api/pro/projects'
import { formatCurrency } from '@lib/utils/format-currency'

interface ProjectCardProps {
  project: GetAllProjectsRes['data'][0][number]
  onClick: (
    project: GetAllProjectsRes['data'][0][number],
    e: React.MouseEvent,
  ) => void
}

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { title, company, description, skills, applied } = project

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <motion.div
      {...CARD_ANIMATION}
      onClick={(e) => onClick(project, e)}
      className={cn(
        'group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#63B7B7]/40 hover:shadow-md',
        applied ? 'border-l-4 border-l-[#63B7B7]' : '',
      )}
    >
      <div className="flex h-full flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 transition-colors group-hover:text-[#1D8489]">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <Building className="h-3.5 w-3.5 text-gray-400" />
              <p className="text-sm text-gray-500">{company.name}</p>
            </div>
            {applied && (
              <Badge className="mt-2 rounded-md border-none !bg-[#BEDDF1]/20 px-2 py-0.5 text-xs font-normal text-[#63B7B7]">
                <CheckCircle className="mr-1 h-3 w-3" />
                Applied
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
            onClick={handleBookmark}
            aria-label="Save this project"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-5 line-clamp-3 flex-grow text-ellipsis text-sm text-gray-600">
          {description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill: string) => (
            <span
              key={skill}
              className="rounded-full bg-[#BEDDF1]/20 px-3 py-1 text-xs text-[#63B7B7]"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-help items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate font-medium">
                      {formatCurrency(project.meta.budget || 0)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                >
                  <p>Project Budget</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-help items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate">
                      {project.meta.duration || 'Not specified'}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                >
                  <p>Project Duration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="whitespace-nowrap text-xs text-gray-400">
            <Clock className="mr-1 inline-block h-3 w-3" />
            {new Date(project.createdAt).toLocaleDateString('en-UK', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
            - {calculateDaysSince(new Date(project.createdAt))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
