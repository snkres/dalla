'use client' // Error boundaries must be Client Components

import { motion } from 'motion/react'
import { Button } from '@dalla/design-system'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
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
              <svg
                id="Layer_2"
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 88.34 88.92"
                className="h-32 w-32 fill-[#234d64]"
              >
                <g id="Layer_1-2" data-name="Layer 1">
                  <path d="M0,.65l.83-.37c15.4.83,32.03-1.17,47.26.25,38.68,3.61,54.39,51.9,25.07,77.59-11.74,10.29-24.67,11.25-39.7,10.67-.29-.01-.89.18-.84-.24.37,0,.71-.11,1.05-.27,15.98-7.48,26.02-19.63,25.82-38-.03-2.53-.64-5.4-.73-7.91-.03-.81-.09-1.75.11-2.52.81-3.13,10.12-7.74,12.97-9.34.29-.44-1.51-2.5-1.94-2.88-1.27-1.13-3.35-1.96-5.03-2.16-.81-.1-1.84.16-2.58-.05-.47-.14-3.21-2.36-4.09-2.87-14.91-8.63-25.97.5-31.16,14.61-8.94,4.02-17.74,8.43-26.02,13.7l-.55-.07c-.09-.06-.48-.68-.48-.73V.65Z" />
                  <path d="M48.39,28.17c3.75-.99,3.77,5.15-.19,3.91-1.68-.53-1.63-3.43.19-3.91Z" />
                </g>
              </svg>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h1 className="text-2xl font-semibold text-[#234d64]">
                Something went wrong
              </h1>
              <p className="mt-2 text-gray-600">
                {error.message ||
                  "We're sorry, but we encountered an unexpected error."}
              </p>
              {error.digest && (
                <p className="mt-1 text-sm text-gray-500">
                  Error ID: {error.digest}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                onClick={() => reset()}
                className="!bg-[#234d64] text-white hover:!bg-[#1a3b4d]"
              >
                Try Again
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
            &copy; {new Date().getFullYear()} Dalla Solutions. All rights
            reserved.
          </motion.div>
        </div>
      </body>
    </html>
  )
}
