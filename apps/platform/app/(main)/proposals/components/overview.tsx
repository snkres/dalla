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
import { Badge } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dalla/design-system'
import { Progress } from '@dalla/design-system'
import { Card } from '@dalla/design-system'

import { useState } from 'react'
import { getProfessionalAnalytics } from '@lib/api/pro/analytics'
import { useQuery } from '@tanstack/react-query'

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
    green: '!bg-green-50 !text-green-700 border border-green-100',
    amber: '!bg-amber-50 !text-amber-700 border border-amber-100',
    blue: '!bg-[#E0F2F2] !text-[#1D8489] border border-[#63B7B7]/30',
    gray: '!bg-gray-100 !text-gray-700 border-none',
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
      className="h-3 rounded-full !bg-gray-100"
      indicatorClassName="!bg-[#63B7B7] rounded-full"
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

const Overview = () => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>(
    '30days',
  )

  const getDateRange = (range: '7days' | '30days' | '90days') => {
    const to = new Date().toISOString()
    const from = new Date()

    switch (range) {
      case '7days':
        from.setDate(from.getDate() - 7)
        break
      case '30days':
        from.setDate(from.getDate() - 30)
        break
      case '90days':
        from.setDate(from.getDate() - 90)
        break
    }

    return { from: from.toISOString(), to }
  }

  const { data: analytics } = useQuery({
    queryKey: ['analytics', 'professional', timeRange],
    queryFn: () => {
      const { from, to } = getDateRange(timeRange)
      return getProfessionalAnalytics({ from, to })
    },
  })

  // Extract values from analytics with fallbacks
  const totalProposals = analytics?.data.totalProposals || 0
  const acceptedProposals = analytics?.data.acceptedProposals || 0
  const successRate =
    totalProposals > 0 ? (acceptedProposals / totalProposals) * 100 : 0

  const getSuccessRateBadge = (rate: number) => {
    if (rate >= 25) return { text: 'Excellent', color: 'green' }
    if (rate >= 15) return { text: 'Average', color: 'amber' }
    return { text: 'Needs Improvement', color: 'gray' }
  }

  const successBadge = getSuccessRateBadge(successRate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
          <StatCard
            icon={RefreshCw}
            label="Proposals"
            value={totalProposals}
            badge={
              timeRange === '7days'
                ? 'this week'
                : timeRange === '30days'
                  ? 'this month'
                  : 'this quarter'
            }
            badgeColor="blue"
            subtext={`You have submitted ${totalProposals} proposals`}
          />

          <StatCard
            icon={TrendingUp}
            label="Accepted Proposals"
            value={acceptedProposals}
            badge={acceptedProposals > 0 ? 'Active' : 'None yet'}
            badgeColor={acceptedProposals > 0 ? 'green' : 'gray'}
            subtext={`You have been accepted for ${acceptedProposals} proposals`}
          />

          <StatCard
            icon={Award}
            label="Success Rate"
            value={`${successRate?.toFixed(1)}%`}
            badge={successBadge.text}
            badgeColor={successBadge.color}
            subtext={`You have been accepted for ${acceptedProposals} proposals`}
          />
        </div>
      </Card>
    </motion.div>
  )
}

export default Overview
