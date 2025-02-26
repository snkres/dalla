"use client"

import Image from "next/image"
import Link from "next/link"
import { Button, Logomark } from "@dallah/design-system"
import { Tabs, TabsList, TabsTrigger } from "@dallah/design-system"
import { Copy, MapPin, Mail, LinkIcon, CheckCircle, Edit, X, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { companyProfileAtom } from "@lib/atoms/company/profile"
import { useQueryState } from "nuqs"
import { editCompanyProfile } from "@lib/api/company/profile"

export default function CompanyProfileClient({
  params,
}: {
  params: {
    id: string
  }
}) {
  const [companyProfile, setCompanyProfile] = useAtom(companyProfileAtom)
  const [activeTab, setActiveTab] = useState("all")
  const [isFollowing, setIsFollowing] = useState(false)
  const [viewMode, setViewMode] = useQueryState("view", {
    defaultValue: "default",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(companyProfile)
  const [isSaving, setIsSaving] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const isOwnProfile = params.id === companyProfile?.id
  const canEdit = isOwnProfile && viewMode !== 'public'

  // Keep editedProfile in sync with companyProfile when not editing
  useEffect(() => {
    if (!isEditing) {
      setEditedProfile(companyProfile)
    }
  }, [companyProfile, isEditing])

  const handleCopy = () => {
    const profileUrl = `platform.dalla.app/companies/${companyProfile.id}`
    navigator.clipboard.writeText(profileUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => {
      if (field === 'name') {
        return { ...prev, name: value }
      } else if (field === 'location' || field === 'website' || field === 'bio' || field === 'headline') {
        return {
          ...prev,
          CompanyProfile: {
            ...prev.CompanyProfile,
            [field]: value
          }
        }
      } else if (field === 'industry') {
        return {
          ...prev,
          CompanyProfile: {
            ...prev.CompanyProfile,
            meta: {
              ...prev.CompanyProfile.meta,
              industry: value
            }
          }
        }
      }
      return prev
    })
  }

  const toggleEditMode = () => {
    if (isEditing) {
      // If canceling edit, reset to original values
      setEditedProfile(companyProfile)
    }
    setIsEditing(!isEditing)
  }

  const saveChanges = async () => {
    setIsSaving(true)
    try {
      // API call to save the changes
      const response = await editCompanyProfile({
        CompanyProfile: {
          ...editedProfile.CompanyProfile,
          meta: {
            ...editedProfile.CompanyProfile.meta,
            industry: editedProfile.CompanyProfile.meta.industry || ''
          }
        }
      })

      if (response.data.success) {

        setCompanyProfile(response.data.data) // Update the atom with the server response
        setIsEditing(false)
      } else {
        console.error('Failed to update profile')
        // Handle error state - could add toast notifications here
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      // Handle error state
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleViewMode = () => {
    if (viewMode === 'public') {
      setViewMode('default')
    } else {
      setViewMode('public')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-48 bg-[#0A1B2B] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20" />
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="graph" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 100 M 150 0 L 0 150 M 50 0 L 0 50 M 100 50 L 50 100"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-500/20"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#graph)" />
          </svg>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="relative">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="relative bg-snow-white-30 w-32 h-32 rounded-full flex items-center justify-center border border-slate-blue-90 shadow-md">
              {
                editedProfile?.CompanyProfile?.logo ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dalla__Solutions__Copy_-J2aoNEXcuYN6TCXl3qTe7oOaf7Rd0q.png"
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-white h-28 w-28"
                  />
                ) : (
                  <Logomark className="h-20 w-20" />
                )
              }
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-slate-blue-100 rounded-full p-1 cursor-pointer">
                  <Edit size={16} className="text-white" />
                </div>
              )}
              <div className="absolute bottom-0 -right-0" >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <g clipPath="url(#clip0_4092_1521)">
                    <path d="M24.7109 5.66724C25.0148 6.40227 25.5982 6.98652 26.3328 7.29154L28.9085 8.35846C29.6436 8.66295 30.2277 9.24697 30.5321 9.98205C30.8366 10.7171 30.8366 11.5431 30.5321 12.2782L29.466 14.8521C29.1614 15.5875 29.1609 16.4143 29.4669 17.1493L30.5312 19.7225C30.6822 20.0866 30.7599 20.4768 30.76 20.8709C30.76 21.2651 30.6824 21.6553 30.5316 22.0195C30.3808 22.3836 30.1597 22.7144 29.881 22.9931C29.6022 23.2717 29.2713 23.4927 28.9071 23.6434L26.3332 24.7096C25.5982 25.0135 25.0139 25.5969 24.7089 26.3314L23.642 28.9072C23.3375 29.6423 22.7535 30.2263 22.0184 30.5308C21.2833 30.8353 20.4574 30.8353 19.7223 30.5308L17.1484 29.4647C16.4133 29.1609 15.5876 29.1615 14.853 29.4664L12.2772 30.5318C11.5425 30.8355 10.7173 30.8353 9.98283 30.5311C9.24834 30.2268 8.66464 29.6435 8.35995 28.9092L7.29271 26.3326C6.98879 25.5976 6.40542 25.0134 5.67085 24.7083L3.09507 23.6414C2.36031 23.3371 1.77646 22.7534 1.47187 22.0188C1.16727 21.2841 1.16686 20.4586 1.47072 19.7236L2.53688 17.1497C2.84061 16.4146 2.83999 15.5889 2.53515 14.8543L1.47053 12.2766C1.31958 11.9126 1.24186 11.5223 1.2418 11.1282C1.24173 10.7341 1.31933 10.3438 1.47016 9.97966C1.62098 9.61553 1.84208 9.28469 2.12082 9.00605C2.39955 8.7274 2.73046 8.50641 3.09463 8.3557L5.66856 7.28954C6.40295 6.98589 6.98685 6.40325 7.2921 5.66953L8.35902 3.09375C8.6635 2.35867 9.24753 1.77464 9.98261 1.47016C10.7177 1.16568 11.5436 1.16568 12.2787 1.47016L14.8526 2.53632C15.5877 2.84005 16.4134 2.83943 17.148 2.53459L19.7249 1.47182C20.4599 1.1675 21.2856 1.16757 22.0206 1.47199C22.7555 1.77641 23.3395 2.36027 23.644 3.09516L24.7112 5.6717L24.7109 5.66724Z" fill="#2E90FA" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.2665 11.8058C22.4803 11.4701 22.5519 11.0631 22.4656 10.6746C22.3794 10.286 22.1423 9.94759 21.8065 9.73383C21.4708 9.52006 21.0638 9.44843 20.6753 9.5347C20.2867 9.62097 19.9483 9.85806 19.7345 10.1938L13.8605 19.4238L11.1725 16.0638C10.924 15.753 10.5622 15.5536 10.1667 15.5095C9.77118 15.4655 9.37436 15.5803 9.06352 15.8288C8.75269 16.0773 8.55331 16.4391 8.50923 16.8347C8.46516 17.2302 8.58001 17.627 8.82852 17.9378L12.8285 22.9378C12.9776 23.1244 13.1691 23.2727 13.387 23.3703C13.6049 23.468 13.843 23.5122 14.0815 23.4993C14.32 23.4864 14.5519 23.4167 14.758 23.2961C14.9641 23.1755 15.1385 23.0074 15.2665 22.8058L22.2665 11.8058Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_4092_1521">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-4 text-center text-2xl font-bold border-b border-gray-300 focus:border-slate-blue-100 focus:outline-none"
              />
            ) : (
              <h1 className="mt-4 text-2xl font-bold">{editedProfile.name}</h1>
            )}

            {isEditing ? (
              <input
                type="text"
                value={editedProfile?.CompanyProfile?.meta?.industry || ''}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="text-center text-gray-600 border-b border-gray-300 focus:border-slate-blue-100 focus:outline-none"
                placeholder="Industry"
              />
            ) : (
              <p className="text-gray-600">{editedProfile?.CompanyProfile?.meta?.industry}</p>
            )}

            <div className="mt-4 flex gap-3">
              <Button variant="outline">View Website</Button>
              {
                isOwnProfile ? (
                  <Button
                    className="bg-slate-blue-100"
                    onClick={isEditing ? saveChanges : toggleEditMode}
                    disabled={isSaving}
                  >
                    {
                      isEditing ? (
                        isSaving ? 'Saving...' : 'Save Changes'
                      ) : (
                        viewMode === 'public' ? 'Edit Profile' : 'View Public Profile'
                      )
                    }
                  </Button>
                ) : (
                  <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)} className="bg-slate-blue-100 hover:bg-slate-blue-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_6023_1263)">
                        <path d="M10 6.66669V13.3334M6.66669 10H13.3334M18.3334 10C18.3334 14.6024 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6024 1.66669 10C1.66669 5.39765 5.39765 1.66669 10 1.66669C14.6024 1.66669 18.3334 5.39765 18.3334 10Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_6023_1263">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )
              }
              {isEditing && (
                <Button variant="outline" onClick={toggleEditMode}>
                  <X size={16} className="mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <section>
                <div className="flex flex-col gap-2 pb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.CompanyProfile?.headline || ''}
                      onChange={(e) => handleInputChange('headline', e.target.value)}
                      className="text-xl font-semibold border-b border-gray-300 focus:border-slate-blue-100 focus:outline-none"
                      placeholder="Headline"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold">
                      {editedProfile?.CompanyProfile?.headline || "Headline"}
                    </h2>
                  )}

                  {isEditing ? (
                    <textarea
                      value={editedProfile?.CompanyProfile?.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full min-h-24 p-2 border border-gray-300 rounded-md focus:border-slate-blue-100 focus:outline-none"
                      placeholder="Company bio"
                    />
                  ) : (
                    <p>{editedProfile?.CompanyProfile?.bio || "Bio"}</p>
                  )}
                </div>
                <div className="h-0.5 w-full bg-background"></div>
              </section>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6 border-[#d0d5dd] border h-fit w-fit p-6 rounded-xl shadow-sm">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                {isEditing ? (
                  <div className="mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={editedProfile?.CompanyProfile?.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-slate-blue-100 focus:outline-none"
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <p className="mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {editedProfile?.CompanyProfile?.location || "Add location"}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                {isEditing ? (
                  <div className="mt-1 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={editedProfile?.CompanyProfile?.website || ''}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-slate-blue-100 focus:outline-none"
                      placeholder="https://example.com"
                    />
                  </div>
                ) : (
                  <Link
                    href={editedProfile?.CompanyProfile?.website || "#"}
                    className="mt-1 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {editedProfile?.CompanyProfile?.website ?
                      editedProfile.CompanyProfile.website.replace('https://', '') :
                      "Add website"}
                  </Link>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Profile URL</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-gray-600">
                    platform.dalla.app/companies/{editedProfile?.id?.slice(0, 5)}...
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={handleCopy}
                  >
                    {copySuccess ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Copy className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}