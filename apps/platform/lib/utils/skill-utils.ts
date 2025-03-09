import { projects } from '@lib/data/projects'

export function getAllSkills(): string[] {
  const skillsSet = new Set<string>()

  projects.forEach((project) => {
    project.skills.forEach((skill) => {
      skillsSet.add(skill)
    })
  })

  return Array.from(skillsSet).sort()
}
