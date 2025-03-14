import { FileText } from 'lucide-react'

const ProposalDetailsEmpty: React.FC = () => (
  <div className="hidden h-full flex-col items-center justify-center rounded-xl bg-[#BEDDF1]/5 p-6 text-center lg:flex">
    <FileText className="mb-4 h-16 w-16 text-[#BEDDF1]" />
    <h3 className="mb-2 text-lg font-medium text-gray-500">
      Select a proposal
    </h3>
    <p className="max-w-xs text-sm text-gray-400">
      View detailed information about your proposals, client profiles, and
      proposal insights
    </p>
  </div>
)

export default ProposalDetailsEmpty
