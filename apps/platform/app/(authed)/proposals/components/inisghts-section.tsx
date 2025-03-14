import { PieChart, TrendingUp } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { Badge } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { InsightsSectionProps } from '@lib/types/proposals'
import { Progress } from '@dallah/design-system'

const InsightsSection: React.FC<InsightsSectionProps> = ({
  proposal,
  isExpanded,
  onToggle,
}) => (
  <ExpandableSection
    title="Proposal Insights"
    icon={<PieChart className="mr-2 h-4 w-4 text-[#63B7B7]" />}
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">Competition Level</p>
          <Badge
            className={cn(
              'text-xs',
              proposal.competingProposals > 15
                ? 'border-red-200 bg-red-50 text-red-600'
                : proposal.competingProposals > 8
                  ? 'border-amber-200 bg-amber-50 text-amber-600'
                  : 'border-green-200 bg-green-50 text-green-600',
            )}
          >
            {proposal.competingProposals > 15
              ? 'High'
              : proposal.competingProposals > 8
                ? 'Medium'
                : 'Low'}
          </Badge>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Competing proposals</span>
          <span className="text-sm font-medium text-gray-800">
            {proposal.competingProposals}
          </span>
        </div>
        <Progress
          value={Math.min((proposal.competingProposals / 20) * 100, 100)}
          className="h-1.5 bg-gray-100"
          indicatorClassName={cn(
            proposal.competingProposals > 15
              ? 'bg-red-500'
              : proposal.competingProposals > 8
                ? 'bg-amber-500'
                : 'bg-green-500',
          )}
        />
      </div>
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs text-gray-500">Visibility</p>
          <Badge
            className={cn(
              'text-xs',
              proposal.proposalViews > 5
                ? 'border-green-200 bg-green-50 text-green-600'
                : proposal.proposalViews > 0
                  ? 'border-amber-200 bg-amber-50 text-amber-600'
                  : 'border-gray-200 bg-gray-100 text-gray-600',
            )}
          >
            {proposal.proposalViews > 5
              ? 'High'
              : proposal.proposalViews > 0
                ? 'Low'
                : 'None'}
          </Badge>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Proposal views</span>
          <span className="text-sm font-medium text-gray-800">
            {proposal.proposalViews}
          </span>
        </div>
        <Progress
          value={(proposal.proposalViews / 10) * 100}
          className="h-1.5 bg-gray-100"
          indicatorClassName="bg-[#63B7B7]"
        />
      </div>
    </div>
    {proposal.interviewRate && (
      <div className="mt-4 rounded-lg bg-[#BEDDF1]/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center text-sm text-gray-600">
            <TrendingUp className="mr-1.5 h-4 w-4 text-[#63B7B7]" />
            Interview rate
          </p>
          <span className="text-sm font-medium text-[#63B7B7]">
            {proposal.interviewRate}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          This is the percentage of similar proposals that progress to
          interviews
        </p>
      </div>
    )}
  </ExpandableSection>
)

export default InsightsSection
