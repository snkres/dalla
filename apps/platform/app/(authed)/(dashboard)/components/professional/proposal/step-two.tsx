'use client'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import {
  Award,
  Briefcase,
  Clock,
  Trash2,
  Check,
  AlertCircle,
  Plus,
} from 'lucide-react'
import { Riyal } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { Label } from '@dalla/design-system'
import { Slider } from '@dalla/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { fadeIn, translateDuration } from '@dalla/utils'
import type { StepTwoProps } from '@lib/types/steps'
import { formatCurrency } from '@lib/utils/format-currency'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

export function StepTwo({
  bidType,
  setBidType,
  bidAmount,
  handleBidChange,
  estimatedDuration,
  setEstimatedDuration,
  durationValue,
  setDurationValue,
  durationUnit,
  setDurationUnit,
  milestones,
  handleAddMilestone,
  handleRemoveMilestone,
  updateMilestone,
  serviceFee,
  youllReceive,
  totalMilestonesAmount,
  project,
  setMilestones,
}: StepTwoProps) {
  const translations = useTranslation()
  const t = translations.dashboard.applyProposal
  const { locale } = useLocale()

  // Update estimatedDuration when durationValue or durationUnit changes
  useEffect(() => {
    if (bidType === 'fixed') {
      setEstimatedDuration(`${durationValue} ${durationUnit}`)
    }
  }, [bidType, durationValue, durationUnit, setEstimatedDuration])

  return (
    <motion.div {...fadeIn} className="mx-auto h-full max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <h3 className="mb-6 flex items-center gap-1 text-lg font-semibold text-gray-800">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7] text-sm text-white">
              2
            </span>
            {t.step2Title || 'Pricing Details'}
          </h3>

          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                onClick={() => setBidType('fixed')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  bidType === 'fixed'
                    ? 'border-[#63B7B7]/30 bg-[#63B7B7]/10 shadow-md'
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                      bidType === 'fixed'
                        ? 'bg-[#63B7B7]'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {bidType === 'fixed' && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="flex items-center text-sm font-medium">
                      <Briefcase className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      {t.statusBidTypeFixed || 'Fixed Price'}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {t.fixedPriceDescription ||
                        'Charge a single amount for the entire project'}
                    </p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setBidType('milestone')}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  bidType === 'milestone'
                    ? 'border-[#63B7B7]/30 bg-[#63B7B7]/10 shadow-md'
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                      bidType === 'milestone'
                        ? 'bg-[#63B7B7]'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {bidType === 'milestone' && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="flex items-center text-sm font-medium">
                      <Award className="mr-2 h-4 w-4 text-[#63B7B7]" />
                      {t.statusBidTypeMilestone || 'Milestone Based'}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {t.milestonePriceDescription ||
                        'Break the project into billable phases'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full overflow-y-scroll">
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
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.setPriceTitle || 'Set Your Price'}
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <Label
                          htmlFor="bid-amount"
                          className="mb-1.5 block text-xs text-gray-500"
                        >
                          {t.bidAmountLabel || 'Price'}
                        </Label>
                        <div className="relative">
                          <Riyal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#63B7B7]" />
                          <Input
                            id="bid-amount"
                            type="number"
                            value={bidAmount}
                            onChange={(e) =>
                              handleBidChange(
                                Number.parseInt(e.target.value) || 0,
                              )
                            }
                            className="border-gray-200 bg-[#BEDDF1]/5 pl-10 text-sm transition-all focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                          />
                        </div>
                      </div>
                      <div className="rounded-lg border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {t.serviceFeeLabel || 'Service fee (10%)'}
                          </span>
                          <span className="text-sm text-gray-700">
                            {formatCurrency(serviceFee, 'h-3 w-3 mr-0.5')}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {t.youllReceiveLabel || "You'll receive"}
                          </span>
                          <span className="text-base font-semibold text-[#63B7B7]">
                            {formatCurrency(youllReceive, 'h-3 w-3 mr-0.5')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.timelineTitle || 'Timeline'}
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-1/2">
                          <Input
                            type="number"
                            min={1}
                            value={durationValue}
                            onChange={(e) =>
                              setDurationValue(parseInt(e.target.value) || 1)
                            }
                            className="border-gray-200 bg-[#BEDDF1]/5 text-sm transition-all focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                          />
                        </div>
                        <Select
                          value={durationUnit}
                          onValueChange={(value: 'days' | 'weeks' | 'months') =>
                            setDurationUnit(value)
                          }
                        >
                          <SelectTrigger className="!h-10 border-gray-200 bg-[#BEDDF1]/5 text-sm transition-all focus:border-[#63B7B7] focus:ring-[#63B7B7]/20">
                            <SelectValue />
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
                        {t.milestoneTitle || 'Milestones'}
                      </h4>
                      <div className="rounded-full bg-[#63B7B7]/10 px-3 py-1">
                        <span className="text-xs font-medium text-[#63B7B7]">
                          {t.totalLabel || 'Total'}:{' '}
                          {formatCurrency(
                            totalMilestonesAmount,
                            'h-2.5 w-2.5 mr-0.5',
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 space-y-6 overflow-y-auto pb-2">
                        <div className="relative">
                          {/* Visual timeline connector */}
                          <div className="absolute left-[22px] top-0 h-full w-0.5 bg-[#63B7B7]/20"></div>

                          {milestones.map((milestone, index) => (
                            <div
                              key={index}
                              className="relative mb-6 last:mb-0"
                            >
                              {/* Timeline node */}
                              <div className="absolute left-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#63B7B7] bg-white text-sm font-medium text-[#63B7B7]">
                                {index + 1}
                              </div>

                              <div className="ml-16 overflow-hidden rounded-xl border border-gray-100 transition-all duration-200 hover:border-[#63B7B7]/30 hover:shadow-md">
                                <div className="flex items-center justify-between border-b border-gray-100 bg-[#BEDDF1]/5 p-3">
                                  <span className="text-xs font-medium text-gray-700">
                                    {t.milestoneLabel || 'Milestone'}{' '}
                                    {index + 1}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-[#63B7B7]/10 px-2 py-0.5">
                                      <span className="text-xs font-medium text-[#63B7B7]">
                                        {formatCurrency(
                                          milestone.price,
                                          'h-2.5 w-2.5 mr-0.5',
                                        )}
                                      </span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                      onClick={() =>
                                        handleRemoveMilestone(index)
                                      }
                                      disabled={milestones.length <= 1}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                    <div className="md:col-span-6">
                                      <Label
                                        htmlFor={`milestone-${index}`}
                                        className="mb-1.5 block text-xs text-gray-500"
                                      >
                                        {t.milestoneDescriptionLabel ||
                                          'Description'}
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
                                        placeholder={
                                          t.milestoneDescriptionPlaceholder ||
                                          'What will you deliver?'
                                        }
                                      />
                                    </div>
                                    <div className="md:col-span-3">
                                      <Label
                                        htmlFor={`milestone-price-${index}`}
                                        className="mb-1.5 block text-xs text-gray-500"
                                      >
                                        {t.milestoneAmountLabel || 'Amount'}
                                      </Label>
                                      <div className="relative">
                                        <Riyal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#63B7B7]" />
                                        <Input
                                          id={`milestone-price-${index}`}
                                          type="number"
                                          value={milestone.price}
                                          onChange={(e) =>
                                            updateMilestone(
                                              index,
                                              'price',
                                              Number.parseInt(e.target.value) ||
                                                0,
                                            )
                                          }
                                          className="border-gray-100 bg-gray-50 pl-10 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                                        />
                                      </div>
                                    </div>
                                    <div className="md:col-span-3">
                                      <Label
                                        htmlFor={`milestone-duration-${index}`}
                                        className="mb-1.5 flex items-center text-xs text-gray-500"
                                      >
                                        <Clock className="mr-1 h-3.5 w-3.5 text-[#63B7B7]" />
                                        {t.durationLabel || 'Duration'}
                                      </Label>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-full">
                                          <Input
                                            type="number"
                                            min={1}
                                            value={milestone.durationValue || 1}
                                            onChange={(e) => {
                                              updateMilestone(
                                                index,
                                                'durationValue',
                                                parseInt(e.target.value) || 1,
                                              )
                                              updateMilestone(
                                                index,
                                                'duration',
                                                `${parseInt(e.target.value) || 1} ${milestone.durationUnit || 'weeks'}`,
                                              )
                                            }}
                                            className="border-gray-100 bg-gray-50 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20"
                                          />
                                        </div>
                                        <Select
                                          value={
                                            milestone.durationUnit || 'weeks'
                                          }
                                          onValueChange={(
                                            value: 'days' | 'weeks' | 'months',
                                          ) => {
                                            updateMilestone(
                                              index,
                                              'durationUnit',
                                              value,
                                            )
                                            updateMilestone(
                                              index,
                                              'duration',
                                              `${milestone.durationValue || 1} ${value}`,
                                            )
                                          }}
                                        >
                                          <SelectTrigger className="w-full border-gray-100 bg-gray-50 text-sm transition-colors focus:border-[#63B7B7] focus:ring-[#63B7B7]/20">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="days">
                                              Days
                                            </SelectItem>
                                            <SelectItem value="weeks">
                                              Weeks
                                            </SelectItem>
                                            <SelectItem value="months">
                                              Months
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        className="group flex w-full items-center justify-center rounded-xl border border-dashed border-[#63B7B7]/40 bg-white py-3 font-medium text-[#63B7B7] transition-colors hover:bg-[#63B7B7]/5 disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleAddMilestone}
                        disabled={milestones.length >= 5}
                      >
                        <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                        {t.addMilestoneButton || 'Add milestone'}
                      </button>
                    </div>
                  </div>

                  {/* Add a new milestone distribution visualization */}
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.paymentSummaryTitle || 'Payment Distribution'}
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex h-8 w-full overflow-hidden rounded-full">
                          {milestones.map((milestone, index) => {
                            const percentage =
                              (milestone.price / totalMilestonesAmount) * 100
                            return (
                              <div
                                key={index}
                                className="group relative flex items-center justify-center transition-all duration-300 hover:brightness-90"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: `hsl(180, 35%, ${60 - index * 5}%)`,
                                }}
                              >
                                <span className="absolute -bottom-8 left-1/2 z-10 hidden -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                                  {milestone.name}:{' '}
                                  {formatCurrency(
                                    milestone.price,
                                    'h-2.5 w-2.5 mr-0.5',
                                  )}{' '}
                                  ({Math.round(percentage)}%)
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="mt-10 flex justify-between text-xs text-gray-500">
                          <span>Start</span>
                          <span>Completion</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {t.projectTotalLabel || 'Project total'}
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(
                              totalMilestonesAmount,
                              'h-3 w-3 mr-0.5',
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {t.serviceFeeLabel || 'Service fee (10%)'}
                          </span>
                          <span className="text-gray-700">
                            -
                            {formatCurrency(
                              totalMilestonesAmount * 0.1,
                              'h-3 w-3 mr-0.5',
                            )}
                          </span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {t.youllReceiveLabel || "You'll receive"}
                            </span>
                            <span className="text-base font-semibold text-[#63B7B7]">
                              {formatCurrency(
                                totalMilestonesAmount * 0.9,
                                'h-3 w-3 mr-0.5',
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add milestone tips */}
                  <div className="mb-6 overflow-hidden rounded-xl border border-[#63B7B7]/20 bg-[#63B7B7]/5 p-4">
                    <h4 className="mb-2 flex items-center text-sm font-medium text-[#63B7B7]">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      {t.milestoneTipsTitle || 'Tips for Effective Milestones'}
                    </h4>
                    <ul className="ml-6 list-disc space-y-1 text-xs text-gray-600">
                      <li>
                        {t.milestoneTip1 ||
                          'Break down the project into clear, measurable deliverables'}
                      </li>
                      <li>
                        {t.milestoneTip2 ||
                          'Set realistic timeframes for each milestone'}
                      </li>
                      <li>
                        {t.milestoneTip3 ||
                          'Distribute payments to match the effort required for each phase'}
                      </li>
                      <li>
                        {t.milestoneTip4 ||
                          'Include a final milestone for project completion and handover'}
                      </li>
                    </ul>
                  </div>
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Briefcase className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.milestoneTemplatesTitle || 'Milestone Templates'}
                      </h4>
                    </div>
                  </div>
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Check className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.milestoneValidationTitle || 'Milestone Validation'}
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        {milestones.every((m) => m.name.trim().length > 0) ? (
                          <div className="flex items-center text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.allMilestonesNamed ||
                                'All milestones have descriptions'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.someMilestonesUnnamed ||
                                'Some milestones need descriptions'}
                            </span>
                          </div>
                        )}

                        {milestones.every((m) => m.price > 0) ? (
                          <div className="flex items-center text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.allMilestonesPriced ||
                                'All milestones have prices'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.someMilestonesUnpriced ||
                                'Some milestones need prices'}
                            </span>
                          </div>
                        )}

                        {milestones.every(
                          (m) => m.duration.trim().length > 0,
                        ) ? (
                          <div className="flex items-center text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.allMilestonesDuration ||
                                'All milestones have durations'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.someMilestonesNoDuration ||
                                'Some milestones need durations'}
                            </span>
                          </div>
                        )}

                        {Math.abs(totalMilestonesAmount - bidAmount) < 1 ? (
                          <div className="flex items-center text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.milestonesTotalMatches ||
                                'Milestone total matches your bid amount'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span className="text-xs">
                              {t.milestonesTotalMismatch ||
                                'Milestone total differs from your bid amount'}
                              (
                              {formatCurrency(
                                totalMilestonesAmount,
                                'h-2.5 w-2.5 mr-0.5',
                              )}{' '}
                              vs{' '}
                              {formatCurrency(bidAmount, 'h-2.5 w-2.5 mr-0.5')})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 overflow-hidden rounded-xl bg-white shadow-md">
                    <div className="border-b border-gray-100 p-4">
                      <h4 className="flex items-center gap-1 text-sm font-medium">
                        <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                        {t.paymentSummaryTitle || 'Payment Summary'}
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {t.projectTotalLabel || 'Project total'}
                          </span>
                          <span className="text-sm font-medium">
                            {formatCurrency(
                              totalMilestonesAmount,
                              'h-3 w-3 mr-0.5',
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {t.serviceFeeLabel || 'Service fee (10%)'}
                          </span>
                          <span className="text-gray-700">
                            -
                            {formatCurrency(
                              totalMilestonesAmount * 0.1,
                              'h-3 w-3 mr-0.5',
                            )}
                          </span>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {t.youllReceiveLabel || "You'll receive"}
                            </span>
                            <span className="text-base font-semibold text-[#63B7B7]">
                              {formatCurrency(
                                totalMilestonesAmount * 0.9,
                                'h-3 w-3 mr-0.5',
                              )}
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

          {(project.meta.budget || project.meta.duration) && (
            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4 shadow-md">
              <div className="mb-2 flex items-center gap-1 text-sm text-gray-700">
                <AlertCircle className="mr-2 h-4 w-4 text-[#63B7B7]" />
                {t.clientExpectationsTitle || 'Client Expectations'}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.meta.budget && (
                  <div className="flex items-center gap-1 rounded-lg border border-gray-100 bg-white p-3">
                    <Riyal className="mr-2 h-4 w-4 text-[#63B7B7]" />
                    <div>
                      <span className="block text-xs text-gray-500">
                        {t.clientBudgetLabel || 'Budget'}
                      </span>
                      <span className="text-sm font-medium">
                        {project.meta.budget}
                      </span>
                    </div>
                  </div>
                )}
                {project.meta.duration && (
                  <div className="flex items-center gap-1 rounded-lg border border-gray-100 bg-white p-3">
                    <Clock className="mr-2 h-4 w-4 text-[#63B7B7]" />
                    <div>
                      <span className="block text-xs text-gray-500">
                        {t.clientTimelineLabel || 'Timeline'}
                      </span>
                      <span className="text-sm font-medium">
                        {translateDuration(project.meta.duration, locale)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
