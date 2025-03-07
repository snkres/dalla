import { Globe, Edit } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { SocialsSectionProps } from '@lib/types/profile'
import Link from 'next/link'

export function SocialsSelection({
  socials,
  setSocials,
  editedSocials,
  setEditedSocials,
  isEditing,
  setEditingSection,
}: SocialsSectionProps) {
  const handleEdit = () => {
    setEditedSocials([...socials])
    setEditingSection('socials')
  }

  const handleSave = () => {
    setSocials([...editedSocials])
    setEditingSection(null)
  }

  const handleCancel = () => {
    setEditingSection(null)
  }

  const updateSocialUrl = (index: number, url: string) => {
    const updated = [...editedSocials]
    updated[index].url = url
    setEditedSocials(updated)
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Globe className="h-4 w-4 text-[#63B7B7]" />
          Social Media
        </h2>

        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-gray-500 hover:text-[#63B7B7]"
          >
            <Edit className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[#63B7B7] hover:bg-[#63B7B7]/90"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-3">
        {(isEditing ? editedSocials : socials).map((social, index) => (
          <div key={index} className="px-1 py-2">
            <div className="mb-0.5 flex items-center justify-start gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#63B7B7]/10 text-[#63B7B7]">
                {social.icon}
              </div>
              <Link
                href={`https://${social.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 transition-colors duration-200 hover:text-[#63B7B7]"
              >
                {social.url}
              </Link>
            </div>

            {isEditing && (
              <Input
                value={social.url}
                onChange={(e) => updateSocialUrl(index, e.target.value)}
                className="mt-1 h-8 text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
