import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Award,
  Briefcase,
  Clock,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Riyal } from '@dallah/design-system'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Label } from '@dallah/design-system'
import { Slider } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { fadeIn } from '@dallah/utils'
import { StepTwoProps } from '@lib/types/steps'
import { formatCurrency } from '@lib/utils/format-currency'

export function StepTwo({
  bidType,
  setBidType,
  bidAmount,
  handleBidChange,
  estimatedDuration,
  setEstimatedDuration,
  milestones,
  handleAddMilestone,
  handleRemoveMilestone,
  updateMilestone,
  serviceFee,
  youllReceive,
  totalMilestonesAmount,
  project,
}: StepTwoProps) {
  return (
    <motion.div {...fadeIn} className="mx-auto max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7] text-sm text-white">
              2
            </span>
            Pricing Details
          </h3>

          <div
            className="overflow-visible"
            style={{ minHeight: bidType === 'milestone' ? '400px' : 'auto' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key="fixed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                  <div className="border-b border-gray-100 p-4">
                    <h4 className="flex items-center text-sm font-medium">
                      <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      Set Your Price
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Riyal className="mr-1 h-4 w-4 text-[#63B7B7]" />
                        <Input
                          id="bid-amount"
                          type="number"
                          value={bidAmount}
                          onChange={(e) =>
                            handleBidChange(parseInt(e.target.value) || 0)
                          }
                          className="h-auto w-20 border-0 bg-transparent p-0 text-lg font-semibold focus:ring-0"
                          style={{ caretColor: '#63B7B7' }}
                        />
                      </div>
                      <div className="rounded-lg border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-2">
                        <div className="text-xs">
                          <span className="text-gray-600">
                            You&apos;ll receive:{' '}
                          </span>
                          {formatCurrency(youllReceive, 'h-3 w-3 mr-0.5')}
                          <span className="ml-1 inline-flex items-center text-xs text-gray-500">
                            ({formatCurrency(serviceFee, 'h-2.5 w-2.5 mr-0.5')})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Slider
                        value={[bidAmount]}
                        min={100}
                        max={2000}
                        step={50}
                        onValueChange={(value) => handleBidChange(value[0])}
                        className="w-full bg-[#63B7B7]/10"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>﷼100</span>
                        <span>﷼2,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                  <div className="border-b border-gray-100 p-4">
                    <h4 className="flex items-center text-sm font-medium">
                      <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      Timeline
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2">
                      <div className="relative w-1/3">
                        <Input
                          id="timeline-value"
                          placeholder="e.g. 3"
                          value={estimatedDuration.split(' ')[0] || '1'}
                          onChange={(e) => {
                            const value = e.target.value
                            const unit =
                              estimatedDuration.split(' ').slice(1).join(' ') ||
                              'months'
                            setEstimatedDuration(`${value} ${unit}`)
                          }}
                          className="w-full"
                          type="number"
                          min="1"
                        />
                      </div>
                      <div className="w-2/3">
                        <Select
                          value={
                            estimatedDuration.split(' ').slice(1).join(' ') ||
                            'months'
                          }
                          onValueChange={(unit) => {
                            const value = estimatedDuration.split(' ')[0] || '1'
                            setEstimatedDuration(`${value} ${unit}`)
                          }}
                        >
                          <SelectTrigger className="!h-10 w-full">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                {(project.meta.budget || project.meta.duration) && (
                  <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-md">
                    <div className="mb-2 flex items-center text-sm text-gray-700">
                      <AlertCircle className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      Client Expectations
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {project.meta.budget && (
                        <div className="flex items-center rounded-lg border border-gray-100 bg-white p-3">
                          <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Budget
                            </span>
                            <span className="text-sm font-medium">
                              {project.meta.budget}
                            </span>
                          </div>
                        </div>
                      )}
                      {project.meta.duration && (
                        <div className="flex items-center rounded-lg border border-gray-100 bg-white p-3">
                          <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                          <div>
                            <span className="block text-xs text-gray-500">
                              Timeline
                            </span>
                            <span className="text-sm font-medium">
                              {project.meta.duration}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
