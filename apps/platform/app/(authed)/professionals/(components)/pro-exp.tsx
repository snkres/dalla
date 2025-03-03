import { Button } from '@dallah/design-system'
import { BriefcaseIcon, GraduationCap, MoreVertical } from 'lucide-react'

export const ProExp = ({
  experiences,
  education,
}: {
  experiences: any[]
  education: any[]
}) => {
  return (
    <div className="rounded-3xl border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold">Professional Experience</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white"
          >
            <BriefcaseIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {experiences.map((exp, index) => (
          <div key={index} className="relative border-l-2 border-gray-200 pl-4">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#63B7B7]"></div>
            <h4 className="font-semibold">{exp.position}</h4>
            <p className="text-sm text-gray-600">{exp.company}</p>
            <p className="mb-2 text-xs text-gray-500">{exp.period}</p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <h3 className="text-md mb-3 font-semibold">Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="mb-3 flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
              <GraduationCap className="h-4 w-4 text-[#5C5C5C]" />
            </div>
            <div>
              <h4 className="font-medium">{edu.degree}</h4>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
