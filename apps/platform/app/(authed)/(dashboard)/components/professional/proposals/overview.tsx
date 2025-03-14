import {
  BarChart2,
  RefreshCw,
  Award,
  Zap,
  TrendingUp,
  Calendar,
  Eye,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dallah/design-system'
import { Progress } from '@dallah/design-system'
import { Card } from '@dallah/design-system'
import { OverviewProps } from '@lib/types/proposals'
import { useState } from 'react'

const StatCard = ({
  icon: Icon,
  label,
  value,
  badge,
  badgeColor,
  subtext,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  badge?: string
  badgeColor?: string
  subtext: string
}) => {
  const badgeStyles = {
    green: 'bg-green-50 text-green-700 border border-green-100',
    amber: 'bg-amber-50 text-amber-700 border border-amber-100',
    blue: 'bg-[#E0F2F2] text-[#1D8489] border border-[#63B7B7]/30',
    gray: 'bg-gray-100 text-gray-700 border-none',
  }

  const getBadgeStyle = () => {
    return badgeColor && badgeStyles[badgeColor as keyof typeof badgeStyles]
      ? badgeStyles[badgeColor as keyof typeof badgeStyles]
      : badgeStyles.gray
  }

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-100 bg-white p-5 hover:border-[#63B7B7]/30"
    >
      <div className="flex items-start">
        <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#E0F2F2] shadow-sm">
          <Icon className="h-6 w-6 text-[#1D8489]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium text-gray-500">{label}</p>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xl font-semibold text-gray-900">{value}</p>
            {badge && <Badge className={getBadgeStyle()}>{badge}</Badge>}
          </div>
          <p className="mt-1.5 truncate text-xs text-gray-600">{subtext}</p>
        </div>
      </div>
    </motion.div>
  )
}

const PerformanceChart = ({ percentage }: { percentage: number }) => (
  <div className="w-full">
    <Progress
      value={percentage}
      className="h-3 rounded-full bg-gray-100"
      indicatorClassName="bg-[#63B7B7] rounded-full"
    />
    <div className="mt-2 flex justify-between">
      <div className="text-xs text-gray-500">0%</div>
      <div className="text-xs font-medium text-[#1D8489]">
        Current: {percentage.toFixed(1)}%
      </div>
      <div className="text-xs text-gray-500">50%</div>
    </div>
  </div>
)

const Overview: React.FC<OverviewProps> = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>(
    '30days',
  )

  const performanceData = {
    profileViews: {
      '7days': { count: 85, change: '+15%' },
      '30days': { count: 320, change: '+8%' },
      '90days': { count: 950, change: '+22%' },
    },
    interviews: {
      '7days': { count: 1, pending: 1, completed: 0 },
      '30days': { count: 3, pending: 1, completed: 2 },
      '90days': { count: 8, pending: 1, completed: 7 },
    },
    proposals: {
      '7days': { count: 5, interviews: 1, offers: 0 },
      '30days': { count: 19, interviews: 3, offers: 0 },
      '90days': { count: 42, interviews: 8, offers: 2 },
    },
    successRate: {
      '7days': 20.0,
      '30days': 15.8,
      '90days': 19.0,
    },
  }

  const data = {
    profileViews: performanceData.profileViews[timeRange],
    interviews: performanceData.interviews[timeRange],
    proposals: performanceData.proposals[timeRange],
    successRate: performanceData.successRate[timeRange],
  }

  const getSuccessRateBadge = (rate: number) => {
    if (rate >= 25) return { text: 'Excellent', color: 'green' }
    if (rate >= 15) return { text: 'Average', color: 'amber' }
    return { text: 'Needs Improvement', color: 'gray' }
  }

  const successBadge = getSuccessRateBadge(data.successRate)
  const timeRangeText =
    timeRange === '7days'
      ? '7 days'
      : timeRange === '30days'
        ? '30 days'
        : '90 days'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card className="overflow-hidden border-gray-100 shadow-sm">
        <div className="border-b border-gray-100 bg-[#f8fbfd] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-1.5 flex items-center text-lg font-semibold text-gray-900 sm:text-xl">
                <Zap className="mr-2 h-5 w-5 text-[#1D8489]" />
                Performance Overview
              </h2>
              <p className="text-sm text-gray-600">
                Track your metrics and engagement with clients
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1">
                {[
                  { value: '7days', label: '7D' },
                  { value: '30days', label: '30D' },
                  { value: '90days', label: '90D' },
                ].map((range) => (
                  <button
                    key={range.value}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${timeRange === range.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() =>
                      setTimeRange(range.value as '7days' | '30days' | '90days')
                    }
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 whitespace-nowrap border-[#63B7B7]/30 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                    >
                      <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
                      Analytics
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="border border-gray-100 bg-white p-2 shadow-lg"
                  >
                    <p className="text-xs">View detailed performance metrics</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
          <StatCard
            icon={Eye}
            label="Profile Visibility"
            value={data.profileViews.count}
            badge={data.profileViews.change}
            badgeColor="green"
            subtext={`${data.profileViews.count} profile views in ${timeRangeText}`}
          />

          <StatCard
            icon={RefreshCw}
            label="Interview Invitations"
            value={data.interviews.count}
            badge={
              timeRange === '7days'
                ? 'this week'
                : timeRange === '30days'
                  ? 'this month'
                  : 'this quarter'
            }
            badgeColor="blue"
            subtext={`${data.interviews.pending} pending, ${data.interviews.completed} completed`}
          />

          <StatCard
            icon={Award}
            label="Success Rate"
            value={`${data.successRate.toFixed(1)}%`}
            badge={successBadge.text}
            badgeColor={successBadge.color}
            subtext={`${data.proposals.interviews} interviews from ${data.proposals.count} proposals`}
          />

          <StatCard
            icon={TrendingUp}
            label="Job Offers"
            value={data.proposals.offers}
            badge={data.proposals.offers > 0 ? 'Active' : 'None yet'}
            badgeColor={data.proposals.offers > 0 ? 'green' : 'gray'}
            subtext={`${((data.proposals.offers / Math.max(1, data.proposals.count)) * 100).toFixed(1)}% conversion rate`}
          />
        </div>

        <div className="border-t border-gray-100 bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">
                Proposal Performance
              </p>
              <div className="flex flex-col items-start gap-1 text-xs text-gray-600 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                  <span>Last {timeRangeText}</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span>• {data.proposals.count} proposals</span>
                  <span>• {data.proposals.interviews} interviews</span>
                  <span>• {data.proposals.offers} offers</span>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full lg:mt-0 lg:w-[300px]">
              <PerformanceChart percentage={data.successRate} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Overview
