import React from 'react'
import { motion } from 'motion/react'
import { Award, Flame, DollarSign, Clock, MapPin } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'
import type { Project } from '@lib/api/pro/projects'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project, e: React.MouseEvent) => void
}

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { title, company, description, skills } = project

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <motion.div
      {...CARD_ANIMATION}
      onClick={(e) => onClick(project, e)}
      className={cn(
        'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md',
      )}
    >
      <div className="flex h-full flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{project.company.name}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
            onClick={handleBookmark}
            aria-label="Save this project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bookmark"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </Button>
        </div>

        <p className="mb-5 line-clamp-2 flex-grow text-sm text-gray-600">
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
          <div className="grid grid-cols-3 gap-3 text-sm text-gray-600">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-help items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate">{project.meta.budget}</span>
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

            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-help items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate">{project.meta.priority}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                >
                  <p>Project Duration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-help items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                >
                  <p>Work Location</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </div>
          <div className="whitespace-nowrap text-xs text-gray-400">
            Posted{' '}
            {new Date(project.createdAt).toLocaleDateString('en-UK', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
