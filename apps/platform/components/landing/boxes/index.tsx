'use client'

import { useRef } from 'react'
import { useScroll } from 'motion/react'
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

  return (
    <div ref={containerRef} className="mx-auto max-w-[80%] pt-[77px]">
      <div className="grid gap-y-[32px] md:grid-cols-2">
        <TrustedBox />

        <CertifiedBox />
        <FAQ />
        <Rates />
      </div>
    </div>
  )
}
