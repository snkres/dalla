import { Check, X } from 'lucide-react'
// import { type Candidate } from '../types/recruitment'
// import { Badge } from '@/components/ui/badge'
// import { Card } from '@/components/ui/card'
import { Button } from '@dallah/design-system'

export function CandidateCard() {
  return (
    <div className="mb-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">John Brooklyn</h3>
              <div className="bg-green-50 text-green-700">Interested</div>
            </div>
            <p className="text-muted-foreground text-sm">Experience in Figma</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="rounded-full p-2 text-green-600 hover:bg-green-50"
            // aria-label={`Accept ${candidate.name}`}
          >
            <Check className="h-5 w-5" />
          </Button>
          <Button
          // onClick={() => onReject(candidate.id)}
          // className="rounded-full p-2 text-red-600 hover:bg-red-50"
          // aria-label={`Reject ${candidate.name}`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
