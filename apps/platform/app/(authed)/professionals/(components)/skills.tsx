import { Button, Badge, Progress } from '@dallah/design-system'
import { Trophy } from 'lucide-react'

export const Skills = ({
  skills,
  activeSkillCategory,
  handleSkillCategoryChange,
}: {
  skills: any[]
  activeSkillCategory: string
  handleSkillCategoryChange: (category: string) => void
}) => {
  return (
    <div className="rounded-3xl border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">Skills & Expertise</h3>
        <Badge className="bg-slate-blue-90 !rounded-full text-white">
          Top 5%
        </Badge>
      </div>

      <div className="mb-4">
        <div className="mb-4 flex items-center gap-2">
          <Button
            variant={
              activeSkillCategory === 'Technical' ? 'default' : 'outline'
            }
            className={`!rounded-full ${activeSkillCategory === 'Technical' ? '!bg-slate-blue-100 text-white' : ''}`}
            onClick={() => handleSkillCategoryChange('Technical')}
          >
            Technical Skills
          </Button>
          <Button
            variant={activeSkillCategory === 'Soft' ? 'default' : 'outline'}
            className={`!rounded-full ${activeSkillCategory === 'Soft' ? '!bg-slate-blue-100 text-white' : ''}`}
            onClick={() => handleSkillCategoryChange('Soft')}
          >
            Soft Skills
          </Button>
        </div>

        <div className="space-y-4">
          {
            //@ts-ignore
            skills[activeSkillCategory].map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <p className="text-sm text-gray-600">{skill.level}%</p>
                </div>
                <Progress
                  value={skill.level}
                  className="!h-1.5 bg-gray-100"
                  indicatorClassName={'!bg-slate-blue-80'}
                />
              </div>
            ))
          }
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h3 className="text-md mb-3 font-semibold">Certifications</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/20">
              <Trophy className="h-4 w-4 text-[#63B7B7]" />
            </div>
            <div>
              <p className="font-medium">Google Analytics Certification</p>
              <p className="text-xs text-gray-500">Issued Jan 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/20">
              <Trophy className="h-4 w-4 text-[#63B7B7]" />
            </div>
            <div>
              <p className="font-medium">Facebook Blueprint Certification</p>
              <p className="text-xs text-gray-500">Issued Mar 2022</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#63B7B7]/20">
              <Trophy className="h-4 w-4 text-[#63B7B7]" />
            </div>
            <div>
              <p className="font-medium">HubSpot Content Marketing</p>
              <p className="text-xs text-gray-500">Issued Sep 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
