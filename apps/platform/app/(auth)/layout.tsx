'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'
import { LangToggle } from './components/lang-toggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const welcomeMessage = pathname.includes('login')
    ? 'Welcome back! Please sign in to continue'
    : 'Start your journey with us today'

  return (
    <div className="flex h-screen flex-col p-0 sm:p-2 lg:flex-row">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="relative hidden items-center justify-center overflow-hidden rounded-none sm:rounded-2xl lg:flex lg:w-[40%]"
      >
        <div className="absolute inset-0 rounded-2xl">
          <Image
            src="/backgrounds/2.webp"
            alt="background"
            fill
            className="rounded-2xl object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-2xl bg-[#234d64] opacity-90" />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12 text-white">
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <svg
              id="Layer_2"
              data-name="Layer 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 88.34 88.92"
              className="h-20 w-20 fill-[#f7ca71]"
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
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-sora mb-2 text-4xl font-bold text-[#f7ca71]">
              Welcome to Dalla Solutions
            </h1>
            <p className="text-md text-[#f7ca71] opacity-90">
              {welcomeMessage}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative flex h-full flex-1 flex-col">
        <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
          <LangToggle />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
