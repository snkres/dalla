import type { ProProfile } from '@lib/atoms/pro/meta'
import { useState, useRef, useEffect } from 'react'

export function useEdu({
  education,
  onUpdateEducation,
}: {
  education: ProProfile['data']['education']
  onUpdateEducation: (updatedEducation: ProProfile['data']['education']) => void
}) {
  const [editedEducation, setEditedEducation] =
    useState<ProProfile['data']['education']>(education)
  const [isEditing, setIsEditing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const degreeInputRef = useRef<HTMLInputElement>(null)

  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { [field: string]: boolean }
  }>({})
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean
  }>({})

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleEdit = () => {
    setEditedEducation(JSON.parse(JSON.stringify(education)))
    setIsEditing(true)
    setExpandedItems({})
    setTimeout(() => degreeInputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    const errors: { [key: number]: { [field: string]: boolean } } = {}
    let hasErrors = false

    editedEducation.forEach((edu, index) => {
      const indexErrors: { [field: string]: boolean } = {}

      if (!edu.degree.trim()) {
        indexErrors.degree = true
        hasErrors = true
      }

      if (!edu.school.trim()) {
        indexErrors.school = true
        hasErrors = true
      }

      if (!edu.startDate) {
        indexErrors.startDate = true
        hasErrors = true
      }

      if (Object.keys(indexErrors).length > 0) {
        errors[index] = indexErrors
      }
    })

    setValidationErrors(errors)

    if (hasErrors) {
      return
    }

    onUpdateEducation(editedEducation)
    setIsEditing(false)
  }

  const addEducation = () => {
    const newEdu = {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      id: `new-edu-${Date.now()}`,
      profileId: '',
      createdAt: '',
      updatedAt: '',
    }
    setEditedEducation([...editedEducation, newEdu])

    // Automatically expand the new education item
    setExpandedItems((prev) => ({
      ...prev,
      [`edu-${newEdu.id}`]: true,
    }))

    setTimeout(() => {
      const inputs = document.querySelectorAll(
        'input[placeholder="Degree or certification"]',
      )
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement
      lastInput?.focus()
    }, 100)
  }

  const removeEducation = (index: number) => {
    setEditedEducation(editedEducation.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...editedEducation]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setEditedEducation(updatedEducation)

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
  return {
    isEditing,
    setIsEditing,
    editedEducation,
    handleEdit,
    handleSave,
    validationErrors,
    expandedItems,
    updateEducation,
    addEducation,
    removeEducation,
    isMobile,
    degreeInputRef,
    setExpandedItems,
  }
}
