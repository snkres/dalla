import { Badge, Button, Progress } from '@dallah/design-system'
import { Filter, Info, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useId, useState } from 'react'
export const Projects = ({
  projects,
}: {
  projects: {
    title: string
    description: string
    startDate: string
    endDate: string
    status: string
    teamMembers: string[]
    progress: number
    teamSize: number
    category: string
    color: string
  }[]
}) => {
  const [activeProject, setActiveProject] = useState('Ongoing')
  const handleProjectChange = (project: string) => {
    setActiveProject(project)
  }

  return (
    <div className="rounded-3xl border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={activeProject === 'Ongoing' ? 'default' : 'outline'}
            className={`!rounded-full ${activeProject === 'Ongoing' ? 'bg-slate-blue-100 text-white' : 'bg-white text-black'}`}
            onClick={() => handleProjectChange('Ongoing')}
          >
            Ongoing
          </Button>
          <Button
            variant={activeProject === 'Completed' ? 'default' : 'outline'}
            className={`!rounded-full ${activeProject === 'Completed' ? 'bg-slate-blue-100 text-white' : 'bg-white text-black'}`}
            onClick={() => handleProjectChange('Completed')}
          >
            Completed
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects
          .filter((project) => project.status === activeProject)
          .map((project, index) => (
            <div
              className={`rounded-xl p-4`}
              key={useId()}
              style={{
                borderColor: project.color,
                borderWidth: 1,
                borderStyle: 'solid',
                background: project.color ? `${project.color}20` : '',
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="rounded-full border-none px-3 py-1"
                  style={{
                    backgroundColor: `${project.color}20` || undefined,
                    borderColor: `${project.color}` || undefined,
                  }}
                >
                  {project.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-transparent"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-bold">{project.title}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 !rounded-full`}
                  style={{
                    background: project.color ? `${project.color}30` : '',
                  }}
                >
                  <Info
                    className={`h-4 w-4`}
                    style={{
                      color: project.color ? `${project.color}` : '',
                    }}
                  />
                </Button>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-sm">{project.description}</p>
                <div className="my-2 flex items-center gap-2">
                  <Progress
                    value={project.progress}
                    style={{
                      backgroundColor: `${project.color}20` || undefined,
                    }}
                    indicatorStyle={{
                      backgroundColor: `${project.color}` || undefined,
                    }}
                    className="!h-1.5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="rounded-full border-none px-2 py-1 text-xs"
                    style={{
                      backgroundColor: `${project.color}20` || undefined,
                      borderColor: `${project.color}` || undefined,
                    }}
                  >
                    {project.progress}%
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-none px-2 py-1 text-xs"
                    style={{
                      backgroundColor: `${project.color}20` || undefined,
                      borderColor: `${project.color}` || undefined,
                    }}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.teamMembers.map((member, index) => (
                    <div
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                      key={`${member}-${index}`}
                      style={{
                        background: project.color ? `${project.color}30` : '',
                      }}
                    >
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-none px-3 py-1"
                  style={{
                    backgroundColor: `${project.color}20` || undefined,
                    borderColor: `${project.color}` || undefined,
                  }}
                >
                  2 Days Left
                </Badge>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
