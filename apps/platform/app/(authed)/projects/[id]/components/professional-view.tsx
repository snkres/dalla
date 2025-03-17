'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import {
  Send,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Briefcase,
  Building,
} from 'lucide-react'
import Image from 'next/image'

export function ProfessionalProjectView({ project }: { project: any }) {
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)
  const [proposal, setProposal] = useState({
    description: '',
    price: '',
    timeline: '',
  })

  // Check if the professional has already applied to this project
  const hasApplied = project.proposals?.some(
    (p: any) => p.professionalId === project.professionalId, // Assuming current user ID is available
  )

  // Check if the professional is assigned to this project
  const isAssigned = project.assignedProfessionalId === project.professionalId

  const handleApply = async () => {
    // Implement proposal submission logic
    try {
      // Submit proposal API call would go here

      // For demo purposes:
      setTimeout(() => {
        setIsApplying(false)
        router.refresh()
      }, 1000)
    } catch (error) {
      console.error('Error submitting proposal:', error)
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
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Your Price (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="number"
                className="pl-10"
                placeholder="1000"
                value={proposal.price}
                onChange={(e) =>
                  setProposal({ ...proposal, price: e.target.value })
                }
              />
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
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            className="bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
            onClick={handleApply}
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Proposal
          </Button>

          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsApplying(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Company Info */}
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
                {project.company?.CompanyProfile?.meta?.industry || 'Industry'}{' '}
                •{project.company?.CompanyProfile?.location || 'Location'}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Member since</span>
                  <p className="font-medium text-gray-900">
                    {project.company?.createdAt
                      ? new Date(project.company.createdAt).toLocaleDateString(
                          'en-UK',
                          {
                            month: 'short',
                            year: 'numeric',
                          },
                        )
                      : 'N/A'}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">Company size</span>
                  <p className="font-medium text-gray-900">
                    {project.company?.CompanyProfile?.meta?.size || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
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
              className="mt-2 bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
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
              The client is reviewing your proposal. You'll be notified if they
              respond.
            </p>
            <Button
              variant="outline"
              className="mt-2 border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
              onClick={() => router.push('/dashboard')}
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
              Submit a proposal to show the client you're the perfect fit for
              this job.
            </p>
            <Button
              className="mt-2 bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90"
              onClick={() => setIsApplying(true)}
            >
              Submit a Proposal
            </Button>
          </div>
        )}
      </div>

      {/* Similar Projects (optional) */}
      {!isAssigned && !hasApplied && (
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
                      {i === 1 ? '$2,800' : '$3,500'}
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
      )}
    </div>
  )
}
