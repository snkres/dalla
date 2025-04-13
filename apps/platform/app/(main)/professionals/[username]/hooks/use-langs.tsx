import { useState, useCallback } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'

interface LanguageEntry {
  language: string
  proficiency: string
}

const languageEntrySchema = z.object({
  language: z.string().min(1, 'Language name cannot be empty'),
  proficiency: z.string(),
})

const languagesSchema = z.object({
  languages: z.array(languageEntrySchema),
})

interface UseLangsProps {
  initialLanguages: { [key: string]: string }
  onUpdate: (languages: { [key: string]: string }) => Promise<void> | void
}

function languagesToArray(langs: { [key: string]: string }): LanguageEntry[] {
  if (!langs || Object.keys(langs).length === 0) {
    return [{ language: '', proficiency: 'Beginner' }]
  }
  return Object.entries(langs).map(([language, proficiency]) => ({
    language,
    proficiency,
  }))
}

function languagesToObject(langs: LanguageEntry[]): { [key: string]: string } {
  return langs
    .filter((lang) => lang.language.trim() !== '')
    .reduce(
      (acc, lang) => {
        acc[lang.language.trim()] = lang.proficiency
        return acc
      },
      {} as { [key: string]: string },
    )
}

export function useLangs({ initialLanguages, onUpdate }: UseLangsProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    defaultValues: {
      languages: languagesToArray(initialLanguages),
    },
    onSubmit: async ({ value }) => {
      try {
        await onUpdate(languagesToObject(value.languages))
        setIsEditing(false)
        toast({
          title: 'Languages Updated',
          description: 'Your languages have been successfully updated.',
        })
      } catch (error) {
        console.error('Language Update Failed:', error)
        toast({
          title: 'Update Failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred.',
          variant: 'destructive',
        })
      }
    },

    validators: {
      onChange: languagesSchema,
    },
  })

  const handleEdit = useCallback(() => {
    form.reset()
    setIsEditing(true)
  }, [form])

  const handleCancel = useCallback(() => {
    if (form.state.isDirty) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to cancel?',
        )
      ) {
        form.reset()
        setIsEditing(false)
      }
    } else {
      setIsEditing(false)
    }
  }, [form])

  const addLanguage = useCallback(() => {
    form.pushFieldValue('languages', { language: '', proficiency: 'Beginner' })
  }, [form])

  return {
    form,
    isEditing,
    handleEdit,
    handleCancel,
    addLanguage,
    displayLanguages: initialLanguages,
  }
}

export type LangsFormInstance = ReturnType<typeof useLangs>['form']
