import React from 'react'
import { motion } from 'motion/react'
import { Bookmark, Clock, CheckCircle, Calendar, Building } from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dalla/design-system'
import {
  calculateDaysSince,
  cn,
  detectLanguage,
  getRelativeTime,
  translateDuration,
} from '@dalla/utils'
import type { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
import { formatCurrency } from '@lib/utils/format-currency'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProjectCardProps {
  project: GetAllProjectsProfessionalViewRes['data'][0][number]
  onClick: (
    project: GetAllProjectsProfessionalViewRes['data'][0][number],
    e: React.MouseEvent,
  ) => void
}

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslation()
  const { locale } = useLocale()
  const { title, company, description, skills, applied } = project

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const dateLocale = locale === 'ar' ? 'ar-SA' : 'en-GB'

  // Prepare translations for getRelativeTime
  const relativeTimeTranslations = {
    justNow: t.dashboard.shared.relativeTime.justNow,
    minuteAgo: t.dashboard.shared.relativeTime.minuteAgo,
    minutesAgo: t.dashboard.shared.relativeTime.minutesAgo,
    hourAgo: t.dashboard.shared.relativeTime.hourAgo,
    hoursAgo: t.dashboard.shared.relativeTime.hoursAgo,
    dayAgo: t.dashboard.shared.relativeTime.dayAgo,
    daysAgo: t.dashboard.shared.relativeTime.daysAgo,
  }

  return (
    <motion.div
      {...CARD_ANIMATION}
      onClick={(e) => onClick(project, e)}
      className={cn(
        'group h-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#63B7B7]/40 hover:shadow-md',
        applied ? 'border-l-4 border-l-[#63B7B7]' : '',
      )}
    >
      <div className="flex h-full flex-col p-5">
        <div
          className="mb-4 flex items-start justify-between gap-4"
          dir={detectLanguage(title) === 'arabic' ? 'rtl' : 'ltr'}
        >
          <div>
            <h3
              className={cn(
                'text-base font-medium text-gray-900 transition-colors group-hover:text-[#1D8489]',
                detectLanguage(title) === 'english'
                  ? '!font-nebula'
                  : 'font-arabic',
              )}
            >
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <Building className="h-3.5 w-3.5 text-gray-400" />
              <p
                className={cn(
                  'text-sm text-gray-500',
                  detectLanguage(company.name) === 'english'
                    ? 'font-nebula'
                    : 'font-arabic',
                )}
              >
                {company.name}
              </p>
            </div>
            {applied && (
              <Badge
                className="mt-2 rounded-md border-none !bg-[#BEDDF1]/20 px-2 py-0.5 text-xs font-normal text-[#63B7B7]"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              >
                <CheckCircle
                  className={cn('h-3 w-3', locale === 'ar' ? 'ml-1' : 'mr-1')}
                />
                {t.dashboard.projectCard.appliedBadge}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-full text-gray-400 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
            onClick={handleBookmark}
            aria-label={t.dashboard.projectCard.saveButtonAriaLabel}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <p
          className={cn(
            'mb-5 line-clamp-3 overflow-hidden text-ellipsis text-sm',
            detectLanguage(description) === 'english'
              ? 'font-nebula'
              : 'font-arabic',
          )}
          dir={detectLanguage(description) === 'arabic' ? 'rtl' : 'ltr'}
        >
          {description}
        </p>

        <div
          className={cn(
            'mb-5 flex flex-wrap gap-2',
            detectLanguage(skills?.[0] || '') === 'english'
              ? 'font-nebula'
              : 'font-arabic',
          )}
          dir={detectLanguage(skills?.[0] || '') === 'arabic' ? 'rtl' : 'ltr'}
        >
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
                    <span className="truncate font-medium">
                      {formatCurrency(project.meta.budget || 0, locale)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                  <p>{t.dashboard.projectCard.budgetTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex cursor-help items-center gap-1.5"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <Calendar className="h-4 w-4 text-[#63B7B7]" />
                    <span className="truncate">
                      {translateDuration(project.meta.duration || '', locale) ||
                        t.dashboard.projectCard.durationNotSpecified}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#1D8489] text-white"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                >
                  <p>{t.dashboard.projectCard.durationTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="whitespace-nowrap text-xs text-gray-400">
            <Clock
              className={cn(
                'inline-block h-3 w-3',
                locale === 'ar' ? 'ml-1' : 'mr-1',
              )}
            />
            {getRelativeTime(project.createdAt, {
              locale,
              translations: relativeTimeTranslations,
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
