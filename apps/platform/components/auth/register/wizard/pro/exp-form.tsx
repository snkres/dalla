"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,

} from "@dallah/design-system"
import { Search, X, Plus } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@dallah/utils"
import type { ProOnboardingData } from ".."

// Constants moved to their own section for better organization
const EMPLOYMENT_TYPES = ["Full time", "Part time", "Contract", "Internship", "Freelance", "Self-employed"]

const MONTH_OPTIONS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const currentYear = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => (currentYear - i).toString())

// Common skills for auto-suggestions
const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "SQL",
  "Product Management", "UX Design", "Data Analysis", "Project Management", "Leadership",
  "Marketing", "Sales", "Customer Service", "Communication", "Problem Solving"
]

// Schema with improved validation
const experienceSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  employmentType: z.string().refine(value => EMPLOYMENT_TYPES.includes(value), {
    message: "Please select a valid employment type.",
  }),
  responsibilities: z.string().min(10, {
    message: "Please provide a detailed description of your responsibilities.",
  }),
  achievements: z.string().optional(),
  isCurrentlyWorking: z.boolean(),
  startMonth: z.string().refine(value => MONTH_OPTIONS.includes(value), {
    message: "Please select a valid month.",
  }),
  startYear: z.string().refine(value => YEAR_OPTIONS.includes(value), {
    message: "Please select a valid year.",
  }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
})

// Form validation with conditional logic
const formSchema = experienceSchema.refine(
  data => {
    // No end date validation needed if currently working
    if (data.isCurrentlyWorking) return true

    // Otherwise both end month and year are required
    if (!data.endMonth || !data.endYear) return false

    // Validate that end date is after start date
    const startDate = new Date(`${data.startMonth} 1, ${data.startYear}`)
    const endDate = new Date(`${data.endMonth} 1, ${data.endYear}`)
    return endDate >= startDate
  },
  {
    message: "End date must be after start date and both fields are required if not currently working",
    path: ["endYear"], // Show the error on the end year field
  }
)

type FormData = z.infer<typeof formSchema>

type Tool = {
  id: string
  name: string
}

export function ExperienceForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (experience: ProOnboardingData["experience"][0]) => void
  onCancel: () => void
  initialData?: ProOnboardingData["experience"][0]
}) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>(
    initialData?.meta.skills.map((skill) => ({ id: `${skill}-${Date.now()}`, name: skill })) || [],
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [customSkill, setCustomSkill] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Prepare skills for selection
  const suggestedSkills = COMMON_SKILLS.map(skill => ({ id: `${skill}-suggestion`, name: skill }))

  const filteredSkills = suggestedSkills.filter(
    tool => tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTools.some(t => t.name.toLowerCase() === tool.name.toLowerCase())
  )

  const handleToolSelect = (tool: Tool) => {
    if (selectedTools.some(t => t.name.toLowerCase() === tool.name.toLowerCase())) {
      return
    }
    setSelectedTools([...selectedTools, tool])
    setSearchTerm("")
  }

  const handleAddCustomSkill = () => {
    if (!customSkill.trim()) return

    const newTool = { id: `custom-${Date.now()}`, name: customSkill.trim() }
    if (selectedTools.some(t => t.name.toLowerCase() === newTool.name.toLowerCase())) {
      return
    }

    setSelectedTools([...selectedTools, newTool])
    setCustomSkill("")
  }

  const handleToolRemove = (toolId: string) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId))
  }

  // Initialize form with defaults or existing data
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      company: initialData?.company || "",
      location: initialData?.location || "",
      employmentType: initialData?.meta.employmentType || "Full time",
      responsibilities: initialData?.meta.responsibilities || "",
      achievements: initialData?.meta.achievements || "",
      isCurrentlyWorking: initialData?.endDate === "Present",
      startMonth: initialData?.startDate.split(" ")[0] || "",
      startYear: initialData?.startDate.split(" ")[1] || "",
      endMonth: initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[0] : "",
      endYear: initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[1] : "",
    },
  })

  // Watch current work status to control end date fields
  const isCurrentlyWorking = form.watch("isCurrentlyWorking")

  // Handle form submission
  const onFormSubmit = (values: FormData) => {
    const {
      title,
      company,
      location,
      employmentType,
      responsibilities,
      achievements,
      isCurrentlyWorking,
      startMonth,
      startYear,
      endMonth,
      endYear,
    } = values

    const startDate = `${startMonth} ${startYear}`
    const endDate = isCurrentlyWorking ? "Present" : `${endMonth} ${endYear}`

    const experienceData: ProOnboardingData["experience"][0] = {
      title,
      company,
      location,
      startDate,
      endDate,
      meta: {
        employmentType,
        responsibilities,
        achievements: achievements || "",
        skills: selectedTools.map((tool) => tool.name),
      },
    }

    onSubmit(experienceData)
  }

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6 p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title">Job Title</label>
          <Input
            id="title"
            placeholder="e.g. Software Engineer"
            {...form.register("title")}
            aria-invalid={!!form.formState.errors.title}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="company">Company</label>
          <Input
            id="company"
            placeholder="e.g. Google"
            {...form.register("company")}
            aria-invalid={!!form.formState.errors.company}
          />
          {form.formState.errors.company && (
            <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="location">Location</label>
        <Input
          id="location"
          placeholder="e.g. Mountain View, CA"
          {...form.register("location")}
          aria-invalid={!!form.formState.errors.location}
        />
        {form.formState.errors.location && (
          <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="employmentType">Employment Type</label>
        <Select onValueChange={(value) => form.setValue("employmentType", value)}>
          <SelectTrigger id="employmentType">
            <SelectValue placeholder="Select employment type" defaultValue={initialData?.meta.employmentType || "Full time"} />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYMENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.employmentType && (
          <p className="text-sm text-red-500">{form.formState.errors.employmentType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label>Start Date</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Select onValueChange={(value) => form.setValue("startMonth", value)}>
                <SelectTrigger aria-label="Start Month">
                  <SelectValue placeholder="Month" defaultValue={initialData?.startDate.split(" ")[0] || ""} />
                </SelectTrigger>
                <SelectContent>
                  {MONTH_OPTIONS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.startMonth && (
                <p className="text-sm text-red-500">{form.formState.errors.startMonth.message}</p>
              )}
            </div>

            <div>
              <Select onValueChange={(value) => form.setValue("startYear", value)}>
                <SelectTrigger aria-label="Start Year">
                  <SelectValue placeholder="Year" defaultValue={initialData?.startDate.split(" ")[1] || ""} />
                </SelectTrigger>
                <SelectContent>
                  {YEAR_OPTIONS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.startYear && (
                <p className="text-sm text-red-500">{form.formState.errors.startYear.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label>End Date</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCurrentlyWorking"
                checked={isCurrentlyWorking}
                onCheckedChange={(checked) => form.setValue("isCurrentlyWorking", checked as boolean)}
              />
              <label htmlFor="isCurrentlyWorking" className="text-sm font-normal">
                I am currently working in this role
              </label>
            </div>

            {!isCurrentlyWorking && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Select
                    onValueChange={(value) => form.setValue("endMonth", value)}
                    disabled={isCurrentlyWorking}
                  >
                    <SelectTrigger aria-label="End Month">
                      <SelectValue
                        placeholder="Month"
                        defaultValue={initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[0] : ""}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTH_OPTIONS.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select
                    onValueChange={(value) => form.setValue("endYear", value)}
                    disabled={isCurrentlyWorking}
                  >
                    <SelectTrigger aria-label="End Year">
                      <SelectValue
                        placeholder="Year"
                        defaultValue={initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[1] : ""}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {YEAR_OPTIONS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {form.formState.errors.endYear && (
              <p className="text-sm text-red-500">{form.formState.errors.endYear.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="responsibilities">Responsibilities</label>
        <Textarea
          id="responsibilities"
          placeholder="Describe your key responsibilities and duties in this role"
          {...form.register("responsibilities")}
          rows={4}
          aria-invalid={!!form.formState.errors.responsibilities}
        />
        {form.formState.errors.responsibilities && (
          <p className="text-sm text-red-500">{form.formState.errors.responsibilities.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="achievements">Key Achievements</label>
        <Textarea
          id="achievements"
          placeholder="e.g. Increased user engagement by 20%, Delivered project ahead of schedule"
          {...form.register("achievements")}
          rows={3}
        />
        {form.formState.errors.achievements && (
          <p className="text-sm text-red-500">{form.formState.errors.achievements.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label>Skills</label>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add skills
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add skills</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  placeholder="Search or type a new skill"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (searchTerm.trim()) {
                      handleToolSelect({ id: `custom-${Date.now()}`, name: searchTerm.trim() })
                    }
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>

              {filteredSkills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Suggested skills</p>
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.slice(0, 12).map((tool) => (
                      <div
                        key={tool.id}
                        className="cursor-pointer"
                        onClick={() => handleToolSelect(tool)}
                      >
                        {tool.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogClose asChild>
              <Button type="button">Done</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {selectedTools.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTools.map((tool) => (
              <div key={tool.id} className="flex items-center gap-1">
                {tool.name}
                <button
                  type="button"
                  onClick={() => handleToolRemove(tool.id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                  aria-label={`Remove ${tool.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className={cn("flex-1", "bg-coral-red-100")}>
          {initialData ? "Update experience" : "Add experience"}
        </Button>
      </div>
    </form>
  )
}