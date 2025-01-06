'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'motion/react'

export default function CertifiedBox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Using easeInOut from framer-motion for smooth animation
  const y = useTransform(scrollYProgress, [0, 1], [0, -150], {
    ease: easeInOut,
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -100], {
    ease: easeInOut,
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10], {
    ease: easeInOut,
  })

  return (
    <div
      ref={containerRef}
      className="container-fluid relative mx-auto flex !aspect-square w-full flex-col items-center justify-between overflow-hidden rounded-[48px] bg-[#E4EBFF]"
    >
      <h2 className="text-heading-lg absolute z-20 w-full pt-8 text-center font-semibold text-[#1a365d]">
        Certified by <br />
        international courts
      </h2>
      <motion.div
        style={{
          y,
          x,
          rotate,
          position: 'absolute',
          bottom: -50,
          left: -100,
        }}
        className="h-auto w-full"
      >
        <img
          src="/certified.webp"
          alt="Certification illustration"
          className="h-full w-full scale-[1.6] transform-gpu object-cover"
        />
      </motion.div>
    </div>
  )
}
