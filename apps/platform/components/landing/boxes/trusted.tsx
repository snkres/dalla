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
      className="container-fluid mx-auto flex aspect-square flex-col overflow-hidden rounded-[48px] bg-[#FFEECA]"
    >
      <h2 className="text-heading-lg px-2 pt-8 text-center font-semibold leading-tight text-[#1a365d] lg:px-[108px] lg:pt-[58px]">
        Trusted by many people
      </h2>

      <div className="relative h-full w-full px-10">
        <motion.div
          style={{ y: topY }}
          className="absolute right-[40%] top-[5vh] h-[8dvw] w-[8dvw] -translate-x-1/2"
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
          className="absolute right-[40%] top-1/2 h-[8dvw] w-[8dvw] -translate-x-1/2"
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
          className="absolute left-[10%] top-1/2 mt-20 h-[8dvw] w-[8dvw]"
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
          className="absolute left-[10%] top-[8dvw] h-[8dvw] w-[8dvw] max-sm:hidden"
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
          className="absolute right-[10%] top-1/4 h-[8dvw] w-[8dvw]"
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
          className="absolute right-[10%] top-[60%] h-[8dvw] w-[8dvw] max-sm:hidden"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#369FA4]">
            <img
              src="/trusted.png"
              alt="Avatar 5"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
        <div className="absolute right-48 top-[10%] h-[2dvw] w-[2dvw] rounded-full bg-teal-500" />
        <div className="absolute left-[30%] top-[25%] h-[1.5dvw] w-[1.5dvw] rounded-full bg-violet-500 lg:top-20" />
      </div>
    </div>
  )
}
