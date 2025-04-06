import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  HelpCircle,
  ChevronUp,
  ChevronDown,
  X,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { Label } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { StepOneProps } from '@lib/types/steps'
import { fadeIn } from '@dallah/utils'

export function StepOne({
  coverLetter,
  setCoverLetter,
  showCoverLetterTips,
  setShowCoverLetterTips,
  aiSuggestions,
  showAiSuggestions,
  setShowAiSuggestions,
  simulateAiSuggestions,
}: StepOneProps) {
  return (
    <motion.div {...fadeIn} className="mx-auto max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7] text-sm text-white">
              1
            </span>
            Introduce Yourself
          </h3>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Label
              htmlFor="cover-letter"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <span className="mr-2 rounded-full bg-[#63B7B7]/10 p-1.5">
                <span className="block h-3 w-3 rounded-full bg-[#63B7B7]"></span>
              </span>
              Explain why you&apos;re perfect for this project
            </Label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulateAiSuggestions}
              className="flex items-center rounded-lg border border-[#63B7B7]/20 bg-[#63B7B7]/5 px-3 py-1.5 text-xs font-medium text-[#63B7B7] transition-colors hover:bg-[#63B7B7]/10"
            >
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Get AI suggestions
            </motion.button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Dear client, I'm excited about your project because..."
              className="h-52 resize-none rounded-xl border-gray-100 bg-[#BEDDF1]/5 p-4 text-sm transition-colors hover:border-[#63B7B7]/30 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
            />
          </div>

          <AnimatePresence>
            {showAiSuggestions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="rounded-xl border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium text-[#63B7B7]">
                      <Sparkles className="mr-2 h-3.5 w-3.5" />
                      Suggested talking points
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-white hover:text-gray-600"
                      onClick={() => setShowAiSuggestions(false)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="cursor-pointer rounded-lg border border-[#63B7B7]/20 bg-white p-3 text-xs transition-colors hover:bg-[#63B7B7]/10"
                        onClick={() => {
                          const updatedText = coverLetter
                            ? `${coverLetter}\n\n${suggestion}`
                            : suggestion
                          setCoverLetter(updatedText)
                        }}
                      >
                        {suggestion}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <span
                className={cn(
                  'font-medium',
                  coverLetter.length > 300
                    ? 'text-green-600'
                    : coverLetter.length > 150
                      ? 'text-amber-600'
                      : 'text-gray-500',
                )}
              >
                {coverLetter.length} characters
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <button
                className="flex items-center text-[#63B7B7] transition-colors hover:text-[#63B7B7]/80"
                onClick={() => setShowCoverLetterTips(!showCoverLetterTips)}
              >
                <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
                <span>Writing tips</span>
                {showCoverLetterTips ? (
                  <ChevronUp className="ml-1.5 h-3 w-3" />
                ) : (
                  <ChevronDown className="ml-1.5 h-3 w-3" />
                )}
              </button>
            </div>
            <div className="flex items-center rounded-lg bg-gray-50 px-3 py-1.5">
              <CheckCircle
                className={cn(
                  'mr-1.5 h-3.5 w-3.5',
                  coverLetter.length > 150 ? 'text-green-600' : 'text-gray-300',
                )}
              />
              <span
                className={
                  coverLetter.length > 150 ? 'text-green-600' : 'text-gray-500'
                }
              >
                Recommended: 150+ characters
              </span>
            </div>
          </div>

          <AnimatePresence>
            {showCoverLetterTips && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="rounded-xl border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-4">
                  <h4 className="mb-3 flex items-center text-sm font-medium text-[#63B7B7]">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Tips for a successful proposal
                  </h4>
                  <div className="rounded-lg border border-gray-100 bg-white p-3">
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      {[
                        'Mention relevant experience with Hugo and Tailwind CSS',
                        "Reference similar projects you've completed successfully",
                        "Show understanding of the client's needs for inspiring single moms",
                        'Highlight your design skills and ability to create smooth transitions',
                        'Explain your process for creating filterable business idea cards',
                      ].map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                            <span className="block h-1.5 w-1.5 rounded-full bg-[#63B7B7]"></span>
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
