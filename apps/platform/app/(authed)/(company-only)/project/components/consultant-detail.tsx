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
  Award,
  Boxes,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { Consultant } from '@lib/types/company'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'

interface ConsultantDetailProps {
  consultant: Consultant
  onClose: () => void
}

export function ConsultantDetail({
  consultant,
  onClose,
}: ConsultantDetailProps) {
  const matchPercentage = Math.round((consultant.rating / 5) * 100)

  return (
    <motion.div
      {...SLIDE_ANIMATION}
      className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col border-l border-gray-100 bg-white shadow-lg md:w-[600px] lg:w-[750px]"
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
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex h-full flex-col overflow-hidden md:flex-row">
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-100 p-5">
            <div className="mb-4 flex items-start gap-4">
              <div className="relative">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white">
                  <Image
                    src={consultant.avatar}
                    alt={consultant.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div
                  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                    consultant.availability === 'Available'
                      ? 'bg-emerald-500'
                      : consultant.availability === 'Busy'
                        ? 'bg-amber-500'
                        : 'bg-gray-400'
                  }`}
                ></div>
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between">
                  <h1 className="text-lg font-medium text-gray-800">
                    {consultant.name}
                  </h1>
                  <Badge
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      consultant.availability === 'Available'
                        ? 'bg-emerald-50 text-emerald-700'
                        : consultant.availability === 'Busy'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {consultant.availability}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{consultant.expertise}</p>

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-700">
                      {consultant.rating}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>{consultant.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-3.5 w-3.5" />
                    <span>{consultant.experience} yrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-1 flex flex-wrap gap-1.5">
              {consultant.skills.slice(0, 5).map((skill, index) => (
                <Badge
                  key={index}
                  className="rounded-md border-none bg-[#63B7B7]/5 px-2 py-0.5 text-xs font-normal text-[#63B7B7]"
                >
                  {skill}
                </Badge>
              ))}
              {consultant.skills.length > 5 && (
                <Badge className="rounded-md border-none bg-gray-50 px-2 py-0.5 text-xs font-normal text-gray-600">
                  +{consultant.skills.length - 5}
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
              {consultant.bio ||
                `${consultant.name} is a ${consultant.expertise} with ${consultant.experience} years of experience. Specialized in ${consultant.skills.slice(0, 3).join(', ')}, and more.`}
            </p>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Award className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">Expertise</h2>
            </div>
            <div className="space-y-3 p-6 px-4">
              {(
                consultant.expertiseAreas || [
                  { name: consultant.skills[0] || 'UI/UX Design', level: 90 },
                  {
                    name: consultant.skills[1] || 'Frontend Development',
                    level: 85,
                  },
                  {
                    name: consultant.skills[2] || 'Responsive Design',
                    level: 75,
                  },
                ]
              )
                .slice(0, 3)
                .map((area, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="min-w-[100px] text-xs text-gray-700">
                      {area.name}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#63B7B7]"
                        style={{ width: `${area.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {area.level}%
                    </span>
                  </div>
                ))}
            </div>
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
              {(
                consultant.workHistory || [
                  {
                    title: 'Senior UI/UX Designer',
                    company: 'DesignCo',
                    period: 'Jan 2022 - Present',
                    type: 'Contract',
                    description:
                      'Led the redesign of multiple web applications, improving user engagement by 40%.',
                  },
                  {
                    title: 'Frontend Developer',
                    company: 'TechSolutions',
                    period: 'Mar 2019 - Dec 2021',
                    type: 'Full-time',
                    description:
                      'Developed responsive web applications using React and Next.js.',
                  },
                ]
              ).map((work, index) => (
                <div key={index} className="group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        {work.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {work.company} • {work.period}
                      </p>
                    </div>
                    <Badge className="border-none bg-[#63B7B7]/10 text-xs text-[#63B7B7]">
                      {work.type}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {work.description}
                  </p>
                </div>
              ))}
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
              <div className="rounded-lg bg-[#63B7B7]/10 p-3">
                <h4 className="mb-1 text-xs font-medium text-gray-800">
                  E-commerce Website Redesign
                </h4>
                <p className="mb-1 text-[11px] text-gray-500">
                  UI/UX Design, Frontend Development
                </p>
                <p className="text-xs text-gray-600">
                  Increased conversion rate by 35% through improved user
                  experience and responsive design.
                </p>
              </div>
              <div className="rounded-lg bg-[#63B7B7]/10 p-3">
                <h4 className="mb-1 text-xs font-medium text-gray-800">
                  SaaS Dashboard
                </h4>
                <p className="mb-1 text-[11px] text-gray-500">
                  UI Design, React Development
                </p>
                <p className="text-xs text-gray-600">
                  Created an intuitive analytics dashboard for a SaaS platform
                  with real-time data visualization.
                </p>
              </div>
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
                    ${consultant.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Availability</span>
                  <span className="text-sm font-normal text-gray-800">
                    30+ hrs/week
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Start Date</span>
                  <span className="text-sm font-normal text-gray-800">
                    Immediate
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
                      Client Reviews
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="mr-1 flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${star <= Math.floor(consultant.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-normal">
                        {consultant.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="ml-1 text-xs text-gray-500">(24 reviews)</span>
              </div>

              <div className="p-2">
                <div className="mb-2 rounded-lg border border-gray-100 bg-[#63B7B7]/10 p-3">
                  <p className="mb-1 text-xs font-medium text-gray-800">
                    &quot;Very responsive and professional. Delivered
                    high-quality work ahead of schedule.&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">
                      John D. • Project Manager
                    </p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="my-2 h-0.5 w-full bg-gray-200" />
                <div className="mb-2 rounded-lg border border-gray-100 bg-[#63B7B7]/10 p-3">
                  <p className="mb-1 text-xs font-medium text-gray-800">
                    &quot;Very responsive and professional. Delivered
                    high-quality work ahead of schedule.&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">
                      John D. • Project Manager
                    </p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-8 w-full text-xs text-[#63B7B7]"
              >
                View all reviews
              </Button>
            </div>
            <div className="border-b border-gray-200 p-2">
              <Button className="mb-2 h-9 w-full bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90">
                Hire Consultant
              </Button>

              <Button
                variant="outline"
                className="mb-2 h-9 w-full border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Message
              </Button>

              <Button
                variant="ghost"
                className="h-9 w-full text-gray-700 hover:bg-gray-100"
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
