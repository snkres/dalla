'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import CertifiedBox from './certified'
import { TrustedBox } from './trusted'
import { Rates } from './rates'
import { FAQ } from './faq'

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
      <div className="grid gap-y-[32px] md:grid-cols-2">
        <TrustedBox />

        <CertifiedBox />
        <FAQ />
        <Rates />
      </div>
    </div>
  )
}
