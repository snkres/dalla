import { ProProfile } from '@lib/atoms/pro/meta'
import { Award, Briefcase, Building, Calendar, MapPin } from 'lucide-react'
import { cn } from '@dalla/utils'

export function ExpCard({
  company,
  companyExps,
  index,
  padding,
  posPadding,
}: {
  company: string
  companyExps: ProProfile['data']['experience']
  index: number
  padding: string
  posPadding: string
}) {
  return (
    <div key={index} className="relative">
      <div className={cn('group relative border-l-2 border-gray-200', padding)}>
        <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>

        <div className="group -ml-2 rounded-md px-2 py-2 transition-colors hover:bg-gray-50/50">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-800">{company}</h4>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              {companyExps[0].location && (
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="capitalize">{companyExps[0].location}</span>
                </div>
              )}
              {companyExps[0].meta && (
                <div className="flex items-center">
                  <Building className="mr-1 h-3 w-3" />
                  <span>{companyExps[0].meta.employmentType}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ml-1 mt-2 space-y-5 sm:ml-2">
          {companyExps.map((exp, roleIndex) => (
            <div
              key={exp.id || roleIndex}
              className={cn(
                'relative border-l border-dotted border-gray-200 pb-3',
                posPadding,
              )}
            >
              <div className="absolute -left-[4px] top-[10px] h-[8px] w-[8px] rounded-full bg-gray-300"></div>
              <div className="flex flex-wrap items-baseline justify-between">
                <h5 className="text-sm font-medium text-gray-700">
                  {exp.title}
                </h5>
                <div className="mt-1 flex items-center text-xs text-gray-500 sm:mt-0">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>
                    {new Date(exp.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {exp.endDate === 'present'
                      ? 'Present'
                      : new Date(exp.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                  </span>
                </div>
              </div>

              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {exp.meta.employmentType && (
                  <span className="text-xs text-gray-500">
                    {exp.meta.employmentType}
                  </span>
                )}
              </div>

              {exp.meta.responsibilities && (
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {exp.meta.responsibilities}
                </p>
              )}

              {exp.meta.skills && exp.meta.skills.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.meta.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exp.meta.achievements && exp.meta.achievements.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <h6 className="flex items-center text-xs font-medium text-gray-600">
                    <Award className="mr-1 h-3 w-3 text-[#63B7B7]" />
                    Key Achievements
                  </h6>
                  <ul className="space-y-1.5">
                    {exp.meta.achievements
                      .split('.')
                      .filter(Boolean)
                      .map((achievement, achIndex) => (
                        <li key={achIndex} className="flex text-xs">
                          <span className="mr-1.5 font-bold text-[#63B7B7]">
                            •
                          </span>
                          <span className="leading-relaxed text-gray-700">
                            {achievement}.
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
