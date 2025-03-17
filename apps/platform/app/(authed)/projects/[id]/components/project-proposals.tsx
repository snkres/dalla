'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
} from '@dallah/design-system'
import { Star, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { GetProjectRes } from '@lib/api/company/projects'

export function ProjectProposals({
  proposals,
}: {
  proposals: GetProjectRes['data']['proposals']
}) {
  const router = useRouter()
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  )

  // Sort proposals by match percentage (simplified for demo)
  const sortedProposals =
    proposals?.sort(
      (a: any, b: any) =>
        (b.professional?.UserProfile?.meta?.rating || 0) -
        (a.professional?.UserProfile?.meta?.rating || 0),
    ) || []

  // Toggle expanded proposal view
  const toggleProposal = (id: string) => {
    setSelectedProposalId(selectedProposalId === id ? null : id)
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center p-5 text-sm text-gray-500">
        No proposals received yet
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">
          {proposals.length} Proposals Received
        </h3>
      </div>

      <div className="space-y-3">
        {sortedProposals.slice(0, 3).map((proposal) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="cursor-pointer p-3"
              onClick={() => toggleProposal(proposal.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage
                    src={proposal.professional?.UserProfile?.avatar || ''}
                    alt={proposal.professional?.name || 'Professional'}
                  />
                  <AvatarFallback>
                    {proposal.professional?.name?.charAt(0) || 'P'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {proposal.professional?.name}
                    </h4>
                    <div className="flex items-center rounded-full border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="ml-0.5 text-xs font-medium text-amber-700">
                        {proposal.professional?.UserProfile?.meta?.rating ||
                          4.5}
                      </span>
                    </div>
                    <Badge className="rounded-full !border-[#63B7B7]/20 !bg-[#63B7B7]/10 text-xs !text-[#63B7B7]">
                      {Math.floor(70 + Math.random() * 30)}% Match
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {proposal.professional?.UserProfile?.headline ||
                      'Consultant'}{' '}
                    •
                    {proposal.professional?.UserProfile?.meta?.location ||
                      'Remote'}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    ${proposal.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {proposal.timeline || '2 weeks'}
                  </div>
                </div>
              </div>

              {selectedProposalId === proposal.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 border-t border-gray-100 pt-3"
                >
                  <div className="mb-3">
                    <h5 className="mb-1 text-xs font-medium text-gray-700">
                      Proposal
                    </h5>
                    <p className="text-xs text-gray-600">
                      {proposal.description.length > 150
                        ? `${proposal.description.substring(0, 150)}...`
                        : proposal.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="h-8 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]"
                      onClick={() => router.push(`/proposals/${proposal.id}`)}
                    >
                      View Full Proposal
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
                      asChild
                    >
                      <Link
                        href={`/professionals/${proposal.professional.username}`}
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        View Profile
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-[#63B7B7] text-xs text-[#63B7B7] hover:bg-[#E0F2F2]"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                      Message
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
