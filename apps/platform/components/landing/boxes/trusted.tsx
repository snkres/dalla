'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function TrustedBox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const topY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const leftY = useTransform(scrollYProgress, [0, 1], [25, -25])
  const rightY = useTransform(scrollYProgress, [0, 1], [-25, 25])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[48px] bg-[#FFEECA]"
    >
      <h2 className="text-heading-lg px-2 pt-8 text-center font-semibold leading-tight text-[#1a365d] lg:px-[108px] lg:pt-[58px]">
        Trusted by many people
      </h2>

      <div className="relative h-96 w-full px-10">
        <motion.div
          style={{ y: topY }}
          className="absolute right-64 top-10 h-32 w-32 -translate-x-1/2"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#C35076]">
            <img
              src="/trusted.png"
              alt="Avatar 1"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: topY }}
          className="absolute right-64 top-52 h-32 w-32 -translate-x-1/2"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#F56E30]">
            <img
              src="/trusted.png"
              alt="Avatar 1"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: leftY }}
          className="absolute left-28 top-80 h-32 w-32"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#F5C157]">
            <img
              src="/trusted.png"
              alt="Avatar 2"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: rightY }}
          className="absolute left-28 top-32 h-32 w-32 max-sm:hidden"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#5BB1E1]">
            <img
              src="/trusted.png"
              alt="Avatar 3"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: rightY }}
          className="absolute right-2 top-28 h-32 w-32 lg:right-24"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#CB5AF2]">
            <img
              src="/trusted.png"
              alt="Avatar 4"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          style={{ y: leftY }}
          className="absolute top-[18rem] h-32 w-32 max-sm:hidden lg:right-24"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#369FA4]">
            <img
              src="/trusted.png"
              alt="Avatar 5"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <div className="absolute right-48 top-0 h-8 w-8 rounded-full bg-teal-500" />
        <div className="absolute left-56 top-14 h-6 w-6 rounded-full bg-violet-500 lg:top-20" />
      </div>
    </div>
  )
}
