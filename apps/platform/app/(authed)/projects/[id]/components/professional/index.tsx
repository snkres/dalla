'use client'

import { useState } from 'react'
import { Button } from '@dalla/design-system'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import type { GetProjectRes } from '@lib/api/company/projects'
import { proMetaAtom } from '@lib/atoms/pro/meta'
import { useAtom } from 'jotai'
import { useTransitionRouter } from 'next-view-transitions'
import { ApplyProposal } from '../../../../(dashboard)/components/professional/proposal'
import { ProfessionalMilestones } from './milestones'
import { ProfessionalActionArea } from './action-area'
import { ProfessionalBudgetOverview } from './budget-overview'
import { ProfessionalCompanyInfo } from './company-info'
import { ProfessionalProjectFiles } from './files'

export function ProfessionalProjectView({
  project,
}: {
  project: GetProjectRes['data']
}) {
  const router = useTransitionRouter()
  const { toast } = useToast()
  const [meta] = useAtom(proMetaAtom)
  const [isApplying, setIsApplying] = useState(false)

  const hasApplied = project.applied
  const isAssigned = project.professional?.id === meta?.data.id
  const professionalProposal = project.proposals?.find(
    (proposal) => proposal.professionalId === meta?.data.id,
  )
  const milestones = isAssigned
    ? project.professional.proposals[0].milestones
    : null
  const totalMilestones = milestones?.length || 0
  const completedMilestones =
    isAssigned && milestones
      ? milestones.filter((m) => m.status === 'Completed').length
      : 0
  const milestoneProgress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  if (isApplying) {
    return (
      <ApplyProposal project={project} onClose={() => setIsApplying(false)} />
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          {isAssigned && milestones && (
            <ProfessionalMilestones
              isAssigned={isAssigned}
              milestones={milestones || []}
              project={project}
            />
          )}

          <ProfessionalActionArea
            isAssigned={isAssigned}
            hasApplied={hasApplied}
          />

          {(isAssigned || hasApplied) && professionalProposal && (
            <ProfessionalBudgetOverview
              project={project}
              isAssigned={isAssigned}
              hasApplied={hasApplied}
              professionalProposal={
                professionalProposal as
                  | GetProjectRes['data']['professional']['proposals'][0]
                  | null
              }
              milestoneProgress={milestoneProgress}
            />
          )}
        </div>

        <div className="space-y-6 lg:col-span-4">
          {project.company && (
            <ProfessionalCompanyInfo company={project.company} />
          )}

          <ProfessionalProjectFiles media={project.media} />
        </div>
      </div>
    </div>
  )
}
