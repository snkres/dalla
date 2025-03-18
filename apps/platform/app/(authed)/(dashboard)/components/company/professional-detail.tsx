import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import {
  Star,
  MapPin,
  DollarSign,
  MessageSquare,
  Briefcase,
  ExternalLink,
  Bookmark,
  ChevronRight,
  Shield,
  X,
  FileText,
  Boxes,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { useQuery } from '@tanstack/react-query'
import { getProProfile } from '@lib/api/pro/profile'
import { formatDate } from '@dallah/utils'

interface ConsultantDetailProps {
  username: string
  onClose: () => void
}

export function ConsultantDetail({ username, onClose }: ConsultantDetailProps) {
  const { data: professional } = useQuery({
    queryKey: ['professional', username],
    queryFn: () => getProProfile(username),
  })

  if (!professional?.data) return null

  console.log(professional.data)

  const matchPercentage = Math.round(
    ((professional?.data?.data?.meta?.successRate ?? 0) / 5) * 100,
  )

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-xl"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-sm font-medium text-gray-700">
          Consultant Profile
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-[#63B7B7]"
          asChild
        >
          <Link href={`/professionals/${username}`} prefetch>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-100 p-5">
            <div className="mb-4 flex items-start gap-4">
              <div className="relative">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white">
                  <Image
                    src={professional?.data?.data?.avatar ?? ''}
                    alt={professional?.data?.data?.User?.name ?? ''}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                    professional?.data?.data?.meta?.availability === 'Available'
                      ? 'bg-emerald-500'
                      : professional?.data?.data?.meta?.availability === 'Busy'
                        ? 'bg-amber-500'
                        : 'bg-gray-400'
                  }`}
                ></div>
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between">
                  <h1 className="text-lg font-medium text-gray-800">
                    {professional?.data?.data?.User?.name}
                  </h1>
                  <Badge
                    className={`!rounded-full !px-2 !py-0.5 !text-xs !font-medium capitalize ${
                      professional?.data?.data?.meta?.availability ===
                      'available'
                        ? '!bg-emerald-50 !text-emerald-700'
                        : professional?.data?.data?.meta?.availability ===
                            'unavailable'
                          ? '!bg-amber-50 !text-amber-700'
                          : '!bg-gray-100 !text-gray-700'
                    }`}
                  >
                    {professional?.data?.data?.meta?.availability}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {professional?.data?.data?.headline}
                </p>

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-700">
                      {professional?.data?.data?.meta?.successRate ?? 5}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>{professional?.data?.data?.meta?.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-3.5 w-3.5" />
                    <span>
                      {professional?.data?.data?.meta?.yearsOfExperience} yrs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-1 flex flex-wrap gap-1.5">
              {professional?.data?.data?.meta?.skills
                .slice(0, 5)
                .map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    className="!rounded-md !border-none !bg-[#63B7B7]/5 !px-2 !py-0.5 !text-xs !font-normal !text-[#63B7B7]"
                  >
                    {skill}
                  </Badge>
                ))}
              {professional?.data?.data?.meta?.skills.length &&
                professional?.data?.data?.meta?.skills.length > 5 && (
                  <Badge className="!rounded-md !border-none !bg-gray-50 !px-2 !py-0.5 !text-xs !font-normal !text-gray-600">
                    +{professional?.data?.data?.meta?.skills.length - 5}
                  </Badge>
                )}
            </div>
          </div>

          <div className="border-b border-gray-100 bg-[#63B7B7]/5 px-5 py-3">
            <div className="flex items-center text-xs text-gray-700">
              <Shield className="mr-2 h-3.5 w-3.5 text-[#63B7B7]" />
              <span>Match score: </span>
              <span className="ml-1 font-medium text-[#63B7B7]">
                {matchPercentage}%
              </span>
              <span className="ml-1">for your project requirements</span>
            </div>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">About</h2>
            </div>
            <p className="p-6 px-4 text-sm leading-relaxed text-gray-600">
              {professional?.data?.data?.bio}
            </p>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Briefcase className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                Work History
              </h2>
            </div>
            <div className="space-y-4 p-6 px-4">
              {professional?.data?.data?.experience?.map(
                (exp: any, index: number) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <h3 className="mb-1 text-sm font-medium text-gray-800">
                      {exp.title} at {exp.company}
                    </h3>
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                      <span>
                        {formatDate(new Date(exp.startDate))} -{' '}
                        {exp.endDate === 'present'
                          ? 'Present'
                          : formatDate(new Date(exp.endDate))}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {exp.meta.achievements}
                    </p>
                  </div>
                ),
              )}
              {(!professional?.data?.data?.experience ||
                professional?.data?.data?.experience.length === 0) && (
                <p className="text-sm text-gray-500">
                  No work history available
                </p>
              )}
            </div>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Boxes className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                Portfolio & Projects
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-7 text-xs text-[#63B7B7]"
              >
                View all <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 p-6 px-4">
              {professional?.data?.data?.projects?.slice(0, 3).map((p: any) => (
                <div className="rounded-lg bg-[#63B7B7]/10 p-3">
                  <h4 className="mb-1 text-xs font-medium text-gray-800">
                    {p.title}
                  </h4>
                  <p className="mb-1 text-[11px] text-gray-500">
                    {p.skills.join(', ')}
                  </p>
                  <p className="text-xs text-gray-600">{p.description}</p>
                </div>
              ))}
              {professional?.data?.data?.User.projects
                ?.slice(0, 3)
                .map((p: any) => (
                  <div className="rounded-lg bg-[#63B7B7]/10 p-3">
                    <h4 className="mb-1 text-xs font-medium text-gray-800">
                      {p.title}
                    </h4>
                    <p className="mb-1 text-[11px] text-gray-500">
                      {p.skills.join(', ')}
                    </p>
                    <p className="text-xs text-gray-600">{p.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-100 bg-gray-50 md:w-64 md:border-l md:border-t-0 lg:w-72">
          <div className="space-y-3">
            <div className="border-b border-gray-200">
              <div className="flex items-center border-b border-gray-200 p-2">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <DollarSign className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Rate & Availability
                </h3>
              </div>
              <div className="space-y-2 p-6 px-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="text-sm font-normal text-gray-800">
                    ${professional?.data?.data?.meta?.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Availability</span>
                  <span className="text-sm font-normal text-gray-800">
                    {professional?.data?.data?.meta?.weeklyAvailability ??
                      'N/A'}{' '}
                    hrs/week
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 p-3 pt-0">
                <div className="flex items-center justify-start">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <Star className="h-3.5 w-3.5 text-[#63B7B7]" />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-sm font-medium text-gray-800">
                      Professional Rating
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="mr-1 flex items-center">
                        {Array.from(
                          {
                            length: professional?.data?.data?.meta?.rating ?? 5,
                          },
                          (_, index) => index + 1,
                        ).map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 fill-amber-400 text-amber-400`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-normal">
                        {professional?.data?.data?.meta?.successRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="p-2"></div> */}

              {/* <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-8 w-full text-xs text-[#63B7B7]"
              >
                View all reviews
              </Button> */}
            </div>
            <div className="border-b border-gray-200 p-2">
              <Button className="mb-2 h-9 w-full !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90">
                Hire Professional
              </Button>

              <Button
                variant="outline"
                className="mb-2 h-9 w-full !border-[#63B7B7] !text-[#63B7B7] hover:!bg-[#63B7B7]/5"
              >
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Message
              </Button>

              <Button
                variant="ghost"
                className="h-9 w-full !text-gray-700 hover:!bg-gray-100"
              >
                <Bookmark className="mr-1.5 h-3.5 w-3.5" />
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
