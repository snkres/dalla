'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { fadeInVariants, fadeInUpVariants } from "@components/aniamtion/animate";

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthFlow = !pathname.includes('login');
  const showProgress = isAuthFlow;

  return (
    <div className="h-screen flex flex-col lg:flex-row p-0 sm:p-2">
      <motion.div variants={fadeInVariants} initial="initial" animate="animate" className="hidden lg:flex lg:w-[40%] relative items-center justify-center rounded-none sm:rounded-2xl overflow-hidden">
        <div className="absolute inset-0 rounded-2xl">
          <Image src="/backgrounds/2.webp" alt="background" fill className="object-cover rounded-2xl" priority />
          <div className="absolute inset-0 bg-[#234d64] opacity-90 rounded-2xl" />
        </div>

        <div className="relative w-full h-full flex flex-col justify-between p-12 text-white z-10">
          <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
            <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.34 88.92" className='w-20 h-20 fill-[#f7ca71]'>
              <g id="Layer_1-2" data-name="Layer 1">
                <path d="M0,.65l.83-.37c15.4.83,32.03-1.17,47.26.25,38.68,3.61,54.39,51.9,25.07,77.59-11.74,10.29-24.67,11.25-39.7,10.67-.29-.01-.89.18-.84-.24.37,0,.71-.11,1.05-.27,15.98-7.48,26.02-19.63,25.82-38-.03-2.53-.64-5.4-.73-7.91-.03-.81-.09-1.75.11-2.52.81-3.13,10.12-7.74,12.97-9.34.29-.44-1.51-2.5-1.94-2.88-1.27-1.13-3.35-1.96-5.03-2.16-.81-.1-1.84.16-2.58-.05-.47-.14-3.21-2.36-4.09-2.87-14.91-8.63-25.97.5-31.16,14.61-8.94,4.02-17.74,8.43-26.02,13.7l-.55-.07c-.09-.06-.48-.68-.48-.73V.65Z" />
                <path d="M48.39,28.17c3.75-.99,3.77,5.15-.19,3.91-1.68-.53-1.63-3.43.19-3.91Z" />
              </g>
            </svg>
          </motion.div>

          <motion.div variants={fadeInUpVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
            <h1 className="text-4xl font-bold mb-2 text-[#f7ca71] font-sora">
              Welcome to Dalla Solutions
            </h1>
            <p className="text-md opacity-90 text-[#f7ca71]">
              {pathname.includes('login')
                ? 'Welcome back! Please sign in to continue'
                : 'Start your journey with us today'}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col h-full relative">

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center p-4 sm:p-8 min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}