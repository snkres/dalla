import { Project } from '@lib/api/pro/projects'

export function applyFilters(
  projects: Project[],
  activeFilter: string,
  searchQuery: string,
  showFilterPanel: boolean,
  selectedBudgetRange: [number, number],
  selectedDurations: string[],
  selectedLocations: string[],
  selectedSkills: string[],
): Project[] {
  let results = [...projects]

  if (activeFilter !== 'all') {
    if (activeFilter === 'dev') {
      results = results.filter((project) =>
        project.skills.some((skill) =>
          [
            'react',
            'node.js',
            'javascript',
            'typescript',
            'python',
            'java',
            'php',
            'mongodb',
            'solidity',
            'web3',
          ].includes(skill.toLowerCase()),
        ),
      )
    } else if (activeFilter === 'design') {
      results = results.filter((project) =>
        project.skills.some((skill) =>
          ['figma', 'ui/ux', 'adobe xd', 'sketch', 'design'].includes(
            skill.toLowerCase(),
          ),
        ),
      )
    }
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    results = results.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.company.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some((skill) => skill.toLowerCase().includes(query)),
    )
  }

  if (showFilterPanel) {
    if (selectedBudgetRange[0] !== 0 || selectedBudgetRange[1] !== 100000) {
      results = results.filter((project) => {
        const budget = project.meta.budget
        return (
          budget >= selectedBudgetRange[0] && budget <= selectedBudgetRange[1]
        )
      })
    }

    if (selectedDurations.length > 0) {
      results = results.filter((project) => {
        if (!project.meta.timeline) return false

        const months = parseInt(project.meta.timeline.split(' ')[0])

        return selectedDurations.some((range) => {
          if (range === '1-month') return months <= 1
          if (range === '1-3-months') return months > 1 && months <= 3
          if (range === '3-6-months') return months > 3 && months <= 6
          if (range === '6-plus-months') return months > 6
          return false
        })
      })
    }

    if (selectedSkills.length > 0) {
      results = results.filter((project) =>
        selectedSkills.some((skill) =>
          project.skills
            .map((s) => s.toLowerCase())
            .includes(skill.toLowerCase()),
        ),
      )
    }
  }

  return results
}
