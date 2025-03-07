import { Globe, Edit, X, Plus, Check } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { ProficiencyBadge } from './proficiency-badge'
import { useRef } from 'react'
import { Language } from '@lib/types/profile'

type LanguagesSectionProps = {
  languages: Language[]
  editedLanguages: Language[]
  setEditedLanguages: React.Dispatch<React.SetStateAction<Language[]>>
  isEditing: boolean
  setEditingSection: React.Dispatch<React.SetStateAction<string | null>>
  onChange: (languages: Language[]) => void
}

const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Conversational',
  'Intermediate',
  'Beginner',
]

export function LanguagesSection({
  languages,
  editedLanguages,
  setEditedLanguages,
  isEditing,
  setEditingSection,
  onChange,
}: LanguagesSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    if (!languages || Object.keys(languages).length === 0) {
      setEditedLanguages([{ language: '', proficiency: 'Beginner' }])
    } else {
      // Convert object to array format for editing
      const languagesArray = Object.entries(languages).map(
        ([language, proficiency]) => ({
          language,
          proficiency: proficiency as unknown as string,
        }),
      )
      setEditedLanguages(languagesArray)
    }
    setEditingSection('languages')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    setEditingSection(null)
    onChange(editedLanguages)
  }

  const handleCancel = () => {
    setEditingSection(null)
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
    onChange(updated)
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Globe className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Languages
        </h2>

        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
          >
            <Edit className="mr-1 !h-4 !w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
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
        {isEditing ? (
          <div className="space-y-3">
            {editedLanguages?.map((lang, index) => (
              <div key={index} className="group flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    ref={index === 0 ? inputRef : undefined}
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(index, 'language', e.target.value)
                    }
                    placeholder="Language"
                    className="h-9 text-sm focus-visible:ring-[#63B7B7]"
                  />
                </div>
                <div className="w-1/3">
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value: string) =>
                      updateLanguage(index, 'proficiency', value)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm focus:ring-[#63B7B7] focus-visible:ring-[#63B7B7]">
                      <SelectValue placeholder="Proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem
                          key={level}
                          value={level}
                          className="text-sm"
                        >
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(index)}
                  className="h-8 w-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={addLanguage}
              className="mt-4 h-8 w-full rounded-lg border-[#63B7B7]/30 px-3 text-xs text-[#63B7B7] hover:border-[#63B7B7] hover:bg-[#63B7B7]/5 hover:text-[#63B7B7]"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add language
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {Object.entries(languages || {}).map(
              ([language, proficiency], index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-800">
                      {language}
                    </span>
                  </div>
                  <ProficiencyBadge
                    proficiency={proficiency as unknown as string}
                  />
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
