'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  AlertCircle,
  Search,
  Filter,
  Info,
  X,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button, Input } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { ProjectsOverview } from './projects-overview'
import { Sidebar } from './sidebar'
import { AddProject } from './add-project'
import { ProfessionalDetail } from './professional-detail'
import { ProfessionalCard } from './professional-card'
import { useCompanyDashboard } from '../../hooks/use-company-dashboard'

export function CompanyHome() {
  const {
    projectsOverviewData,
    projectsOverviewLoading,
    professionals,
    showAddProject,
    setShowAddProject,
    searchQuery,
    setSearchQuery,
    showFilterPanel,
    setShowFilterPanel,
    activeFilter,
    setActiveFilter,
    filterOptions,
    clearFilters,
    handleProfessionalClick,
    handleCloseDetail,
    filteredProfessionals,
    page,
    setPage,
    LIMIT,
    showProfessionalDetail,
    selectedProfessional,
    refetchProjectsOverview,
  } = useCompanyDashboard()

  return (
    <div>
      <div className="mx-auto max-w-[1200px] px-4 py-6 lg:max-w-[1350px]">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProjectsOverview
              onPostJob={() => setShowAddProject(true)}
              projects={projectsOverviewData?.data.data[0] || []}
              isLoading={projectsOverviewLoading}
              onHireConsultant={() => {
                /* Scroll to consultant list or navigate */
              }}
            />

            <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-medium text-gray-900">
                    Find Professionals
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Discover and connect with top talent for your projects
                  </p>
                </div>
                <Button
                  className="h-9 !bg-[#63B7B7] !text-sm hover:!bg-[#63B7B7]/90"
                  onClick={() => setShowAddProject(true)}
                >
                  <Users className="mr-1.5 h-4 w-4" />
                  Start a Project
                </Button>
              </div>
              <div className="relative">
                <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <div className="relative flex flex-grow items-center">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by skill, expertise, or location..."
                      className="h-10 w-full border-0 py-2 pl-9 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'mx-1 my-1 h-8 rounded-md px-3 text-xs',
                      showFilterPanel
                        ? '!bg-[#63B7B7]/10 !text-[#63B7B7]'
                        : '!bg-gray-50 !text-gray-600',
                    )}
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                  >
                    <Filter className="mr-1.5 h-3.5 w-3.5" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-6 p-4 shadow-sm">
              <div className="scrollbar-hide flex overflow-x-auto pb-1">
                {filterOptions.map((option) => (
                  <Button
                    key={option.key}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'mr-2 flex h-8 items-center whitespace-nowrap rounded-full px-3 text-xs',
                      activeFilter === option.key
                        ? 'bg-[#63B7B7] text-white'
                        : 'bg-[#63B7B7]/5 text-gray-700 hover:bg-[#63B7B7]/10',
                    )}
                    onClick={() => setActiveFilter(option.key)}
                  >
                    {option.icon}
                    <span className="font-medium">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            {searchQuery && (
              <div className="mb-5 flex items-start rounded-lg bg-[#63B7B7]/5 p-3 text-sm text-[#63B7B7]">
                <Info className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p>
                      Showing results for{' '}
                      <strong>&quot;{searchQuery}&quot;</strong>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 rounded-full p-0 text-gray-400 hover:text-gray-600"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {filteredProfessionals.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProfessionals.map((professional) => (
                    <ProfessionalCard
                      key={professional.userId}
                      professional={professional}
                      onClick={() => handleProfessionalClick(professional)}
                    />
                  ))}
                </div>

                <div className="mt-4 flex w-full items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {(() => {
                      const totalPages = Math.ceil(
                        (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                      )
                      const visiblePages = Math.min(5, totalPages)
                      let startPage = 1

                      if (page > 3) {
                        startPage = Math.min(
                          page - 2,
                          totalPages - visiblePages + 1,
                        )
                      }

                      startPage = Math.max(1, startPage)

                      return Array.from({ length: visiblePages }, (_, i) => {
                        const pageNum = startPage + i

                        if (pageNum > totalPages) return null

                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? 'default' : 'outline'}
                            onClick={() => setPage(pageNum)}
                            className={`h-10 w-10 ${page === pageNum ? '!bg-[#63B7B7] text-white' : ''}`}
                          >
                            {pageNum}
                          </Button>
                        )
                      })
                    })()}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      const totalPages = Math.ceil(
                        (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                      )
                      setPage(Math.min(totalPages, page + 1))
                    }}
                    disabled={
                      page >=
                      Math.ceil(
                        (professionals?.data[1]?.totalCount ?? 0) / LIMIT,
                      )
                    }
                    className="flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No consultants found
                </h3>
                <p className="mx-auto mb-5 max-w-md text-sm text-gray-500">
                  We couldn&apos;t find any consultants matching your search
                  criteria. Try adjusting your search or filters.
                </p>
                <Button
                  className="h-9 bg-[#63B7B7] text-sm hover:bg-[#63B7B7]/90"
                  onClick={clearFilters}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      {showProfessionalDetail && selectedProfessional && (
        <>
          <AnimatePresence mode="wait">
            <ProfessionalDetail
              key={`consultant-detail-${selectedProfessional.userId}`}
              username={selectedProfessional.User.username}
              onClose={handleCloseDetail}
            />
          </AnimatePresence>

          <motion.div
            key="consultant-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={handleCloseDetail}
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {showAddProject && (
          <AddProject
            key="add-project-modal"
            onClose={() => setShowAddProject(false)}
            onProjectCreated={() => {
              refetchProjectsOverview()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
