import { Globe, Edit, X, Plus, Check } from 'lucide-react'
import { Button } from '@dalla/design-system'

import { useLangs } from '../../hooks/use-langs'
import { LangCard } from './lang-card'
import { LangCardEdit } from './lang-card.edit'

type LanguagesSectionProps = {
  languages: { [key: string]: string }
  onUpdate: (languages: { [key: string]: string }) => void
  isPublicView: boolean
  isOwner: boolean
}

export function LanguagesSection({
  languages,
  onUpdate,
  isPublicView,
  isOwner,
}: LanguagesSectionProps) {
  const {
    editedLanguages,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    inputRef,
    updateLanguage,
    removeLanguage,
    addLanguage,
  } = useLangs({ languages, onUpdate })
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Globe className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Languages
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
        {isEditing && !isPublicView && isOwner && (
          <div className="space-y-3">
            {editedLanguages?.map((lang, index) => (
              <LangCardEdit
                key={index}
                language={lang.language}
                proficiency={lang.proficiency}
                index={index}
                inputRef={inputRef}
                updateLanguage={updateLanguage}
                removeLanguage={removeLanguage}
              />
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
        )}

        <div className="divide-y divide-gray-50">
          {Object.keys(languages).length > 0 &&
            !isEditing &&
            Object.entries(languages).map(([language, proficiency], index) => (
              <LangCard
                key={index}
                language={language}
                proficiency={proficiency}
              />
            ))}
        </div>

        {Object.keys(languages).length === 0 && !isEditing && (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="mb-2 text-sm text-gray-500">No languages added yet</p>
            {!isPublicView && isOwner && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add languages
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
