'use client'

import { useState } from 'react'

import { Button, Tabs, TabsContent } from '@dalla/design-system'
import { Textarea } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { Riyal } from '@dalla/design-system'
import {
  Send,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Briefcase,
  Building,
  Loader2,
  Eye,
  Download,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { GetProjectRes } from '@lib/api/company/projects'
import { proMetaAtom } from '@lib/atoms/pro/meta'
import { createProjectProposal } from '@lib/api/pro/proposals'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { ListDisplay } from '@dalla/components/listDisplay'

export function ProfessionalProjectView({
  project,
  activeTab,
  setActiveTab,
}: {
  project: GetProjectRes['data']
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const router = useTransitionRouter()
  const { toast } = useToast()
  const [meta, setMeta] = useAtom(proMetaAtom)
  const [isApplying, setIsApplying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proposal, setProposal] = useState({
    description: '',
    price: '',
    timeline: '',
  })

  // Form validation
  const isFormValid =
    proposal.description.trim().length >= 50 &&
    Number(proposal.price) > 0 &&
    proposal.timeline.trim().length > 0

  // Check if the professional has already applied to this project
  const hasApplied = project.applied

  // Check if the professional is assigned to this project
  const isAssigned = project.professional?.id === meta?.data.id

  const handleApply = async () => {
    if (!isFormValid) {
      toast({
        title: 'Incomplete proposal',
        description: 'Please fill out all fields with valid information.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the payload for API
      const payload = {
        price: Number(proposal.price),
        timeline: proposal.timeline,
        description: proposal.description,
        relevantProjects: [],
        media: [], // No media attachments in this simplified version
      }

      // Submit proposal to API
      const response = await createProjectProposal(project.id, payload)

      // Show success message
      toast({
        title: 'Proposal submitted',
        description:
          'Your proposal has been successfully submitted to the client.',
      })

      // Close the form and refresh the page to reflect the updated state
      setIsApplying(false)
      router.refresh()
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast({
        title: 'Submission failed',
        description:
          'There was an error submitting your proposal. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isApplying) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-medium text-gray-900">
          Submit Your Proposal
        </h2>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Proposal Description
          </label>
          <Textarea
            placeholder="Describe how you would approach this project and why you're a good fit..."
            className="min-h-[150px]"
            value={proposal.description}
            onChange={(e) =>
              setProposal({ ...proposal, description: e.target.value })
            }
          />
          {proposal.description && proposal.description.length < 50 && (
            <p className="mt-1 text-xs text-red-500">
              Please provide a detailed description (minimum 50 characters)
            </p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Your Price (﷼)
            </label>
            <div className="relative">
              <Riyal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="number"
                className="pl-10"
                placeholder="1000"
                value={proposal.price}
                onChange={(e) =>
                  setProposal({ ...proposal, price: e.target.value })
                }
              />
              {proposal.price && Number(proposal.price) <= 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Please enter a valid price
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Estimated Timeline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="e.g., 2 weeks"
                className="pl-10"
                value={proposal.timeline}
                onChange={(e) =>
                  setProposal({ ...proposal, timeline: e.target.value })
                }
              />
              {proposal.timeline && proposal.timeline.trim().length === 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Please provide a timeline estimate
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
            onClick={handleApply}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Proposal
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsApplying(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsContent value="overview" className="m-0 p-0 outline-none">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">
              Project Details
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Scope:
                </h3>
                <ListDisplay
                  value={project.scope || ''}
                  emptyText="No scope details specified"
                  className="text-gray-600"
                />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Deliverables:
                </h3>
                <ListDisplay
                  value={project.deliverables || ''}
                  emptyText="No deliverables specified"
                  className="text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            {isAssigned ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  You're working on this project
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Communicate with the client and deliver your best work.
                </p>
                <Button
                  className="mt-2 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
                  onClick={() => router.push(`/messages/project/${project.id}`)}
                >
                  Go to Project Workspace
                </Button>
              </div>
            ) : hasApplied ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  You've submitted a proposal
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  The company is reviewing your proposal. You'll be notified if
                  they respond.
                </p>
                <Button
                  variant="outline"
                  className="mt-2 border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
                  onClick={() => router.push('/proposals')}
                >
                  View My Proposals
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-[#E0F2F2] p-3">
                  <Briefcase className="h-6 w-6 text-[#63B7B7]" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Interested in this project?
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Submit a proposal to show the client you're the perfect fit
                  for this job.
                </p>
                <Button
                  className="mt-2 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
                  asChild
                >
                  <Link href={`/?projectId=${project.id}`}>
                    Submit a Proposal
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Similar Projects (optional) */}
          {/* {!isAssigned && !hasApplied && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="flex items-center text-base font-medium text-gray-900">
              <Briefcase className="mr-2 h-5 w-5 text-[#63B7B7]" />
              Similar Projects You Might Like
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 p-4 hover:border-[#63B7B7]/30 hover:shadow-sm"
                >
                  <h3 className="mb-1 text-base font-medium text-gray-900">
                    {i === 1
                      ? 'Digital Marketing Strategy'
                      : 'Website Redesign'}
                  </h3>
                  <p className="mb-2 text-sm text-gray-500">
                    {i === 1 ? 'TechGrowth Inc.' : 'GlobalReach Solutions'}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#63B7B7]">
                      {i === 1 ? '﷼2,800' : '﷼3,500'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
                      onClick={() =>
                        router.push(
                          `/projects/${i === 1 ? 'tech-123' : 'global-456'}`,
                        )
                      }
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          )} */}
        </div>
      </TabsContent>
      <TabsContent value="company" className="m-0 p-0 outline-none">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="flex items-center text-base font-medium text-gray-900">
              <Building className="mr-2 h-5 w-5 text-[#63B7B7]" />
              About the Company
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4">
              {project.company?.CompanyProfile?.logo ? (
                <Image
                  src={project.company.CompanyProfile.logo}
                  alt={project.company.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {project.company?.name || 'Company Name'}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {project.company?.CompanyProfile?.location || 'Location'}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Member since</span>
                    <p className="font-medium text-gray-900">
                      {project.company?.createdAt
                        ? new Date(
                            project.company.createdAt,
                          ).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="mt-2 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
                >
                  <Link href={`/companies/${project.company.id}`}>
                    View Company Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="files" className="m-0 p-0 outline-none">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                <FileText className="h-4 w-4 text-[#1D8489]" />
              </div>
              <h2 className="font-medium text-gray-900">Project Files</h2>
            </div>

            {/* <Button className="h-9 gap-1.5 !bg-[#63B7B7] text-xs !text-white hover:!bg-[#1D8489]">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Upload File
              </Button> */}
          </div>

          <div className="p-6">
            {project.media.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                No files available
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.media.map((file) => (
                  <div
                    key={file}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="mb-3 flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2F2] shadow-sm">
                        <FileText className="h-5 w-5 text-[#1D8489]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-900">
                          {file}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1.5 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                        onClick={() => window.open(file, '_blank')}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = file
                          link.download = file.split('/').pop() || 'download'
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                        }}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
