import { PerformanceCardProps } from '@lib/types/proposals'

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  icon,
  label,
  value,
  badge,
  subtext,
}) => (
  <div className="p-5 transition-colors hover:bg-[#BEDDF1]/5">
    <div className="flex items-start">
      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#63B7B7]/10">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-500">{label}</p>
        <div className="flex items-center">
          <p className="mr-2 text-xl font-semibold text-gray-800">{value}</p>
          {badge}
        </div>
        <p className="mt-1 text-xs text-gray-500">{subtext}</p>
      </div>
    </div>
  </div>
)

export default PerformanceCard
