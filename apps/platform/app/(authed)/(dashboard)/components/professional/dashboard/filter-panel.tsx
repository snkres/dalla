import React from 'react'
import { motion } from 'motion/react'
import { DollarSign, X, Clock, MapPin, Code } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Slider } from '@dallah/design-system'
import { Checkbox } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { FilterPanelProps } from '@lib/types/search'

const PANEL_ANIMATION = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
}

export function FilterPanel({
  filterPanelRef,
  setShowFilterPanel,
  handleResetFilters,
  selectedBudgetRange,
  setSelectedBudgetRange,
  budgetRanges,
  selectedDurations,
  setSelectedDurations,
  durationOptions,
  selectedLocations,
  setSelectedLocations,
  locationOptions,
  selectedSkills,
  setSelectedSkills,
  allSkills,
}: FilterPanelProps) {
  const handleDurationChange = (value: string) => {
    setSelectedDurations(
      selectedDurations.includes(value)
        ? selectedDurations.filter((item) => item !== value)
        : [...selectedDurations, value],
    )
  }

  const handleLocationChange = (value: string) => {
    setSelectedLocations(
      selectedLocations.includes(value)
        ? selectedLocations.filter((item) => item !== value)
        : [...selectedLocations, value],
    )
  }

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((item) => item !== skill)
        : [...selectedSkills, skill],
    )
  }

  return (
    <motion.div
      ref={filterPanelRef}
      {...PANEL_ANIMATION}
      className="absolute right-0 top-full z-20 mt-2 w-[450px] rounded-xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h3 className="font-medium text-gray-800">Advanced Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 transition-colors duration-200 hover:bg-[#BEDDF1]/10"
          onClick={() => setShowFilterPanel(false)}
          aria-label="Close filter panel"
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      <div className="max-h-[500px] overflow-y-auto p-4">
        <FilterSection
          title="Budget Range"
          icon={<DollarSign className="mr-1.5 h-4 w-4 text-[#63B7B7]" />}
        >
          <div className="px-2">
            <Slider
              defaultValue={[0, 100000]}
              max={100000}
              step={5000}
              value={selectedBudgetRange}
              onValueChange={(value) =>
                setSelectedBudgetRange(value as [number, number])
              }
              className="mb-2"
            />
            <div className="mt-3 flex justify-between">
              <div className="rounded bg-[#BEDDF1]/20 px-2 py-1 text-xs text-[#63B7B7]">
                ${selectedBudgetRange[0].toLocaleString()}
              </div>
              <div className="rounded bg-[#BEDDF1]/20 px-2 py-1 text-xs text-[#63B7B7]">
                ${selectedBudgetRange[1].toLocaleString()}+
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {budgetRanges.map((range, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className={cn(
                  'rounded-full text-xs font-normal',
                  selectedBudgetRange[0] === range.value[0] &&
                    selectedBudgetRange[1] === range.value[1]
                    ? 'border-[#63B7B7]/30 bg-[#BEDDF1]/20 text-[#63B7B7]'
                    : 'bg-white text-gray-700 hover:border-[#63B7B7]/20 hover:bg-[#BEDDF1]/10',
                )}
                onClick={() => setSelectedBudgetRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Project Duration"
          icon={<Clock className="mr-1.5 h-4 w-4 text-[#63B7B7]" />}
        >
          <div className="space-y-3">
            {durationOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`duration-${option.value}`}
                className="group flex cursor-pointer items-center space-x-3"
              >
                <Checkbox
                  id={`duration-${option.value}`}
                  checked={selectedDurations.includes(option.value)}
                  onCheckedChange={() => handleDurationChange(option.value)}
                  className="data-[state=checked]:border-[#63B7B7] data-[state=checked]:bg-[#63B7B7]"
                />
                <span className="text-sm font-normal text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Project Location"
          icon={<MapPin className="mr-1.5 h-4 w-4 text-[#63B7B7]" />}
        >
          <div className="space-y-3">
            {locationOptions.map((option) => (
              <label
                key={option.value}
                htmlFor={`location-${option.value}`}
                className="group flex cursor-pointer items-center space-x-3"
              >
                <Checkbox
                  id={`location-${option.value}`}
                  checked={selectedLocations.includes(option.value)}
                  onCheckedChange={() => handleLocationChange(option.value)}
                  className="data-[state=checked]:border-[#63B7B7] data-[state=checked]:bg-[#63B7B7]"
                />
                <span className="text-sm font-normal text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Required Skills"
          icon={<Code className="mr-1.5 h-4 w-4 text-[#63B7B7]" />}
          className="mb-4"
        >
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className={cn(
                  'rounded-full text-xs font-normal',
                  selectedSkills.includes(skill)
                    ? 'border-[#63B7B7]/30 bg-[#BEDDF1]/20 text-[#63B7B7]'
                    : 'bg-white text-gray-700 hover:border-[#63B7B7]/20 hover:bg-[#BEDDF1]/10',
                )}
                onClick={() => handleSkillChange(skill)}
              >
                {skill}
              </Button>
            ))}
          </div>
        </FilterSection>

        <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="border-gray-200 font-normal text-gray-600 hover:bg-gray-50"
          >
            Reset All
          </Button>
          <Button
            size="sm"
            onClick={() => setShowFilterPanel(false)}
            className="bg-[#63B7B7] font-normal transition-colors duration-200 hover:bg-[#63B7B7]/90"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

interface FilterSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}

function FilterSection({
  title,
  icon,
  children,
  className = 'mb-6',
}: FilterSectionProps) {
  return (
    <div className={className}>
      <h4 className="mb-3 flex items-center text-sm font-medium text-gray-800">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  )
}
