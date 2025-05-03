import { Riyal } from '@dalla/design-system'
import { formatCurrency } from '@lib/utils/format-currency'
import { Progress } from '@dalla/design-system'
import type { GetProjectRes } from '@lib/api/company/projects'

export function CompanyProjectBudgetOverview({
  project,
  milestoneProgress,
}: {
  project: GetProjectRes['data']
  milestoneProgress: number
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
            <Riyal className="h-4 w-4 text-[#1D8489]" />
          </div>
          <h2 className="font-medium text-gray-900">Budget Overview</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
            <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
              Total Budget
            </div>
            <div className="flex items-center gap-1.5 text-xl font-semibold text-[#64B7B7]/80">
              {formatCurrency(project.meta?.budget, 'h-5 w-5')}
            </div>
          </div>

          <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
            <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
              Spent
            </div>
            <div className="text-lg font-semibold text-[#64B7B7]/80">
              {formatCurrency(
                project.meta?.budget * (milestoneProgress / 100) || 0,
              )}
            </div>
          </div>

          <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
            <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
              Remaining
            </div>
            <div className="text-lg font-semibold text-[#64B7B7]/80">
              {formatCurrency(
                project.meta?.budget * (1 - milestoneProgress / 100) || 0,
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs">
            <span className="text-[#3c7878]">Spent</span>
            <span className="text-[#3c7878]">
              {Math.round(milestoneProgress)}%
            </span>
          </div>
          <Progress
            value={milestoneProgress}
            className="!bg-[#64b7b71f]"
            indicatorClassName="!bg-[#64B7B7]/90"
          />
        </div>
      </div>
    </div>
  )
}
