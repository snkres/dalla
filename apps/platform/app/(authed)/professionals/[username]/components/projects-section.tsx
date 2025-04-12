'use client'

import { useState, useEffect } from 'react'
import {
  Briefcase,
  Edit,
  Plus,
  X,
  Check,
  LinkIcon,
  ImageIcon,
  ChevronLeft,
} from 'lucide-react'
import { Button, DialogTitle } from '@dalla/design-system'
import { Input } from '@dalla/design-system'
import { Textarea } from '@dalla/design-system'
import { motion, AnimatePresence } from 'motion/react'
import type { ShowcaseProject } from '@lib/types/profile'
import { SkillSelector } from '@components/shared/skill-selector'
import { Dialog, DialogContent, DialogOverlay } from '@dalla/design-system'
import ImageUpload from '@components/shared/image-upload'
import MultiImageUpload from '@components/shared/multiImage-upload'
import { MediaCarousel } from '@components/shared/media-carousel'
import {
  deleteShowCaseProject,
  updateShowCaseProject,
  createShowCaseProject,
} from '@lib/api/pro/profile'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'

interface ProjectsSectionProps {
  projects?: ShowcaseProject[]
  isPublicView?: boolean
  isOwner?: boolean
  onUpdate?: (projects: ShowcaseProject[]) => void
  proId: string
}

export function ProjectsSection({
  projects = [],
  isPublicView = false,
  isOwner = false,
  onUpdate = () => {},
  proId,
}: ProjectsSectionProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null,
  )
  const [editedProjects, setEditedProjects] = useState<ShowcaseProject[]>([])
  const [projectsToDelete, setProjectsToDelete] = useState<string[]>([])
  const [selectedProject, setSelectedProject] =
    useState<ShowcaseProject | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null)
  const [isSaving, setIsSaving] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { [field: string]: boolean }
  }>({})

  useEffect(() => {
    if (isEditing) {
      setEditedProjects([...projects])
    }
  }, [projects, isEditing])

  const handleEdit = () => {
    setEditedProjects([...projects])
    setProjectsToDelete([])
    setIsEditing(true)
  }

  const validateProjects = () => {
    const errors: { [key: number]: { [field: string]: boolean } } = {}
    let isValid = true
    let firstErrorIndex: number | null = null

    editedProjects.forEach((project, index) => {
      const projectErrors: { [field: string]: boolean } = {}

      // Check required fields
      if (!project.title.trim()) {
        projectErrors.title = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      if (!project.role.trim()) {
        projectErrors.role = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      if (!project.description.trim()) {
        projectErrors.description = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      if (!project.skills || project.skills.length === 0) {
        projectErrors.skills = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      if (!project.thumbnail) {
        projectErrors.thumbnail = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      if (!project.link) {
        projectErrors.link = true
        isValid = false
        firstErrorIndex = firstErrorIndex === null ? index : firstErrorIndex
      }

      // Only add to errors if there are any
      if (Object.keys(projectErrors).length > 0) {
        errors[index] = projectErrors
      }
    })

    setValidationErrors(errors)

    if (!isValid) {
      // Count total missing fields
      const totalMissingFields = Object.values(errors).reduce(
        (count, projectErrors) => count + Object.keys(projectErrors).length,
        0,
      )

      // Show more specific toast message
      toast({
        title: `${totalMissingFields} required ${totalMissingFields === 1 ? 'field is' : 'fields are'} missing`,
        description: `Please complete all required fields${firstErrorIndex !== null ? ` in project ${firstErrorIndex + 1}` : ''}.`,
        variant: 'destructive',
      })

      // Scroll to the first project with errors
      if (firstErrorIndex !== null) {
        const projectElement = document.getElementById(
          `project-${firstErrorIndex}`,
        )
        if (projectElement) {
          projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }

    return isValid
  }

  const handleSave = async () => {
    if (!validateProjects()) {
      return
    }

    try {
      setIsSaving(true)

      const deletePromises = projectsToDelete.map((id) => {
        if (id) return deleteShowCaseProject(proId, id)
        return Promise.resolve()
      })
      await Promise.all(deletePromises)

      const savedProjects: ShowcaseProject[] = []

      for (let i = 0; i < editedProjects.length; i++) {
        const project = editedProjects[i]

        const projectData = {
          title: project.title,
          role: project.role,
          description: project.description,
          skills: project.skills,
          thumbnail: project.thumbnail || '',
          link: project.link || '',
          media: project.media || [],
          contractLink: project.contractLink,
        }

        try {
          if (project.id) {
            await updateShowCaseProject(proId, project.id, projectData)
            savedProjects.push({ ...project })
          } else {
            const response = await createShowCaseProject(proId, projectData)

            if (response && response.data) {
              const newId = response.data.data.id
              savedProjects.push({ ...project, id: newId })
            } else {
              savedProjects.push({ ...project })
            }
          }
        } catch (error) {
          console.error(`Error saving project at index ${i}:`, error)

          savedProjects.push({ ...project })
        }
      }

      onUpdate(savedProjects)

      setIsEditing(false)
      setEditingProjectIndex(null)
      setProjectsToDelete([])
      setEditedProjects(savedProjects)
    } catch (error) {
      console.error('Error saving projects:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedProjects([...projects])
    setProjectsToDelete([])
    setIsEditing(false)
    setEditingProjectIndex(null)
  }

  const handleAddProject = () => {
    const newProject: ShowcaseProject = {
      id: '',
      title: '',
      role: '',
      description: '',
      skills: [],
      thumbnail: '',
      link: '',
      media: [],
    }

    setEditedProjects([...editedProjects, newProject])
    setEditingProjectIndex(editedProjects.length)
  }

  const handleRemoveProject = (index: number) => {
    const projectToRemove = editedProjects[index]
    const updatedProjects = [...editedProjects]
    updatedProjects.splice(index, 1)
    setEditedProjects(updatedProjects)

    if (projectToRemove.id) {
      setProjectsToDelete([...projectsToDelete, projectToRemove.id])
    }
  }

  const handleProjectChange = (
    index: number,
    field: keyof ShowcaseProject,
    value: any,
  ) => {
    const updatedProjects = [...editedProjects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    }
    setEditedProjects(updatedProjects)
  }

  const handleSkillsChange = (index: number, skills: string[]) => {
    handleProjectChange(index, 'skills', skills)
  }

  const openProjectDetails = (project: ShowcaseProject, index: number) => {
    setSelectedProject(project)
    setSelectedProjectIndex(index)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
    setSelectedProjectIndex(null)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
          <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#63B7B7]" />
          Projects Showcase
        </h2>

        {!isPublicView && isOwner && (
          <>
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-[#63B7B7]"
              >
                <Edit className="mr-1 !h-4 !w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-7 rounded-full px-3 text-xs text-gray-400 hover:text-gray-600"
                >
                  <X className="mr-1 !h-4 !w-4" />
                  Cancel
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
                >
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="mr-1 !h-4 !w-4" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="px-5 pb-5">
        {isEditing ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mt-4 grid grid-cols-1 gap-6">
                {editedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    id={`project-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative rounded-lg border border-gray-200 bg-white p-6"
                  >
                    <div className="absolute right-4 top-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProject(index)}
                        className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Project Title*
                          </label>
                          <Input
                            value={project.title}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                'title',
                                e.target.value,
                              )
                            }
                            className={`rounded-lg border ${
                              validationErrors[index]?.title
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-gray-200'
                            } text-sm`}
                            placeholder="Enter project title"
                          />
                          {validationErrors[index]?.title && (
                            <p className="mt-1 text-xs text-red-500">
                              Project title is required
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Your Role*
                          </label>
                          <Input
                            value={project.role}
                            onChange={(e) =>
                              handleProjectChange(index, 'role', e.target.value)
                            }
                            className={`rounded-lg border ${
                              validationErrors[index]?.role
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-gray-200'
                            } text-sm`}
                            placeholder="Enter your role in the project"
                          />
                          {validationErrors[index]?.role && (
                            <p className="mt-1 text-xs text-red-500">
                              Your role is required
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Description*
                          </label>
                          <Textarea
                            value={project.description}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                'description',
                                e.target.value,
                              )
                            }
                            className={`min-h-[120px] rounded-lg border ${
                              validationErrors[index]?.description
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-gray-200'
                            } text-sm`}
                            placeholder="Describe the project and your contributions"
                          />
                          {validationErrors[index]?.description && (
                            <p className="mt-1 text-xs text-red-500">
                              Description is required
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Skills Used*
                          </label>
                          <SkillSelector
                            skills={project.skills}
                            handleSkills={(skills) =>
                              handleSkillsChange(index, skills)
                            }
                            maxSkills={10}
                          />
                          {validationErrors[index]?.skills && (
                            <p className="mt-1 text-xs text-red-500">
                              Skills are required
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-400">
                            Add up to 10 relevant skills
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Thumbnail Image*
                          </label>
                          <ImageUpload
                            initialURL={project.thumbnail || ''}
                            setUploadedURL={(url) =>
                              handleProjectChange(index, 'thumbnail', url)
                            }
                            label="Add thumbnail"
                            aspectRatio="rectangle"
                            size="lg"
                            className="mb-2"
                          />
                          {validationErrors[index]?.thumbnail && (
                            <p className="mt-1 text-xs text-red-500">
                              Thumbnail is required
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-400">
                            Recommended size: 800x400px
                          </p>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Project Link*
                          </label>
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                            <div className="flex h-10 items-center justify-center px-3 text-gray-400">
                              <LinkIcon className="h-4 w-4" />
                            </div>
                            <Input
                              value={project.link || ''}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  'link',
                                  e.target.value,
                                )
                              }
                              className={`flex-1 border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                validationErrors[index]?.link
                                  ? 'border-red-500 focus-visible:ring-red-500'
                                  : ''
                              }`}
                              placeholder="https://example.com"
                            />
                          </div>
                          {validationErrors[index]?.link && (
                            <p className="mt-1 text-xs text-red-500">
                              Project link is required
                            </p>
                          )}
                        </div>

                        <div>
                          <MultiImageUpload
                            images={project.media || []}
                            onImagesChange={(images) =>
                              handleProjectChange(index, 'media', images)
                            }
                            maxImages={10}
                            label="Project Media (Optional)"
                          />
                          <p className="mt-1 text-xs text-gray-400">
                            Add up to 10 images or PDF documents
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="viewing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-md"
                      onClick={() => openProjectDetails(project, index)}
                    >
                      {project.thumbnail ? (
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={project.thumbnail || '/placeholder.svg'}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src =
                                'https://placehold.co/800x400/e6f3f3/63B7B7?text=Project+Thumbnail'
                            }}
                          />
                          {project.contractLink && (
                            <div className="absolute right-3 top-3 flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#63B7B7] shadow-sm">
                              <Briefcase className="mr-1 h-3 w-3" />
                              Verified
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center bg-gradient-to-r from-[#e6f3f3] to-[#f5fafa]">
                          <ImageIcon className="h-12 w-12 text-[#63B7B7]/30" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-[#f5fafa] p-3">
                    <Briefcase className="h-6 w-6 text-[#63B7B7]" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium text-gray-900">
                    No showcase projects yet
                  </h3>
                  <p className="max-w-md text-sm text-gray-500">
                    {isOwner
                      ? 'Add your projects to showcase your skills and experience.'
                      : "This professional hasn't added any showcase projects yet."}
                  </p>
                  {isOwner && !isPublicView && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleEdit()
                        handleAddProject()
                      }}
                      className="mt-4 border-[#63B7B7] text-[#63B7B7] hover:bg-[#63B7B7]/10"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        {isEditing && (
          <Button
            variant="outline"
            onClick={handleAddProject}
            className="mt-6 w-full border-dashed border-gray-300 bg-gray-50/50 py-6 text-gray-500 transition-colors hover:border-[#63B7B7] hover:bg-white hover:text-[#63B7B7]"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Project
          </Button>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={closeProjectDetails}>
            <DialogOverlay className="bg-black/50" />
            <DialogTitle>
              <DialogContent className="max-h-[90vh] !max-w-7xl overflow-y-auto p-0 sm:rounded-lg">
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeProjectDetails}
                    className="absolute left-4 top-4 z-10 h-8 w-8 rounded-full bg-white/80 p-0 text-gray-700 backdrop-blur-sm hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="p-6 sm:p-8">
                    <div className="mb-8">
                      <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {selectedProject.title}
                      </h2>
                      <p className="text-lg font-medium text-[#63B7B7]">
                        {selectedProject.role}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        About this project
                      </h3>
                      <div className="whitespace-pre-line text-gray-700">
                        {selectedProject.description}
                      </div>
                    </div>

                    {selectedProject.skills &&
                      selectedProject.skills.length > 0 && (
                        <div className="mb-8">
                          <h3 className="mb-3 text-lg font-medium text-gray-900">
                            Skills used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="rounded-full bg-[#f5fafa] px-3 py-1 text-sm text-[#3A97A0]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {selectedProject.media &&
                      selectedProject.media.length > 0 && (
                        <div className="mb-8">
                          <h3 className="mb-3 text-lg font-medium text-gray-900">
                            Project media
                          </h3>
                          <MediaCarousel media={selectedProject.media} />
                        </div>
                      )}

                    {selectedProject.link && (
                      <div className="mt-8 flex justify-center">
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full bg-[#63B7B7] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3A97A0]"
                        >
                          <LinkIcon className="mr-2 h-4 w-4" />
                          View Live Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </DialogTitle>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
