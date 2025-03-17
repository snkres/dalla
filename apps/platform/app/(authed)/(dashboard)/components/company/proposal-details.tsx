'use client'

import { motion } from 'motion/react'
import { Button, Badge } from '@dallah/design-system'
import {
  ArrowLeft,
  Star,
  DollarSign,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  User,
  Briefcase,
  MapPin,
  FileText,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { Link } from 'next-view-transitions'

interface ProposalDetailsProps {
  handleCloseProposal: () => void
  selectedProposal: string | null
  proposals: GetAllCompanyProjectsRes['data'][0][number]['proposals']
}

const ProposalDetails = ({
  handleCloseProposal,
  selectedProposal,
  proposals,
}: ProposalDetailsProps) => {
  const selectedProposalData = selectedProposal
    ? proposals.find((p) => p.id === selectedProposal)
    : null

  return (
    <motion.div
      {...SLIDE_ANIMATION}
      className="fixed bottom-2 left-auto right-4 top-2 z-50 flex w-full flex-col rounded-3xl border-l border-gray-200 bg-white shadow-lg md:w-[600px] lg:w-[750px]"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <button
          onClick={handleCloseProposal}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-sm font-medium text-gray-700">Proposal Details</h2>
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
                  {selectedProposalData?.professional.UserProfile?.avatar && (
                    <Image
                      src={
                        selectedProposalData.professional.UserProfile.avatar ||
                        '/placeholder.svg'
                      }
                      alt={selectedProposalData.professional.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between">
                  <h1 className="text-lg font-medium text-gray-800">
                    {selectedProposalData?.professional.name}
                  </h1>
                  <Badge className="!border-amber-200 !bg-amber-50 !text-amber-700">
                    {Math.floor(Math.random() * 100)}% Match
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedProposalData?.professional.UserProfile?.headline ||
                    'N/A'}
                </p>

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-700">
                      {selectedProposalData?.professional?.UserProfile?.meta
                        ?.rating || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>
                      {selectedProposalData?.professional?.UserProfile?.meta
                        ?.location || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-3.5 w-3.5" />
                    <span>
                      {selectedProposalData?.professional?.UserProfile?.meta
                        ?.yearsOfExperience || 'N/A'}{' '}
                      yrs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-1 flex flex-wrap gap-1.5">
              {selectedProposalData?.professional?.UserProfile?.meta?.skills?.map(
                (skill: string, index: number) => (
                  <Badge
                    key={index}
                    className="!rounded-md !border-none !bg-[#63B7B7]/5 !px-2 !py-0.5 !text-xs !font-normal !text-[#63B7B7]"
                  >
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                Cover Letter
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-gray-600">
                {selectedProposalData?.description ||
                  'No cover letter provided.'}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center border-b border-gray-200 p-3">
              <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <User className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <h2 className="text-sm font-medium text-gray-800">
                Consultant Information
              </h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Experience
                    </span>
                  </div>
                  <p className="ml-5 text-sm font-medium text-gray-900">
                    {selectedProposalData?.professional?.UserProfile?.meta
                      ?.yearsOfExperience || 'N/A'}{' '}
                    years
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">
                      Projects Completed
                    </span>
                  </div>
                  <p className="ml-5 text-sm font-medium text-gray-900">
                    {selectedProposalData?.professional?.UserProfile?.meta
                      ?.projectsCompleted || '0'}{' '}
                    projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-y-auto rounded-r-3xl border-r border-t border-gray-100 bg-gray-50 md:w-64 md:border-l md:border-t-0 lg:w-72">
          <div className="space-y-3">
            <div className="border-b border-gray-200">
              <div className="flex items-center border-b border-gray-200 p-3">
                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                  <DollarSign className="h-3.5 w-3.5 text-[#63B7B7]" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Proposal Details
                </h3>
              </div>
              <div className="space-y-3 p-6 px-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-800">
                    $ {selectedProposalData?.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Time</span>
                  <span className="font-normal text-gray-800">
                    {selectedProposalData?.timeline || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submitted</span>
                  <span className="font-normal text-gray-800">
                    {selectedProposalData?.createdAt
                      ? new Date(
                          selectedProposalData.createdAt,
                        ).toLocaleDateString('en-UK', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </div>
                <div className="my-2 !h-0.5 !w-full !bg-gray-200" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge className="!border-amber-200 !bg-amber-50 !text-amber-700">
                    {selectedProposalData?.status === 'pending'
                      ? 'Pending Review'
                      : selectedProposalData?.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 p-4">
              <Button className="mb-2 h-9 w-full !bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90">
                Hire
              </Button>

              <Button
                variant="outline"
                className="mb-2 h-9 w-full border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Message
              </Button>

              <div className="mt-3 flex gap-2">
                <Button
                  variant="ghost"
                  className="h-9 flex-1 text-gray-700 hover:bg-gray-100"
                >
                  <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                  Decline
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <h4 className="mb-2 text-xs font-medium text-gray-800">
                  View Full Profile
                </h4>
                <p className="mb-3 text-xs text-gray-600">
                  See this consultant&apos;s complete work history, portfolio,
                  and reviews.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-full text-xs"
                  asChild
                >
                  <Link
                    href={`/professionals/${selectedProposalData?.professional.username}`}
                  >
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProposalDetails
