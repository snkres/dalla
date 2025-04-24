import { PieChart, TrendingUp } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { Badge } from '@dalla/design-system'
import { cn } from '@dalla/utils'

import { Progress } from '@dalla/design-system'

interface InsightsSectionProps {
  data: {
    competingProposals: number
  }
  isExpanded: boolean
  onToggle: () => void
}

const InsightsSection: React.FC<InsightsSectionProps> = ({
  data,
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
      <div className="col-span-2 w-full rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-4 flex w-full justify-between gap-1">
          <p className="text-xs text-gray-500">Competition Level</p>
          <Badge
            className={cn(
              'w-fit text-xs',
              data.competingProposals > 15
                ? '!border-red-200 !bg-red-50 !text-red-600'
                : data.competingProposals > 8
                  ? '!border-amber-200 !bg-amber-50 !text-amber-600'
                  : '!border-[#64B7B7] !bg-green-50 !text-green-600',
            )}
          >
            {data.competingProposals > 15
              ? 'High'
              : data.competingProposals > 8
                ? 'Medium'
                : 'Low'}
          </Badge>
        </div>
        <div className="mb-2 flex w-full items-center justify-between">
          <span className="text-sm text-gray-600">Competing proposals</span>
          <span className="text-sm font-medium text-gray-800">
            {data.competingProposals}
          </span>
        </div>
        <Progress
          value={Math.min((data.competingProposals / 20) * 100, 100)}
          className="!h-1.5 !bg-gray-100"
          indicatorClassName={cn(
            data.competingProposals > 15
              ? '!bg-red-500'
              : data.competingProposals > 8
                ? '!bg-amber-500'
                : '!bg-green-500',
          )}
        />
      </div>
      {/* <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-2 flex flex-col justify-between gap-1">
          <p className="text-xs text-gray-500">Visibility</p>
          <Badge
            className={cn(
              'w-fit text-xs',
              data.proposalViews > 5
                ? '!border-[#64B7B7] !bg-green-50 !text-green-600'
                : data.proposalViews > 0
                  ? '!border-amber-200 !bg-amber-50 !text-amber-600'
                  : '!border-gray-200 !bg-gray-100 !text-gray-600',
            )}
          >
            {data.proposalViews > 5
              ? 'High'
              : data.proposalViews > 0
                ? 'Low'
                : 'None'}
          </Badge>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Proposal views</span>
          <span className="text-sm font-medium text-gray-800">
            {data.proposalViews}
          </span>
        </div>
        <Progress
          value={(data.proposalViews / 10) * 100}
          className="!h-1.5 !bg-gray-100"
          indicatorClassName="!bg-[#63B7B7]"
        />
      </div> */}
    </div>
  </ExpandableSection>
)

export default InsightsSection
