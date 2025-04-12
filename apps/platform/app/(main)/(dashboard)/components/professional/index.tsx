'use client'

import type React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@dalla/design-system'
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
import FilterChips from './filter-chips'
import type { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
import { useProfessionalDashboard } from '../../hooks/use-professional-dashboard'

export function ProfessionalHome() {
  const {
    // Data
    filteredProjects,
    allSkills,
    selectedProject,
    totalPages,

    // Loading states
    isLoading,
    isRefreshing,
    isFetching,
    isError,
    refetch,
    instanceId,

    // Pagination
    page,
    handlePageChange,

    // Search & filters
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    hasActiveFilters,
    showFilterPanel,
    setShowFilterPanel,
    showSearchHelp,
    setShowSearchHelp,
    selectedBudgetRange,
    setSelectedBudgetRange,
    selectedDurations,
    setSelectedDurations,
    selectedLocations,
    setSelectedLocations,
    selectedSkills,
    setSelectedSkills,

    // Actions
    handleRefresh,
    handleResetFilters,
    clearAllFilters,
    handleProjectClick,
    handleApplyClick,
    handleBackToDetails,
    handleCloseAll,

    // UI state
    showProjectDetail,
    showProjectApplication,

    // UI helpers
    renderSortOption,
    getProjectKey,
  } = useProfessionalDashboard()

  // Convert the setSelectedSkills function to match the expected prop type signature
  const handleSetSelectedSkills = (skills?: string[]) => {
    if (skills !== undefined) {
      setSelectedSkills(skills)
    }
  }

  return (
    <div className="w-full py-6">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Available Projects
              </h1>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing || isFetching}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading || isRefreshing || isFetching ? 'animate-spin text-[#234d64]' : ''}`}
                />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </Button>
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
              setSelectedSkills={handleSetSelectedSkills}
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

            <div className="mb-4 mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredProjects.length} projects
                {activeFilter !== 'all' &&
                  ` • Filtered by: ${filterCategories.find((f) => f.key === activeFilter)?.label}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
                {selectedSkills.length > 0 &&
                  ` • Skills: ${selectedSkills.length} selected`}
              </p>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-500"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                )}

                <div className="ml-2 flex items-center gap-1">
                  <span className="text-sm text-gray-700">Sort:</span>
                  <div className="flex gap-1">
                    {renderSortOption('newest', 'Newest')}
                    {renderSortOption('budget-high', 'Budget ↓')}
                    {renderSortOption('budget-low', 'Budget ↑')}
                  </div>
                </div>
              </div>
            </div>

            {isLoading || isRefreshing ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-${instanceId}-${i}`}
                    className="h-64 animate-pulse rounded-xl bg-gray-100"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-xl bg-gray-50 p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-red-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Error loading projects
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-500">
                  We encountered an error while loading projects. Please try
                  again.
                </p>
                <Button
                  onClick={() => refetch()}
                  className="!bg-[#234d64] hover:!bg-[#234d64]/90"
                >
                  Retry
                </Button>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProjects.map(
                  (
                    project: GetAllProjectsProfessionalViewRes['data'][0][number],
                    index: number,
                  ) => (
                    <ProjectCard
                      key={getProjectKey(project, index)}
                      project={project}
                      onClick={handleProjectClick}
                    />
                  ),
                )}
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

            {filteredProjects.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex w-full items-center justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1 || isLoading || isRefreshing}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = page
                    if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }

                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isLoading || isRefreshing}
                          className={`h-10 w-10 ${page === pageNum ? '!bg-[#234d64] text-white' : ''}`}
                        >
                          {pageNum}
                        </Button>
                      )
                    }
                    return null
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages || isLoading || isRefreshing}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
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
