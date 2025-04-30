'use client'

import { Button, Badge, Modal, Riyal } from '@dalla/design-system'
import {
  Star,
  MessageSquare,
  ThumbsDown,
  User,
  Briefcase,
  MapPin,
  FileText,
  Award,
  Clock,
  Calendar,
  CheckSquare,
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { detectLanguage } from '@dalla/utils'
import { updateProposalStatus } from '@lib/api/company/proposals'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { Link } from 'next-view-transitions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dalla/design-system'
import type { AxiosResponse } from 'axios'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'
import { formatCurrency } from '@lib/utils/format-currency'

interface ProposalDetailsProps {
  handleCloseProposal: () => void
  selectedProposalId: string | null
  onStatusChange?: (proposalId: string, status: string) => void
}

const ProposalDetails = ({
  handleCloseProposal,
  selectedProposalId,
}: ProposalDetailsProps) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [showHireDialog, setShowHireDialog] = useState(false)
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)

  const selectedProposalData = selectedProposalId
    ? queryClient
        .getQueryData<AxiosResponse<GetAllCompanyProjectsRes>>([
          'projects',
          'overview',
        ])
        ?.data.data[0]?.find((p) =>
          p.proposals.find((p) => p.id === selectedProposalId),
        )
        ?.proposals.find((p) => p.id === selectedProposalId)
    : null

  const hasMilestones =
    selectedProposalData?.milestones &&
    selectedProposalData.milestones.length > 0

  // Calculate total from milestones
  const totalMilestonesAmount = hasMilestones
    ? selectedProposalData?.milestones.reduce(
        (sum, milestone) => sum + milestone.price,
        0,
      )
    : selectedProposalData?.price || 0

  const hireProposalMutation = useMutation({
    mutationFn: () => {
      if (!selectedProposalId || !selectedProposalData?.id) {
        throw new Error('Missing proposal or project ID')
      }
      return updateProposalStatus(
        selectedProposalData.projectId,
        selectedProposalId,
        'Accepted',
      )
    },
    onSuccess: () => {
      toast({
        title:
          t.dashboard.companyComponents.proposalDetails.toastHireSuccessTitle,
        description:
          t.dashboard.companyComponents.proposalDetails
            .toastHireSuccessDescription,
        variant: 'default',
      })

      setTimeout(() => {
        handleCloseProposal()
      }, 1500)
    },
    onError: (error) => {
      toast({
        title:
          t.dashboard.companyComponents.proposalDetails.toastHireErrorTitle,
        description:
          error instanceof Error
            ? error.message
            : t.dashboard.companyComponents.proposalDetails
                .toastGenericErrorDescription,
        variant: 'destructive',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['projects'],
        exact: false,
      })
    },
  })

  const declineProposalMutation = useMutation({
    mutationFn: () => {
      if (!selectedProposalId || !selectedProposalData?.id) {
        throw new Error('Missing proposal or project ID')
      }
      return updateProposalStatus(
        selectedProposalData.projectId,
        selectedProposalId,
        'Rejected',
      )
    },
    onSuccess: () => {
      toast({
        title:
          t.dashboard.companyComponents.proposalDetails
            .toastDeclineSuccessTitle,
        description:
          t.dashboard.companyComponents.proposalDetails
            .toastDeclineSuccessDescription,
        variant: 'default',
      })

      setTimeout(() => {
        handleCloseProposal()
      }, 1500)
    },
    onError: (error) => {
      toast({
        title:
          t.dashboard.companyComponents.proposalDetails.toastDeclineErrorTitle,
        description:
          error instanceof Error
            ? error.message
            : t.dashboard.companyComponents.proposalDetails
                .toastGenericErrorDescription,
        variant: 'destructive',
      })
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['projects'],
        exact: false,
      })
    },
  })

  const handleHire = () => {
    setShowHireDialog(true)
  }

  const confirmHire = () => {
    hireProposalMutation.mutate()
    setShowHireDialog(false)
  }

  const handleDecline = () => {
    setShowDeclineDialog(true)
  }

  const confirmDecline = () => {
    declineProposalMutation.mutate()
    setShowDeclineDialog(false)
  }

  return (
    <>
      <TooltipProvider>
        <Modal
          isOpen={true}
          onClose={handleCloseProposal}
          title={t.dashboard.companyComponents.proposalDetails.modalTitle}
          width="xl"
        >
          <div
            className="flex h-full flex-col overflow-hidden md:flex-row"
            dir={'ltr'}
          >
            <div
              className="flex-1 overflow-y-auto"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="border-b border-gray-100 p-5">
                <div className="mb-4 flex items-start gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white">
                      {selectedProposalData?.professional.UserProfile
                        ?.avatar && (
                        <Image
                          src={
                            selectedProposalData.professional.UserProfile
                              .avatar || '/placeholder.svg'
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
                        {Math.floor(Math.random() * 100)}
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .matchSuffix
                        }
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedProposalData?.professional.UserProfile
                        ?.headline ||
                        t.dashboard.companyComponents.proposalDetails.textNA}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-gray-700">
                          {selectedProposalData?.professional?.UserProfile?.meta
                            ?.rating ||
                            t.dashboard.companyComponents.proposalDetails
                              .textNA}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        <span>
                          {selectedProposalData?.professional?.UserProfile?.meta
                            ?.location ||
                            t.dashboard.companyComponents.proposalDetails
                              .textNA}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="mr-1 h-3.5 w-3.5" />
                        <span>
                          {selectedProposalData?.professional?.UserProfile?.meta
                            ?.yearsOfExperience ||
                            t.dashboard.companyComponents.proposalDetails
                              .textNA}{' '}
                          {
                            t.dashboard.companyComponents.proposalDetails
                              .yearsExperienceSuffix
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mb-1 flex flex-wrap gap-1.5"
                  dir={
                    detectLanguage(
                      selectedProposalData?.professional?.UserProfile?.meta
                        ?.skills?.[0] || '',
                    ) === 'arabic'
                      ? 'rtl'
                      : 'ltr'
                  }
                >
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

              {/* Milestone Section */}
              {hasMilestones && (
                <div className="border-b border-gray-100">
                  <div className="flex items-center justify-between border-b border-gray-200 p-3">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                        <Award className="h-3.5 w-3.5 text-[#63B7B7]" />
                      </div>
                      <h2 className="text-sm font-medium text-gray-800">
                        Project Milestones
                      </h2>
                    </div>
                    <Badge className="!border-[#63B7B7]/20 !bg-[#63B7B7]/10 !text-[#63B7B7]">
                      {selectedProposalData?.milestones.length} Milestones
                    </Badge>
                  </div>
                  <div className="p-5">
                    {/* Milestone Timeline Visualization */}
                    <div className="mb-6">
                      <div className="flex h-8 w-full overflow-hidden rounded-full">
                        {selectedProposalData?.milestones.map(
                          (milestone, index) => {
                            const percentage =
                              (milestone.price / totalMilestonesAmount) * 100
                            return (
                              <div
                                key={index}
                                className="group relative flex items-center justify-center transition-all duration-300 hover:brightness-90"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: `hsl(180, 35%, ${60 - index * 5}%)`,
                                }}
                                onClick={() =>
                                  setActiveMilestone(
                                    activeMilestone === index ? null : index,
                                  )
                                }
                              >
                                <span className="text-xs font-medium text-white">
                                  {index + 1}
                                </span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="absolute inset-0 cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="bottom"
                                    className="border-none bg-gray-800 text-white"
                                  >
                                    {milestone.title}:{' '}
                                    {formatCurrency(milestone.price, locale)} (
                                    {Math.round(percentage)}%)
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            )
                          },
                        )}
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Project Start</span>
                        <span>Project Completion</span>
                      </div>
                    </div>

                    {/* Milestone Details */}
                    <div className="relative mt-8 space-y-6">
                      {/* Visual timeline connector */}
                      <div className="absolute left-[22px] top-0 h-full w-0.5 bg-[#63B7B7]/20"></div>

                      {selectedProposalData?.milestones.map(
                        (milestone, index) => (
                          <div
                            key={index}
                            className={`relative mb-6 last:mb-0 ${activeMilestone === index ? 'z-10' : ''}`}
                          >
                            {/* Timeline node */}
                            <div
                              className={`absolute left-0 top-0 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                activeMilestone === index
                                  ? 'border-[#63B7B7] bg-[#63B7B7] text-white'
                                  : 'border-[#63B7B7] bg-white text-[#63B7B7]'
                              } text-sm font-medium`}
                              onClick={() =>
                                setActiveMilestone(
                                  activeMilestone === index ? null : index,
                                )
                              }
                            >
                              {index + 1}
                            </div>

                            <div
                              className={`ml-16 overflow-hidden rounded-xl border transition-all duration-200 ${
                                activeMilestone === index
                                  ? 'border-[#63B7B7] shadow-md'
                                  : 'border-gray-100'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b border-gray-100 bg-[#BEDDF1]/5 p-3">
                                <span className="text-sm font-medium text-gray-700">
                                  {milestone.title}
                                </span>
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-[#63B7B7]/10 px-2 py-0.5">
                                    <span className="text-xs font-medium text-[#63B7B7]">
                                      {formatCurrency(milestone.price, locale)}
                                    </span>
                                  </div>
                                  {/* <Badge
                                    className={
                                      milestone.status === 'Completed'
                                        ? '!border-green-200 !bg-green-50 !text-green-700'
                                        : milestone.status === 'In Progress'
                                          ? '!border-blue-200 !bg-blue-50 !text-blue-700'
                                          : '!border-amber-200 !bg-amber-50 !text-amber-700'
                                    }
                                  >
                                    {milestone.status}
                                  </Badge> */}
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="mb-4">
                                  <p className="text-sm text-gray-600">
                                    {milestone.description}
                                  </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                  <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <Clock className="h-4 w-4 text-[#63B7B7]" />
                                    <div>
                                      <span className="block text-xs text-gray-500">
                                        Duration
                                      </span>
                                      <span className="text-sm font-medium">
                                        {milestone.timeline}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <Calendar className="h-4 w-4 text-[#63B7B7]" />
                                    <div>
                                      <span className="block text-xs text-gray-500">
                                        Order
                                      </span>
                                      <span className="text-sm font-medium">
                                        {milestone.order} of{' '}
                                        {
                                          selectedProposalData?.milestones
                                            .length
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* {milestone.submission && (
                                  <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3">
                                    <div className="mb-2 flex items-center gap-2">
                                      <CheckSquare className="h-4 w-4 text-[#63B7B7]" />
                                      <span className="text-xs font-medium text-gray-700">
                                        Submission
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {milestone.submission}
                                    </p>
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="border-b border-gray-100">
                <div className="flex items-center border-b border-gray-200 p-3">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
                  </div>
                  <h2 className="text-sm font-medium text-gray-800">
                    {
                      t.dashboard.companyComponents.proposalDetails
                        .coverLetterTitle
                    }
                  </h2>
                </div>
                <div className="p-5">
                  <p
                    className="text-sm leading-relaxed text-gray-600"
                    dir={
                      detectLanguage(
                        selectedProposalData?.description ||
                          t.dashboard.companyComponents.proposalDetails
                            .noCoverLetter,
                      ) === 'arabic'
                        ? 'rtl'
                        : 'ltr'
                    }
                  >
                    {selectedProposalData?.description ||
                      t.dashboard.companyComponents.proposalDetails
                        .noCoverLetter}
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center border-b border-gray-200 p-3">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <User className="h-3.5 w-3.5 text-[#63B7B7]" />
                  </div>
                  <h2 className="text-sm font-medium text-gray-800">
                    {
                      t.dashboard.companyComponents.proposalDetails
                        .timelineTitle
                    }
                  </h2>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-700" dir={'ltr'}>
                    {selectedProposalData?.timeline}
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <div className="flex items-center border-b border-gray-200 p-3">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <Riyal className="h-3.5 w-3.5" />
                  </div>
                  <h2 className="text-sm font-medium text-gray-800">
                    {t.dashboard.companyComponents.proposalDetails.rateTitle}
                  </h2>
                </div>
                <div className="p-5">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(selectedProposalData?.price || 0, locale)}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="flex items-center border-b border-gray-200 p-3">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                    <FileText className="h-3.5 w-3.5 text-[#63B7B7]" />
                  </div>
                  <h2 className="text-sm font-medium text-gray-800">
                    {
                      t.dashboard.companyComponents.proposalDetails
                        .attachmentsTitle
                    }
                  </h2>
                </div>
                <div className="p-5">
                  {selectedProposalData?.media?.length &&
                  selectedProposalData?.media?.length > 0 ? (
                    <div className="space-y-2">
                      {selectedProposalData?.media?.map(
                        (file: string, index: number) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-md bg-gray-50 p-2 transition-colors hover:bg-gray-100"
                          >
                            <span className="text-sm text-gray-700">
                              Attachment {index + 1}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                            >
                              {
                                t.dashboard.companyComponents.proposalDetails
                                  .downloadAttachmentButton
                              }
                            </Button>
                          </a>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {
                        t.dashboard.companyComponents.proposalDetails
                          .noAttachments
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className="w-full overflow-y-auto rounded-r-3xl border-r border-t border-gray-100 bg-gray-50 md:w-64 md:border-l md:border-t-0 lg:w-72"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              <div className="space-y-3">
                <div className="border-b border-gray-200">
                  <div className="flex items-center border-b border-gray-200 p-3">
                    <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#63B7B7]/10">
                      <Riyal className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {
                        t.dashboard.companyComponents.proposalDetails
                          .actionsTitle
                      }
                    </h3>
                  </div>
                  <div className="space-y-3 p-6 px-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .rateTitle
                        }
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatCurrency(
                          selectedProposalData?.price || 0,
                          locale,
                        )}
                      </span>
                    </div>

                    {/* Display milestone information in sidebar if available */}
                    {hasMilestones && (
                      <div className="rounded-lg border border-[#63B7B7]/20 bg-[#63B7B7]/5 p-3">
                        <h4 className="mb-2 text-xs font-medium text-[#63B7B7]">
                          Milestone-Based Payment
                        </h4>
                        <div className="space-y-2">
                          {selectedProposalData?.milestones.map(
                            (milestone, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-xs"
                              >
                                <span className="text-gray-600">
                                  {milestone.title}
                                </span>
                                <span className="font-medium text-gray-800">
                                  {formatCurrency(milestone.price, locale)}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .timelineTitle
                        }
                      </span>
                      <span
                        className="font-normal text-gray-800"
                        dir={
                          detectLanguage(
                            selectedProposalData?.timeline ||
                              t.dashboard.companyComponents.proposalDetails
                                .textNA,
                          ) === 'arabic'
                            ? 'rtl'
                            : 'ltr'
                        }
                      >
                        {selectedProposalData?.timeline ||
                          t.dashboard.companyComponents.proposalDetails.textNA}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .timelineTitle
                        }
                      </span>
                      <span className="font-normal text-gray-800" dir="ltr">
                        {selectedProposalData?.createdAt
                          ? new Date(
                              selectedProposalData.createdAt,
                            ).toLocaleDateString('en-GB', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : t.dashboard.companyComponents.proposalDetails
                              .textNA}
                      </span>
                    </div>
                    <div className="my-2 !h-0.5 !w-full !bg-gray-200" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .statusTitle
                        }
                      </span>
                      <Badge
                        className={
                          selectedProposalData?.status === 'Rejected'
                            ? '!border-red-200 !bg-red-50 !text-red-700'
                            : selectedProposalData?.status === 'Accepted'
                              ? '!border-[#64B7B7] !bg-green-50 !text-green-700'
                              : '!border-amber-200 !bg-amber-50 !text-amber-700'
                        }
                      >
                        {selectedProposalData?.status === 'Rejected'
                          ? t.dashboard.companyComponents.proposalDetails
                              .statusRejected
                          : selectedProposalData?.status === 'Accepted'
                            ? t.dashboard.companyComponents.proposalDetails
                                .statusAccepted
                            : selectedProposalData?.status === 'Pending'
                              ? t.dashboard.companyComponents.proposalDetails
                                  .statusPending
                              : selectedProposalData?.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 p-4">
                  <Button
                    className="mb-2 h-9 w-full !bg-[#63B7B7] !text-white hover:!bg-[#63B7B7]/90"
                    onClick={handleHire}
                    disabled={
                      hireProposalMutation.isPending ||
                      declineProposalMutation.isPending ||
                      selectedProposalData?.status === 'Rejected' ||
                      selectedProposalData?.status === 'Accepted'
                    }
                  >
                    {hireProposalMutation.isPending
                      ? 'Processing...'
                      : t.dashboard.companyComponents.proposalDetails
                          .hireButton}
                  </Button>

                  <Button
                    variant="outline"
                    className="mb-2 h-9 w-full border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/5"
                  >
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                    {
                      t.dashboard.companyComponents.proposalDetails
                        .messageButton
                    }
                  </Button>

                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="ghost"
                      className="h-9 flex-1 text-gray-700 hover:bg-gray-100"
                      onClick={handleDecline}
                      disabled={
                        hireProposalMutation.isPending ||
                        declineProposalMutation.isPending ||
                        selectedProposalData?.status === 'Rejected' ||
                        selectedProposalData?.status === 'Accepted'
                      }
                    >
                      <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                      {declineProposalMutation.isPending
                        ? 'Processing...'
                        : t.dashboard.companyComponents.proposalDetails
                            .declineButton}
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="rounded-lg border border-gray-200 bg-white p-3">
                    <h4 className="mb-2 text-xs font-medium text-gray-800">
                      {
                        t.dashboard.companyComponents.proposalDetails
                          .viewProfileButton
                      }
                    </h4>
                    <p className="mb-3 text-xs text-gray-600">
                      {
                        t.dashboard.companyComponents.proposalDetails
                          .viewProfileButtonDescription
                      }
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
                        <User className="mr-2 h-4 w-4" />
                        {
                          t.dashboard.companyComponents.proposalDetails
                            .viewProfileButton
                        }
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </TooltipProvider>

      <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.dashboard.companyComponents.proposalDetails.hireDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {`Are you sure you want to hire this professional for ${formatCurrency(selectedProposalData?.price || 0, locale)}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowHireDialog(false)}
              disabled={hireProposalMutation.isPending}
            >
              {t.dashboard.companyComponents.proposalDetails.cancelButton}
            </Button>
            <Button
              onClick={confirmHire}
              disabled={hireProposalMutation.isPending}
              className="!bg-[#63B7B7] hover:!bg-[#63B7B7]/90"
            >
              {hireProposalMutation.isPending
                ? t.dashboard.companyComponents.proposalDetails.hiringButton
                : t.dashboard.companyComponents.proposalDetails
                    .confirmHireButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.dashboard.companyComponents.proposalDetails.declineDialogTitle}
            </DialogTitle>
            <DialogDescription>
              {
                t.dashboard.companyComponents.proposalDetails
                  .declineDialogDescription
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeclineDialog(false)}
              disabled={declineProposalMutation.isPending}
            >
              {t.dashboard.companyComponents.proposalDetails.cancelButton}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDecline}
              disabled={declineProposalMutation.isPending}
            >
              {declineProposalMutation.isPending
                ? t.dashboard.companyComponents.proposalDetails.decliningButton
                : t.dashboard.companyComponents.proposalDetails
                    .confirmDeclineButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProposalDetails
