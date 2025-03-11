'use client'

import { useState } from 'react'
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
import { Button, DialogTitle } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { motion, AnimatePresence } from 'motion/react'
import type { ShowcaseProject } from '@lib/types/profile'
import { SkillSelector } from '@components/shared/skill-selector'
import { Dialog, DialogContent, DialogOverlay } from '@dallah/design-system'
import ImageUpload from '@components/shared/image-upload'
import MultiImageUpload from '@components/shared/multiImage-upload'
import { MediaCarousel } from '@components/shared/media-carousel'
import {
  deleteShowCaseProject,
  updateShowCaseProject,
} from '@lib/api/pro/profile'

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
  const [isEditing, setIsEditing] = useState(false)
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null,
  )
  const [editedProjects, setEditedProjects] =
    useState<ShowcaseProject[]>(projects)
  const [selectedProject, setSelectedProject] =
    useState<ShowcaseProject | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null)

  const handleEdit = () => {
    setEditedProjects([...projects])
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    setEditingProjectIndex(null)
    onUpdate(editedProjects)
  }

  const handleCancel = () => {
    setEditedProjects([...projects])
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

  const handleRemoveProject = async (index: number) => {
    const updatedProjects = [...editedProjects]
    updatedProjects.splice(index, 1)
    setEditedProjects(updatedProjects)
    const res = await deleteShowCaseProject(
      proId,
      editedProjects[index].id || '',
    )
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

    if (!editedProjects[index].id) return

    const projectData = {
      title: updatedProjects[index].title,
      role: updatedProjects[index].role,
      description: updatedProjects[index].description,
      skills: updatedProjects[index].skills,
      thumbnail: updatedProjects[index].thumbnail || '',
      link: updatedProjects[index].link || '',
      media: updatedProjects[index].media || [],
      contractLink: updatedProjects[index].contractLink,
    }

    updateShowCaseProject(proId, editedProjects[index].id, projectData)
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
                  className="h-7 rounded-full px-3 text-xs text-[#63B7B7] hover:bg-[#63B7B7]/10"
                >
                  <Check className="mr-1 !h-4 !w-4" />
                  Save
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
              <div className="grid grid-cols-1 gap-6">
                {editedProjects.map((project, index) => (
                  <motion.div
                    key={index}
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
                            className="rounded-lg border border-gray-200 text-sm"
                            placeholder="Enter project title"
                          />
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
                            className="rounded-lg border border-gray-200 text-sm"
                            placeholder="Enter your role in the project"
                          />
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
                            className="min-h-[120px] rounded-lg border border-gray-200 text-sm"
                            placeholder="Describe the project and your contributions"
                          />
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
                              className="flex-1 border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="https://example.com"
                            />
                          </div>
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
