'use client'
import { useRef, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { FeatureCard } from './feature-card'
import { SearchForm } from './search-form'
import { motion, useTransform, useScroll } from 'motion/react'
import { companyFeatures, professionalFeatures } from './content'

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
    ['100%', '100%', '90%'],
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
        className={`overflow-hidden ${mode === 'professional' ? 'bg-slate-blue' : 'bg-sunshine-yellow'}`}
      >
        <motion.div
          style={{
            padding,
          }}
        >
          <motion.div className="mx-auto max-w-full space-y-8 px-4 md:px-14">
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
                className={`sm:text-heading-2xl ${mode === 'professional' ? 'text-sunshine-yellow' : 'text-slate-blue'} at-least-2-lines mx-auto line-clamp-2 !w-[80%] text-balance font-bold tracking-tight`}
              >
                {title}
              </motion.h1>
              <motion.p
                style={{
                  opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]),
                }}
                className={`text-text-lg mx-auto max-w-2xl ${mode === 'companies' ? 'text-[#00000066]' : 'text-foreground/80'}`}
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.description}
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
              <SearchForm mode={mode} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
