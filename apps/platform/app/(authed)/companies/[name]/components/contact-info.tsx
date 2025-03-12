'use client'

import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import {
  Award,
  ExternalLink,
  Trophy,
  Mail,
  BarChart3,
  Edit,
  X,
  Check,
  MapPin,
  Globe,
  Plus,
} from 'lucide-react'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { PlatformIcon } from '@components/shared/platform-icon'
import { detectPlatform, enhanceSocialLink } from '@lib/utils/detect-platform'
import type { SocialLink } from '@lib/types/profile'

export function ContactInfoCard({
  data,
  isOwner = false,
  isPublicView = false,
  onUpdate,
}: {
  data: {
    email: string
    website: string
    location: string
    socialLinks?: Record<string, string>
  }
  isOwner?: boolean
  isPublicView?: boolean
  onUpdate?: (updatedInfo: Partial<typeof data>) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState({ ...data })
  const [editedSocials, setEditedSocials] = useState<SocialLink[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const initializeSocials = () => {
    if (!data.socialLinks || Object.keys(data.socialLinks).length === 0) {
      return [{ platform: '', url: '' }]
    }

    return Object.entries(data.socialLinks).map(([platform, url]) => ({
      platform,
      url,
    }))
  }

  const handleEdit = () => {
    setEditedInfo({ ...data })
    setEditedSocials(initializeSocials())
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleSave = () => {
    if (onUpdate) {
      const socialLinks: Record<string, string> = {}

      editedSocials
        .filter((social) => social.platform && social.url)
        .forEach((social) => {
          socialLinks[social.platform] = social.url
        })

      onUpdate({
        website: editedInfo.website,
        location: editedInfo.location,
        socialLinks,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
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

  const getSocialLinks = (): SocialLink[] => {
    if (!data.socialLinks || Object.keys(data.socialLinks).length === 0) {
      return []
    }

    return Object.entries(data.socialLinks).map(([platform, url]) => ({
      platform,
      url,
    }))
  }

  const enhancedSocials = getSocialLinks().map(enhanceSocialLink)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <Mail className="h-4 w-4 text-[#3A97A0]" />
          Contact Information
        </h3>

        {isOwner && !isPublicView && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#3A97A0]"
          >
            <Edit className="mr-1 !h-4 !w-4" />
            Edit
          </Button>
        )}

        {isEditing && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-7 rounded-full px-3 text-xs text-[#3A97A0] hover:bg-[#3A97A0]/10"
            >
              <Check className="mr-1 h-3 w-3" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <span className="text-xs text-gray-600">Website</span>
          {isEditing ? (
            <div className="flex items-center">
              <Input
                value={editedInfo.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="h-7 w-48 text-xs"
                placeholder="Website URL"
              />
            </div>
          ) : (
            <a
              href={data.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#3A97A0] hover:underline"
            >
              {data.website}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Location</span>
          {isEditing ? (
            <div className="flex items-center">
              <Input
                value={editedInfo.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="h-7 w-48 text-xs"
                placeholder="Location"
              />
            </div>
          ) : (
            <span className="text-xs text-gray-800">{data.location}</span>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <h4 className="mb-3 text-sm text-gray-800">Social Presence</h4>

        {isEditing ? (
          <div className="space-y-3">
            {editedSocials.map((social, index) => (
              <div key={index} className="group flex items-center gap-1">
                <div className="flex flex-1 gap-1">
                  <div className="relative w-1/2">
                    <Input
                      value={social.platform}
                      onChange={(e) =>
                        updateSocial(index, 'platform', e.target.value)
                      }
                      placeholder="Platform Name"
                      className="h-9 w-full pl-9 !text-xs focus-visible:ring-[#3A97A0]"
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
                    onChange={(e) => updateSocial(index, 'url', e.target.value)}
                    placeholder="Social URL"
                    className="h-9 w-2/3 !text-xs focus-visible:ring-[#3A97A0]"
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
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={addSocial}
              className="mt-4 h-8 w-full rounded-lg border-[#3A97A0]/30 px-3 !text-xs text-[#3A97A0] hover:border-[#3A97A0] hover:bg-[#3A97A0]/5"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add social link
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {enhancedSocials.length > 0 ? (
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
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-all hover:border-[#3A97A0]/30 hover:bg-[#3A97A0]/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3A97A0]/10">
                    <PlatformIcon
                      platform={social.platform}
                      url={social.url}
                      size={18}
                      className="text-[#3A97A0]"
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
              <div className="flex justify-center">
                <div className="text-center text-sm text-gray-500">
                  No social links added yet
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
