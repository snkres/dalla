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
          <svg
            className="h-8 w-8"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18.25C6.76562 18.25 3.8125 16.5625 2.19531 13.75C0.578125 10.9727 0.578125 7.5625 2.19531 4.75C3.8125 1.97266 6.76562 0.25 10 0.25C13.1992 0.25 16.1523 1.97266 17.7695 4.75C19.3867 7.5625 19.3867 10.9727 17.7695 13.75C16.1523 16.5625 13.1992 18.25 10 18.25ZM13.9727 7.59766H13.9375C14.2891 7.28125 14.2891 6.75391 13.9375 6.40234C13.6211 6.08594 13.0938 6.08594 12.7773 6.40234L8.875 10.3398L7.22266 8.6875C6.87109 8.33594 6.34375 8.33594 6.02734 8.6875C5.67578 9.00391 5.67578 9.53125 6.02734 9.84766L8.27734 12.0977C8.59375 12.4492 9.12109 12.4492 9.47266 12.0977L13.9727 7.59766Z"
              fill="#234D64"
            />
          </svg>

          <svg
            className="h-8 w-8"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 1.9375C7.36328 1.9375 4.97266 3.34375 3.63672 5.59375C2.33594 7.87891 2.33594 10.6562 3.63672 12.9062C4.97266 15.1914 7.36328 16.5625 10 16.5625C12.6016 16.5625 14.9922 15.1914 16.3281 12.9062C17.6289 10.6562 17.6289 7.87891 16.3281 5.59375C14.9922 3.34375 12.6016 1.9375 10 1.9375ZM10 18.25C6.76562 18.25 3.8125 16.5625 2.19531 13.75C0.578125 10.9727 0.578125 7.5625 2.19531 4.75C3.8125 1.97266 6.76562 0.25 10 0.25C13.1992 0.25 16.1523 1.97266 17.7695 4.75C19.3867 7.5625 19.3867 10.9727 17.7695 13.75C16.1523 16.5625 13.1992 18.25 10 18.25ZM7.15234 6.40234C7.46875 6.08594 7.99609 6.08594 8.3125 6.40234L9.96484 8.05469L11.6172 6.40234C11.9688 6.08594 12.4961 6.08594 12.8125 6.40234C13.1641 6.75391 13.1641 7.28125 12.8125 7.59766L11.1602 9.25L12.8125 10.9023C13.1641 11.2539 13.1641 11.7812 12.8125 12.0977C12.4961 12.4492 11.9688 12.4492 11.6172 12.0977L9.96484 10.4453L8.3125 12.0977C7.99609 12.4492 7.46875 12.4492 7.15234 12.0977C6.80078 11.7812 6.80078 11.2539 7.15234 10.9023L8.80469 9.25L7.15234 7.59766C6.80078 7.28125 6.80078 6.75391 7.15234 6.40234Z"
              fill="#234D64"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
