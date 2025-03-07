'use client'

import { Edit, X, Plus, Check, Globe } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { PlatformIcon } from '@components/shared/platform-icon'
import type { SocialLink } from '@lib/types/profile'
import { detectPlatform, enhanceSocialLink } from '@lib/utils/detect-platform'

interface SocialsSectionProps {
  socials: SocialLink[]
  onChange: (socials: SocialLink[]) => void
}

export function SocialsSection({ socials, onChange }: SocialsSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedSocials, setEditedSocials] = useState<SocialLink[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    if (!socials || socials.length === 0) {
      setEditedSocials([{ platform: '', url: '' }])
    } else {
      setEditedSocials([...socials])
    }
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    setIsEditing(false)

    // Process the social links into the format expected by the server
    const processedSocials = editedSocials.filter(
      (social) => social.platform && social.url,
    )

    onChange(processedSocials)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const addSocial = () => {
    setEditedSocials([...editedSocials, { platform: '', url: '' }])
    setTimeout(() => {
      const inputs = document.querySelectorAll(
        'input[placeholder="Social URL"]',
      )
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement
      lastInput?.focus()
    }, 100)
  }

  const removeSocial = (index: number) => {
    const updated = editedSocials.filter((_, i) => i !== index)
    setEditedSocials(updated)
  }

  const updateSocial = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    const updated = [...editedSocials]

    if (field === 'url' && !updated[index].platform) {
      // Auto-detect platform using our enhanced detection
      const platformInfo = detectPlatform(value)

      if (platformInfo.name !== 'Website') {
        updated[index] = {
          ...updated[index],
          [field]: value,
          platform: platformInfo.name,
        }
      } else {
        updated[index] = { ...updated[index], [field]: value }
      }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }

    setEditedSocials(updated)
  }

  // Enhance socials with platform info for display
  const enhancedSocials = socials.map(enhanceSocialLink)

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
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="mr-1 h-3.5 w-3.5" /> Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-[#63B7B7] hover:bg-[#63B7B7]/10"
            >
              <Check className="mr-1 h-3.5 w-3.5" /> Save
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            {editedSocials?.map((social, index) => {
              const platformInfo = detectPlatform(social.url)

              return (
                <div key={index} className="group flex items-center gap-1">
                  <div className="flex flex-1 gap-1">
                    <div className="relative w-1/2">
                      <Input
                        value={social.platform}
                        onChange={(e) =>
                          updateSocial(index, 'platform', e.target.value)
                        }
                        placeholder="Platform Name"
                        className="h-9 w-full pl-9 !text-xs focus-visible:ring-[#63B7B7]"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <PlatformIcon
                          platform={social.platform}
                          url={social.url}
                          size={16}
                        />
                      </div>
                    </div>
                    <Input
                      ref={index === 0 ? inputRef : undefined}
                      value={social.url}
                      onChange={(e) =>
                        updateSocial(index, 'url', e.target.value)
                      }
                      placeholder="Social URL"
                      className="h-9 w-2/3 !text-xs focus-visible:ring-[#63B7B7]"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSocial(index)}
                    className="h-8 w-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={addSocial}
              className="mt-4 h-8 w-full rounded-lg border-[#63B7B7]/30 px-3 !text-xs text-[#63B7B7] hover:border-[#63B7B7] hover:bg-[#63B7B7]/5"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add social link
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {enhancedSocials?.length > 0 ? (
              enhancedSocials.map((social, index) => (
                <Link
                  key={index}
                  href={
                    social.url.startsWith('http')
                      ? social.url
                      : `https://${social.url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-all hover:border-[#63B7B7]/30 hover:bg-[#63B7B7]/5"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md bg-${social.platformInfo.color.replace('text-', '')}/10`}
                  >
                    <PlatformIcon
                      platform={social.platform}
                      url={social.url}
                      size={18}
                      className={social.platformInfo.color}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {social.platform || social.platformInfo.name}
                    </span>
                    <span className="!text-xs text-gray-500">{social.url}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                No social links added yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
