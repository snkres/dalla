import { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'

export function getAllSkills(
  projects: GetAllProjectsProfessionalViewRes['data'][0],
): { name: string; description: string }[] {
  const skillsSet = new Set<string>()

  projects?.forEach((project: { skills: any[] }) => {
    project.skills.forEach((skill) => {
      skillsSet.add(skill)
    })
  })

  return Array.from(skillsSet).map((skill) => ({
    name: skill,
    description: 'Lorem Ipsum',
  }))
}
