'use client'

import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'

import {
  BadgeCheck,
  Building,
  CheckCircle,
  Globe,
  MapPin,
  Star,
  Edit,
  X,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@dallah/design-system'

export function CompanyCard({
  data,
  isOwner,
  isPublicView,
  onUpdate,
  onTogglePublicView,
}: {
  data: {
    industry: string
    verified: boolean
    logo: string
    name: string
    size: string
    location: string
    website: string
    rating: number
    joinedAt: string
  }
  isOwner: boolean
  isPublicView: boolean
  onUpdate?: (updatedCompany: Partial<typeof data>) => void
  onTogglePublicView?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCompany, setEditedCompany] = useState({ ...data })

  const handleEdit = () => {
    setEditedCompany({ ...data })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        industry: editedCompany.industry,
        size: editedCompany.size,
        location: editedCompany.location,
        website: editedCompany.website,
        name: editedCompany.name,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string | boolean) => {
    setEditedCompany((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <Badge className="!rounded-full !bg-[#BEDDF1]/20 px-3 py-1 text-xs !text-[#3A97A0]">
          {data.verified ? (
            <>
              <BadgeCheck className="mr-1 h-4 w-4" />
              Verified
            </>
          ) : (
            'Not Verified'
          )}
        </Badge>

        {isOwner && !isEditing && (
          <div className="flex items-center gap-2">
            {onTogglePublicView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onTogglePublicView}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#3A97A0]"
                title={
                  isPublicView
                    ? 'Switch to private view'
                    : 'Switch to public view'
                }
              >
                {isPublicView ? (
                  <EyeOff className="mr-1 !h-4 !w-4" />
                ) : (
                  <Eye className="mr-1 !h-4 !w-4" />
                )}
                {isPublicView ? 'Private' : 'Public'}
              </Button>
            )}
            {!isPublicView && (
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
          </div>
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

      <div className="flex flex-col items-center">
        <div className="relative mb-4 h-24 w-24">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-[#BEDDF1]/20 shadow-sm ring-4 ring-[#BEDDF1]/30">
            <Image
              src={data.logo}
              alt={data.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <h2 className="mb-0.5 text-lg font-semibold text-gray-800">
          {data.name}
        </h2>
        {isEditing ? (
          <Input
            value={editedCompany.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="my-2 h-7 text-center text-sm"
            placeholder="Industry"
          />
        ) : (
          <p className="mb-2 text-sm text-gray-600">{data.industry}</p>
        )}

        {!isEditing && (
          <div className="mb-4 flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= Math.floor(data.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : star - 0.5 <= (data.rating || 0)
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {data.rating ?? 'N/A'}
            </span>
          </div>
        )}

        {isOwner && isPublicView && !isEditing && (
          <div className="mb-5 grid w-full grid-cols-2 gap-3">
            <Button className="h-9 !bg-[#3A97A0] text-xs text-white transition-colors duration-200 hover:!bg-[#2b7278]">
              Contact
            </Button>
            <Button
              variant="outline"
              className="h-9 border-[#3A97A0] text-xs text-[#3A97A0] transition-colors duration-200 hover:border-[#2b7278] hover:bg-[#BEDDF1]/25 hover:text-[#2b7278]"
            >
              View Projects
            </Button>
          </div>
        )}

        <div className="mb-5 w-full space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#BEDDF1]/20">
              <Building className="h-3 w-3 text-[#3A97A0]" />
            </div>
            <div className="w flex w-full items-center justify-between">
              <span className="text-xs text-gray-600">Company Size</span>
              {isEditing ? (
                <Input
                  value={editedCompany.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="h-7 !w-28 text-right text-xs"
                  placeholder="Company size"
                  type="number"
                />
              ) : (
                <span className="text-xs font-medium text-gray-800">
                  {data.size}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#BEDDF1]/20">
              <MapPin className="h-3 w-3 text-[#3A97A0]" />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xs text-gray-600">Location</span>
              {isEditing ? (
                <Input
                  value={editedCompany.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="h-7 !w-32 text-right text-xs"
                />
              ) : (
                <span className="text-xs font-medium text-gray-800">
                  {data.location}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#BEDDF1]/20">
              <Globe className="h-3 w-3 text-[#3A97A0]" />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-xs text-gray-600">Joined Dalla since</span>

              <span className="text-xs font-medium text-gray-800">
                {data.joinedAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
