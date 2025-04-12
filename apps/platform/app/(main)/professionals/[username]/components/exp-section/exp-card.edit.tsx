import { cn } from '@dalla/utils'
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  X,
  Plus,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { MonthYearPicker } from '../month-year-date-picker'
import { LocationSelector } from '@dalla/components/locationSelector'
import type { ProProfile } from '@lib/atoms/pro/meta'

type CompanyExpProps = {
  company: string
  companyExps: ProProfile['data']['experience']
  groupIndex: number
  editedExperiences: ProProfile['data']['experience']
  expandedItems: { [key: string]: boolean }
  setExpandedItems: Dispatch<SetStateAction<{ [key: string]: boolean }>>
  validationErrors: { [key: number]: { [field: string]: boolean } }
  padding: string
  posPadding: string
  inputRef: React.RefObject<HTMLInputElement | null>
  skillsInput: string[]
  setSkillsInput: Dispatch<SetStateAction<string[]>>
  setEditedExperiences: (
    value: React.SetStateAction<ProProfile['data']['experience']>,
  ) => void
  setValidationErrors: (
    value: React.SetStateAction<{
      [key: number]: { [field: string]: boolean }
    }>,
  ) => void
  findExperienceIndex: (
    exp: ProProfile['data']['experience'][0],
    companyName: string,
  ) => number
  updateExperience: (
    index: number,
    field: string,
    value: string | object,
  ) => void
  updateSkills: (index: number, skillsString: string) => void
  updateAchievement: (index: number, achievements: string) => void
  updateMeta: (index: number, metaField: string, value: string) => void
  removeExperience: (index: number) => void
  addRole: (companyName: string) => void
}

export function ExpCardEdit({
  company,
  companyExps,
  groupIndex,
  editedExperiences,
  expandedItems,
  setExpandedItems,
  validationErrors,
  padding,
  posPadding,
  inputRef,
  skillsInput,
  setSkillsInput,
  setEditedExperiences,
  setValidationErrors,
  findExperienceIndex,
  updateExperience,
  updateSkills,
  updateAchievement,
  updateMeta,
  removeExperience,
  addRole,
}: CompanyExpProps) {
  const companyKey = `company-${company}-${groupIndex}`
  const isExpanded = expandedItems[companyKey] || false

  return (
    <div
      key={groupIndex}
      className={cn('relative border-l-2 border-gray-200', padding, 'pb-2')}
    >
      <div className="absolute -left-[5px] top-0 h-[10px] w-[10px] rounded-full bg-[#63B7B7]"></div>

      {/* Company header - always visible */}
      <div className="mb-2 border-b border-dashed border-gray-100 pb-4">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2 sm:flex-nowrap">
          <div className="flex flex-1 items-center">
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

                // Clear validation errors for company field
                const firstExpIndex = editedExperiences.findIndex(
                  (exp) => exp.company === company,
                )
                if (
                  firstExpIndex >= 0 &&
                  validationErrors[firstExpIndex]?.company
                ) {
                  const updatedErrors = { ...validationErrors }
                  delete updatedErrors[firstExpIndex].company
                  if (Object.keys(updatedErrors[firstExpIndex]).length === 0) {
                    delete updatedErrors[firstExpIndex]
                  }
                  setValidationErrors(updatedErrors)
                }
              }}
              placeholder="Company name"
              className={cn(
                'h-8 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto',
                validationErrors[
                  editedExperiences.findIndex((exp) => exp.company === company)
                ]?.company
                  ? 'border-b-2 border-red-500'
                  : '',
              )}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setExpandedItems((prev: { [key: string]: boolean }) => ({
                  ...prev,
                  [companyKey]: !isExpanded,
                }))
              }
              className="ml-2 h-8 rounded-full px-2 text-xs text-gray-400 hover:text-[#63B7B7]"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-1 h-3.5 w-3.5" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-3.5 w-3.5" />
                  Expand
                </>
              )}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditedExperiences(
                editedExperiences.filter((exp) => exp.company !== company),
              )
            }}
            className="-mt-1 h-6 w-6 rounded-full text-gray-300 hover:bg-transparent hover:text-red-500"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Only show these fields when expanded */}
        {isExpanded && (
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
                <MapPin className="mr-1.5 h-3 w-3 text-gray-400" />
                Location
              </label>
              <LocationSelector
                value={companyExps[0].location || ''}
                onChange={(value) => {
                  const updatedExperiences = [...editedExperiences]
                  editedExperiences.forEach((exp, idx) => {
                    if (exp.company === company) {
                      updatedExperiences[idx] = {
                        ...updatedExperiences[idx],
                        location: value,
                      }
                    }
                  })
                  setEditedExperiences(updatedExperiences)
                }}
                placeholder={{
                  country: 'Country',
                  city: 'City or Remote',
                }}
                className="flex items-center space-y-1"
                selectClassName="h-8 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0"
                showLabels={false}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
                <Building className="mr-1.5 h-3 w-3 text-gray-400" />
                Employment Type
              </label>
              <Select
                value={companyExps[0].meta.employmentType || ''}
                onValueChange={(value) => {
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
                        employmentType: value,
                      },
                    }
                    setEditedExperiences(updatedExperiences)
                  }
                }}
              >
                <SelectTrigger className="h-8 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0">
                  <SelectValue placeholder="Employment type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Full-time',
                    'Part-time',
                    'Self-employed',
                    'Freelance',
                    'Contract',
                    'Internship',
                    'Apprenticeship',
                    'Seasonal',
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Only show roles when expanded */}
      {isExpanded && (
        <div className="ml-1 space-y-6 sm:ml-2">
          {companyExps.map((exp, roleIndex) => {
            const expIndex = findExperienceIndex(exp, company)
            const roleKey = `role-${company}-${exp.id || roleIndex}`
            const isRoleExpanded = expandedItems[roleKey] || false

            if (expIndex === -1) {
              console.error('Could not find experience index', exp, company)
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
                  <div className="flex flex-1 items-center">
                    <Input
                      value={exp.title}
                      onChange={(e) =>
                        updateExperience(expIndex, 'title', e.target.value)
                      }
                      placeholder="Position title"
                      className={cn(
                        'h-8 w-full flex-1 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0 sm:w-auto',
                        validationErrors[expIndex]?.title
                          ? 'border-b-2 border-red-500'
                          : '',
                      )}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedItems(
                          (prev: { [key: string]: boolean }) => ({
                            ...prev,
                            [roleKey]: !isRoleExpanded,
                          }),
                        )
                      }
                      className="ml-2 h-8 rounded-full px-2 text-xs text-gray-400 hover:text-[#63B7B7]"
                    >
                      {isRoleExpanded ? (
                        <>
                          <ChevronUp className="mr-1 h-3.5 w-3.5" />
                          Collapse
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-1 h-3.5 w-3.5" />
                          Expand
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(expIndex)}
                    className="-mt-1 h-6 w-6 rounded-full text-gray-300 hover:bg-transparent hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {isRoleExpanded && (
                  <>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                      <div className="flex flex-col">
                        <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
                          <Calendar className="mr-1.5 h-3 w-3 text-gray-400" />
                          Start Date
                        </label>
                        <MonthYearPicker
                          value={exp.startDate}
                          onChange={(value) =>
                            updateExperience(expIndex, 'startDate', value)
                          }
                          placeholder="Start date"
                          className={cn(
                            'h-8 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0',
                            validationErrors[expIndex]?.startDate
                              ? 'border-red-500'
                              : '',
                          )}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
                          <Calendar className="mr-1.5 h-3 w-3 text-gray-400" />
                          End Date
                        </label>
                        <MonthYearPicker
                          value={exp.endDate || 'Present'}
                          onChange={(value) =>
                            updateExperience(expIndex, 'endDate', value)
                          }
                          placeholder="End date (or Present)"
                          className="h-8 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0"
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-4">
                      <div className="flex flex-col">
                        <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
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
                            updateSkills(expIndex, skillsInput[expIndex] || '')
                          }
                          placeholder="Skills (comma separated)"
                          className="h-8 rounded-md border border-gray-200 text-xs focus:border-[#63B7B7] focus:ring-0"
                        />
                        <p className="mt-1 text-[10px] italic text-gray-400">
                          Separate skills with commas
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
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

                      <div className="flex flex-col">
                        <label className="mb-1 flex items-center text-xs font-medium text-gray-500">
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
                  </>
                )}
              </div>
            )
          })}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => addRole(company)}
            className="mt-2 h-8 w-full rounded-md text-xs text-[#63B7B7] hover:bg-[#63B7B7]/5"
          >
            <Plus className="mr-1 h-3 w-3" />
            Add Another Role
          </Button>
        </div>
      )}
    </div>
  )
}
