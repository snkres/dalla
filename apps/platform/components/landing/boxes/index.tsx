'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import CertifiedBox from './certified'

export function Boxes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Create separate transform values for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <div ref={containerRef} className="mx-auto max-w-[80%]">
      <div className="grid md:grid-cols-2">
        {/* Trust Card */}
        <div className="overflow-hidden bg-[#FFF5E9]">
          <div className="p-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#1a365d]">
              Trusted by many people
            </h2>
            <div className="relative h-[300px]">
              {/* Profile Images with Parallax */}
              <motion.div
                style={{ y: y1 }}
                className="absolute left-[20%] top-[10%]"
              >
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile 1"
                  className="h-20 w-20 rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                style={{ y: y2 }}
                className="absolute right-[30%] top-[5%]"
              >
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile 2"
                  className="h-20 w-20 rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                style={{ y: y3 }}
                className="absolute left-[30%] top-[40%]"
              >
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile 3"
                  className="h-20 w-20 rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                style={{ y: y2 }}
                className="absolute right-[20%] top-[50%]"
              >
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile 4"
                  className="h-20 w-20 rounded-lg shadow-lg"
                />
              </motion.div>
              {/* Decorative Dots */}
              <motion.div
                style={{ y: y1 }}
                className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full bg-teal-500"
              />
              <motion.div
                style={{ y: y3 }}
                className="absolute right-[25%] top-[20%] h-3 w-3 rounded-full bg-purple-500"
              />
            </div>
          </div>
        </div>

        <CertifiedBox />
      </div>
    </div>
  )
}
