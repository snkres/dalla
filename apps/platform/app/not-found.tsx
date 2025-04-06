'use client'

import { motion } from 'motion/react'
import { Button } from '@dallah/design-system'
import { LogoVertical } from '@dallah/design-system'
import { fadeInVariants, fadeInUpVariants } from '@dallah/utils'
import { useTransitionRouter } from 'next-view-transitions'

export default function NotFound() {
  const router = useTransitionRouter()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="mx-auto flex w-full max-w-md flex-col items-center text-center"
      >
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
        >
          <LogoVertical className="h-32 w-32 [&_path]:fill-[#234d64]" />
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h1 className="text-9xl font-bold text-[#234d64]">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Page not found
          </h2>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-4"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="!bg-[#234d64] text-white hover:!bg-[#1a3b4d]"
          >
            Go Home
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        className="absolute bottom-8 text-sm text-gray-500"
      >
        &copy; {new Date().getFullYear()} Dalla Solutions. All rights reserved.
      </motion.div>
    </div>
  )
}
