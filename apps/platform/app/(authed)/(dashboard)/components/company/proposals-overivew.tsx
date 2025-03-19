'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button, Modal } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import {
  Star,
  Clock,
  Filter,
  ChevronDown,
  X,
  Search,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { SLIDE_ANIMATION } from '@components/aniamtion/animate'
import type { GetAllCompanyProjectsRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'
import { cn } from '@dallah/utils'

interface ProposalsOverivewProps {
  projectTitle: string
  onBack: () => void
  handleViewProposal: (proposalId: string) => void
  proposals: GetAllCompanyProjectsRes['data'][0][number]['proposals']
  recentlyProcessed?: { [key: string]: string }
}

const ProposalsOverivewModal = ({
  projectTitle,
  onBack,
  handleViewProposal,
  proposals,
}: ProposalsOverivewProps) => {
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'price'>('match')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAndSortedProposals = [...proposals]
    .filter(
      (proposal) =>
        searchQuery === '' ||
        proposal.professional.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        proposal.professional.UserProfile?.meta?.skills?.some((skill: string) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        proposal.professional.UserProfile?.headline
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === 'match') {
        return (
          (b.professional.UserProfile?.meta?.yearsOfExperience || 0) -
          (a.professional.UserProfile?.meta?.yearsOfExperience || 0)
        )
      } else if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return a.price - b.price
      }
    })

  return (
    <Modal
      title={`Proposals for ${projectTitle}`}
      isOpen={true}
      onClose={onBack}
    >
      <motion.div
        key="overview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-full flex-col"
      >
        <div className="sticky z-10 border-b border-gray-100 bg-white p-4 pb-0">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="!border-amber-200 !bg-amber-50 !text-amber-700">
                {proposals.length} Proposals
              </Badge>
              <span className="text-xs text-gray-500">for {projectTitle}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Filter className="mr-1.5 h-3.5 w-3.5" />
                  Sort by:{' '}
                  {sortBy === 'match'
                    ? 'Best Match'
                    : sortBy === 'date'
                      ? 'Newest'
                      : 'Lowest Price'}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('match')}
                >
                  Best Match
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('date')}
                >
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('price')}
                >
                  Lowest Price
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredAndSortedProposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'mb-3 cursor-pointer rounded-lg border p-4 transition-all duration-300',
                  proposal.status === 'Rejected'
                    ? 'border-red-100 bg-red-50/30 opacity-60'
                    : proposal.status === 'Accepted'
                      ? 'border-green-100 bg-green-50/30'
                      : 'border-gray-100 bg-white hover:border-[#63B7B7]/30 hover:bg-[#63B7B7]/5',
                )}
                onClick={() => handleViewProposal(proposal.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden !rounded-full border-2 border-gray-100">
                    <Image
                      src={
                        proposal.professional.UserProfile?.avatar ||
                        '/avatar.png' ||
                        '/placeholder.svg'
                      }
                      alt={'avatar'}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {proposal.professional.name}
                          </h4>
                          <div className="flex items-center !rounded-full border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="ml-0.5 text-xs font-medium text-amber-700">
                              {proposal.professional.UserProfile?.meta
                                ?.rating || 5}
                            </span>
                          </div>
                          <Badge className="!rounded-full !border-[#63B7B7]/20 !bg-[#63B7B7]/10 text-xs !text-[#63B7B7]">
                            {Math.floor(70 + Math.random() * 30)}% Match
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {proposal.professional.UserProfile?.headline ||
                            'Consultant'}{' '}
                          •{' '}
                          {proposal.professional.UserProfile?.meta?.location ||
                            'Remote'}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <Badge className="!border-[#63B7B7]/20 !bg-[#63B7B7]/10 text-sm font-semibold !text-[#63B7B7]">
                          {formatCurrency(proposal.price || 0)}
                        </Badge>
                        <div className="mt-0.5 flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {proposal.timeline}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="line-clamp-2 text-xs text-gray-600">
                        {proposal.description}
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {proposal.professional.UserProfile?.meta?.skills
                        ?.slice(0, 3)
                        .map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-[#63B7B7]/20 bg-[#1D8489]/10 px-1.5 py-0 text-[10px] font-normal text-[#1D8489]"
                          >
                            {skill}
                          </Badge>
                        ))}
                      {proposal.professional.UserProfile?.meta?.skills?.length >
                        3 && (
                        <Badge
                          variant="outline"
                          className="border-[#1D8489]/20 bg-[#1D8489]/10 px-1.5 py-0 text-[10px] font-normal text-[#1D8489]"
                        >
                          +
                          {proposal.professional.UserProfile?.meta?.skills
                            ?.length - 3}
                        </Badge>
                      )}
                    </div>

                    {proposal.status && (
                      <div className="mt-2">
                        <Badge
                          className={
                            proposal.status === 'Rejected'
                              ? '!border-red-200 !bg-red-50 !text-red-700'
                              : '!border-green-200 !bg-green-50 !text-green-700'
                          }
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Modal>
  )
}

export default ProposalsOverivewModal
