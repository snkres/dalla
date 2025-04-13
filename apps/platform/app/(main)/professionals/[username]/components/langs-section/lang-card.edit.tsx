import { Button, Input } from '@dalla/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { X } from 'lucide-react'
import { LangsFormInstance } from '../../hooks/use-langs'

const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Conversational',
  'Intermediate',
  'Beginner',
]

interface LangCardEditProps {
  form: LangsFormInstance
  index: number
}

export function LangCardEdit({ form, index }: LangCardEditProps) {
  const removeLanguage = () => {
    form.removeFieldValue('languages', index)
  }

  return (
    <div className="group flex items-center gap-3">
      <div className="flex-1">
        <form.Field
          name={`languages[${index}].language`}
          children={(field) => (
            <div>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Language"
                className="h-9 text-sm focus-visible:ring-[#63B7B7]"
              />
              {field.state.meta.errors ? (
                <em className="mt-1 block text-xs text-red-500">
                  {Array.isArray(field.state.meta.errors)
                    ? field.state.meta.errors.join(', ')
                    : field.state.meta.errors}
                </em>
              ) : null}
            </div>
          )}
        />
      </div>
      <div className="w-1/3">
        <form.Field
          name={`languages[${index}].proficiency`}
          children={(field) => (
            <div>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={field.handleChange}
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
              {field.state.meta.errors ? (
                <em className="mt-1 block text-xs text-red-500">
                  {Array.isArray(field.state.meta.errors)
                    ? field.state.meta.errors.join(', ')
                    : field.state.meta.errors}
                </em>
              ) : null}
            </div>
          )}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={removeLanguage}
        className="h-8 w-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
        aria-label={`Remove language at index ${index}`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
