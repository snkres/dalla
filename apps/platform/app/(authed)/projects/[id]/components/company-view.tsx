'use client'

import { useState } from 'react'
import { Button } from '@dallah/design-system'
import { Users, FileText, MessageCircle, Edit, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function CompanyProjectView({ project }: { project: any }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('proposals')

  const hasProposals = project.proposals && project.proposals.length > 0
  const hasAssignedProfessional = !!project.assignedProfessionalId

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
          onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>

        {hasAssignedProfessional ? (
          <Button
            variant="outline"
            className="border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
            onClick={() => router.push(`/messages/project/${project.id}`)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Professional
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => router.push('/professionals')}
          >
            <Users className="mr-2 h-4 w-4" />
            Find Professionals
          </Button>
        )}
      </div>

      {/* Status Banner */}
      <div
        className={`rounded-lg p-4 ${
          hasAssignedProfessional
            ? 'bg-green-50 text-green-700'
            : hasProposals
              ? 'bg-blue-50 text-blue-700'
              : 'bg-yellow-50 text-yellow-700'
        }`}
      >
        <div className="flex items-center">
          {hasAssignedProfessional ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>Professional assigned to this project</span>
            </>
          ) : hasProposals ? (
            <>
              <FileText className="mr-2 h-5 w-5" />
              <span>
                You have {project.proposals.length} proposal(s) to review
              </span>
            </>
          ) : (
            <>
              <Users className="mr-2 h-5 w-5" />
              <span>
                No proposals yet. Share your project to attract professionals.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('proposals')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'proposals'
                ? '!border-[#63B7B7] !text-[#63B7B7]'
                : '!border-transparent !text-gray-500 hover:!border-gray-300 hover:!text-gray-700'
            }`}
          >
            Proposals ({project.proposals?.length || 0})
          </button>
          {hasAssignedProfessional && (
            <button
              onClick={() => setActiveTab('progress')}
              className={`border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'progress'
                  ? '!border-[#63B7B7] !text-[#63B7B7]'
                  : '!border-transparent !text-gray-500 hover:!border-gray-300 hover:!text-gray-700'
              }`}
            >
              Project Progress
            </button>
          )}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'proposals' && (
          <div className="space-y-4">
            {hasProposals ? (
              project.proposals.map((proposal: any) => (
                <div
                  key={proposal.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  {/* <div className="flex items-start gap-4">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={
                          proposal.professional.UserProfile?.avatar ||
                          '/placeholder-avatar.png'
                        }
                        alt={proposal.professional.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {proposal.professional.name}
                        </h3>
                        <span className="text-sm font-medium text-[#63B7B7]">
                          ${proposal.price}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {proposal.professional.UserProfile?.headline ||
                          'Professional'}
                      </p>
                      <p className="mt-2 text-sm text-gray-700">
                        {proposal.description.substring(0, 200)}
                        {proposal.description.length > 200 ? '...' : ''}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
                          onClick={() =>
                            router.push(`/proposals/${proposal.id}`)
                          }
                        >
                          View Proposal
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
                          onClick={() =>
                            router.push(
                              `/professionals/${proposal.professional.username}`,
                            )
                          }
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div> */}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
                <FileText className="mb-2 h-12 w-12 text-gray-400" />
                <h3 className="mb-1 text-lg font-medium text-gray-900">
                  No proposals yet
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Share your project to attract professionals and receive
                  proposals.
                </p>
                <div className="mt-2 rounded-md bg-gray-100 p-3">
                  <p className="text-sm text-gray-600">
                    Share link:{' '}
                    <span className="font-medium">
                      https://dallah.com/projects/{project.id}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && hasAssignedProfessional && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Project Progress
            </h3>
            {/* Add project progress tracking UI here */}
            <div className="mb-4">
              <div className="mb-2 flex justify-between text-sm">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-[#63B7B7]"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Your project is in progress. The professional is currently working
              on the deliverables.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
