'use client'

import { useState } from 'react'
import { Button } from '@dallah/design-system'
import { Checkbox } from '@dallah/design-system'
import {
  Filter,
  DollarSign,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { SkillSelector } from '@components/shared/skill-selector'

interface ProjectFiltersProps {
  skillFilter: string
  setSkillFilter: (value: string) => void
  budgetFilter: string
  setBudgetFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  clearAllFilters: () => void
}

export function ProjectFilters({
  skillFilter,
  setSkillFilter,
  budgetFilter,
  setBudgetFilter,
  statusFilter,
  setStatusFilter,
  clearAllFilters,
}: ProjectFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    budget: true,
    status: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleSkillChange = (skills: string[]) => {
    setSkillFilter(skills.join(','))
  }

  const hasActiveFilters = skillFilter || budgetFilter || statusFilter

  return (
    <div className="sticky top-6">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-[#63B7B7] px-1.5 py-0.5 text-xs text-white">
              !
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-sm text-[#63B7B7]"
          >
            Clear All
          </Button>
        )}
      </div>

      <div
        className={`space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:block ${
          showMobileFilters ? 'block' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="hidden text-sm text-[#63B7B7] lg:block"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Skills filter */}
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => toggleSection('skills')}
            className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-900"
          >
            Skills
            {expandedSections.skills ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {expandedSections.skills && (
            <div className="space-y-3">
              <SkillSelector
                skills={skillFilter ? skillFilter.split(',') : []}
                onSkillsChange={(s) => setSkillFilter(s.join(','))}
              />
            </div>
          )}
        </div>

        {/* Budget filter */}
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => toggleSection('budget')}
            className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-900"
          >
            Budget
            {expandedSections.budget ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {expandedSections.budget && (
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox
                  id="budget-1"
                  checked={budgetFilter === 'less-1000'}
                  onCheckedChange={() =>
                    setBudgetFilter(
                      budgetFilter === 'less-1000' ? '' : 'less-1000',
                    )
                  }
                />
                <label
                  htmlFor="budget-1"
                  className="ml-2 text-sm text-gray-600"
                >
                  Less than $1,000
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="budget-2"
                  checked={budgetFilter === '1000-3000'}
                  onCheckedChange={() =>
                    setBudgetFilter(
                      budgetFilter === '1000-3000' ? '' : '1000-3000',
                    )
                  }
                />
                <label
                  htmlFor="budget-2"
                  className="ml-2 text-sm text-gray-600"
                >
                  $1,000 - $3,000
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="budget-3"
                  checked={budgetFilter === '3000-5000'}
                  onCheckedChange={() =>
                    setBudgetFilter(
                      budgetFilter === '3000-5000' ? '' : '3000-5000',
                    )
                  }
                />
                <label
                  htmlFor="budget-3"
                  className="ml-2 text-sm text-gray-600"
                >
                  $3,000 - $5,000
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="budget-4"
                  checked={budgetFilter === 'more-5000'}
                  onCheckedChange={() =>
                    setBudgetFilter(
                      budgetFilter === 'more-5000' ? '' : 'more-5000',
                    )
                  }
                />
                <label
                  htmlFor="budget-4"
                  className="ml-2 text-sm text-gray-600"
                >
                  More than $5,000
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Status filter */}
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => toggleSection('status')}
            className="mb-3 flex w-full items-center justify-between text-left text-sm font-medium text-gray-900"
          >
            Status
            {expandedSections.status ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {expandedSections.status && (
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox
                  id="status-1"
                  checked={statusFilter === 'open'}
                  onCheckedChange={() =>
                    setStatusFilter(statusFilter === 'open' ? '' : 'open')
                  }
                />
                <label
                  htmlFor="status-1"
                  className="ml-2 text-sm text-gray-600"
                >
                  Open for proposals
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="status-2"
                  checked={statusFilter === 'ongoing'}
                  onCheckedChange={() =>
                    setStatusFilter(statusFilter === 'ongoing' ? '' : 'ongoing')
                  }
                />
                <label
                  htmlFor="status-2"
                  className="ml-2 text-sm text-gray-600"
                >
                  Ongoing
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="status-3"
                  checked={statusFilter === 'completed'}
                  onCheckedChange={() =>
                    setStatusFilter(
                      statusFilter === 'completed' ? '' : 'completed',
                    )
                  }
                />
                <label
                  htmlFor="status-3"
                  className="ml-2 text-sm text-gray-600"
                >
                  Completed
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
