import React from 'react'
import {
  Globe,
  Clock,
  Flag,
  Bookmark,
  FileText,
  User,
  CheckCircle,
  MapPin,
  Briefcase,
  AlertTriangle,
  Link,
  Info,
  Users,
} from 'lucide-react'
import { Button, Modal } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'
import { Project } from '@lib/types/project'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
  onApplyClick: () => void
}

export function ProjectDetail({
  project,
  onClose,
  onApplyClick,
}: ProjectDetailProps) {
  const t = useTranslation()
  const { locale } = useLocale()

  const attachments = [
    { name: 'detail_mockup.html', size: '10 KB' },
    { name: 'home_mockup.html', size: '9 KB' },
    { name: 'homepage_experience.md', size: '6 KB' },
    { name: 'developer_guide.md', size: '8 KB' },
  ]

  const skillCategories = [
    {
      title:
        t.dashboard.companyComponents.projectDetail.skillCategoryFrontendLang,
      skills: ['CSS'],
    },
    {
      title:
        t.dashboard.companyComponents.projectDetail
          .skillCategoryFrontendDeliverables,
      skills: ['Website'],
    },
    {
      title: t.dashboard.companyComponents.projectDetail.skillCategoryOther,
      skills: ['HTML5', 'Hugo'],
    },
    {
      title: t.dashboard.companyComponents.projectDetail.skillCategoryRequired,
      skills: project.skills,
    },
  ]

  const clientStats = [
    {
      label: t.dashboard.companyComponents.projectDetail.clientStatHireRate,
      value: '0%',
    },
    {
      label: t.dashboard.companyComponents.projectDetail.clientStatOpenJobs,
      value: '1',
    },
    {
      label: t.dashboard.companyComponents.projectDetail.clientStatMemberSince,
      value: 'Mar 3, 2025',
    },
  ]

  const activityStats = [
    {
      label: t.dashboard.companyComponents.projectDetail.activityProposals,
      value: t.dashboard.companyComponents.projectDetail.activityProposalsValue,
    },
    {
      label: t.dashboard.companyComponents.projectDetail.activityLastViewed,
      value:
        t.dashboard.companyComponents.projectDetail.activityLastViewedValue.replace(
          '{time}',
          '6 minutes',
        ),
    },
    {
      label: t.dashboard.companyComponents.projectDetail.activityInterviewing,
      value: '0',
    },
    {
      label: t.dashboard.companyComponents.projectDetail.activityInvitesSent,
      value: '1',
    },
    {
      label:
        t.dashboard.companyComponents.projectDetail.activityUnansweredInvites,
      value: '1',
    },
  ]

  return (
    <Modal isOpen={true} onClose={onClose} title={project.title} width="xl">
      {/* <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
        <button
          onClick={onClose}
          className="flex items-center text-[#234d64] transition-colors hover:text-[#234d64]/80"
        >
          <ArrowLeft className="mr-1 h-5 w-5" />
        </button>
        <div className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            className="hidden border-[#63B7B7] text-[#63B7B7] hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]/90 sm:flex"
          >
            <ExternalLink className="mr-1 h-4 w-4" />
            Open in new window
          </Button>
        </div>
      </div> */}

      <div
        className="flex h-full flex-col md:flex-row"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div>
                <h1 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 sm:text-sm">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
                    {t.dashboard.companyComponents.projectDetail.postedDate.replace(
                      '{postedDate}',
                      project.postedDate ?? '',
                    )}
                  </span>
                  <span className="flex items-center">
                    <Globe className="mr-1 h-3.5 w-3.5 text-gray-400" />
                    {project.location}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="mr-1 h-3.5 w-3.5 text-gray-400" />
                    {
                      t.dashboard.companyComponents.projectDetail
                        .projectTypeLabel
                    }
                  </span>
                </div>
              </div>
              <Badge className="border-1 rounded-md bg-[#edecea]/30 text-xs text-[#234d64]/80 shadow-none hover:bg-[#BEDDF1]/60">
                {t.dashboard.companyComponents.projectDetail.fixedPriceBadge}
              </Badge>
            </div>
            <div className="mb-6 rounded-lg bg-[#BEDDF1]/20 p-3 sm:p-4">
              <div className="flex items-center">
                <Info className="mr-2 h-4 w-4 flex-shrink-0 text-[#63B7B7]" />
                <span className="text-xs text-gray-700 sm:text-sm">
                  {
                    t.dashboard.companyComponents.projectDetail
                      .customProfileInfoStart
                  }
                </span>
                <a
                  href="#"
                  className="ml-1 text-xs font-medium text-[#63B7B7] hover:underline sm:text-sm"
                >
                  {
                    t.dashboard.companyComponents.projectDetail
                      .customProfileInfoLink
                  }
                </a>
                <span className="ml-1 text-xs text-gray-700 sm:text-sm">
                  {' '}
                  {
                    t.dashboard.companyComponents.projectDetail
                      .customProfileInfoEnd
                  }
                </span>
              </div>
            </div>
            <div className="mb-6 sm:mb-8">
              <div className="prose max-w-none text-sm text-gray-700 sm:text-base">
                <p className="mb-3 text-sm sm:mb-4">
                  Hey there! We&apos;re looking for a talented{' '}
                  <strong>Hugo developer</strong> to help us bring a beautiful,
                  user-friendly website to life. The project involves creating a{' '}
                  <strong>homepage</strong> and a <strong>detail page</strong>{' '}
                  for a site aimed at inspiring single moms and stay-at-home
                  parents to start their own home-based businesses.
                </p>
                <p className="mb-3 text-sm sm:mb-4">
                  The homepage will feature a clean, modern design with{' '}
                  <strong>filterable business idea cards</strong>, while the
                  detail page will provide a{' '}
                  <strong>step-by-step blueprint</strong> for each idea,
                  complete with vibrant imagery and smooth transitions.
                  We&apos;re using <strong>Hugo</strong> for static site
                  generation, <strong>Tailwind CSS</strong> for styling, and
                  advanced CSS for animations and interactions.
                </p>
                <p className="mb-3 text-sm sm:mb-4">
                  If you have a <strong>good eye for beautiful graphics</strong>
                  , a knack for creating seamless user experiences, and
                  experience with Hugo and Tailwind, we&apos;d love to hear from
                  you! Bonus points if you&apos;re passionate about empowering
                  others through design and technology.
                </p>
                <p className="mb-3 text-sm sm:mb-4">
                  Let&apos;s build something inspiring together! 🚀
                </p>
              </div>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.companyComponents.projectDetail.budgetLabel}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  {project.budget}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {
                    t.dashboard.companyComponents.projectDetail
                      .experienceLevelLabel
                  }
                </div>
                <div className="text-sm font-medium text-gray-900 sm:text-base">
                  {
                    t.dashboard.companyComponents.projectDetail
                      .experienceLevelValue
                  }
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {
                    t.dashboard.companyComponents.projectDetail
                      .experienceLevelDescription
                  }
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  {t.dashboard.companyComponents.projectDetail.durationLabel}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  <Clock className="mr-1 h-4 w-4 text-gray-500" />
                  {project.duration}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <FileText className="h-4 w-4 text-[#63B7B7]" />
                <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                  {t.dashboard.companyComponents.projectDetail.attachmentsTitle.replace(
                    '{count}',
                    attachments.length.toString(),
                  )}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg bg-[#BEDDF1]/20 px-3 py-2 text-xs transition-colors hover:bg-[#BEDDF1]/35 sm:text-sm"
                  >
                    <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white">
                      <FileText className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate font-medium text-gray-800">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">{attachment.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 sm:mb-8">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Info className="h-4 w-4 text-[#63B7B7]" />
                <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                  {t.dashboard.companyComponents.projectDetail.skillsTitle}
                </h2>
              </div>

              <div className="mb-[100px] space-y-4 sm:space-y-5">
                {skillCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="mb-2 text-xs font-medium text-gray-700 sm:text-sm">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="border-1 rounded-md bg-[#edecea]/30 text-xs text-[#234d64]/80 shadow-none hover:bg-[#BEDDF1]/60"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-100 bg-white md:w-[320px] md:border-l md:border-t-0">
          <div className="sticky top-[73px] p-4 sm:p-5">
            <div className="mb-5 space-x-2">
              <Button
                onClick={onApplyClick}
                className="flex-1 !bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90"
              >
                {t.dashboard.companyComponents.projectDetail.applyButton}
              </Button>
              <Button variant="outline" className="px-3">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">
                  {t.dashboard.companyComponents.projectDetail.saveButton}
                </span>
              </Button>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-sm font-medium text-gray-900">
                {t.dashboard.companyComponents.projectDetail.aboutClientTitle}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-700">
                  <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />
                  {t.dashboard.companyComponents.projectDetail.paymentVerified}
                </div>
                {clientStats.map((stat) => (
                  <div key={stat.label} className="flex items-center text-xs">
                    <span className="w-24 text-gray-500">{stat.label}</span>
                    <span className="font-medium text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium text-gray-900">
                {t.dashboard.companyComponents.projectDetail.activityTitle}
              </h3>
              <div className="space-y-2">
                {activityStats.map((stat) => (
                  <div key={stat.label} className="flex items-center text-xs">
                    <span className="w-24 text-gray-500">{stat.label}</span>
                    <span className="font-medium text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="mb-3 w-full bg-[#63B7B7] py-5 text-sm font-medium text-white hover:bg-[#63B7B7]/90 sm:py-6 sm:text-base"
              onClick={onApplyClick}
            >
              Apply now
            </Button>

            <div className="mb-5 flex gap-2 sm:mb-6">
              <Button
                variant="outline"
                className="flex flex-1 items-center justify-center border-[#63B7B7] text-xs text-[#63B7B7] hover:bg-[#BEDDF1]/60 sm:text-sm"
              >
                <Bookmark className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                className="flex flex-1 items-center justify-center border-gray-200 text-xs text-gray-600 hover:bg-gray-50 sm:text-sm"
              >
                <Flag className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Report
              </Button>
            </div>
            <div className="mb-5 rounded-lg bg-[#BEDDF1]/20 p-3 sm:mb-6 sm:p-4">
              <div className="mb-1 flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-[#63B7B7] sm:h-4 sm:w-4" />
                <span className="text-xs font-medium text-gray-800 sm:text-sm">
                  Proposal details
                </span>
              </div>
              <p className="mb-2 text-xs text-gray-700 sm:text-sm">
                This proposal requires 9 Dalla credits
              </p>
              <p className="text-xs font-medium text-[#63B7B7] sm:text-sm">
                You have 669 credits available
              </p>
            </div>
            <div className="mb-5 border-t border-gray-100 pt-4 sm:mb-6 sm:pt-5">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <User className="h-4 w-4 text-[#63B7B7]" />
                <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                  About the client
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="mb-1 flex items-center">
                    <AlertTriangle className="mr-1 h-3.5 w-3.5 text-orange-500 sm:h-4 sm:w-4" />
                    <span className="text-xs text-gray-600 sm:text-sm">
                      Payment method not verified
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-3.5 w-3.5 text-[#63B7B7] sm:h-4 sm:w-4" />
                    <span className="text-xs text-gray-600 sm:text-sm">
                      Phone number verified
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-md bg-[#BEDDF1]/20 p-3">
                  <MapPin className="h-3.5 w-3.5 text-[#63B7B7] sm:h-4 sm:w-4" />
                  <div>
                    <p className="text-xs text-gray-800 sm:text-sm">
                      United States
                    </p>
                    <p className="text-xs text-gray-500">6:31 AM local time</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {clientStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-xs sm:text-sm"
                    >
                      <span className="text-gray-600">{stat.label}</span>
                      <span className="text-gray-800">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-5 border-t border-gray-100 pt-4 sm:mb-6 sm:pt-5">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Link className="h-4 w-4 text-[#63B7B7]" />
                <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                  Share project
                </h3>
              </div>
              <div className="mb-2 flex items-center justify-between rounded-md bg-[#BEDDF1]/20 p-3">
                <p className="w-4/5 truncate text-xs text-gray-600 sm:text-sm">
                  https://dalla.com/projects/...
                </p>
                <Button
                  variant="ghost"
                  className="h-auto p-0 text-xs text-[#63B7B7] hover:bg-transparent hover:text-[#63B7B7]/80"
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-100 pb-8 pt-4 sm:pt-5">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Users className="h-4 w-4 text-[#63B7B7]" />
                <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                  Project activity
                </h3>
              </div>

              <div className="mb-4 space-y-2 sm:mb-5 sm:space-y-3">
                {activityStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-medium text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
