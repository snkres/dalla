import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  DollarSign,
  Award,
  Briefcase,
  Clock,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react'
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
import { fadeIn } from '@components/aniamtion/animate'
import { StepTwoProps } from '@lib/types/steps'

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
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                onClick={() => setBidType('fixed')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${bidType === 'fixed' ? 'border-[#63B7B7]/30 bg-[#63B7B7]/10 shadow-md' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-start">
                  <div
                    className={`mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${bidType === 'fixed' ? 'bg-[#63B7B7]' : 'border-2 border-gray-300'}`}
                  >
                    {bidType === 'fixed' && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="flex items-center text-sm font-medium">
                      <Briefcase className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      Fixed Price
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Charge a single amount for the entire project
                    </p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setBidType('milestone')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${bidType === 'milestone' ? 'border-[#63B7B7]/30 bg-[#63B7B7]/10 shadow-md' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-start">
                  <div
                    className={`mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${bidType === 'milestone' ? 'bg-[#63B7B7]' : 'border-2 border-gray-300'}`}
                  >
                    {bidType === 'milestone' && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="flex items-center text-sm font-medium">
                      <Award className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      Milestone Based
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Break the project into billable phases
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="overflow-visible"
            style={{ minHeight: bidType === 'milestone' ? '400px' : 'auto' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {bidType === 'fixed' ? (
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
                        <DollarSign className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        Set Your Price
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-1 font-medium text-[#63B7B7]">
                            $
                          </span>
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
                            <span className="font-medium text-[#63B7B7]">
                              ${youllReceive.toFixed(2)}
                            </span>
                            <span className="ml-1 text-xs text-gray-500">
                              (-${serviceFee.toFixed(2)} fee)
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
                          <span>$100</span>
                          <span>$2,000</span>
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
                      <Select
                        value={estimatedDuration}
                        onValueChange={setEstimatedDuration}
                      >
                        <SelectTrigger className="w-full rounded-lg border border-gray-200 bg-[#BEDDF1]/5 p-2.5 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#63B7B7]">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Less than 1 week">
                            Less than 1 week
                          </SelectItem>
                          <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2-3 weeks">2-3 weeks</SelectItem>
                          <SelectItem value="1-2 months">1-2 months</SelectItem>
                          <SelectItem value="3+ months">3+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(project.meta.budget || project.meta.timeline) && (
                    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-md">
                      <div className="mb-2 flex items-center text-sm text-gray-700">
                        <AlertCircle className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        Client Expectations
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {project.meta.budget && (
                          <div className="flex items-center rounded-lg border border-gray-100 bg-white p-3">
                            <DollarSign className="mr-2 h-4 w-4 text-[#63B7B7]" />
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
                        {project.meta.timeline && (
                          <div className="flex items-center rounded-lg border border-gray-100 bg-white p-3">
                            <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                            <div>
                              <span className="block text-xs text-gray-500">
                                Timeline
                              </span>
                              <span className="text-sm font-medium">
                                {project.meta.timeline}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="milestone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="flex items-center justify-between border-b border-gray-100 p-4">
                      <h4 className="flex items-center text-sm font-medium">
                        <Award className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        Project Milestones
                      </h4>
                      <div className="rounded-full bg-[#63B7B7]/10 px-3 py-1">
                        <span className="text-xs font-medium text-[#63B7B7]">
                          Total: ${totalMilestonesAmount}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 max-h-[350px] space-y-4 overflow-y-auto pb-2">
                        {milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-100 shadow-sm"
                          >
                            <div className="flex items-center justify-between border-b border-gray-100 bg-[#BEDDF1]/5 p-3">
                              <span className="text-xs font-medium text-gray-700">
                                Milestone {index + 1}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                onClick={() => handleRemoveMilestone(index)}
                                disabled={milestones.length <= 1}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div className="md:col-span-2">
                                  <Label
                                    htmlFor={`milestone-${index}`}
                                    className="mb-1.5 block text-xs text-gray-500"
                                  >
                                    Description
                                  </Label>
                                  <Input
                                    id={`milestone-${index}`}
                                    value={milestone.name}
                                    onChange={(e) =>
                                      updateMilestone(
                                        index,
                                        'name',
                                        e.target.value,
                                      )
                                    }
                                    className="border-gray-100 bg-gray-50 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                                    placeholder="What will you deliver?"
                                  />
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`milestone-price-${index}`}
                                    className="mb-1.5 block text-xs text-gray-500"
                                  >
                                    Amount
                                  </Label>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#63B7B7]" />
                                    <Input
                                      id={`milestone-price-${index}`}
                                      type="number"
                                      value={milestone.price}
                                      onChange={(e) =>
                                        updateMilestone(
                                          index,
                                          'price',
                                          parseInt(e.target.value) || 0,
                                        )
                                      }
                                      className="border-gray-100 bg-gray-50 pl-10 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor={`milestone-duration-${index}`}
                                    className="mb-1.5 flex items-center text-xs text-gray-500"
                                  >
                                    <Clock className="mr-1 h-3.5 w-3.5 text-[#63B7B7]" />
                                    Duration
                                  </Label>
                                  <Input
                                    id={`milestone-duration-${index}`}
                                    value={milestone.duration}
                                    onChange={(e) =>
                                      updateMilestone(
                                        index,
                                        'duration',
                                        e.target.value,
                                      )
                                    }
                                    className="border-gray-100 bg-gray-50 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                                    placeholder="e.g., 1 week"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="flex w-full items-center justify-center rounded-xl border border-dashed border-[#63B7B7]/40 bg-white py-3 font-medium text-[#63B7B7] transition-colors hover:bg-[#63B7B7]/5 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleAddMilestone}
                        disabled={milestones.length >= 5}
                      >
                        <span className="mr-1 text-xl leading-none">+</span> Add
                        milestone
                      </button>
                    </div>
                  </div>
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center text-sm font-medium">
                        <DollarSign className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        Payment Summary
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Project total
                          </span>
                          <span className="text-sm font-medium">
                            ${totalMilestonesAmount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Service fee (10%)
                          </span>
                          <span className="text-gray-700">
                            -${(totalMilestonesAmount * 0.1).toFixed(2)}
                          </span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              You&apos;ll receive
                            </span>
                            <span className="text-base font-semibold text-[#63B7B7]">
                              ${(totalMilestonesAmount * 0.9).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
