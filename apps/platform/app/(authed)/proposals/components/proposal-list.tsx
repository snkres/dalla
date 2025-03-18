import { Button } from '@dallah/design-system'
import ProposalCard from './proposal-card'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'
interface ProposalListProps {
  proposals: GetAllProposalsRes['data'][0]
  selectedProposal: GetAllProposalsRes['data'][0][number] | null
  onSelectProposal: (proposal: GetAllProposalsRes['data'][0][number]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  selectedProposal,
  onSelectProposal,
  onSearchChange,
  searchQuery,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
      <div className="w-full p-4">
        {Array.isArray(proposals) && proposals.length > 0 ? (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                isSelected={
                  selectedProposal?.id?.toString() === proposal.id.toString()
                }
                onClick={() => onSelectProposal(proposal)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-[#BEDDF1]/5 px-4 py-10 text-center">
            <p className="text-gray-500">
              No proposals match your search criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
              onClick={() => onSearchChange('')}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProposalList
