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
  Link,
  Info,
  Users,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { getProjectById } from '@lib/api/pro/projects'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLocalTimeForLocation } from '@dallah/utils'

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
  const { data } = useQuery({
    queryKey: ['project', projectId, 'professional'],
    queryFn: () => getProjectById(projectId),
  })

  useEffect(() => {
    // Store the original scroll position
    const scrollY = window.scrollY

    // Store original body styles before modifying
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalWidth = document.body.style.width
    const originalTop = document.body.style.top
    const originalHeight = document.body.style.height

    // Apply scroll locking
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`
    document.body.style.height = '100%'

    // Cleanup function to restore original state
    return () => {
      // First restore original styles
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
      document.body.style.top = originalTop
      document.body.style.height = originalHeight

      // Then restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [])

  return (
    <motion.div
      {...SLIDE_ANIMATION}
      className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-gray-200 bg-white shadow-xl md:w-[1000px]"
    >
      <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
        <button
          onClick={(e) => {
            // Extract the scroll position from the body's top property
            const scrollY = document.body.style.top
              ? Number.parseInt(document.body.style.top.replace('px', '')) * -1
              : 0

            // Reset all body styles completely
            document.body.style.removeProperty('overflow')
            document.body.style.removeProperty('position')
            document.body.style.removeProperty('width')
            document.body.style.removeProperty('top')
            document.body.style.removeProperty('height')

            // Force a small delay before restoring scroll
            setTimeout(() => {
              window.scrollTo(0, scrollY)
              onClose()
            }, 10)
          }}
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
      </div>

      <div className="flex h-full flex-col md:flex-row">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
              <div>
                <h1 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {data?.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 sm:text-sm">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
                    Posted{' '}
                    {data?.createdAt
                      ? new Date(data.createdAt).toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Recently'}
                  </span>
                </div>
              </div>
              <Badge className="border-1 rounded-md !bg-[#edecea]/30 text-xs !text-[#234d64]/80 shadow-none hover:!bg-[#BEDDF1]/60">
                Fixed-Price
              </Badge>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="prose max-w-none text-sm text-gray-700 sm:text-base">
                {data?.description || 'No description provided.'}
              </div>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">Budget</div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  {data?.meta?.budget
                    ? `$${data.meta.budget}`
                    : 'Not specified'}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">Wanted Title</div>
                <div className="text-sm font-medium text-gray-900 sm:text-base">
                  {data?.jobTitle || 'Not specified'}
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                <div className="mb-1 text-xs text-gray-500">
                  Project Duration
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 sm:text-base">
                  <Clock className="mr-1 h-4 w-4 text-gray-500" />
                  {data?.meta?.duration || 'Not specified'}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Info className="h-4 w-4 text-[#63B7B7]" />
                <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                  Skills and Expertise
                </h2>
              </div>

              {data?.skills && data.skills.length > 0 && (
                <div className="mb-4 space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
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

            {data?.deliverables && (
              <div className="mb-6 sm:mb-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <CheckCircle className="h-4 w-4 text-[#63B7B7]" />
                  <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                    Deliverables
                  </h2>
                </div>
                <div className="prose max-w-none text-sm text-gray-700 sm:text-base">
                  {data.deliverables}
                </div>
              </div>
            )}

            {data?.scope && (
              <div className="mb-6 sm:mb-8">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <Briefcase className="h-4 w-4 text-[#63B7B7]" />
                  <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                    Project Scope
                  </h2>
                </div>
                <div className="prose max-w-none text-sm text-gray-700 sm:text-base">
                  {data.scope}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full border-t border-gray-100 bg-white md:w-[320px] md:border-l md:border-t-0">
          <div className="sticky top-[73px] p-4 sm:p-5">
            <Button
              className="mb-3 w-full !bg-[#63B7B7] py-5 text-sm font-medium text-white hover:!bg-[#63B7B7]/90 sm:py-6 sm:text-base"
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

            <div className="border-t border-gray-100 px-6 py-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Company
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Company</p>
                    <p className="text-sm text-gray-500">
                      {data?.company?.name || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Total Projects
                    </p>
                    <p className="text-sm text-gray-500">
                      {data?.company?._count?.projects
                        ? `${data.company._count.projects} projects`
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Location
                    </p>
                    <p className="text-sm text-gray-500">
                      {data?.company?.CompanyProfile?.location || 'Remote'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[#63B7B7]" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Local Time
                    </p>
                    <p className="text-sm text-gray-500">
                      {data?.company?.CompanyProfile?.location
                        ? getLocalTimeForLocation(
                            data.company.CompanyProfile.location,
                          )
                        : 'Time zone not available'}
                    </p>
                  </div>
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
                  https://dalla.com/projects/{data?.id}
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
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Proposals</span>
                  <span className="font-medium text-gray-800">
                    {data?._count?.proposals || 0}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-gray-800">
                    {data?.status || 'Open'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
