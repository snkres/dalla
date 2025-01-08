'use client'
import { useRef, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { FeatureCard } from './feature-card'
import { SearchForm } from './search-form'
import { motion, useTransform, useScroll, AnimatePresence } from 'motion/react'
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
    [0.1, 0.2, 0.3],
    ['100%', '95%', '90%'],
  )

  const scale = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [1, 1, 0.97])

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    ['0px', '0px', '40px'],
  )

  const y = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 0, -40])

  const padding = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    ['0px', '0px', '24px'],
  )

  const transition = {
    duration: 0.8,
    ease: [0.3, 0.1, 0.2, 1],
  }

  const features = mode === 'companies' ? companyFeatures : professionalFeatures
  const title =
    mode === 'companies' ? (
      <span>
        Emspanower Your Business with <br /> the Best Consultants
      </span>
    ) : (
      <span>
        Grow <br /> Your Consulting Business
      </span>
    )
  const subtitle =
    mode === 'companies' ? (
      <span>
        Our all-in-one solutions streamline your workflow by integrating
        essential tools <br /> into a single, cohesive package
      </span>
    ) : (
      'Join our platform to connect with businesses looking for your expertise'
    )

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.25], [0, 1]),
          y: useTransform(scrollYProgress, [0, 0.25], [-50, 0]),
        }}
        transition={transition}
        className="top-10 z-10 flex justify-center"
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
        transition={transition}
        className={`overflow-hidden ${mode === 'professional' ? 'bg-slate-blue' : 'bg-sunshine-yellow'}`}
      >
        <motion.div style={{ padding }} transition={transition}>
          <motion.div className="mx-auto max-w-full pt-[1.6rem]">
            <div className="pb-[3.125rem] text-center">
              <motion.span
                style={{
                  scale: useTransform(scrollYProgress, [0, 0.3], [0.95, 1]),
                }}
                transition={transition}
                className="text-slate-blue inline-block rounded-full border border-[#EEB238] bg-[#FFD37B] px-4 py-1"
              >
                Features For
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={title.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    opacity: useTransform(scrollYProgress, [0.1, 0.35], [0, 1]),
                  }}
                  className={`text-[4.5rem] ${mode === 'professional' ? 'text-sunshine-yellow' : 'text-slate-blue'} mx-auto py-2 font-bold tracking-tight`}
                >
                  {title}
                </motion.h1>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={subtitle.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.15, 0.35],
                      [0, 1],
                    ),
                  }}
                  className={`text-text-xl at-least-2-lines container-fluid mx-auto ${mode === 'companies' ? 'text-[#00000066]' : 'text-foreground/80'}`}
                >
                  {subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="grid gap-6 pb-[3.125rem] md:grid-cols-2 lg:grid-cols-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.description}
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [0.2 + index * 0.03, 0.35 + index * 0.03],
                        [0, 1],
                      ),
                      y: useTransform(
                        scrollYProgress,
                        [0.2 + index * 0.03, 0.35 + index * 0.03],
                        [20, 0],
                      ),
                    }}
                    transition={transition}
                  >
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.3, 0.45], [0, 1]),
                y: useTransform(scrollYProgress, [0.3, 0.45], [20, 0]),
              }}
              transition={transition}
              className="mb-[1.625rem]"
            >
              <SearchForm mode={mode} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
