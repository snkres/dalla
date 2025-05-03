import { Button } from '@dalla/design-system'
import { GetProjectRes } from '@lib/api/company/projects'
import { FileText } from 'lucide-react'
import { Briefcase } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { useState } from 'react'

export function ProfessionalActionArea({
  isAssigned,
  hasApplied,
}: {
  isAssigned: boolean
  hasApplied: boolean
}) {
  const router = useTransitionRouter()
  const [isApplying, setIsApplying] = useState(false)
  return !isAssigned && hasApplied ? (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-blue-100 p-3">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          You've submitted a proposal
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          The company is reviewing your proposal. You'll be notified if they
          respond.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="mt-2 border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
            onClick={() => router.push('/proposals')}
          >
            View My Proposals
          </Button>
          <Button
            className="mt-2 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
            onClick={() => setIsApplying(true)}
          >
            Edit Proposal
          </Button>
        </div>
      </div>
      ) : !isAssigned && !hasApplied ? (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-[#E0F2F2] p-3">
          <Briefcase className="h-6 w-6 text-[#63B7B7]" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          Interested in this project?
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Submit a proposal to show the client you're the perfect fit for this
          job.
        </p>
        <Button
          className="mt-2 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
          onClick={() => setIsApplying(true)}
        >
          Submit a Proposal
        </Button>
      </div>
    </div>
  ) : null
}
