import { Button } from '@dallah/design-system'
import ProposalCard from './proposal-card'
import { GetAllProposalsRes } from '@lib/api/pro/proposals'
interface ProposalListProps {
  proposals: GetAllProposalsRes['data'][0]
  selectedTab: string
  selectedProposal: GetAllProposalsRes['data'][0][number] | null
  onSelectProposal: (proposal: GetAllProposalsRes['data'][0][number]) => void
}

const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  selectedTab,
  selectedProposal,
  onSelectProposal,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-xl lg:col-span-2">
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
          <div className="rounded-lg px-4 py-10 text-center">
            <p className="text-gray-500">No proposals is {selectedTab}.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProposalList
