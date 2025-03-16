import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@dallah/utils'
import { ExpandableSectionProps } from '@lib/types/proposals'

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}) => (
  <div className="mb-6 cursor-pointer" onClick={onToggle}>
    <div className="mb-3 flex items-center justify-between">
      <h3 className="flex items-center text-base font-medium text-gray-800">
        {icon}
        {title}
      </h3>
      <ChevronDown
        className={cn(
          'h-5 w-5 text-gray-400 transition-transform duration-200',
          isExpanded ? 'rotate-180 transform' : '',
        )}
      />
    </div>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export default ExpandableSection
