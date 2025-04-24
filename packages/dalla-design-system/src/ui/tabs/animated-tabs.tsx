'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Tabs, TabsList, TabsTrigger } from '.'
import { ReactNode } from 'react'

interface AnimatedTabItemProps {
  id: string
  label: string | ReactNode
  count?: number
  activeTab: string
}

interface AnimatedTabsProps {
  tabs: { id: string; label: string | ReactNode; count?: number }[]
  activeTab: string
  onTabChange: (tab: string) => void
  children?: ReactNode
  className?: string
}

export const AnimatedTabItem = ({
  id,
  label,
  count,
  activeTab,
}: AnimatedTabItemProps) => {
  return (
    <TabsTrigger
      key={id}
      value={id}
      className="duration-250 group relative overflow-hidden !rounded-md border-0 bg-transparent px-3 py-2.5 text-sm font-medium transition-all before:hidden after:hidden hover:text-[#4a8a8a] focus:outline-none focus:ring-2 focus:ring-[#63B7B7]/20 focus-visible:ring-offset-2 data-[state=active]:bg-transparent data-[state=inactive]:text-[#63B7B7] data-[state=active]:shadow-none"
      style={{ backgroundColor: 'transparent' }}
    >
      {activeTab === id && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 rounded-md bg-[#63B7B7]"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            mass: 1,
          }}
          style={{ zIndex: 0 }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center space-x-1.5">
        <motion.span
          animate={{
            color: activeTab === id ? '#ffffff' : '#63B7B7',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
        <AnimatePresence mode="wait">
          {count !== undefined && count > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.15,
                delay: activeTab === id ? 0.05 : 0,
              }}
              className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${activeTab === id ? 'bg-white text-[#63B7B7]' : 'bg-[#63B7B7]/10 text-[#63B7B7]'} transition-colors duration-200`}
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </TabsTrigger>
  )
}

export const AnimatedTabs = ({
  tabs,
  activeTab,
  onTabChange,
  children,
  className = '',
}: AnimatedTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex h-full flex-col ${className}`}
    >
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="flex h-full w-full flex-col"
      >
        <div className="py-4">
          <TabsList
            className={`grid h-auto w-full grid-cols-${tabs.length} gap-1.5 !rounded-lg bg-[#e6f3f3] p-1.5 shadow-sm [&>*]:border-none`}
          >
            {tabs.map((tab) => (
              <AnimatedTabItem
                key={tab.id}
                id={tab.id}
                label={tab.label}
                count={tab.count}
                activeTab={activeTab}
              />
            ))}
          </TabsList>
        </div>
        {children}
      </Tabs>
    </motion.div>
  )
}

export default AnimatedTabs
