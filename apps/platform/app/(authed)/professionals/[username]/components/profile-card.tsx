'use client'

import React, { useState } from 'react'
import { Button } from '@dallah/design-system'
import {
  Edit,
  DollarSign,
  Clock,
  BadgeCheck,
  Award,
  Star,
  Briefcase,
  Calendar,
  CreditCard,
  CheckCircle,
  X,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react'
import Image from 'next/image'
import { Input } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { cn } from '@dallah/utils'

export function ProfileCard({
  profile,
  isPublicView,
  isOwner,
  onTogglePublicView,
  onUpdate,
}: {
  profile: {
    avatar: string
    isVerified: boolean
    name: string
    title: string
    hourlyRate: number | null
    totalEarned: number | null
    projectsCompleted: number | null
    successRate: number | null
    weeklyAvailability: number | null
    availability: string
    rating: number | null
    projectCompletion: string | null
  }
  isPublicView: boolean
  isOwner: boolean
  onTogglePublicView?: () => void
  onUpdate?: (updatedProfile: typeof profile) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({ ...profile })

  const handleEdit = () => {
    setEditedProfile({ ...profile })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedProfile)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string | number) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  console.log(profile)
  console.log(isPublicView)
  console.log(isOwner)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Professional Profile
        </h2>

        {isOwner &&
          (!isEditing ? (
            <div className="flex items-center gap-2">
              {onTogglePublicView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onTogglePublicView}
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
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
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
                >
                  <Edit className="mr-1 !h-4 !w-4" />
                  Edit
                </Button>
              )}
            </div>
          ) : (
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
                className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
              >
                <Check className="mr-1 h-3 w-3" />
                Save
              </Button>
            </div>
          ))}
      </div>

      <div className="p-5">
        <div className="mb-2 flex justify-end">
          {isEditing ? (
            <Select
              value={editedProfile.availability}
              onValueChange={(value) => handleChange('availability', value)}
            >
              <SelectTrigger className="h-7 w-36 rounded-full text-xs">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="limited">Limited Availability</SelectItem>
                <SelectItem value="unavailable">Not Available</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1 text-xs',
                profile.availability === 'available'
                  ? 'bg-[#00A58C]/10 text-[#00A58C]'
                  : profile.availability === 'limited'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-gray-50 text-gray-600',
              )}
            >
              <div
                className={cn(
                  'h-2 w-2 animate-pulse rounded-full',
                  profile.availability === 'available'
                    ? 'bg-[#00A58C]'
                    : profile.availability === 'limited'
                      ? 'bg-amber-500'
                      : 'bg-gray-500',
                )}
              ></div>
              {profile.availability === 'available'
                ? 'Available now'
                : profile.availability === 'limited'
                  ? 'Limited Availability'
                  : 'Not Available'}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="relative mb-4 h-24 w-24">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-[#63B7B7]/10 shadow-sm ring-4 ring-[#63B7B7]/20">
              <Image
                src={profile.avatar}
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* <div className="absolute -right-1 -top-1 rounded-full bg-white p-0.5">
              <Award className="h-5 w-5 fill-amber-400 text-white" />
            </div> */}
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 rounded-full">
                <BadgeCheck className="h-5 w-5 fill-[#63B7B7] text-white" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mb-2 w-full space-y-2">
              <Input
                value={editedProfile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="h-8 text-center text-base font-medium"
                placeholder="Your name"
              />
              <Input
                value={editedProfile.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="h-7 text-center text-sm"
                placeholder="Your professional title"
              />
            </div>
          ) : (
            <>
              <h2 className="mb-0.5 text-lg font-semibold text-gray-800">
                {profile.name}
              </h2>
              <p className="mb-2 text-sm text-gray-600">{profile.title}</p>
            </>
          )}

          <div className="mb-4 flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= Math.floor(profile.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : star - 0.5 <= (profile.rating || 0)
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              {profile.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>

          {isOwner && isPublicView && (
            <div className="mb-5 grid w-full grid-cols-2 gap-3">
              <Button className="h-9 !bg-[#63B7B7] text-xs text-white transition-colors duration-200 hover:!bg-[#63B7B7]/90">
                Contact
              </Button>
              <Button
                variant="outline"
                className="h-9 border-[#63B7B7] text-xs text-[#63B7B7] transition-colors duration-200 hover:border-[#63B7B7] hover:!bg-[#63B7B7]/10"
              >
                Hire Now
              </Button>
            </div>
          )}

          <div className="mb-5 grid w-full grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
              <div className="mb-1 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-[#63B7B7]" />
              </div>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile.hourlyRate || ''}
                  onChange={(e) =>
                    handleChange('hourlyRate', parseInt(e.target.value))
                  }
                  className="h-7 border-none bg-transparent text-center text-base font-medium text-[#63B7B7]"
                />
              ) : (
                <div className="text-base font-medium text-[#63B7B7]">
                  ${profile.hourlyRate || '0'}/hr
                </div>
              )}
              <div className="text-xs text-gray-600">Hourly Rate</div>
            </div>

            <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
              <div className="mb-1 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-[#63B7B7]" />
              </div>

              <div className="text-base font-medium text-[#63B7B7]">
                ${profile.totalEarned || '0'}
              </div>

              <div className="text-xs text-gray-600">Total Earned</div>
            </div>
          </div>

          <div className="mb-5 w-full space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <CheckCircle className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full justify-between">
                <span className="text-xs text-gray-600">
                  Projects Completed
                </span>

                <span className="text-xs font-medium text-gray-800">
                  {profile.projectsCompleted || 0}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Award className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full justify-between">
                <span className="text-xs text-gray-600">Success Rate</span>
                <span className="text-xs font-medium text-gray-800">
                  {profile.successRate ? `${profile.successRate}%` : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#63B7B7]/10">
                <Clock className="h-3.5 w-3.5 text-[#63B7B7]" />
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-gray-600">
                  Weekly Availability
                </span>
                {isEditing ? (
                  <div className="flex w-1/2 items-center">
                    <Input
                      type="number"
                      value={editedProfile.weeklyAvailability || ''}
                      onChange={(e) =>
                        handleChange(
                          'weeklyAvailability',
                          parseInt(e.target.value),
                        )
                      }
                      className="h-9 text-right !text-xs"
                    />
                    <span className="ml-1 text-xs">hrs/week</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-gray-800">
                    {profile.weeklyAvailability
                      ? `${profile.weeklyAvailability}+ hrs/week`
                      : 'N/A'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-100 pt-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800">
              <Calendar className="h-4 w-4 text-[#63B7B7]" />
              Typical Project Delivery
            </h3>

            {isEditing ? (
              <Select
                value={editedProfile.projectCompletion || ''}
                onValueChange={(value) =>
                  handleChange('projectCompletion', value)
                }
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue placeholder="Project Completion Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2-3 weeks">2-3 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="1-2 months">1-2 Months</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="rounded-lg bg-[#63B7B7]/5 p-3 text-center">
                <span className="text-sm font-medium capitalize text-[#63B7B7]">
                  {profile.projectCompletion
                    ? profile.projectCompletion
                    : 'N/A'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
