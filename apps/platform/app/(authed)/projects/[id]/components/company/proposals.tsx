import { FileText } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { formatCurrency } from '@lib/utils/format-currency'
import StatusBadge from 'app/(authed)/proposals/components/status-badge'
import { ProposalStatus } from '@lib/api/pro/proposals'
import type { GetProjectRes } from '@lib/api/company/projects'

export function CompanyProjectProposals({
  proposals,
  handleProposalClick,
}: {
  proposals: GetProjectRes['data']['proposals']
  handleProposalClick: (
    proposal: GetProjectRes['data']['proposals'][number],
  ) => void
}) {
  return (
    // TODO: Pagination
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
            <FileText className="h-4 w-4 text-[#1D8489]" />
          </div>
          <h2 className="font-medium text-gray-900">Proposals</h2>
        </div>
      </div>

      <div className="p-5">
        {proposals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {proposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{
                  boxShadow: '0 4px 12px rgba(99, 183, 183, 0.1)',
                }}
                transition={{ duration: 0.2 }}
                className="flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#63B7B7]/30"
                onClick={() => handleProposalClick(proposal)}
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#63B7B7]/10">
                      <Image
                        src={
                          proposal.professional.UserProfile?.avatar ||
                          '/placeholder.svg' ||
                          '/placeholder.svg'
                        }
                        alt={proposal.professional.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {proposal.professional.name}
                    </div>
                    <div className="line-clamp-1 text-xs text-gray-500">
                      {proposal.professional.UserProfile?.headline}
                    </div>
                  </div>
                  <StatusBadge status={proposal.status as ProposalStatus} />
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg
                      className="mr-1.5 h-4 w-4 text-[#63B7B7]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V12L14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    {proposal.timeline}
                  </div>
                  <div className="text-sm font-medium text-[#63B7B7]">
                    {formatCurrency(proposal.price)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                No proposals yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your project is waiting for professionals to submit proposals.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
