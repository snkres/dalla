import {
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
} from '@dalla/design-system'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { CompletionDialogProps } from '@lib/types/goals'
import { fadeInVariants, fadeInUpVariants } from '@dalla/utils'

export const CompletionDialog = ({
  open,
  onOpenChange,
  onComplete,
}: CompletionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] overflow-hidden border-0 p-0">
        <DialogTitle>
          <motion.div
            className="relative rounded-xl bg-white"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-2 pt-6">
              <div className="flex flex-col items-center">
                <motion.div variants={fadeInUpVariants} className="mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <svg
                      className="h-8 w-8 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        d="M20 6L9 17L4 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeInUpVariants}
                  className="mb-6 space-y-2 text-center"
                >
                  <h2 className="text-xl font-semibold text-[#234d64]">
                    All Set and Ready!
                  </h2>
                  <p className="text-sm font-light text-gray-500">
                    Your goals are locked in. Time to discover opportunities
                    that match your aspirations.
                  </p>
                </motion.div>

                <Button
                  onClick={onComplete}
                  className="h-12 w-full rounded-lg bg-[#234d64] text-sm font-medium text-white hover:bg-[#1a3b4d]"
                >
                  View Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
