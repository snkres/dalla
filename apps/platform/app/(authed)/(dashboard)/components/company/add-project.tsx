import React, { useState } from 'react'
import { Save, Briefcase, AlertCircle } from 'lucide-react'
import { Button, Riyal } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { Textarea } from '@dalla/design-system'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dalla/design-system'
import { createProject, CreateProjectReq } from '@lib/api/company/projects'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { SkillSelector } from '@components/shared/skill-selector'
import MultiImageUpload from '@components/shared/multiImage-upload'
import { Modal } from '@dalla/design-system'
import { ListInput } from '@dalla/components/listInput'
import { useAtom } from 'jotai'
import {
  addNotificationAtom,
  createProjectNotification,
} from '@lib/atoms/shared/notifications'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

export function AddProject({
  onClose,
  onProjectCreated,
}: {
  onClose: () => void
  onProjectCreated?: () => void
}) {
  const t = useTranslation()
  const { locale } = useLocale()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, addNotification] = useAtom(addNotificationAtom)
  const [formData, setFormData] = useState({
    title: '',
    jobTitle: '',
    description: '',
    scope: '',
    deliverables: '',
    skills: [] as string[],
    media: [] as string[],
    meta: {
      budget: '',
      timelineValue: '1',
      timelineUnit: 'months',
      priority: 'medium',
    },
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target

    if (id.includes('meta.')) {
      const metaField = id.split('.')[1]
      setFormData({
        ...formData,
        meta: {
          ...formData.meta,
          [metaField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [id]: value,
      })
    }
  }

  const handleTimelineUnitChange = (value: string) => {
    setFormData({
      ...formData,
      meta: {
        ...formData.meta,
        timelineUnit: value,
      },
    })
  }

  const handleSkillsChange = (skills: string[]) => {
    setFormData({
      ...formData,
      skills,
    })
  }

  const handleMediaChange = (media: string[]) => {
    setFormData({
      ...formData,
      media,
    })
  }

  const validateForm = () => {
    const requiredFields = ['title', 'description']
    const requiredMetaFields = ['budget', 'timelineValue']

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title:
            t.dashboard.companyComponents.addProject.toastMissingFieldTitle,
          description:
            t.dashboard.companyComponents.addProject.toastMissingFieldDescription.replace(
              '{field}',
              field,
            ),
          variant: 'destructive',
        })
        return false
      }
    }

    for (const field of requiredMetaFields) {
      if (!formData.meta[field as keyof typeof formData.meta]) {
        toast({
          title:
            t.dashboard.companyComponents.addProject.toastMissingFieldTitle,
          description:
            t.dashboard.companyComponents.addProject.toastMissingFieldDescription.replace(
              '{field}',
              field.replace('Value', ''),
            ),
          variant: 'destructive',
        })
        return false
      }
    }

    if (formData.skills.length === 0) {
      toast({
        title:
          t.dashboard.companyComponents.addProject.toastSkillsRequiredTitle,
        description:
          t.dashboard.companyComponents.addProject
            .toastSkillsRequiredDescription,
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const timeline = `${formData.meta.timelineValue} ${formData.meta.timelineUnit}`

      const projectData: CreateProjectReq = {
        title: formData.title,
        jobTitle: formData.jobTitle || formData.title,
        description: formData.description,
        scope: formData.scope || formData.description,
        deliverables: formData.deliverables || 'To be determined',
        skills: formData.skills,
        media: formData.media,
        meta: {
          budget: Number(formData.meta.budget),
          duration: timeline,
        },
      }

      const response = await createProject(projectData)

      addNotification(createProjectNotification(formData.title))

      toast({
        title: t.dashboard.companyComponents.addProject.toastSuccessTitle,
        description:
          t.dashboard.companyComponents.addProject.toastSuccessDescription,
      })

      if (onProjectCreated) {
        onProjectCreated()
      }

      onClose()
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: t.dashboard.companyComponents.addProject.toastErrorTitle,
        description:
          t.dashboard.companyComponents.addProject.toastErrorDescription,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t.dashboard.companyComponents.addProject.modalTitle}
      width="xl"
    >
      <div
        className="flex-1 overflow-y-auto"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="p-4 sm:p-6">
          <div className="mb-6 flex items-center rounded-lg bg-[#BEDDF1]/10 p-4">
            <AlertCircle className="mr-2 h-5 w-5 text-[#63B7B7]" />
            <p className="text-sm text-gray-700">
              {t.dashboard.companyComponents.addProject.requiredFieldsInfo}
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.dashboard.companyComponents.addProject.projectTitleLabel}
                </label>
                <Input
                  id="title"
                  placeholder={
                    t.dashboard.companyComponents.addProject
                      .projectTitlePlaceholder
                  }
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="jobTitle"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.dashboard.companyComponents.addProject.jobTitleLabel}
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="jobTitle"
                    placeholder={
                      t.dashboard.companyComponents.addProject
                        .jobTitlePlaceholder
                    }
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.dashboard.companyComponents.addProject.descriptionLabel}
              </label>
              <Textarea
                id="description"
                placeholder={
                  t.dashboard.companyComponents.addProject
                    .descriptionPlaceholder
                }
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="scope"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.dashboard.companyComponents.addProject.scopeLabel}
              </label>
              <Textarea
                id="scope"
                placeholder={
                  t.dashboard.companyComponents.addProject.scopePlaceholder
                }
                value={formData.scope}
                onChange={handleInputChange}
                rows={2}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="deliverables"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.dashboard.companyComponents.addProject.deliverablesLabel}
              </label>
              <Textarea
                id="deliverables"
                placeholder={
                  t.dashboard.companyComponents.addProject
                    .deliverablesPlaceholder
                }
                value={formData.deliverables}
                onChange={handleInputChange}
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.dashboard.companyComponents.addProject.skillsLabel}
              </label>
              <SkillSelector
                skills={formData.skills}
                handleSkills={handleSkillsChange}
                maxSkills={10}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meta.budget"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.dashboard.companyComponents.addProject.budgetLabel}
                </label>
                <div className="relative">
                  <Riyal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="meta.budget"
                    type="number"
                    placeholder={
                      t.dashboard.companyComponents.addProject.budgetPlaceholder
                    }
                    value={formData.meta.budget}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="meta.timelineValue"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.dashboard.companyComponents.addProject.timelineLabel}
                </label>
                <div className="flex gap-2">
                  <Input
                    id="meta.timelineValue"
                    type="number"
                    value={formData.meta.timelineValue}
                    onChange={handleInputChange}
                    className="w-24"
                  />
                  <Select
                    value={formData.meta.timelineUnit}
                    onValueChange={handleTimelineUnitChange}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">
                        {
                          t.dashboard.companyComponents.addProject
                            .timelineUnitDays
                        }
                      </SelectItem>
                      <SelectItem value="weeks">
                        {
                          t.dashboard.companyComponents.addProject
                            .timelineUnitWeeks
                        }
                      </SelectItem>
                      <SelectItem value="months">
                        {
                          t.dashboard.companyComponents.addProject
                            .timelineUnitMonths
                        }
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="media"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                {t.dashboard.companyComponents.addProject.mediaLabel}
              </label>
              <MultiImageUpload
                images={formData.media}
                onImagesChange={handleMediaChange}
                maxImages={5}
                label="Project Media"
                allowAllFileTypes
              />
              <p className="mt-1 text-xs text-gray-500">
                {t.dashboard.companyComponents.addProject.mediaHelpText}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 p-4">
          <Button variant="outline" onClick={onClose}>
            {t.dashboard.companyComponents.addProject.cancelButton}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="!bg-[#63B7B7] hover:!bg-[#63B7B7]/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting
              ? t.dashboard.companyComponents.addProject.creatingButton
              : t.dashboard.companyComponents.addProject.createButton}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
