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
    <div ref={containerRef} className="container-fluid mx-auto py-[77px]">
      <div className="flex flex-col gap-12">
        <div className="flex !h-1/2 w-full gap-8 *:flex-1">
          <TrustedBox />
          <CertifiedBox />
        </div>
        <div className="flex h-1/2 w-full *:flex-1">
          <FAQ />
          <Rates />
        </div>
      </div>
    </div>
  )
}
