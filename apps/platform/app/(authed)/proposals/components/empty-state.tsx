import { motion } from 'motion/react'
import { Bell, Gift } from 'lucide-react'
import { Button } from '@dalla/design-system'

interface EmptyStateProps {
  type: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-4 py-16 text-center shadow-sm"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#BEDDF1]/30">
      {type === 'invitations' ? (
        <Bell className="h-6 w-6 text-[#63B7B7]" />
      ) : (
        <Gift className="h-6 w-6 text-[#63B7B7]" />
      )}
    </div>
    <h3 className="mb-2 text-lg font-medium text-gray-800">No {type} yet</h3>
    <p className="mb-6 max-w-md text-gray-500">
      {type === 'invitations'
        ? "When clients invite you to interview for their projects, they'll appear here."
        : "When clients make you an offer for their projects, they'll appear here."}
    </p>
    <Button className="border-none bg-[#63B7B7] text-white hover:bg-[#63B7B7]/90">
      Browse projects
    </Button>
  </motion.div>
)

export default EmptyState
