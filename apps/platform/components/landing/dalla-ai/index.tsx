'use client'

import { useState } from 'react'
import { CandidateCard } from './candidate-card'
import { RecruiterMessage } from './recuriter-message'
// import { SearchingAvatars } from './searching-avatars'
import { Timeline, TimelineItem } from './timeline'
import { Button, Logomark } from '@dallah/design-system'

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
      <div className="grid items-center gap-12 pl-[64px] lg:grid-cols-2">
        {/* Left Column */}
        <div className="py-[91.5px] text-white">
          <Logomark className="[&_path]:fill-foreground !h-16 !w-16" />
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Meet with <span className="text-sunshine-yellow">Dalla Ai </span>{' '}
            Recruiter Now
          </h1>
          <p className="mb-8 text-lg text-white/80">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
          <Button
            variant="outline"
            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#1E3A4C]"
          >
            Discover More
          </Button>
        </div>

        {/* Right Column */}
        <div className="pt-[40px]">
          <Timeline>
            <TimelineItem>
              <RecruiterMessage />
            </TimelineItem>

            <TimelineItem>
              <div className="flex flex-col items-end gap-2">
                <span className="text-foreground w-full text-end">
                  Dalla Recruiter
                </span>
                <div className="bg-sunshine-yellow mb-6 rounded-3xl rounded-se-none p-4 text-center text-[#1E3A4C]">
                  Sure! Sending you a list of relevant candidates now
                </div>
              </div>

              <img
                src="/searching.png"
                alt="searching"
                className="motion-preset-oscillate motion-duration-700"
              />
            </TimelineItem>

            <TimelineItem isLast>
              <div className="bg-sunshine-yellow rounded-3xl rounded-se-none p-6">
                <h2 className="mb-4 text-xl font-semibold text-[#1E3A4C]">
                  Your Qualified Candidates Review List
                </h2>
                {candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} />
                ))}
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  )
}
