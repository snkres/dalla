import React from 'react'
import { motion } from 'motion/react'
import { Badge, Riyal } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import {
  FileText,
  ArrowUpRight,
  Calendar,
  Users,
  ChevronRight,
  MessageSquare,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

const ActiveProjectView = ({
  project,
}: {
  project: GetAllCompanyProjectsRes['data'][0][number]
}) => {
  const t = useTranslation()
  const { locale } = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>
              {/* <Badge className="!border !border-[#63B7B7]/30 !bg-[#E0F2F2] !px-2 !py-0.5 !text-xs !text-[#1D8489]">
                {project.status}
              </Badge> */}
            </div>
            <p className="text-xs text-gray-500">
              {t.dashboard.companyComponents.activeProjectView.projectIdPrefix}{' '}
              {project.id}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="h-8 !border-[#63B7B7]/30 !text-xs !text-[#1D8489] hover:bg-[#E0F2F2]"
              asChild
            >
              <Link href={`/projects/${project.id}`} prefetch={true}>
                <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
                {
                  t.dashboard.companyComponents.activeProjectView
                    .dashboardButton
                }
              </Link>
            </Button>
          </div>
        </div>

        <p className="mb-5 text-sm text-gray-600">{project.description}</p>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#1D8489]" />
                <h4 className="text-sm font-medium text-[#1D8489]">
                  {
                    t.dashboard.companyComponents.activeProjectView
                      .timelineTitle
                  }
                </h4>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {
                    t.dashboard.companyComponents.activeProjectView
                      .durationLabel
                  }
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {project.meta.timeline ?? project.meta.duration}
                </span>
              </div>
              {/* {project.assignedProfessionalId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Remaining</span>
                  <span className="text-sm font-medium text-[#1D8489]">
                    45 days
                  </span>
                </div>
              )} */}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="border-b border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Riyal className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-medium text-green-700">
                  {t.dashboard.companyComponents.activeProjectView.budgetTitle}
                </h4>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {t.dashboard.companyComponents.activeProjectView.totalLabel}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {formatCurrency(Number(project.meta.budget), locale)}
                </span>
              </div>
              {project.assignedProfessionalId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {t.dashboard.companyComponents.activeProjectView.spentLabel}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(
                      Number(project.meta.budget) -
                        Number(
                          project.proposals.find(
                            (proposal) =>
                              proposal.professionalId ===
                              project.assignedProfessionalId,
                          )?.professional.UserProfile?.meta?.totalEarned || 0,
                        ),
                      locale,
                    )}{' '}
                    {project.status === 'InProgress' && (
                      <span className="text-xs text-gray-500">
                        {
                          t.dashboard.companyComponents.activeProjectView
                            .inEscrowBadge
                        }
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {project.assignedProfessionalId && (
        <div className="px-5 pb-5">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-purple-100 bg-purple-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <h4 className="text-sm font-medium text-purple-700">
                  {
                    t.dashboard.companyComponents.activeProjectView
                      .assignedConsultantTitle
                  }
                </h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-purple-600 hover:bg-purple-100"
                asChild
              >
                <Link
                  href={`/professionals/${
                    project.proposals.find(
                      (proposal) =>
                        proposal.professionalId ===
                        project.assignedProfessionalId,
                    )?.professional.username
                  }`}
                  prefetch={true}
                >
                  {
                    t.dashboard.companyComponents.activeProjectView
                      .viewProfileButton
                  }
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>

            <div className="bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-purple-100">
                  <Image
                    src={
                      project?.proposals.find(
                        (proposal) =>
                          proposal.professionalId ===
                          project.assignedProfessionalId,
                      )?.professional.UserProfile?.avatar || ''
                    }
                    alt={
                      project?.proposals.find(
                        (proposal) =>
                          proposal.professionalId ===
                          project.assignedProfessionalId,
                      )?.professional.name || ''
                    }
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h5 className="text-base font-medium text-gray-900">
                      {project?.proposals.find(
                        (proposal) =>
                          proposal.professionalId ===
                          project.assignedProfessionalId,
                      )?.professional.name || ''}
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
                        {project?.proposals.find(
                          (proposal) =>
                            proposal.professionalId ===
                            project.assignedProfessionalId,
                        )?.professional.UserProfile?.meta?.rating || 5}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {project?.proposals.find(
                      (proposal) =>
                        proposal.professionalId ===
                        project.assignedProfessionalId,
                    )?.professional.UserProfile.headline || ''}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="h-8 !bg-[#63B7B7] text-xs text-white hover:!bg-[#1D8489]"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                      {
                        t.dashboard.companyComponents.activeProjectView
                          .messageButton
                      }
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
