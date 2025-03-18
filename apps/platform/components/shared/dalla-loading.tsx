import { fadeInVariants } from '@components/aniamtion/animate'
import { LogomarkFilled } from '@dallah/design-system'
import { motion } from 'motion/react'

export function Loading({
  title = 'Loading',
  description = 'Please wait while we prepare your content',
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <motion.div
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center justify-center gap-8"
      >
        <div className="relative">
          <LogomarkFilled className="h-24 w-24" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 animate-ping rounded-full bg-white opacity-75"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
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
