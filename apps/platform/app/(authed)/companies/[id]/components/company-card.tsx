'use client'

import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { Modal } from '@dallah/design-system'

import {
  BadgeCheck,
  Building,
  Globe,
  MapPin,
  Star,
  Edit,
  X,
  Check,
  Eye,
  EyeOff,
  Briefcase,
  Clock,
  ArrowRight,
  RssIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@dallah/design-system'
import type { CompanyProfile } from '@lib/atoms/company/meta'
import { Link } from 'next-view-transitions'
import { LocationSelector } from '@dallah/components/locationSelector'
import { CompanySizeSelector } from '@dallah/components/company-sizeSelector'
import { ListDisplay } from '@dallah/components/listDisplay'

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
    openProjects: CompanyProfile['data']['projects']
  }
  isOwner: boolean
  isPublicView: boolean
  onUpdate?: (updatedCompany: Partial<typeof data>) => void
  onTogglePublicView?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCompany, setEditedCompany] = useState({ ...data })
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen)
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
              src={data.logo || '/placeholder.svg'}
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

        {(!isOwner || isPublicView) && (
          <div className="mb-5 grid w-full grid-cols-2 gap-3">
            <Button className="h-9 !bg-[#3A97A0] text-xs text-white transition-colors duration-200 hover:!bg-[#2b7278]">
              Contact
            </Button>
            <Button
              variant="outline"
              className="h-9 border-[#3A97A0] text-xs text-[#3A97A0] transition-colors duration-200 hover:border-[#2b7278] hover:bg-[#BEDDF1]/25 hover:text-[#2b7278]"
              onClick={handleToggleModal}
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
                <div className="w-4/5">
                  <CompanySizeSelector
                    value={editedCompany.size}
                    onChange={(value: string) => handleChange('size', value)}
                    placeholder="Select company size"
                    className="text-xs"
                  />
                </div>
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
                <div className="w-4/5">
                  <LocationSelector
                    value={editedCompany.location}
                    onChange={(value) => handleChange('location', value)}
                    placeholder={{
                      country: 'Country',
                      city: 'City',
                    }}
                  />
                </div>
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        title={`Ongoing Projects for ${data.name}`}
        className="max-w-2xl"
      >
        <div className="flex w-full flex-col items-center">
          <div className="mt-4 grid w-full gap-4 px-4">
            {data.openProjects.length > 0 ? (
              data.openProjects.map((project) => (
                <Link
                  key={project.id}
                  className="block w-full"
                  href={`/projects/${project.id}`}
                >
                  <div className="flex flex-col rounded-xl border border-neutral-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-base font-semibold text-gray-800">
                        {project.title}
                      </h3>
                      <Badge
                        className={`${project.approved ? '!bg-green-100 !text-green-700' : '!bg-amber-100 !text-amber-700'}`}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {project.description}
                    </p>

                    <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BEDDF1]/20">
                          <Building className="h-3 w-3 text-[#3A97A0]" />
                        </div>
                        <span className="text-xs text-gray-600">
                          {project.jobTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BEDDF1]/20">
                          <RssIcon className="h-3 w-3 text-[#3A97A0]" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <span className="block text-xs font-medium text-gray-600">
                            Scope:
                          </span>
                          <div className="max-h-12 overflow-hidden">
                            {project.scope &&
                            project.scope.includes('%DALLA%') ? (
                              <ListDisplay
                                value={project.scope}
                                emptyText="No scope specified"
                                className="max-h-10 overflow-hidden"
                                itemClassName="text-xs text-gray-500"
                              />
                            ) : (
                              <span className="line-clamp-1 text-xs text-gray-500">
                                {project.scope || 'No scope specified'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BEDDF1]/20">
                          <Globe className="h-3 w-3 text-[#3A97A0]" />
                        </div>
                        <span className="text-xs text-gray-600">
                          Budget: ${project.meta.budget}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#BEDDF1]/20">
                          <Clock className="h-3 w-3 text-[#3A97A0]" />
                        </div>
                        <span className="text-xs text-gray-600">
                          Duration: {project.meta.duration}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50 px-2 py-0.5 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 px-2 py-0.5 text-xs"
                        >
                          +{project.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-[#3A97A0] hover:bg-[#3A97A0]/10"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Briefcase className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg text-gray-600">
                  No ongoing projects for {data.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Check back later for new opportunities
                </p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
