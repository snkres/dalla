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
    <div ref={containerRef} className="mx-auto w-full max-w-xs lg:max-w-2xl">
      <div className="overflow-hidden rounded-[48px] bg-[#E4EBFF] text-[42px]">
        <div className="relative">
          <h2 className="text-heading-sm lg:text-heading-md xl:text-heading-lg px-2 pt-8 text-center font-semibold text-[#1a365d] lg:pl-[28px] lg:pr-[62px] lg:pt-[58px]">
            Certified by <br />
            international courts
          </h2>
          <div className="relative h-96 overflow-hidden">
            <motion.div
              style={{
                y,
                x,
                rotate,
                position: 'absolute',
                bottom: -50,
                left: -100,
              }}
              className="h-auto w-[514px]"
            >
              <img
                src="/certified.webp"
                alt="Certification illustration"
                className="h-auto w-full scale-150 transform-gpu object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
