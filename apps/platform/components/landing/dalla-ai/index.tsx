'use client'

import { useState, useRef } from 'react'
import { CandidateCard } from './candidate-card'
import { Timeline, TimelineItem } from './timeline'
import { Button, Logomark } from '@dallah/design-system'
import { Search, ThumbsUp } from 'lucide-react'
import { motion, useInView } from 'motion/react'

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

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  const inView1 = useInView(ref1, { once: false, amount: 0.25 })
  const inView2 = useInView(ref2, { once: false, amount: 0.25 })
  const inView3 = useInView(ref3, { once: false, amount: 0.25 })
  const inView4 = useInView(ref4, { once: false, amount: 0.25 })

  return (
    <div className="bg-slate-blue mx-2 max-w-sm rounded-[48px] max-sm:px-4 lg:mx-auto lg:max-w-[80%]">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:pl-16">
        <motion.div
          className="pt-12 text-white lg:py-24"
          ref={ref1}
          initial={{ opacity: 0, x: -50 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <Logomark className="[&_path]:fill-foreground !h-12 !w-12 lg:!h-16 lg:!w-16" />
          <h1 className="mb-4 mt-5 text-4xl font-bold leading-tight lg:text-5xl">
            Meet with <span className="text-sunshine-yellow">Dalla Ai </span>
            Recruiter Now
          </h1>
          <p className="mb-6 text-base text-white/80 lg:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
          <Button
            variant="outline"
            className="hover:text-slate-blue !rounded-xl border-2 border-white bg-transparent px-6 py-2 text-base font-medium text-white hover:bg-white lg:px-8 lg:py-3 lg:text-lg"
            size="lg"
          >
            Discover More
          </Button>
        </motion.div>

        <motion.div
          className="pt-4 lg:pr-[40px] lg:pt-10"
          ref={ref2}
          initial={{ opacity: 0, x: 50 }}
          animate={inView2 ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <Timeline>
            <TimelineItem isPhoto>
              <motion.div
                className="flex flex-col gap-1"
                ref={ref3}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm text-white lg:text-base">
                  Recruiter
                </span>
                <div className="max-w-xl rounded-3xl rounded-tl-none bg-white p-3 lg:p-4">
                  Send me candidate who are expert in{' '}
                  <span className="font-medium">Figma</span> and understand{' '}
                  <span className="font-medium">HTML</span>
                </div>
              </motion.div>
            </TimelineItem>

            <TimelineItem
              isIcon
              Icon={<Search className="h-5 w-5 lg:h-6 lg:w-6" />}
            >
              <motion.div
                className="flex flex-col gap-2"
                ref={ref4}
                initial={{ opacity: 0, y: 20 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="self-end text-sm text-white lg:text-base">
                  Dalla Recruiter
                </span>
                <div className="bg-sunshine-yellow text-slate-blue max-w-xl self-end rounded-3xl rounded-tr-none p-3 lg:p-4">
                  Sending you a list of relevant candidates now
                </div>
                <img
                  src="/searching.png"
                  alt="searching"
                  className="mt-4 w-full lg:w-auto"
                />
              </motion.div>
            </TimelineItem>

            <TimelineItem
              isLast
              isIcon
              Icon={<ThumbsUp className="h-5 w-5 lg:h-6 lg:w-6" />}
            >
              <motion.div
                className="bg-sunshine-yellow max-w-xl rounded-3xl rounded-se-none p-4 lg:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-slate-blue mb-4 text-lg font-semibold lg:text-xl">
                  Your Qualified Candidates Review List
                </h2>
                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))}
                </div>
              </motion.div>
            </TimelineItem>
          </Timeline>
        </motion.div>
      </div>
    </div>
  )
}
