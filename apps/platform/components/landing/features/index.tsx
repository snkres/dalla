'use client'
import { useRef, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { FeatureCard } from './feature-card'
import { SearchForm } from './search-form'
import { motion, useTransform, useScroll } from 'motion/react'

const companyFeatures = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M19 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21V27.68"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 34H27C32 34 34 32 34 27V21C34 16 32 14 27 14H21C16 14 14 16 14 21V27C14 32 16 34 21 34Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Save Time and Resources',
    description:
      "Find qualified consultants faster with Dalla's AI-powered matching system.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M30.32 24C32.92 24 34 23 33.04 19.72C32.39 17.51 30.49 15.61 28.28 14.96C25 14 24 15.08 24 17.68V20.56C24 23 25 24 27 24H30.32Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.0004 26.7C31.0704 31.33 26.6304 34.69 21.5804 33.87C17.7904 33.26 14.7404 30.21 14.1204 26.42C13.3104 21.39 16.6504 16.95 21.2604 16.01"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Work With Confidence',
    description:
      'All consultants are verified and backed by a transparent feedback system.',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M24.92 14.26L31.43 17.77C32.19 18.18 32.19 19.35 31.43 19.76L24.92 23.27C24.34 23.58 23.66 23.58 23.08 23.27L16.57 19.76C15.81 19.35 15.81 18.18 16.57 17.77L23.08 14.26C23.66 13.95 24.34 13.95 24.92 14.26Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.61 22.13L21.66 25.16C22.41 25.54 22.89 26.31 22.89 27.15V32.87C22.89 33.7 22.02 34.23 21.28 33.86L15.23 30.83C14.48 30.45 14 29.68 14 28.84V23.12C14 22.29 14.87 21.76 15.61 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.3904 22.13L26.3404 25.16C25.5904 25.54 25.1104 26.31 25.1104 27.15V32.87C25.1104 33.7 25.9804 34.23 26.7204 33.86L32.7704 30.83C33.5204 30.45 34.0004 29.68 34.0004 28.84V23.12C34.0004 22.29 33.1304 21.76 32.3904 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Streamline Operations',
    description:
      'Simplify project management with built-in collaboration tools.',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M24.92 14.26L31.43 17.77C32.19 18.18 32.19 19.35 31.43 19.76L24.92 23.27C24.34 23.58 23.66 23.58 23.08 23.27L16.57 19.76C15.81 19.35 15.81 18.18 16.57 17.77L23.08 14.26C23.66 13.95 24.34 13.95 24.92 14.26Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.61 22.13L21.66 25.16C22.41 25.54 22.89 26.31 22.89 27.15V32.87C22.89 33.7 22.02 34.23 21.28 33.86L15.23 30.83C14.48 30.45 14 29.68 14 28.84V23.12C14 22.29 14.87 21.76 15.61 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.3904 22.13L26.3404 25.16C25.5904 25.54 25.1104 26.31 25.1104 27.15V32.87C25.1104 33.7 25.9804 34.23 26.7204 33.86L32.7704 30.83C33.5204 30.45 34.0004 29.68 34.0004 28.84V23.12C34.0004 22.29 33.1304 21.76 32.3904 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Secure Payments',
    description: "Work worry-free with Dalla's escrow-based payment system.",
  },
]

const professionalFeatures = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M19 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21V27.68"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 34H27C32 34 34 32 34 27V21C34 16 32 14 27 14H21C16 14 14 16 14 21V27C14 32 16 34 21 34Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Find Your Ideal Clients',
    description:
      'Connect with businesses that match your expertise and preferences.',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M24.92 14.26L31.43 17.77C32.19 18.18 32.19 19.35 31.43 19.76L24.92 23.27C24.34 23.58 23.66 23.58 23.08 23.27L16.57 19.76C15.81 19.35 15.81 18.18 16.57 17.77L23.08 14.26C23.66 13.95 24.34 13.95 24.92 14.26Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.61 22.13L21.66 25.16C22.41 25.54 22.89 26.31 22.89 27.15V32.87C22.89 33.7 22.02 34.23 21.28 33.86L15.23 30.83C14.48 30.45 14 29.68 14 28.84V23.12C14 22.29 14.87 21.76 15.61 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.3904 22.13L26.3404 25.16C25.5904 25.54 25.1104 26.31 25.1104 27.15V32.87C25.1104 33.7 25.9804 34.23 26.7204 33.86L32.7704 30.83C33.5204 30.45 34.0004 29.68 34.0004 28.84V23.12C34.0004 22.29 33.1304 21.76 32.3904 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Guaranteed Payments',
    description: 'Get paid on time, every time with our secure payment system.',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M24.92 14.26L31.43 17.77C32.19 18.18 32.19 19.35 31.43 19.76L24.92 23.27C24.34 23.58 23.66 23.58 23.08 23.27L16.57 19.76C15.81 19.35 15.81 18.18 16.57 17.77L23.08 14.26C23.66 13.95 24.34 13.95 24.92 14.26Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.61 22.13L21.66 25.16C22.41 25.54 22.89 26.31 22.89 27.15V32.87C22.89 33.7 22.02 34.23 21.28 33.86L15.23 30.83C14.48 30.45 14 29.68 14 28.84V23.12C14 22.29 14.87 21.76 15.61 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.3904 22.13L26.3404 25.16C25.5904 25.54 25.1104 26.31 25.1104 27.15V32.87C25.1104 33.7 25.9804 34.23 26.7204 33.86L32.7704 30.83C33.5204 30.45 34.0004 29.68 34.0004 28.84V23.12C34.0004 22.29 33.1304 21.76 32.3904 22.13Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Efficient Workflow',
    description: 'Manage your projects and communications in one place.',
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="24" fill="#234D64" />
        <path
          d="M19 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21V27.68"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 22.74V25.94"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 34H27C32 34 34 32 34 27V21C34 16 32 14 27 14H21C16 14 14 16 14 21V27C14 32 16 34 21 34Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Save Time',
    description:
      'Focus on what matters - delivering great results to your clients.',
  },
]

export function Features() {
  const [mode, setMode] = useState<'companies' | 'professional'>('companies')
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const width = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ['100%', '100%', '80%'],
  )

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0.98])

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ['0px', '0px', '24px'],
  )

  const y = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0, -20])

  const padding = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ['0px', '0px', '32px'],
  )

  const features = mode === 'companies' ? companyFeatures : professionalFeatures
  const title =
    mode === 'companies'
      ? 'Empower Your Business with the Best Consultants'
      : 'Grow Your Consulting Business'
  const subtitle =
    mode === 'companies'
      ? 'Our all-in-one solutions streamline your workflow by integrating essential tools into a single, cohesive package'
      : 'Join our platform to connect with businesses looking for your expertise'

  return (
    <div ref={containerRef} className="relative min-h-[150vh]">
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
          y: useTransform(scrollYProgress, [0, 0.2], [-50, 0]),
        }}
        className="sticky top-10 z-10 flex justify-center"
      >
        <ModeToggle mode={mode} onModeChange={setMode} />
      </motion.div>

      <motion.div
        ref={sectionRef}
        style={{
          width,
          scale,
          y,
          borderRadius,
          margin: '0 auto',
          position: 'sticky',
          top: '100px',
        }}
        className="bg-sunshine-yellow overflow-hidden shadow-2xl"
      >
        <motion.div
          style={{
            padding,
          }}
        >
          <motion.div className="mx-auto max-w-full space-y-8 px-4 md:px-20">
            <div className="space-y-4 pt-4 text-center">
              <motion.span
                style={{
                  scale: useTransform(scrollYProgress, [0, 0.3], [0.95, 1]),
                }}
                className="text-slate-blue inline-block rounded-full border border-[#EEB238] bg-[#FFD37B] px-4 py-1"
              >
                Features For
              </motion.span>
              <motion.h1
                style={{
                  opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
                }}
                className="sm:text-heading-2xl text-slate-blue mx-auto line-clamp-2 !w-[80%] text-balance font-bold tracking-tight"
              >
                {title}
              </motion.h1>
              <motion.p
                style={{
                  opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]),
                }}
                className="text-text-lg mx-auto max-w-2xl text-[#00000066]"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.2 + index * 0.02, 0.3 + index * 0.02],
                      [0, 1],
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [0.2 + index * 0.02, 0.3 + index * 0.02],
                      [20, 0],
                    ),
                  }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
                y: useTransform(scrollYProgress, [0.3, 0.4], [20, 0]),
              }}
            >
              <SearchForm />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
