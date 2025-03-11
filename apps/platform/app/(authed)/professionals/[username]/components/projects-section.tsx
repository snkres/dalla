'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  Edit,
  Plus,
  X,
  Check,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Input } from '@dallah/design-system'
import { Textarea } from '@dallah/design-system'
import { motion, AnimatePresence } from 'motion/react'
import { ShowcaseProject } from '@lib/types/profile'
import { SkillSelector } from '@components/shared/skill-selector'

import ImageUpload from '@components/shared/image-upload'
import MultiImageUpload from '@components/shared/multiImage-upload'

interface ProjectsSectionProps {
  projects?: ShowcaseProject[]
  isPublicView?: boolean
  isOwner?: boolean
  onUpdate?: (projects: ShowcaseProject[]) => void
}

export function ProjectsSection({
  projects = [],
  isPublicView = false,
  isOwner = false,
  onUpdate = () => {},
}: ProjectsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null,
  )
  const [editedProjects, setEditedProjects] =
    useState<ShowcaseProject[]>(projects)

  const handleEdit = () => {
    setEditedProjects([...projects])
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(editedProjects)
    setIsEditing(false)
    setEditingProjectIndex(null)
  }

  const handleCancel = () => {
    setEditedProjects([...projects])
    setIsEditing(false)
    setEditingProjectIndex(null)
  }

  const handleAddProject = () => {
    const newProject: ShowcaseProject = {
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
    const updatedProjects = [...editedProjects]
    updatedProjects.splice(index, 1)
    setEditedProjects(updatedProjects)
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
              className="space-y-6"
            >
              {editedProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative rounded-lg border border-gray-200 p-4"
                >
                  <div className="absolute right-2 top-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProject(index)}
                      className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Project Title
                      </label>
                      <Input
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(index, 'title', e.target.value)
                        }
                        className="rounded-lg border border-gray-200 text-sm"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Your Role
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
                        Description
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
                        className="min-h-[100px] rounded-lg border border-gray-200 text-sm"
                        placeholder="Describe the project and your contributions"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Skills Used
                      </label>
                      <SkillSelector
                        skills={project.skills}
                        handleSkills={(skills) =>
                          handleSkillsChange(index, skills)
                        }
                        maxSkills={10}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Contract Link (Optional)
                      </label>
                      <Input
                        value={project.contractLink || ''}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            'contractLink',
                            e.target.value,
                          )
                        }
                        className="rounded-lg border border-gray-200 text-sm"
                        placeholder="Link to the contract in the platform"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Project Link (Optional)
                      </label>
                      <Input
                        value={project.link || ''}
                        onChange={(e) =>
                          handleProjectChange(index, 'link', e.target.value)
                        }
                        className="rounded-lg border border-gray-200 text-sm"
                        placeholder="Link to the project"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Thumbnail Image (Optional)
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
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="space-y-8"
            >
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-lg border border-gray-100 transition-all hover:border-gray-200 hover:shadow-md"
                  >
                    {project.thumbnail && (
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src =
                              'https://placehold.co/800x400/e6f3f3/63B7B7?text=Project+Thumbnail'
                          }}
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="mb-1 text-lg font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-sm font-medium text-[#63B7B7]">
                        {project.role}
                      </p>

                      <p className="mb-4 text-sm text-gray-600">
                        {project.description}
                      </p>

                      {project.skills && project.skills.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="rounded-full bg-[#f5fafa] px-3 py-1 text-xs text-[#3A97A0]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs font-medium text-[#63B7B7] hover:underline"
                          >
                            <LinkIcon className="mr-1 h-3 w-3" />
                            View Project
                          </a>
                        )}

                        {project.contractLink && (
                          <a
                            href={project.contractLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs font-medium text-[#63B7B7] hover:underline"
                          >
                            <Briefcase className="mr-1 h-3 w-3" />
                            View Contract
                          </a>
                        )}
                      </div>

                      {project.media && project.media.length > 0 && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <p className="mb-2 text-xs font-medium text-gray-500">
                            Project Media
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.media.map((mediaUrl, mediaIndex) => {
                              const isPdf = mediaUrl
                                .toLowerCase()
                                .endsWith('.pdf')

                              return (
                                <div
                                  key={mediaIndex}
                                  className="relative h-16 w-16 overflow-hidden rounded border border-gray-200"
                                >
                                  {isPdf ? (
                                    <a
                                      href={mediaUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex h-full w-full flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
                                    >
                                      <FileText className="h-6 w-6 text-[#63B7B7]" />
                                      <span className="mt-1 text-[8px] text-gray-500">
                                        PDF
                                      </span>
                                    </a>
                                  ) : (
                                    <img
                                      src={mediaUrl}
                                      alt={`Project media ${mediaIndex}`}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement
                                        target.src =
                                          'https://placehold.co/64x64/e6f3f3/63B7B7?text=Media'
                                      }}
                                    />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
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
            className="w-full border-dashed border-gray-300 py-6 text-gray-500 hover:border-[#63B7B7] hover:text-[#63B7B7]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProjectsSection
