import { Check, X } from 'lucide-react'
// import { type Candidate } from '../types/recruitment'
// import { Badge } from '@/components/ui/badge'
// import { Card } from '@/components/ui/card'
import { Button } from '@dallah/design-system'

export function CandidateCard() {
  return (
    <div className="bg-foreground mb-3 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-text-lg font-semibold">John Brooklyn</h3>
              <div className="text-text-2xs rounded-full bg-[#D9F7E5] px-[8px] py-[4px] text-green-700">
                Interested
              </div>
            </div>
            <p className="text-muted-foreground text-md">Experience in Figma</p>
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
