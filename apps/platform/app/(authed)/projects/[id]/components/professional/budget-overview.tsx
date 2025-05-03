import { Progress } from '@dalla/design-system'
import { Riyal } from '@dalla/design-system'
import { GetProjectRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'
export function ProfessionalBudgetOverview({
  project,
  isAssigned,
  hasApplied,
  professionalProposal,
  milestoneProgress,
}: {
  project: GetProjectRes['data']
  isAssigned: boolean
  hasApplied: boolean
  professionalProposal:
    | GetProjectRes['data']['professional']['proposals'][number]
    | null
  milestoneProgress: number
}) {
  return (
    (isAssigned || hasApplied) && (
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/10">
              <Riyal className="h-4 w-4 text-[#63B7B7]" />
            </div>
            <h2 className="text-base font-medium text-gray-800">
              Budget Overview
            </h2>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
              <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                Total Budget
              </div>
              <div className="flex items-center gap-1.5 text-xl font-semibold text-[#64B7B7]/80">
                {formatCurrency(
                  professionalProposal?.price || project.meta?.budget,
                )}
              </div>
            </div>

            {isAssigned && (
              <>
                <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
                  <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                    Received
                  </div>
                  <div className="text-lg font-semibold text-[#64B7B7]/80">
                    {formatCurrency(
                      (professionalProposal?.price ||
                        project.meta?.budget ||
                        0) *
                        (milestoneProgress / 100),
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-[#64B7B7]/10 bg-[#64b7b708] p-4">
                  <div className="mb-1 text-xs font-medium text-[#64B7B7]/70">
                    Pending
                  </div>
                  <div className="text-lg font-semibold text-[#64B7B7]/80">
                    {formatCurrency(
                      (professionalProposal?.price ||
                        project.meta?.budget ||
                        0) *
                        (1 - milestoneProgress / 100),
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {isAssigned && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#3c7878]">Received</span>
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
          )}
        </div>
      </div>
    )
  )
}
