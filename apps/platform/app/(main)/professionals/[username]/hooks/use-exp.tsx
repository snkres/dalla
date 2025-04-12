import type { ProProfile } from '@lib/atoms/pro/meta'
import type { Position } from '@lib/types/profile'
import { useState, useRef, useEffect } from 'react'

export function useExp({
  experiences,
  onUpdate,
}: {
  experiences: ProProfile['data']['experience']
  onUpdate?: (updatedExperiences: ProProfile['data']['experience']) => void
}) {
  const [editedExperiences, setEditedExperiences] =
    useState<
      Omit<
        ProProfile['data']['experience'],
        'id' | 'profileId' | 'createdAt' | 'updatedAt'
      >
    >(experiences)
  const [isEditing, setIsEditing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [skillsInput, setSkillsInput] = useState<string[]>(
    experiences.map((exp) => exp.meta.skills.join(', ')),
  )
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean
  }>({})

  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { [field: string]: boolean }
  }>({})

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
    // Reset all expanded states to collapsed
    setExpandedItems({})

    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleSave = () => {
    // Validate required fields
    const errors: { [key: number]: { [field: string]: boolean } } = {}
    let hasErrors = false

    editedExperiences.forEach((exp, index) => {
      const indexErrors: { [field: string]: boolean } = {}

      if (!exp.company.trim()) {
        indexErrors.company = true
        hasErrors = true
      }

      if (!exp.title.trim()) {
        indexErrors.title = true
        hasErrors = true
      }

      if (!exp.startDate) {
        indexErrors.startDate = true
        hasErrors = true
      }

      if (Object.keys(indexErrors).length > 0) {
        errors[index] = indexErrors
      }
    })

    setValidationErrors(errors)

    if (hasErrors) {
      // Don't save if there are validation errors
      return
    }

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

    // Clear validation error for this field if it exists
    if (validationErrors[index]?.[field]) {
      const updatedErrors = { ...validationErrors }
      delete updatedErrors[index][field]
      if (Object.keys(updatedErrors[index]).length === 0) {
        delete updatedErrors[index]
      }
      setValidationErrors(updatedErrors)
    }
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

    setEditedExperiences(
      newExperiences.map((exp) => ({
        ...exp,
        meta: {
          ...exp.meta,
        },
      })),
    )

    setSkillsInput((prev) => [...prev, ''])
  }

  const findExperienceIndex = (
    exp: ProProfile['data']['experience'][0],
    companyName: string,
  ) => {
    return editedExperiences.findIndex(
      (e) =>
        e.company === companyName && e.title === exp.title && e.id === exp?.id,
    )
  }

  return {
    editedExperiences,
    setEditedExperiences,
    isEditing,
    setIsEditing,
    isMobile,
    inputRef,
    skillsInput,
    setSkillsInput,
    expandedItems,
    setExpandedItems,
    validationErrors,
    handleEdit,
    handleSave,
    addExperience,
    removeExperience,
    groupedExperiences,
    addRole,
    findExperienceIndex,
    updateExperience,
    updateSkills,
    updateAchievement,
    updateMeta,
    setValidationErrors,
  }
}
