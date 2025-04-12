import { ProficiencyBadge } from './proficiency-badge'

export function LangCard({
  language,
  proficiency,
}: {
  language: string
  proficiency: string
}) {
  return (
    <div className="flex items-center justify-between py-3 transition-colors hover:bg-gray-50/50">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-800">{language}</span>
      </div>
      <ProficiencyBadge proficiency={proficiency} />
    </div>
  )
}
