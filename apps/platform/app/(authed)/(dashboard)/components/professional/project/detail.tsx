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
import { SLIDE_ANIMATION } from '@dalla/utils'
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
      <div
        className="flex h-[calc(100%-57px)] flex-col overflow-hidden md:flex-row"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div>
                <h1 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {data?.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 sm:text-sm">
                  <span className="flex items-center">
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

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <div className="prose max-w-none text-sm text-gray-700 sm:text-base">
                {data?.description || t.dashboard.projectDetail.noDescription}
                {/* Localized */}
              </div>
            </div>

            {/* Budget, Title, Duration Cards */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
              {/* Budget Card */}
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.projectDetail.budgetLabel}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  {data?.meta?.budget
                    ? formatCurrency(data.meta.budget, locale)
                    : t.dashboard.projectDetail.notSpecified}
                  {/* Localized */}
                </div>
              </div>
              {/* Wanted Title Card */}
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.projectDetail.wantedTitleLabel}
                </div>
                <div className="text-sm font-medium text-gray-900 sm:text-base">
                  {data?.jobTitle || t.dashboard.projectDetail.notSpecified}
                  {/* Localized */}
                </div>
              </div>
              {/* Duration Card */}
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
                  {data?.meta?.duration ||
                    t.dashboard.projectDetail.notSpecified}
                  {/* Localized */}
                </div>
              </div>
            </div>

            {/* Skills */}
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
            'w-full shrink-0 overflow-y-auto border-gray-200 md:w-72 lg:w-80 xl:w-96',
            locale === 'ar' ? 'border-r' : 'border-l',
          )}
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
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={(data.company as any).logo || '/placeholder-logo.png'}
                    alt={data.company.name}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
                  />
                  <div>
                    <Link
                      href={`/companies/${data.company.id}`}
                      className="text-base font-semibold text-gray-800 hover:text-[#63B7B7]"
                    >
                      {data.company.name}
                    </Link>
                    <div
                      className={cn(
                        'mt-1 flex items-center text-xs',
                        (data.company as any).user?.UserProfile
                          ?.isPaymentVerified
                          ? 'text-green-600'
                          : 'text-gray-500',
                      )}
                    >
                      <CheckCircle
                        className={cn(
                          'h-3 w-3',
                          locale === 'ar' ? 'ml-1' : 'mr-1',
                          (data.company as any).user?.UserProfile
                            ?.isPaymentVerified
                            ? ''
                            : 'text-gray-400',
                        )}
                      />
                      {(data.company as any).user?.UserProfile
                        ?.isPaymentVerified
                        ? t.dashboard.projectDetail.paymentVerified
                        : t.dashboard.projectDetail.paymentNotVerified}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  {(data.company as any).user?.UserProfile?.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span>
                        {t.dashboard.projectDetail.clientLocationTime
                          .replace(
                            '{location}',
                            (data.company as any).user.UserProfile.location,
                          )
                          .replace(
                            '{time}',
                            getLocalTimeForLocation(
                              (data.company as any).user.UserProfile.location,
                            ) || '',
                          )}
                      </span>
                    </div>
                  )}
                  {(data.company as any).user?.projects &&
                    (data.company as any).user.projects.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <span>
                          {formatPlural(
                            'clientProjectsPosted',
                            (data.company as any).user.projects.length,
                          )}
                        </span>
                      </div>
                    )}
                  {(data.company as any).user?.UserProfile?.hireRate && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">%</span>
                      <span>
                        {t.dashboard.projectDetail.clientHireRate.replace(
                          '{rate}',
                          String(
                            (data.company as any).user.UserProfile.hireRate,
                          ),
                        )}
                      </span>
                    </div>
                  )}
                  {(data.company as any).user?.createdAt && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span>
                        {t.dashboard.projectDetail.clientMemberSince.replace(
                          '{date}',
                          new Date(
                            (data.company as any).user.createdAt,
                          ).toLocaleDateString(dateLocale, {
                            year: 'numeric',
                            month: 'long',
                          }),
                        )}
                      </span>
                    </div>
                  )}
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
                <div className="flex justify-between">
                  <span>
                    {formatPlural(
                      'activityInterviewing',
                      (data?._count as any)?.interviews || 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {formatPlural(
                      'activityInvitesSent',
                      (data?._count as any)?.invitesSent || 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {formatPlural(
                      'activityUnansweredInvites',
                      (data?._count as any)?.unansweredInvites || 0,
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
