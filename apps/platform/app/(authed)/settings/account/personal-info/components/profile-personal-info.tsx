'use client'

import { useState, useEffect } from 'react'
import { Check, AlertTriangle } from 'lucide-react'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dallah/design-system'
import { Switch } from '@dallah/design-system'
import { motion } from 'motion/react'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOwnProProfile, updateProProfile } from '@lib/api/pro/profile'
import {
  getOwnCompanyProfile,
  updateCompanyProfile,
} from '@lib/api/company/profile'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { companyMetaAtom } from '@lib/atoms/company/meta'
import { proMetaAtom } from '@lib/atoms/pro/meta'

const timezones = [
  'Pacific Time (PT)',
  'Mountain Time (MT)',
  'Central Time (CT)',
  'Eastern Time (ET)',
]

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese']

export function ProfilePersonalInfo() {
  const { toast } = useToast()
  const [global] = useAtom(globalAtom)
  const [companyMeta, setCompanyMeta] = useAtom(companyMetaAtom)
  const [proMeta, setProMeta] = useAtom(proMetaAtom)
  const { data: proProfile } = useQuery({
    queryKey: ['own-pro-profile', global.username],
    queryFn: () => getOwnProProfile(),
    enabled: global.mode === 'user',
  })

  const { data: companyProfile } = useQuery({
    queryKey: ['own-company-profile', global.id],
    queryFn: () => getOwnCompanyProfile(),
    enabled: global.mode === 'company',
  })
  const queryClient = useQueryClient()

  const profileMutation = useMutation({
    mutationFn: updateProProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['own-pro-profile', global.username],
      })
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been updated successfully',
      })
      setProMeta({
        ...proMeta,
        data: {
          ...proMeta.data,
          UserProfile: {
            ...proMeta.data.UserProfile,
            headline: formData.headline,
          },
        },
      })
    },
    onError: (error) => {
      console.error('Failed to update profile:', error)
      toast({
        title: 'Update failed',
        description: 'There was a problem updating your profile',
        variant: 'destructive',
      })
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(
        ['own-company-profile', global.id],
        (oldData: any) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: {
                ...oldData.data.data,
                CompanyProfile: {
                  ...oldData.data.data,
                  ...updatedData.data?.data,
                },
              },
            },
          }
        },
      )

      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been updated successfully',
      })
      setCompanyMeta({
        ...companyMeta,
        data: {
          ...companyMeta.data,
          CompanyProfile: {
            ...companyMeta.data.CompanyProfile,
            headline: formData.headline,
          },
        },
      })
    },
    onError: (error) => {
      console.error('Failed to update profile:', error)
      toast({
        title: 'Update failed',
        description: 'There was a problem updating your profile',
        variant: 'destructive',
      })
    },
  })

  const [isHoveringEmail, setIsHoveringEmail] = useState(false)
  const [isHoveringPhone, setIsHoveringPhone] = useState(false)

  // Add form state
  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    bio: '',
    language: 'English',
    timezone: 'Pacific Time (PT)',
  })

  useEffect(() => {
    if (global.mode === 'user' && proProfile?.data?.data) {
      setFormData({
        fullName: proProfile.data.data.User?.name || '',
        headline: proProfile.data.data.headline || '',
        email: proProfile.data.data.User?.email || '',
        phone: proProfile.data.data.meta?.phone || '',
        bio: proProfile.data.data.bio || '',
        language: 'English',
        timezone: 'Pacific Time (PT)',
      })
    } else if (global.mode === 'company' && companyProfile?.data?.data) {
      setFormData({
        fullName: companyProfile.data.data.name || '',
        headline: companyProfile.data.data.CompanyProfile?.headline || '',
        email: companyProfile.data.data.email || '',
        phone: '',
        bio: companyProfile.data.data.CompanyProfile?.bio || '',
        language: 'English',
        timezone: 'Pacific Time (PT)',
      })
    }
  }, [proProfile, companyProfile, global.mode])

  const handleSubmit = () => {
    if (global.mode === 'user') {
      // Create a cleaned profile object without restricted properties
      const {
        id,
        userId,
        precentage,
        createdAt,
        updatedAt,
        percentage,
        User,
        projects,
        avatar,
        resume,
        gender,
        meta,
        ...cleanProfile
      } = proProfile?.data?.data || {}

      // Clean nested arrays if they exist
      // @ts-ignore
      const cleanedExperience = cleanProfile.experience?.map(
        // @ts-ignore
        ({ profileId, createdAt, updatedAt, ...rest }) => rest,
      )
      // @ts-ignore
      const cleanedEducation = cleanProfile.education?.map(
        // @ts-ignore
        ({ profileId, createdAt, updatedAt, ...rest }) => rest,
      )

      // Construct the payload with updated fields and cleaned arrays
      profileMutation.mutate({
        ...cleanProfile,
        headline: formData.headline,
        bio: formData.bio,
        experience: cleanedExperience,
        education: cleanedEducation,
      })
    } else {
      updateProfileMutation.mutate({
        headline: formData.headline,
        bio: formData.bio,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              disabled
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="rounded-lg border-gray-200 transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="text-sm font-medium text-gray-700"
            >
              Headline
            </label>
            <Input
              id="headline"
              placeholder="Enter your display name"
              defaultValue={
                global.mode === 'user'
                  ? proProfile?.data?.data?.headline
                  : companyProfile?.data?.data?.CompanyProfile?.headline
              }
              value={formData.headline}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, headline: e.target.value }))
              }
              className="rounded-lg border-gray-200 transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div
              className="relative"
              onMouseEnter={() => setIsHoveringEmail(true)}
              onMouseLeave={() => setIsHoveringEmail(false)}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                disabled
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="rounded-lg border-gray-200 pr-24 transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
              />
              {(global.mode === 'user' &&
                proProfile?.data?.data?.User?.onboarded) ||
              (global.mode === 'company' &&
                companyProfile?.data?.data?.onboarded) ? (
                <motion.div
                  animate={{ opacity: isHoveringEmail ? 0.9 : 1 }}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 transform items-center gap-1.5 text-[#63B7B7]"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-medium">Verified</span>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: isHoveringEmail ? 0.9 : 1 }}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 transform items-center gap-1.5 text-[#63B7B7]"
                >
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-medium">Verify</span>
                </motion.div>
              )}
            </div>
          </div>
          {global.mode === 'user' && (
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div
                className="relative"
                onMouseEnter={() => setIsHoveringPhone(true)}
                onMouseLeave={() => setIsHoveringPhone(false)}
              >
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  disabled
                  className="rounded-lg border-gray-200 pr-20 transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
                />
                {/* <motion.div
                  animate={{ opacity: isHoveringPhone ? 0.9 : 1 }}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 transform items-center gap-1.5 text-amber-600"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-medium">Verify</span>
                </motion.div> */}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <span className="text-xs text-gray-500">Max 300 characters</span>
          </div>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="h-[200px] resize-none rounded-lg border-gray-200 transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="timezone"
              className="text-sm font-medium text-gray-700"
            >
              Timezone
            </label>
            <Select defaultValue="Pacific Time (PT)">
              <SelectTrigger
                id="timezone"
                className="rounded-lg border-gray-200 bg-white transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
              >
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-100">
                {timezones.map((tz) => (
                  <SelectItem
                    key={tz}
                    value={tz}
                    className="transition-colors duration-150 hover:bg-[#BEDDF1]/20 focus:bg-[#BEDDF1]/40"
                  >
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <Select defaultValue="English">
              <SelectTrigger
                id="language"
                className="rounded-lg border-gray-200 bg-white transition-all duration-200 focus:border-[#63B7B7] focus:ring-[#63B7B7]"
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-100">
                {languages.map((lang) => (
                  <SelectItem
                    key={lang}
                    value={lang}
                    className="transition-colors duration-150 hover:bg-[#BEDDF1]/20 focus:bg-[#BEDDF1]/40"
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-100 pt-6">
          <h3 className="text-md font-medium text-gray-800">
            Privacy Settings
          </h3>

          <div className="flex items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Profile Visibility
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                Make your profile visible to other users
              </p>
            </div>
            <Switch
              defaultChecked
              className="!h-5 !w-9 data-[state=checked]:!border-[#63B7B7] data-[state=checked]:!bg-[#63B7B7]"
            />
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Show Email Address
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                Allow others to see your email
              </p>
            </div>
            <Switch className="data-[state=checked]:border-[#63B7B7] data-[state=checked]:bg-[#63B7B7]" />
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Show Phone Number
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                Allow others to see your phone number
              </p>
            </div>
            <Switch className="data-[state=checked]:border-[#63B7B7] data-[state=checked]:bg-[#63B7B7]" />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={handleSubmit}
            disabled={
              profileMutation.isPending || updateProfileMutation.isPending
            }
            className="rounded-lg bg-[#63B7B7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#63B7B7]/90 disabled:opacity-50"
          >
            {profileMutation.isPending || updateProfileMutation.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
