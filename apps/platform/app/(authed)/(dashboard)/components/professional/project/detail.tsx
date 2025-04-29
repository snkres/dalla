'use client'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Clock,
  Flag,
  Bookmark,
  ExternalLink,
  CheckCircle,
  MapPin,
  Briefcase,
  Link as LinkIcon, // Renamed to avoid conflict
  Info,
  Users,
  FileText,
  Eye,
  Download,
  Calendar,
} from 'lucide-react'
import { Button, Modal } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import { getProjectById } from '@lib/api/pro/projects'
import {
  detectLanguage,
  SLIDE_ANIMATION,
  translateDuration,
} from '@dalla/utils'
import { useEffect, useState } from 'react' // Added useState
import { useQuery } from '@tanstack/react-query'
import { getLocalTimeForLocation, cn, getRelativeTime } from '@dalla/utils' // Added cn, getRelativeTime
import { ListDisplay } from '@dalla/components/listDisplay'
import { useTranslation } from '@hooks/use-translation' // Added
import { useLocale } from '@hooks/use-locale' // Added
import { formatCurrency } from '@lib/utils/format-currency' // Added
import Link from 'next/link' // Added

interface ProjectDetailProps {
  projectId: string
  onClose: () => void
  onApplyClick: () => void
}

export function ProjectDetail({
  projectId,
  onClose,
  onApplyClick,
}: ProjectDetailProps) {
  const t = useTranslation()
  const { locale } = useLocale()

  const { data } = useQuery({
    queryKey: ['project', projectId, 'professional'],
    queryFn: () => getProjectById(projectId),
  })

  useEffect(() => {
    const scrollY = window.scrollY

    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalWidth = document.body.style.width
    const originalTop = document.body.style.top
    const originalHeight = document.body.style.height

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`
    document.body.style.height = '100%'

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
      document.body.style.top = originalTop
      document.body.style.height = originalHeight

      window.scrollTo(0, scrollY)
    }
  }, [])

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

  const dateLocale = locale === 'ar' ? 'ar-SA' : 'en-GB'

  // Basic pluralization helper (replace with i18n library for full support)
  const formatPlural = (
    key: keyof typeof t.dashboard.projectDetail,
    count: number,
  ) => {
    // This is a simplified example. Real pluralization is complex.
    // For demo, just replacing {count}
    const translation = t.dashboard.projectDetail[key] as string
    return translation.replace('{count}', String(count))
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={t.dashboard.projectDetail.modalTitle.replace(
        '{projectTitle}',
        data?.title || '',
      )}
      width="xl"
    >
      <div className="flex flex-col md:flex-row" dir="ltr">
        {/* Main Content Scroll Area */}
        <div
          className="h-full flex-1 overflow-y-auto"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div>
                <h1
                  className={cn(
                    'mb-2 text-lg font-semibold text-gray-900 sm:text-xl',
                    detectLanguage(data?.title || '') === 'english'
                      ? 'font-nebula'
                      : 'font-arabic',
                  )}
                >
                  {data?.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 sm:text-sm">
                  <span className="flex items-center gap-1">
                    <Clock
                      className={cn(
                        'h-3.5 w-3.5 text-gray-400',
                        locale === 'ar' ? 'ml-1' : 'mr-1', // Adjust icon margin
                      )}
                    />
                    {data?.createdAt
                      ? getRelativeTime(data.createdAt, {
                          locale,
                          translations: relativeTimeTranslations,
                        })
                      : t.dashboard.projectDetail.postedRecently}
                  </span>
                </div>
              </div>
              <Badge className="border-1 w-fit rounded-md !bg-[#edecea]/30 text-xs !text-[#234d64]/80 shadow-none hover:!bg-[#BEDDF1]/60">
                {t.dashboard.projectDetail.fixedPriceBadge}
              </Badge>
            </div>

            <div className="mb-6 sm:mb-8">
              <div
                className={cn(
                  'prose max-w-none text-sm text-gray-700 sm:text-base',
                  detectLanguage(data?.description || '') === 'english'
                    ? 'font-nebula'
                    : 'font-arabic',
                )}
                dir={
                  detectLanguage(data?.description || '') === 'arabic'
                    ? 'rtl'
                    : 'ltr'
                }
              >
                {data?.description || t.dashboard.projectDetail.noDescription}
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.projectDetail.budgetLabel}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  {data?.meta?.budget
                    ? formatCurrency(data.meta.budget, locale)
                    : t.dashboard.projectDetail.notSpecified}
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.projectDetail.wantedTitleLabel}
                </div>
                <div className="text-sm font-medium text-gray-900 sm:text-base">
                  {data?.jobTitle || t.dashboard.projectDetail.notSpecified}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.projectDetail.durationLabel}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  <Clock
                    className={cn(
                      'h-4 w-4 text-gray-500',
                      locale === 'ar' ? 'ml-1' : 'mr-1', // Adjust icon margin
                    )}
                  />
                  {translateDuration(data?.meta?.duration || '', locale) ||
                    t.dashboard.projectDetail.notSpecified}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Info
                  className={cn(
                    'h-4 w-4 text-[#63B7B7]',
                    locale === 'ar' ? 'ml-2' : 'mr-2', // Adjust icon margin
                  )}
                />
                <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                  {t.dashboard.projectDetail.skillsTitle}
                </h2>
              </div>
              {data?.skills && data.skills.length > 0 && (
                <div className="mb-4 space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill: string) => (
                        <Badge
                          key={skill}
                          className="border-1 rounded-md !bg-[#edecea]/30 text-xs !text-[#234d64]/80 shadow-none hover:!bg-[#BEDDF1]/60"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deliverables */}
            {data?.deliverables && (
              <div className="mb-6 sm:mb-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <CheckCircle
                    className={cn(
                      'h-4 w-4 text-[#63B7B7]',
                      locale === 'ar' ? 'ml-2' : 'mr-2',
                    )}
                  />
                  <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                    {t.dashboard.projectDetail.deliverablesTitle}
                  </h2>
                </div>
                <ListDisplay
                  value={data.deliverables}
                  emptyText={t.dashboard.projectDetail.deliverablesEmpty}
                  className="text-gray-600"
                />
              </div>
            )}

            {/* Scope */}
            {data?.scope && (
              <div className="mb-6 sm:mb-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <Briefcase
                    className={cn(
                      'h-4 w-4 text-[#63B7B7]',
                      locale === 'ar' ? 'ml-2' : 'mr-2',
                    )}
                  />
                  <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                    {t.dashboard.projectDetail.scopeTitle}
                  </h2>
                </div>
                <ListDisplay
                  value={data.scope}
                  emptyText={t.dashboard.projectDetail.scopeEmpty}
                  className="text-gray-600"
                />
              </div>
            )}

            {/* Files */}
            {data?.media && data.media.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <FileText
                    className={cn(
                      'h-4 w-4 text-[#63B7B7]',
                      locale === 'ar' ? 'ml-2' : 'mr-2',
                    )}
                  />
                  <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                    {t.dashboard.projectDetail.filesTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {data.media.map((file: string) => (
                    <div
                      key={file}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-3 flex items-center">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg bg-[#BEDDF1]/20 shadow-sm',
                            locale === 'ar' ? 'ml-3' : 'mr-3', // Adjust icon margin
                          )}
                        >
                          <FileText className="h-5 w-5 text-[#63B7B7]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {file.split('/').pop() || file}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-[#63B7B7] hover:bg-[#BEDDF1]/20"
                          onClick={() => window.open(file, '_blank')}
                        >
                          <Eye
                            className={cn(
                              'h-3.5 w-3.5',
                              locale === 'ar' ? 'ml-1.5' : 'mr-1.5',
                            )}
                          />
                          {t.dashboard.projectDetail.previewButton}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            const link = document.createElement('a')
                            link.href = file
                            link.download = file.split('/').pop() || 'download'
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }}
                        >
                          <Download
                            className={cn(
                              'h-3.5 w-3.5',
                              locale === 'ar' ? 'ml-1.5' : 'mr-1.5',
                            )}
                          />
                          {t.dashboard.projectDetail.downloadButton}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            'h-[calc(100vh-100px)] w-full shrink-0 border-gray-200 md:w-72 lg:w-80 xl:w-96',
            'border-l',
          )}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="p-4 sm:p-6">
            {/* Client Info */}
            {data?.company && (
              <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Users
                    className={cn(
                      'h-4 w-4 text-[#63B7B7]',
                      locale === 'ar' ? 'ml-2' : 'mr-2',
                    )}
                  />
                  <h3 className="text-sm font-medium text-gray-900">
                    {t.dashboard.projectDetail.aboutClientTitle}
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <Link
                      href={`/companies/${data.company.id}`}
                      className={cn(
                        'text-base font-semibold text-gray-800 underline underline-offset-2 hover:text-[#63B7B7]',
                        detectLanguage(data.company.name) === 'english'
                          ? 'font-nebula'
                          : 'font-arabic',
                      )}
                    >
                      {data.company.name}
                    </Link>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {t.dashboard.projectDetail.clientTotalProjects}
                      </p>
                      <p className="text-sm text-gray-500">
                        {data?.company?._count?.projects
                          ? `${data.company._count.projects} ${t.dashboard.projectDetail.projectsSuffix}`
                          : t.dashboard.projectDetail.notSpecified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {t.dashboard.projectDetail.clientLocation}
                      </p>
                      <p className="text-sm text-gray-500">
                        {data?.company?.CompanyProfile?.location ||
                          t.dashboard.projectDetail.remoteLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {t.dashboard.projectDetail.clientLocalTime}
                      </p>
                      <p className="text-sm text-gray-500">
                        {data?.company?.CompanyProfile?.location
                          ? getLocalTimeForLocation(
                              data.company.CompanyProfile.location,
                            )
                          : t.dashboard.projectDetail
                              .clientTimeZoneNotAvailable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity */}
            <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Clock
                  className={cn(
                    'h-4 w-4 text-[#63B7B7]',
                    locale === 'ar' ? 'ml-2' : 'mr-2',
                  )}
                />
                <h3 className="text-sm font-medium text-gray-900">
                  {t.dashboard.projectDetail.activityTitle}
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>
                    {formatPlural(
                      'activityProposals',
                      data?._count?.proposals || 0,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div
            className={cn(
              'sticky bottom-0 flex items-center justify-between gap-3 border-t border-gray-200 bg-white p-4 sm:p-6',
              locale === 'ar' ? 'flex-row-reverse' : '',
            )}
          >
            <div className="flex gap-2">
              <Button
                className="h-10 w-full flex-1 !bg-[#63B7B7] !text-sm font-medium transition-colors duration-200 hover:!bg-[#63B7B7]/90 sm:flex-initial sm:px-6"
                onClick={onApplyClick}
              >
                {t.dashboard.projectDetail.applyButton}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 flex-shrink-0 rounded-lg border-gray-300 text-gray-500 hover:border-[#63B7B7] hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
              >
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">
                  {t.dashboard.projectDetail.saveButton}
                </span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 px-2 text-xs text-gray-500 hover:text-red-600"
            >
              <Flag className="h-3.5 w-3.5" />
              {t.dashboard.projectDetail.flagLink}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
