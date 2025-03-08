import { Button } from '@dallah/design-system'
import {
  Edit,
  Briefcase,
  Calendar,
  Plus,
  Check,
  X,
  MapPin,
  Award,
  Building,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { Position } from '@lib/types/profile'
import { ProProfile } from '@lib/atoms/pro/profile'
import { MonthYearPicker } from './month-year-date-picker'

export function ExperienceSection({
  experiences,
  onUpdate,
  isPublicView,
  isOwner,
}: {
  experiences: ProProfile['UserProfile']['experience']
  onUpdate?: (
    updatedExperiences: ProProfile['UserProfile']['experience'],
  ) => void
  isPublicView: boolean
  isOwner: boolean
}) {
  const [editedExperiences, setEditedExperiences] =
    useState<ProProfile['UserProfile']['experience']>(experiences)
  const [isEditing, setIsEditing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [skillsInput, setSkillsInput] = useState<string[]>(
    experiences.map((exp) => exp.meta.skills.join(', ')),
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setSkillsInput(editedExperiences.map((exp) => exp.meta.skills.join(', ')))
  }, [editedExperiences])

  const handleEdit = () => {
    setEditedExperiences([...experiences])
    setIsEditing(true)

    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleSave = () => {
    const validExperiences = editedExperiences.map((exp) => ({
      ...exp,
      startDate: exp.startDate || new Date().toISOString(),
      endDate: exp.endDate || new Date().toISOString(),
      meta: {
        ...exp.meta,
        skills: exp.meta.skills || [],
        achievements: exp.meta.achievements || '',
        responsibilities: exp.meta.responsibilities || '',
        employmentType: exp.meta.employmentType || '',
      },
    }))

    onUpdate?.(validExperiences)
    setIsEditing(false)
  }

  const addExperience = () => {
    setEditedExperiences([
      ...editedExperiences,
      {
        company: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        meta: {
          skills: [],
          achievements: '',
          responsibilities: '',
          employmentType: '',
        },
        id: '',
        profileId: '',
        createdAt: '',
        updatedAt: '',
      },
    ])
  }

  const removeExperience = (index: number) => {
    setEditedExperiences(editedExperiences.filter((_, i) => i !== index))
  }

  const updateExperience = (
    index: number,
    field: string,
    value: string | object,
  ) => {
    const updatedExperiences = [...editedExperiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    }
    setEditedExperiences(updatedExperiences)
  }

  const updateSkills = (index: number, skillsString: string) => {
    const updatedExperiences = [...editedExperiences]
    const skills = skillsString
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)

    updatedExperiences[index] = {
      ...updatedExperiences[index],
      meta: {
        ...updatedExperiences[index].meta,
        skills,
      },
    }

    setEditedExperiences(updatedExperiences)
  }

  const updateAchievement = (index: number, achievements: string) => {
    const updatedExperiences = [...editedExperiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      meta: {
        ...updatedExperiences[index].meta,
        achievements,
      },
    }
    setEditedExperiences(updatedExperiences)
  }

  const updateMeta = (index: number, metaField: string, value: string) => {
    const updatedExperiences = [...editedExperiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      meta: {
        ...updatedExperiences[index].meta,
        [metaField]: value,
      },
    }
    setEditedExperiences(updatedExperiences)
  }

  const padding = isMobile ? 'pl-5' : 'pl-7'
  const posPadding = isMobile ? 'pl-3' : 'pl-5'

  const groupedExperiences = () => {
    const sorted = [...editedExperiences].sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )

    const grouped: { [company: string]: typeof sorted } = {}
    sorted.forEach((exp) => {
      if (!grouped[exp.company]) {
        grouped[exp.company] = []
      }
      grouped[exp.company].push(exp)
    })

    Object.keys(grouped).forEach((company) => {
      grouped[company].sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    })

    return grouped
  }

  const addRole = (companyName: string) => {
    const companyExperience = editedExperiences.find(
      (exp) => exp.company === companyName,
    )
    if (!companyExperience) return

    const newRoleId = `new-role-${Date.now()}`

    const newExperiences = [
      ...editedExperiences,
      {
        company: companyName,
        title: '',
        location: companyExperience.location,
        startDate: '',
        endDate: '',
        meta: {
          skills: [],
          achievements: '',
          responsibilities: '',
          employmentType: companyExperience.meta.employmentType || '',
        },
        id: newRoleId,
        profileId: companyExperience.profileId || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    setEditedExperiences(newExperiences)

    setSkillsInput((prev) => [...prev, ''])
  }

  const findExperienceIndex = (exp: Position | any, companyName: string) => {
    return editedExperiences.findIndex(
      (e) =>
        e.company === companyName && e.title === exp.title && e.id === exp?.id,
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Professional Experience
        </h2>

        {!isEditing && !isPublicView && isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
          >
            <Edit className="mr-1 !h-4 !w-4" />
            Edit
          </Button>
        )}

        {isEditing && !isPublicView && isOwner && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
            >
              <X className="mr-1 !h-4 !w-4" />
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Check className="mr-1 !h-4 !w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing && (
          <div className="space-y-8">
            {Object.entries(groupedExperiences()).map(
              ([company, companyExps], groupIndex) => (
                <div
                  key={groupIndex}
                  className={cn(
                    'relative border-l-2 border-gray-200',
                    padding,
                    'pb-2',
                  )}
                >
                  <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>
                  <div className="mb-2 border-b border-dashed border-gray-100 pb-4">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2 sm:flex-nowrap">
                      <Input
                        ref={groupIndex === 0 ? inputRef : undefined}
                        value={company}
                        onChange={(e) => {
                          const updatedExperiences = [...editedExperiences]
                          editedExperiences.forEach((exp, idx) => {
                            if (exp.company === company) {
                              updatedExperiences[idx] = {
                                ...updatedExperiences[idx],
                                company: e.target.value,
                              }
                            }
                          })
                          setEditedExperiences(updatedExperiences)
                        }}
                        placeholder="Company name"
                        className="h-7 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditedExperiences(
                            editedExperiences.filter(
                              (exp) => exp.company !== company,
                            ),
                          )
                        }}
                        className="-mt-1 h-6 w-6 rounded-full text-gray-300 hover:bg-transparent hover:text-red-500"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0 text-gray-400" />
                        <Input
                          value={companyExps[0].location || ''}
                          onChange={(e) => {
                            const updatedExperiences = [...editedExperiences]
                            editedExperiences.forEach((exp, idx) => {
                              if (exp.company === company) {
                                updatedExperiences[idx] = {
                                  ...updatedExperiences[idx],
                                  location: e.target.value,
                                }
                              }
                            })
                            setEditedExperiences(updatedExperiences)
                          }}
                          placeholder="Location (optional)"
                          className="h-7 rounded-none border-0 border-b border-gray-200 px-0 text-xs focus:border-[#63B7B7] focus:ring-0"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 flex-shrink-0 text-gray-400" />
                        <Input
                          value={companyExps[0].meta.employmentType || ''}
                          onChange={(e) => {
                            // For employment type, let each role have its own value
                            const updatedExperiences = [...editedExperiences]
                            const firstExpIndex = editedExperiences.findIndex(
                              (exp) =>
                                exp.company === company &&
                                exp.title === companyExps[0].title,
                            )
                            if (firstExpIndex >= 0) {
                              updatedExperiences[firstExpIndex] = {
                                ...updatedExperiences[firstExpIndex],
                                meta: {
                                  ...updatedExperiences[firstExpIndex].meta,
                                  employmentType: e.target.value,
                                },
                              }
                              setEditedExperiences(updatedExperiences)
                            }
                          }}
                          placeholder="Employment type (optional)"
                          className="h-7 rounded-none border-0 border-b border-gray-200 px-0 text-xs focus:border-[#63B7B7] focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="ml-1 space-y-6 sm:ml-2">
                    {companyExps.map((exp, roleIndex) => {
                      const expIndex = findExperienceIndex(
                        exp as unknown as Position,
                        company,
                      )

                      if (expIndex === -1) {
                        console.error(
                          'Could not find experience index',
                          exp,
                          company,
                        )
                        return null
                      }

                      return (
                        <div
                          key={exp.id || `${company}-role-${roleIndex}`}
                          className={cn(
                            'relative border-l border-dotted border-gray-200',
                            posPadding,
                          )}
                        >
                          <div className="absolute -left-[4px] top-[10px] h-[8px] w-[8px] rounded-full bg-gray-300"></div>

                          <div className="mb-3 flex flex-wrap items-start justify-between gap-2 sm:flex-nowrap">
                            <Input
                              value={exp.title}
                              onChange={(e) =>
                                updateExperience(
                                  expIndex,
                                  'title',
                                  e.target.value,
                                )
                              }
                              placeholder="Position title"
                              className="h-7 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExperience(expIndex)}
                              className="-mt-1 h-6 w-6 rounded-full text-gray-300 hover:bg-transparent hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 flex-shrink-0 text-gray-400" />
                              <MonthYearPicker
                                value={exp.startDate}
                                onChange={(value) =>
                                  updateExperience(expIndex, 'startDate', value)
                                }
                                placeholder="Start date"
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 flex-shrink-0 text-gray-400" />
                              <MonthYearPicker
                                value={exp.endDate}
                                onChange={(value) =>
                                  updateExperience(expIndex, 'endDate', value)
                                }
                                placeholder="End date (or Present)"
                              />
                            </div>
                          </div>

                          <div className="mt-3 space-y-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-500">
                                Skills
                              </label>
                              <Input
                                value={skillsInput[expIndex] || ''}
                                onChange={(e) => {
                                  const updatedSkillsInput = [...skillsInput]
                                  updatedSkillsInput[expIndex] = e.target.value
                                  setSkillsInput(updatedSkillsInput)
                                }}
                                onBlur={() =>
                                  updateSkills(
                                    expIndex,
                                    skillsInput[expIndex] || '',
                                  )
                                }
                                placeholder="Skills (comma separated)"
                                className="h-7 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0"
                              />
                              <p className="text-[10px] italic text-gray-400">
                                Separate skills with commas
                              </p>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-500">
                                Key Achievements
                              </label>
                              <Textarea
                                value={exp.meta.achievements || ''}
                                onChange={(e) =>
                                  updateAchievement(expIndex, e.target.value)
                                }
                                placeholder="Describe your key achievements"
                                className="h-24 rounded-md border border-gray-200 !text-xs focus:border-[#63B7B7] focus:ring-0"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-medium text-gray-500">
                                Responsibilities
                              </label>
                              <Textarea
                                value={exp.meta.responsibilities || ''}
                                onChange={(e) =>
                                  updateMeta(
                                    expIndex,
                                    'responsibilities',
                                    e.target.value,
                                  )
                                }
                                placeholder="Brief description of your role and responsibilities"
                                className="h-24 rounded-md border border-gray-200 !text-xs focus:border-[#63B7B7] focus:ring-0"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addRole(company)}
                      className="mt-2 h-7 w-full rounded-md text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add another role
                    </Button>
                  </div>
                </div>
              ),
            )}

            <div className={cn('relative border-l-2 border-gray-200', padding)}>
              <div className="absolute -left-[5px] top-3 h-[10px] w-[10px] rounded-full bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={addExperience}
                className="h-9 w-full rounded-md py-5 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add experience
              </Button>
            </div>
          </div>
        )}

        {experiences?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-2 text-sm text-gray-500">
              No professional experience added yet
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add experience
            </Button>
          </div>
        )}

        {experiences?.length > 0 && !isEditing && (
          <div className="space-y-8">
            {(() => {
              const grouped: {
                [company: string]: ProProfile['UserProfile']['experience']
              } = {}
              ;[...experiences]
                .sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime(),
                )
                .forEach((exp) => {
                  if (!grouped[exp.company]) {
                    grouped[exp.company] = []
                  }
                  grouped[exp.company].push(exp)
                })

              return Object.entries(grouped).map(
                ([company, companyExps], index) => (
                  <div key={index} className="relative">
                    <div
                      className={cn(
                        'group relative border-l-2 border-gray-200',
                        padding,
                      )}
                    >
                      <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>

                      <div className="group -ml-2 rounded-md px-2 py-2 transition-colors hover:bg-gray-50/50">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800">
                            {company}
                          </h4>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            {companyExps[0].location && (
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span className="capitalize">
                                  {companyExps[0].location}
                                </span>
                              </div>
                            )}
                            {companyExps[0].meta['industry'] && (
                              <div className="flex items-center">
                                <Building className="mr-1 h-3 w-3" />
                                <span>{companyExps[0].meta['industry']}</span>
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
                                  {new Date(exp.startDate).toLocaleDateString(
                                    'en-US',
                                    {
                                      month: 'short',
                                      year: 'numeric',
                                    },
                                  )}{' '}
                                  -{' '}
                                  {new Date(exp.endDate).toLocaleDateString(
                                    'en-US',
                                    {
                                      month: 'short',
                                      year: 'numeric',
                                    },
                                  )}
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

                            {exp.meta.achievements &&
                              exp.meta.achievements.length > 0 && (
                                <div className="mt-3 space-y-1.5">
                                  <h6 className="flex items-center text-xs font-medium text-gray-600">
                                    <Award className="mr-1 h-3 w-3 text-[#63B7B7]" />
                                    Key Achievements
                                  </h6>
                                  <ul className="space-y-1.5">
                                    {exp.meta.achievements
                                      .split('.')
                                      .map((achievement, achIndex) => (
                                        <li
                                          key={achIndex}
                                          className="flex text-xs"
                                        >
                                          <span className="mr-1.5 font-bold text-[#63B7B7]">
                                            •
                                          </span>
                                          <span className="leading-relaxed text-gray-700">
                                            {achievement}
                                          </span>
                                          .
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
                ),
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
