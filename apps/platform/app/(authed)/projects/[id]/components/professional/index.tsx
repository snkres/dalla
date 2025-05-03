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
import type { Milestone } from '@lib/types/project'
import { ProfessionalAllInOneActions } from './all-in-one-actions'

interface AssignedProposal {
  id: string
  projectId: string
  professionalId: string
  type: 'MilestoneBased' | 'AllInOne'
  description: string
  price: number
  timeline: string
  media: string[]
  status: 'Pending' | 'Rejected' | 'Accepted'
  createdAt: string
  updatedAt: string
  deletedAt: any
  milestones: Milestone[]
  submissions?: any[]
}

export function ProfessionalProjectView({
  project,
}: {
  project: GetProjectRes['data']
}) {
  const [meta] = useAtom(proMetaAtom)
  const [isApplying, setIsApplying] = useState(false)

  const hasApplied = project.applied
  const isAssigned = project.professional?.id === meta?.data.id

  const assignedProposal = (
    isAssigned ? project.professional.proposals[0] : null
  ) as AssignedProposal | null

  const isMilestoneProject = assignedProposal?.type === 'MilestoneBased'

  const milestones = isMilestoneProject ? assignedProposal?.milestones : null
  const submissions = isMilestoneProject
    ? assignedProposal?.submissions
    : project.submissions
  const latestSubmission = !isMilestoneProject
    ? submissions?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0]
    : undefined

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
          {isAssigned && assignedProposal ? (
            isMilestoneProject ? (
              <ProfessionalMilestones
                isAssigned={isAssigned}
                milestones={milestones || []}
                project={project}
              />
            ) : (
              <ProfessionalAllInOneActions
                projectId={project.id}
                submission={latestSubmission}
                projectStatus={project.status}
              />
            )
          ) : null}

          {!isAssigned && (
            <ProfessionalActionArea
              isAssigned={isAssigned}
              hasApplied={hasApplied}
            />
          )}

          {isAssigned && assignedProposal && (
            <ProfessionalBudgetOverview
              project={project}
              isAssigned={isAssigned}
              hasApplied={hasApplied}
              professionalProposal={assignedProposal}
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
