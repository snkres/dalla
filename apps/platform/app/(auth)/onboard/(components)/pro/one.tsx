'use client'

import type React from 'react'

import {
  Input,
  Label,
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
  Textarea,
} from '@dallah/design-system'
import { type CVParseResponse, parseCV } from '@lib/api/pro/parse-cv'
import { MapPin, UploadCloudIcon } from 'lucide-react'
import { useState, useEffect, type Dispatch } from 'react'
import AvatarUpload from '../AvatarUpload'
import type { ProOnboardingData } from '../../page'
import { z } from 'zod'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { motion } from 'motion/react'
import { fadeInVariants } from '@components/aniamtion/animate'

export const RequiredIndicator = () => (
  <span className="ml-1 text-red-500">*</span>
)

export function ProOnboardingOne({
  data,
  setData,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  setData: Dispatch<React.SetStateAction<ProOnboardingData>>
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const { toast } = useToast()
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [cvData, setCVData] = useState<CVParseResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Utility function to extract dates from string format
  const extractDates = (dateStr: string) => {
    // Handle "Present" in date strings
    const processedDate = dateStr.replace(
      'Present',
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    )

    // Extract start and end dates
    const dates = processedDate.split(' - ')
    if (dates.length !== 2) return { startDate: '', endDate: '' }

    // Format dates for consistency
    const startDateParts = dates[0].trim().split(' ')
    const endDateParts = dates[1].trim().split(' ')

    if (startDateParts.length < 2 || endDateParts.length < 2)
      return { startDate: '', endDate: '' }

    const startMonth = startDateParts[0]
    const startYear = startDateParts[1]
    const endMonth = endDateParts[0]
    const endYear = endDateParts[1]

    return {
      startDate: `${startMonth} ${startYear}`,
      endDate: dates[1].includes('Present')
        ? 'Present'
        : `${endMonth} ${endYear}`,
    }
  }

  // Calculate years of experience from work experiences
  const calculateYearsOfExperience = (
    workExperiences: CVParseResponse['data']['workExperiences'],
  ) => {
    let totalMonths = 0

    for (const experience of workExperiences) {
      const dateStr = experience.date

      // Handle "Present" in date strings
      const processedDate = dateStr.replace(
        'Present',
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
      )

      // Extract start and end dates
      const dates = processedDate.split(' - ')
      if (dates.length !== 2) continue

      const startDateParts = dates[0].trim().split(' ')
      const endDateParts = dates[1].trim().split(' ')

      if (startDateParts.length < 2 || endDateParts.length < 2) continue

      // Parse start and end dates
      const startMonth = new Date(
        Date.parse(`${startDateParts[0]} 1, ${startDateParts[1]}`),
      ).getMonth()
      const startYear = Number.parseInt(startDateParts[1])

      const endMonth = new Date(
        Date.parse(`${endDateParts[0]} 1, ${endDateParts[1]}`),
      ).getMonth()
      const endYear = Number.parseInt(endDateParts[1])

      // Calculate months
      const months = (endYear - startYear) * 12 + (endMonth - startMonth)
      totalMonths += months > 0 ? months : 0
    }

    return Math.max(Math.round(totalMonths / 12), 1)
  }

  // Extract education info from CV data
  const extractEducation = (
    educations: CVParseResponse['data']['educations'],
  ) => {
    return educations.map((edu) => {
      const { startDate, endDate } = extractDates(edu.date)

      // Extract degree and field from the degree string
      let degree = "Bachelor's"
      let field = 'Computer Science'

      if (edu.degree) {
        const degreeMatch = edu.degree.match(
          /(Bachelor|Master|Doctor|Ph\.D|MBA|B\.S|M\.S|B\.A|M\.A)/i,
        )
        if (degreeMatch) {
          degree = degreeMatch[0]
        }

        const fieldMatch = edu.degree.match(/in\s([^-]+)/i)
        if (fieldMatch) {
          field = fieldMatch[1].trim()
        } else {
          // Try to extract field if "in" is not present
          const parts = edu.degree.split(' ')
          if (parts.length > 2) {
            field = parts
              .slice(2)
              .join(' ')
              .replace(/^in\s+/i, '')
          }
        }
      }

      return {
        school: edu.school,
        degree: degree,
        field: field,
        startDate: startDate,
        endDate: endDate,
        description: edu.descriptions.join('. '),
      }
    })
  }

  // Extract work experience from CV data
  const extractWorkExperience = (
    workExperiences: CVParseResponse['data']['workExperiences'],
  ) => {
    return workExperiences.map((exp) => {
      const { startDate, endDate } = extractDates(exp.date)

      return {
        title: exp.jobTitle,
        company: exp.company,
        location: '', // Location might not be available in the parsed data
        startDate: startDate,
        endDate: endDate,
        meta: {
          skills: [] as string[], // Will be populated from skills section
          achievements: exp.descriptions
            .filter(
              (desc) =>
                desc.includes('%') ||
                desc.includes('increase') ||
                desc.includes('improve') ||
                desc.includes('enhance'),
            )
            .join('. '),
          responsibilities: exp.descriptions
            .filter(
              (desc) =>
                !desc.includes('%') &&
                !desc.includes('increase') &&
                !desc.includes('improve') &&
                !desc.includes('enhance'),
            )
            .join('. '),
          employmentType: 'Full-time', // Default value
        },
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      if (uploadedCV instanceof File) {
        setIsLoading(true)
        try {
          const res = await parseCV(uploadedCV)
          console.log('CV Parse Result:', res)

          if (res.success && res.data) {
            setCVData(res.data)

            // Calculate years of experience
            const yoe = calculateYearsOfExperience(res.data.workExperiences)
            // Extract skills from CV
            const extractedSkills = res.data.skills.featuredSkills.map(
              (skill) => skill.skill,
            )

            // Extract education info
            const educationEntries = extractEducation(res.data.educations)

            // Extract work experience
            const workExperience = extractWorkExperience(
              res.data.workExperiences,
            )

            // Assign skills to work experiences based on matching text
            workExperience.forEach((exp) => {
              exp.meta.skills = extractedSkills.filter(
                (skill) =>
                  exp.meta.responsibilities
                    .toLowerCase()
                    .includes(skill.toLowerCase()) ||
                  exp.title.toLowerCase().includes(skill.toLowerCase()),
              )
            })

            // Prepare a comprehensive bio from the summary
            const bio =
              res.data.profile.summary ||
              `Professional with ${yoe} years of experience. ${workExperience[0]?.title || ''} at ${workExperience[0]?.company || ''}.`

            // Update parent component with all CV data
            updateData((prev) => ({
              ...prev,
              headline: `${res.data.profile.name}'s Professional Profile`,
              bio: bio,
              gender: prev.gender, // Keep existing gender
              meta: {
                ...prev.meta,
                skills: extractedSkills,
                location: res.data.profile.location || prev.meta.location,
                yearsOfExperience: yoe,
                socialLinks: {
                  ...(prev.meta.socialLinks || {}),
                  [res.data.profile.url || '']: res.data.profile.url || '',
                },
              },
              education: educationEntries,
              experience: workExperience,
              resume: res.data.url,
            }))
          }
        } catch (error) {
          console.error('Error Parsing CV:', error)
          // Use a try-catch to safely access error message since error is of type unknown
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred'

          // Import toast from a UI library like react-hot-toast or use a local toast function
          // that should be defined elsewhere in your component or imported
          toast({
            title: 'Error parsing CV',
            description: errorMessage,
            variant: 'destructive',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [uploadedCV, updateData])

  // Add validation to check if all required fields are filled
  useEffect(() => {
    const requiredFields = {
      avatar: !!data.avatar,
      headline: !!data.headline,
      gender: !!data.gender,
      location: !!data.meta.location,
      bio: !!data.bio,
    }

    const allFieldsFilled = Object.values(requiredFields).every(Boolean)
    setIsAbleToProceed(allFieldsFilled)
  }, [data, setIsAbleToProceed])

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-8 px-6"
    >
      <div className="mt-4 flex flex-col items-center gap-1 px-6 text-center">
        <h2 className="text-heading-sm mb-2 font-semibold text-[#1F4D5D]">
          Finalize Your Profile
        </h2>
        <p className="text-slate-blue-70 mt-1 text-xs">
          Fields marked with <span className="text-red-500">*</span> are
          required
        </p>
        <p className="text-paragraph-md text-slate-blue-90">
          Whether you're a professional or a company, Dalla connects you to
          endless opportunities in consulting and collaboration.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <AvatarUpload
            setUploadedURL={(url: string) => {
              setData({ ...data, avatar: url })
              console.log(url)
              console.log(data)
            }}
            initialURL={data.avatar}
            required={true}
          />
        </div>
        <div
          className={`w-full flex-1 cursor-pointer rounded-lg border-2 border-solid p-6 transition-colors ${
            isLoading
              ? 'border-slate-blue-100 bg-[#f8eacf]/10 opacity-70'
              : dragActive
                ? 'border-slate-blue-100 bg-[#f8eacf]/10'
                : uploadedCV
                  ? 'border-slate-blue-100 bg-[#f8eacf]/5'
                  : 'border-[#E4E7EC]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)
            // Handle file drop here
            const file = e.dataTransfer.files[0]
            if (file) {
              setUploadedCV(file)
            }
          }}
          onClick={() => {
            if (isLoading) return
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'application/pdf' // Ensure proper MIME type
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) {
                setUploadedCV(file) // Store the file instead of the URL
              }
            }
            input.click()
          }}
        >
          <div className="space-y-1 text-center">
            <div className="mx-auto w-fit rounded-lg border border-[#E4E7EC] p-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
              {isLoading ? (
                <div className="border-slate-blue-100 mx-auto h-6 w-6 animate-spin rounded-full border-4 border-t-transparent"></div>
              ) : (
                <UploadCloudIcon size={24} className="mx-auto" />
              )}
            </div>
            <p>
              <span className="text-slate-blue-90 font-semibold">
                {isLoading
                  ? 'Processing CV...'
                  : cvData
                    ? 'CV Uploaded Successfully'
                    : 'Upload Your CV'}
              </span>{' '}
              {!isLoading && !cvData && 'or drag and drop'}
            </p>
            {!isLoading && !cvData && (
              <p className="text-sm text-[#98a2b3]">PDF (max. 2MB)</p>
            )}
            {cvData && (
              <p className="text-sm text-green-600">
                Extracted details from {cvData.profile.name}'s CV
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="headline">Headline</Label>
            <RequiredIndicator />
          </div>
          <Input
            id="headline"
            className="h-11"
            placeholder="Headline"
            type="name"
            value={data.headline}
            onChange={(e) => setData({ ...data, headline: e.target.value })}
          />
        </div>

        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="gender">Gender</Label>
            <RequiredIndicator />
          </div>
          <Select
            value={data.gender}
            onValueChange={(value: string) =>
              setData({ ...data, gender: value })
            }
          >
            <SelectTrigger id="gender" className="!h-11">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full">
          <Label htmlFor="location">
            Location
            <RequiredIndicator />
          </Label>

          <MapPin className="absolute left-3 top-[2.1rem] h-5 w-5 text-gray-400" />
          <Input
            id="location"
            className="h-11 pl-10"
            placeholder="Location"
            type="name"
            value={data.meta.location}
            onChange={(e) =>
              setData({
                ...data,
                meta: { ...data.meta, location: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <div className="mb-1 flex items-center">
            <Label htmlFor="bio">Bio</Label>
            <RequiredIndicator />
          </div>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="h-28"
          />
        </div>
      </div>
    </motion.div>
  )
}
