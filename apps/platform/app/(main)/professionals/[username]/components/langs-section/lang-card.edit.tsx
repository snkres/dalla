import { Button, Input } from '@dalla/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { X } from 'lucide-react'
import { Language } from '@lib/types/profile'
import { RefObject } from 'react'

const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Conversational',
  'Intermediate',
  'Beginner',
]

export function LangCardEdit({
  language,
  proficiency,
  index,
  inputRef,
  updateLanguage,
  removeLanguage,
}: {
  language: string
  proficiency: string
  index: number
  inputRef: RefObject<HTMLInputElement | null>
  updateLanguage: (index: number, field: keyof Language, value: string) => void
  removeLanguage: (index: number) => void
}) {
  return (
    <div className="group flex items-center gap-3">
      <div className="flex-1">
        <Input
          ref={index === 0 ? inputRef : undefined}
          value={language}
          onChange={(e) => updateLanguage(index, 'language', e.target.value)}
          placeholder="Language"
          className="h-9 text-sm focus-visible:ring-[#63B7B7]"
        />
      </div>
      <div className="w-1/3">
        <Select
          value={proficiency}
          onValueChange={(value: string) =>
            updateLanguage(index, 'proficiency', value)
          }
        >
          <SelectTrigger className="h-9 text-sm focus:ring-[#63B7B7] focus-visible:ring-[#63B7B7]">
            <SelectValue placeholder="Proficiency" />
          </SelectTrigger>
          <SelectContent>
            {PROFICIENCY_LEVELS.map((level) => (
              <SelectItem key={level} value={level} className="text-sm">
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
  )
}
