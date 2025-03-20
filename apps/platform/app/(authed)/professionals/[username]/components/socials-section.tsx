'use client'

import { Edit, X, Plus, Check, Globe, AlertCircle } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { PlatformIcon } from '@components/shared/platform-icon'
import { PlatformAutocomplete } from '@components/shared/platform-autocomplete'
import type { SocialLink } from '@lib/types/profile'
import { detectPlatform, enhanceSocialLink } from '@lib/utils/detect-platform'
import {
  validateUrl,
  validatePlatform,
  type ValidationResult,
} from '@lib/utils/validation'
import { motion, AnimatePresence } from 'motion/react'

interface SocialsSectionProps {
  socials: SocialLink[]
  onUpdate: (socials: SocialLink[]) => void
  isPublicView: boolean
  isOwner: boolean
}

export function SocialsSection({
  socials,
  onUpdate,
  isPublicView,
  isOwner,
}: SocialsSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedSocials, setEditedSocials] = useState<SocialLink[]>([])
  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { platform?: string; url?: string }
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Track if the form has been touched to avoid showing validation errors immediately
  const [touched, setTouched] = useState<{
    [key: number]: { platform?: boolean; url?: boolean }
  }>({})

  useEffect(() => {
    // Reset validation state when editing mode changes
    if (isEditing) {
      setValidationErrors({})
      setTouched({})
    }
  }, [isEditing])

  const handleEdit = () => {
    if (!socials || socials.length === 0) {
      setEditedSocials([{ platform: '', url: '' }])
    } else {
      setEditedSocials([...socials])
    }
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const validateForm = (): boolean => {
    const errors: { [key: number]: { platform?: string; url?: string } } = {}
    let hasErrors = false

    editedSocials.forEach((social, index) => {
      const platformValidation = validatePlatform(social.platform)
      const urlValidation = validateUrl(social.url)

      if (!platformValidation.isValid || !urlValidation.isValid) {
        errors[index] = {}

        if (!platformValidation.isValid) {
          errors[index].platform = platformValidation.message
          hasErrors = true
        }

        if (!urlValidation.isValid) {
          errors[index].url = urlValidation.message
          hasErrors = true
        }
      }
    })

    setValidationErrors(errors)

    // Mark all fields as touched when submitting
    const allTouched: { [key: number]: { platform: boolean; url: boolean } } =
      {}
    editedSocials.forEach((_, index) => {
      allTouched[index] = { platform: true, url: true }
    })
    setTouched(allTouched)

    return !hasErrors
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    // Process the social links into the format expected by the server
    const processedSocials = editedSocials.filter(
      (social) => social.platform && social.url,
    )

    await onUpdate(processedSocials)
    setIsEditing(false)
    setIsSubmitting(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setValidationErrors({})
    setTouched({})
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

    // Update validation errors and touched state
    const newErrors = { ...validationErrors }
    const newTouched = { ...touched }
    delete newErrors[index]
    delete newTouched[index]

    // Reindex the remaining errors and touched state
    Object.keys(newErrors).forEach((key) => {
      const numKey = Number.parseInt(key)
      if (numKey > index) {
        newErrors[numKey - 1] = newErrors[numKey]
        delete newErrors[numKey]
      }
    })

    Object.keys(newTouched).forEach((key) => {
      const numKey = Number.parseInt(key)
      if (numKey > index) {
        newTouched[numKey - 1] = newTouched[numKey]
        delete newTouched[numKey]
      }
    })

    setValidationErrors(newErrors)
    setTouched(newTouched)
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

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: true,
      },
    }))

    // Validate the field if it's been touched
    if (touched[index]?.[field]) {
      let validation: ValidationResult

      if (field === 'platform') {
        validation = validatePlatform(value)
      } else {
        validation = validateUrl(value)
      }

      if (!validation.isValid) {
        setValidationErrors((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            [field]: validation.message,
          },
        }))
      } else {
        // Clear the error if it's valid
        const newErrors = { ...validationErrors }
        if (newErrors[index]) {
          delete newErrors[index][field as 'platform' | 'url']
          if (Object.keys(newErrors[index]).length === 0) {
            delete newErrors[index]
          }
        }
        setValidationErrors(newErrors)
      }
    }
  }

  // Enhance socials with platform info for display
  const enhancedSocials = socials.map(enhanceSocialLink)

  // Check if there are any validation errors
  const hasErrors = Object.keys(validationErrors).length > 0

  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Globe className="h-4 w-4 text-[#63B7B7]" />
          Social Media
        </h2>

        {!isEditing && !isPublicView && isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-gray-500 hover:text-[#63B7B7]"
          >
            <Edit className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
        )}

        {isEditing && !isPublicView && isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <X className="mr-1 h-3.5 w-3.5" /> Cancel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-[#63B7B7] hover:bg-[#63B7B7]/10"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  <Check className="mr-1 h-3.5 w-3.5" /> Save
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing && !isPublicView && isOwner ? (
          <div className="space-y-3">
            {hasErrors && (
              <div className="mb-4 flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    Please fix the following errors:
                  </p>
                  <ul className="mt-1 list-inside list-disc">
                    {Object.values(validationErrors).map((errors, index) =>
                      Object.values(errors).map((error, errorIndex) => (
                        <li key={`${index}-${errorIndex}`}>{error}</li>
                      )),
                    )}
                  </ul>
                </div>
              </div>
            )}

            <AnimatePresence>
              {editedSocials?.map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-start gap-1"
                >
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-1/2">
                      <PlatformAutocomplete
                        value={social.platform}
                        onChange={(value) =>
                          updateSocial(index, 'platform', value)
                        }
                        onBlur={() => {
                          setTouched((prev) => ({
                            ...prev,
                            [index]: {
                              ...prev[index],
                              platform: true,
                            },
                          }))

                          const validation = validatePlatform(social.platform)
                          if (!validation.isValid) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              [index]: {
                                ...prev[index],
                                platform: validation.message,
                              },
                            }))
                          }
                        }}
                        error={
                          touched[index]?.platform
                            ? validationErrors[index]?.platform
                            : undefined
                        }
                        autoFocus={index === 0}
                        className="w-full"
                      />
                    </div>
                    <div className="relative w-full sm:w-1/2">
                      <Input
                        ref={index === 0 ? inputRef : undefined}
                        value={social.url}
                        onChange={(e) =>
                          updateSocial(index, 'url', e.target.value)
                        }
                        onBlur={() => {
                          setTouched((prev) => ({
                            ...prev,
                            [index]: {
                              ...prev[index],
                              url: true,
                            },
                          }))

                          const validation = validateUrl(social.url)
                          if (!validation.isValid) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              [index]: {
                                ...prev[index],
                                url: validation.message,
                              },
                            }))
                          }
                        }}
                        placeholder="Social URL"
                        className={`h-9 w-full pl-3 !text-xs transition-all duration-200 ${
                          touched[index]?.url && validationErrors[index]?.url
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'focus-visible:ring-[#63B7B7]'
                        }`}
                        aria-invalid={
                          !!(
                            touched[index]?.url && validationErrors[index]?.url
                          )
                        }
                        aria-describedby={
                          validationErrors[index]?.url
                            ? `url-error-${index}`
                            : undefined
                        }
                      />
                      {touched[index]?.url && validationErrors[index]?.url && (
                        <p
                          id={`url-error-${index}`}
                          className="mt-1 text-xs text-red-500"
                        >
                          {validationErrors[index]?.url}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSocial(index)}
                    className="mt-1.5 h-8 w-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 sm:mt-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>

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
            <AnimatePresence>
              {enhancedSocials?.length > 0 ? (
                enhancedSocials.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
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
                          className={'text-[#64B7B7]'}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">
                          {social.platform || social.platformInfo.name}
                        </span>
                        <span className="!text-xs text-gray-500">
                          {social.url}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-gray-500"
                >
                  No social links added yet
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
