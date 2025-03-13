'use client'

import type React from 'react'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { SearchBar } from './search-bar'
import { ProjectCard } from './project/card'
import { ProjectDetail } from './project/detail'
import { ApplyProposal } from './proposal'
import { ProfileSidebar } from './sidebar'
import {
  filterCategories,
  budgetRanges,
  durationOptions,
  locationOptions,
} from '@lib/data/projects'
import { applyFilters } from '@lib/utils/filter-utils'
import { getAllSkills } from '@lib/utils/skill-utils'
import FilterChips from './filter-chips'
import { useQuery } from '@tanstack/react-query'
import { getAllProjects, type Project } from '@lib/api/pro/projects'

export function ProfessionalHome() {
  const { data } = useQuery({
    queryKey: ['all-projects'],
    queryFn: getAllProjects,
  })
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<Project[] | []>(
    data?.[0] || [],
  )
  const [showSearchHelp, setShowSearchHelp] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectDetail, setShowProjectDetail] = useState(false)
  const [showProjectApplication, setShowProjectApplication] = useState(false)
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<
    [number, number]
  >([0, 100000])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  // Store scroll position for restoration
  const [scrollPosition, setScrollPosition] = useState(0)

  const allSkills = getAllSkills(data?.[0] || [])

  useEffect(() => {
    const results = applyFilters(
      data?.[0] || [],
      activeFilter,
      searchQuery,
      showFilterPanel,
      selectedBudgetRange,
      selectedDurations,
      selectedLocations,
      selectedSkills,
    )
    setFilteredProjects(results)
  }, [
    activeFilter,
    searchQuery,
    showFilterPanel,
    selectedBudgetRange,
    selectedDurations,
    selectedLocations,
    selectedSkills,
    data,
  ])

  // Lock scroll when a modal is open
  useEffect(() => {
    if (showProjectDetail || showProjectApplication) {
      // Store current scroll position
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)

      // Store original body styles before modifying
      const originalOverflow = document.body.style.overflow
      const originalPosition = document.body.style.position
      const originalWidth = document.body.style.width
      const originalTop = document.body.style.top
      const originalHeight = document.body.style.height

      // Apply scroll locking
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${currentScrollY}px`
      document.body.style.height = '100%'

      return () => {
        // Only restore if no modals are open
        if (!showProjectDetail && !showProjectApplication) {
          // First restore original styles
          document.body.style.overflow = originalOverflow
          document.body.style.position = originalPosition
          document.body.style.width = originalWidth
          document.body.style.top = originalTop
          document.body.style.height = originalHeight

          // Then restore scroll position
          window.scrollTo(0, currentScrollY)
        }
      }
    }
  }, [showProjectDetail, showProjectApplication])

  const handleProjectClick = useCallback(
    (project: Project, e: React.MouseEvent) => {
      e.preventDefault()
      setSelectedProject(project)
      setShowProjectDetail(true)
      setShowProjectApplication(false)
    },
    [],
  )

  const handleApplyClick = useCallback(() => {
    setShowProjectDetail(false)
    setShowProjectApplication(true)
  }, [])

  const handleBackToDetails = useCallback(() => {
    setShowProjectApplication(false)
    setShowProjectDetail(true)
  }, [])

  const handleCloseAll = useCallback(() => {
    // Extract the scroll position from the body's top property
    const scrollY = document.body.style.top
      ? Number.parseInt(document.body.style.top.replace('px', '')) * -1
      : scrollPosition

    // Reset all body styles completely
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('height')

    // Close all modals
    setShowProjectDetail(false)
    setShowProjectApplication(false)
    setSelectedProject(null)

    // Force a small delay before restoring scroll
    setTimeout(() => {
      window.scrollTo(0, scrollY)
    }, 10)
  }, [scrollPosition])

  const handleResetFilters = useCallback(() => {
    setSelectedBudgetRange([0, 100000])
    setSelectedDurations([])
    setSelectedLocations([])
    setSelectedSkills([])
  }, [])

  const clearAllFilters = useCallback(() => {
    setActiveFilter('all')
    setSearchQuery('')
    handleResetFilters()
  }, [handleResetFilters])

  return (
    <div className="w-full py-6">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Available Projects
              </h1>
            </div>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilterPanel={showFilterPanel}
              setShowFilterPanel={setShowFilterPanel}
              showSearchHelp={showSearchHelp}
              setShowSearchHelp={setShowSearchHelp}
              selectedBudgetRange={selectedBudgetRange}
              setSelectedBudgetRange={setSelectedBudgetRange}
              selectedDurations={selectedDurations}
              setSelectedDurations={setSelectedDurations}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              handleResetFilters={handleResetFilters}
              budgetRanges={budgetRanges}
              durationOptions={durationOptions}
              locationOptions={locationOptions}
              allSkills={allSkills.map((skill) => skill.name)}
            />
            <FilterChips
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setShowSearchHelp={setShowSearchHelp}
              showSearchHelp={showSearchHelp}
              filterCategories={filterCategories}
            />
            <div className="mb-2 mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredProjects.length} projects
                {activeFilter !== 'all' &&
                  ` • Filtered by: ${filterCategories.find((f) => f.key === activeFilter)?.label}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
              </p>
              {(activeFilter !== 'all' ||
                searchQuery ||
                selectedBudgetRange[0] !== 0 ||
                selectedBudgetRange[1] !== 100000 ||
                selectedDurations.length > 0 ||
                selectedLocations.length > 0 ||
                selectedSkills.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-gray-500"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-gray-50 p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No projects found
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500">
                  We couldn&apos;t find any projects matching your search
                  criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="!bg-[#234d64] hover:!bg-[#234d64]/90"
                >
                  Clear Filters & Search
                </Button>
              </div>
            )}
          </div>
          <ProfileSidebar />
        </div>
      </div>

      <AnimatePresence>
        {showProjectDetail && selectedProject && (
          <ProjectDetail
            projectId={selectedProject.id}
            onClose={handleCloseAll}
            onApplyClick={handleApplyClick}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProjectApplication && selectedProject && (
          <ApplyProposal
            project={selectedProject}
            onClose={handleBackToDetails}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showProjectDetail || showProjectApplication) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={handleCloseAll}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
