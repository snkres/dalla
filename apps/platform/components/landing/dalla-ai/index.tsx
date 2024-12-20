'use client'

import { useState } from 'react'
import { CandidateCard } from './candidate-card'
import { RecruiterMessage } from './recuriter-message'
import { Timeline, TimelineItem } from './timeline'
import { Button, Logomark } from '@dallah/design-system'
import { Search, ThumbsUp } from 'lucide-react'

export function DallaAi() {
  const [candidates] = useState([
    {
      id: '1',
      name: 'John Brooklyn',
      image: '/placeholder.svg?height=48&width=48',
      status: 'Interested',
      experience: ['Figma'],
    },
    {
      id: '2',
      name: 'John Brooklyn',
      image: '/placeholder.svg?height=48&width=48',
      status: 'Interested',
      experience: ['Figma'],
    },
  ])

  return (
    <div className="bg-slate-blue mx-auto max-w-7xl rounded-[48px] lg:px-8">
      <div className="grid items-center gap-12 pl-16 lg:grid-cols-2">
        {/* Left Column */}
        <div className="py-24 text-white">
          <Logomark className="[&_path]:fill-foreground !h-16 !w-16" />
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Meet with <span className="text-sunshine-yellow">Dalla Ai </span>
            Recruiter Now
          </h1>
          <p className="mb-8 text-lg text-white/80">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
          <Button
            variant="outline"
            className="hover:text-slate-blue border-2 border-white bg-transparent px-8 py-3 text-lg font-medium text-white hover:bg-white"
          >
            Discover More
          </Button>
        </div>

        {/* Right Column - Timeline */}
        <div className="pt-10">
          <Timeline>
            <TimelineItem isPhoto>
              <div className="flex flex-col gap-1">
                <span className="text-white">Recruiter</span>
                <div className="max-w-xl rounded-3xl rounded-tl-none bg-white p-4">
                  Send me candidate who are expert in{' '}
                  <span className="font-medium">Figma</span> and understand{' '}
                  <span className="font-medium">HTML</span>
                </div>
              </div>
            </TimelineItem>

            <TimelineItem isIcon Icon={<Search className="h-6 w-6" />}>
              <div className="flex flex-col gap-2">
                <span className="self-end text-white">Dalla Recruiter</span>
                <div className="bg-sunshine-yellow text-slate-blue max-w-xl self-end rounded-3xl rounded-tr-none p-4">
                  Sending you a list of relevant candidates now
                </div>
                <img
                  src="/searching.png"
                  alt="searching"
                  className="motion-preset-oscillate motion-duration-2000"
                />
              </div>
            </TimelineItem>

            <TimelineItem isLast isIcon Icon={<ThumbsUp className="h-6 w-6" />}>
              <div className="bg-sunshine-yellow max-w-xl rounded-3xl rounded-se-none p-6">
                <h2 className="text-slate-blue mb-4 text-xl font-semibold">
                  Your Qualified Candidates Review List
                </h2>
                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))}
                </div>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  )
}
