'use client'
import React, { Suspense } from 'react'
import { cn, fadeInVariants } from '@dalla/utils'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'

const DallaLogoLottie = dynamic(
  () => import('./dalla-lottie').then((mod) => mod.DallaLogoLottie),
  { ssr: false },
)

export function DallaLoading({
  title = 'Loading',
  description = 'Please wait while we prepare your content',
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center bg-slate-50',
        className,
      )}
    >
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center justify-center gap-8"
      >
        <div className="relative">
          <Suspense>
            <DallaLogoLottie width={500} height={500} />
          </Suspense>
        </div>

        <div className="-mt-28 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold text-[#234d64]">{title}</h1>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full bg-[#63B7B7]"
              initial={{ width: '0%' }}
              animate={{
                width: '100%',
                transition: { duration: 2, repeat: Infinity },
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
