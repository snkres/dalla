import { useRef, useState } from 'react'
import { Language } from '@lib/types/profile'

export function useLangs({
  languages,
  onUpdate,
}: {
  languages: { [key: string]: string }
  onUpdate: (languages: { [key: string]: string }) => void
}) {
  const [editedLanguages, setEditedLanguages] = useState<Language[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    if (!languages || Object.keys(languages).length === 0) {
      setEditedLanguages([{ language: '', proficiency: 'Beginner' }])
    } else {
      setEditedLanguages(
        Object.entries(languages).map(([language, proficiency]) => ({
          language,
          proficiency,
        })),
      )
    }
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    // Filter out any languages with empty language names
    const validLanguages = editedLanguages.filter(
      (lang) => lang.language.trim() !== '',
    )
    setIsEditing(false)
    onUpdate(
      validLanguages.reduce(
        (acc, lang) => ({
          ...acc,
          [lang.language]: lang.proficiency,
        }),
        {} as { [key: string]: string },
      ),
    )
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addLanguage = () => {
    setEditedLanguages([
      ...editedLanguages,
      { language: '', proficiency: 'Beginner' },
    ])
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[placeholder="Language"]')
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement
      lastInput?.focus()
    }, 100)
  }

  const removeLanguage = (index: number) => {
    const updated = editedLanguages.filter((_, i) => i !== index)
    setEditedLanguages(updated)
  }

  const updateLanguage = (
    index: number,
    field: keyof Language,
    value: string,
  ) => {
    const updated = [...editedLanguages]
    updated[index] = { ...updated[index], [field]: value }
    setEditedLanguages(updated)
  }

  return {
    editedLanguages,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    inputRef,
    updateLanguage,
    removeLanguage,
    addLanguage,
  }
}
