'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'motion/react'
import { useAtom } from 'jotai'
import { globalAtom } from '@lib/atoms/global'
import AvatarUpload from '@components/shared/avatar-upload'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getOwnCompanyProfile,
  updateCompanyProfile,
} from '@lib/api/company/profile'
import { getOwnProProfile, updateProProfile } from '@lib/api/pro/profile'
import { toast } from '@dallah/design-system/ui/toast/use-toast'
import { proMetaAtom } from '@lib/atoms/pro/meta'
import { companyMetaAtom } from '@lib/atoms/company/meta'

export function ProfileAvatar() {
  const [dragActive, setDragActive] = useState(false)
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false)
  const [global] = useAtom(globalAtom)
  const [companyMeta, setCompanyMeta] = useAtom(companyMetaAtom)
  const [proMeta, setProMeta] = useAtom(proMetaAtom)
  const { data: proProfile } = useQuery({
    queryKey: ['own-pro-profile', global.username],
    queryFn: () => getOwnProProfile(),
    enabled: global.mode === 'user',
  })

  const queryClient = useQueryClient()

  const { data: companyProfile } = useQuery({
    queryKey: ['own-company-profile', global.id],
    queryFn: () => getOwnCompanyProfile(),
    enabled: global.mode === 'company',
  })
  const profileMutation = useMutation({
    mutationFn: updateProProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['own-pro-profile', global.username],
      })
      setProMeta({
        ...proMeta,
        data: {
          ...proMeta.data,
          UserProfile: {
            ...proMeta.data.UserProfile,
            avatar: data.data.data.avatar,
          },
        },
      })
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been updated successfully',
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
      setCompanyMeta({
        ...companyMeta,
        data: {
          ...companyMeta.data,
          CompanyProfile: {
            ...companyMeta.data.CompanyProfile,
            logo: updatedData.data?.data?.logo,
          },
        },
      })
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile has been updated successfully',
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <div className="flex flex-col items-center">
          <div className="group relative mb-8">
            <AvatarUpload
              initialURL={
                global.mode === 'user'
                  ? proProfile?.data?.data?.avatar
                  : companyProfile?.data?.data?.CompanyProfile.logo
              }
              setUploadedURL={(url) => {
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
                    education: cleanedEducation,
                    experience: cleanedExperience,
                    avatar: url,
                  })
                } else {
                  updateProfileMutation.mutate({ logo: url })
                }
              }}
              required={false}
              className="h-32 w-32"
            />
          </div>

          <h3 className="mb-1 text-lg font-medium">
            {global.mode === 'user'
              ? proProfile?.data?.data?.User?.name
              : companyProfile?.data?.data?.name}
          </h3>
          <p className="mb-8 text-sm text-gray-500">
            {global.mode === 'user'
              ? proProfile?.data?.data?.User?.email
              : companyProfile?.data?.data?.email}
          </p>

          {/* <motion.div
            className={`w-full max-w-md rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
              dragActive ? 'border-[#63B7B7] bg-[#63B7B7]/5' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            whileHover={{
              borderColor: '#BEDDF1',
              backgroundColor: 'rgba(190, 221, 241, 0.05)',
            }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <ImagePlus className="mb-4 h-10 w-10 text-gray-400" />
              </motion.div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Drag and drop your photo here
              </p>
              <p className="mb-4 text-xs text-gray-500">
                PNG, JPG or GIF (max. 2MB)
              </p>
              <Button
                variant="outline"
                className="border-[#63B7B7] text-[#63B7B7] transition-colors duration-200 hover:bg-[#63B7B7]/10"
              >
                Browse Files
              </Button>
            </div>
          </motion.div> */}
        </div>
      </div>

      <div className="space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-md font-medium text-gray-800">Avatar Settings</h3>

        <motion.div
          className="flex gap-3 rounded-lg border border-[#BEDDF1] bg-[#BEDDF1]/20 p-4"
          whileHover={{ backgroundColor: 'rgba(190, 221, 241, 0.3)' }}
          transition={{ duration: 0.2 }}
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#63B7B7]" />
          <div>
            <h4 className="text-sm font-medium text-gray-700">
              Avatar Guidelines
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs text-gray-600">
              <li>Use a clear, professional headshot</li>
              <li>Avoid using logos or symbols as your profile picture</li>
              <li>Maximum file size is 2MB</li>
              <li>Recommended dimensions: 400x400 pixels</li>
            </ul>
          </div>
        </motion.div>

        {/* <div className="flex justify-between gap-4 pt-4">
          <Button
            variant="outline"
            className="border-red-200 text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Photo
          </Button>

          <Button
            variant="outline"
            className="border-[#63B7B7]/30 text-[#63B7B7] transition-colors duration-200 hover:bg-[#63B7B7]/10"
          >
            Reset to Default
          </Button>
        </div> */}
      </div>
    </motion.div>
  )
}
