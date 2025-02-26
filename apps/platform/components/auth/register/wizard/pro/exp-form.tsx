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
} from "@dallah/design-system"
import { Search, X } from "lucide-react"
import type React from "react"
import { useRef, useEffect, useState } from "react"
import { DatePicker } from "./date-picker"
import { cn } from "@dallah/utils"
import type { ProOnboardingData } from ".."

// Define the schema for the form
const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  location: z.string().min(1, "Location is required"),
  employmentType: z.enum(["Full time", "Part time", "Contract", "Freelance", "Internship"]),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  achievements: z.string().min(1, "Achievements are required"),
  isCurrentlyWorking: z.boolean(),
  startMonth: z.string().min(1, "Start month is required"),
  startYear: z.string().min(1, "Start year is required"),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
})

type FormData = z.infer<typeof experienceSchema>

const employmentOptions = ["Full time", "Part time", "Contract", "Freelance", "Internship"]

const PREDEFINED_SKILLS = [
  "JavaScript",
  "Python",
  "TypeScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "SQL",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "MongoDB",
  "Photoshop",
  "Illustrator",
  "Figma",
  "Sketch",
  "Angular",
  "Vue.js",
  "Next.js",
  "GraphQL",
  "REST API",
]

interface Tool {
  id: string
  name: string
}

export function ExperienceForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (experience: ProOnboardingData["experience"][0]) => void
  onCancel: () => void
}) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      website: "",
      location: "",
      employmentType: "Full time",
      responsibilities: "",
      achievements: "",
      isCurrentlyWorking: false,
      startMonth: "",
      startYear: "",
      skills: [],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form
  const isCurrentlyWorking = watch("isCurrentlyWorking")

  useEffect(() => {
    // Update the skills field whenever selectedTools changes
    setValue(
      "skills",
      selectedTools.map((tool) => tool.name),
    )
  }, [selectedTools, setValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAddSkill = (skill: string) => {
    const newTool: Tool = {
      id: `${skill}-${Date.now()}`,
      name: skill,
    }

    if (!selectedTools.some((tool) => tool.name === skill)) {
      setSelectedTools([...selectedTools, newTool])
    }

    setInputValue("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleRemoveSkill = (toolToRemove: Tool) => {
    setSelectedTools((tools) => tools.filter((tool) => tool.id !== toolToRemove.id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filtered = PREDEFINED_SKILLS.filter((skill) => skill.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const onFormSubmit = handleSubmit((data) => {
    const experience = {
      title: data.title,
      company: data.company,
      location: data.location,
      meta: {
        skills: data.skills,
        achievements: data.achievements,
        responsibilities: data.responsibilities,
        employmentType: data.employmentType,
      },
      startDate: `${data.startMonth} ${data.startYear}`,
      endDate: data.isCurrentlyWorking ? "Present" : `${data.endMonth} ${data.endYear}`,
    }
    onSubmit(experience)
  })

  return (
    <form onSubmit={onFormSubmit} className="p-8">
      <div className="flex items-center justify-center mb-2">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZMOSAxN0w0IDEyIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
            alt="Experience"
            className="w-6 h-6"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mb-1">Add experience</h2>
      <p className="text-gray-600 text-center mb-6">Share where you've worked on your profile.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <Input {...register("title")} placeholder="What is your job title?" className="w-full" />
          {errors.title && <p className="mt-1 text-text-sm text-coral-red-100">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <Input {...register("company")} placeholder="Search for company" className="w-full" />
          {errors.company && <p className="mt-1 text-text-sm text-coral-red-100">{errors.company.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-md font-medium text-gray-700 mb-1">Website</label>
            <Input {...register("website")} placeholder="www.example.com" className="w-full" />
            {errors.website && <p className="mt-1 text-text-sm text-coral-red-100">{errors.website.message}</p>}
          </div>

          <div>
            <label className="block text-text-md font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <Input {...register("location")} placeholder="Location" className="w-full" />
            {errors.location && <p className="mt-1 text-text-sm text-coral-red-100">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={(value) => setValue("employmentType", value as FormData["employmentType"])}
            defaultValue={form.getValues("employmentType")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {employmentOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.employmentType && <p className="mt-1 text-text-sm text-coral-red-100">{errors.employmentType.message}</p>}
        </div>

        <div className="relative">
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Tools & Technologies <span className="text-red-500">*</span>
          </label>
          <div className="border border-[#D0D5DD] rounded-lg bg-white p-3 focus-within:ring-2 focus-within:ring-slate-blue-20 focus-within:border-slate-blue-20">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTools.map((tool) => (
                <span
                  key={tool.id}
                  className="inline-flex items-center bg-slate-blue-10/70 text-gray-800 rounded-full px-3 py-1 text-text-sm"
                >
                  {tool.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(tool)}
                    className="ml-1 p-0.5 hover:bg-gray-200 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center relative">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Select the tools, platforms, or technologies you are proficient in."
                className="flex-1 ml-2 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          {errors.skills && <p className="mt-1 text-text-sm text-coral-red-100">{errors.skills.message}</p>}

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 mt-1 bg-[#FFFDFA] border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10"
            >
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => handleAddSkill(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <Textarea
            {...register("responsibilities")}
            placeholder="Describe your key responsibilities..."
            rows={4}
            className="w-full"
          />
          {errors.responsibilities && <p className="mt-1 text-text-sm text-coral-red-100">{errors.responsibilities.message}</p>}
        </div>

        <div>
          <label className="block text-text-md font-medium text-gray-700 mb-1">
            Achievements <span className="text-red-500">*</span>
          </label>
          <Textarea
            {...register("achievements")}
            placeholder="Describe your key achievements..."
            rows={4}
            className="w-full"
          />
          {errors.achievements && <p className="mt-1 text-text-sm text-coral-red-100">{errors.achievements.message}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              {...register("isCurrentlyWorking")}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm currently still working here</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              selectedMonth={form.getValues("startMonth")}
              selectedYear={form.getValues("startYear")}
              onMonthChange={(month) => setValue("startMonth", month)}
              onYearChange={(year) => setValue("startYear", year)}
            />
            {(errors.startMonth || errors.startYear) && (
              <p className="mt-1 text-text-sm text-coral-red-100">Start date is required</p>
            )}

            <DatePicker
              label="End Date"
              selectedMonth={form.getValues("endMonth") || ""}
              selectedYear={form.getValues("endYear") || ""}
              onMonthChange={(month) => setValue("endMonth", month)}
              onYearChange={(year) => setValue("endYear", year)}
              disabled={isCurrentlyWorking}
            />
            {!isCurrentlyWorking && (errors.endMonth || errors.endYear) && (
              <p className="mt-1 text-text-sm text-coral-red-100">End date is required</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" onClick={onCancel} variant="outline" className="w-full ">
            Cancel
          </Button>
          <Button type="submit" className={cn("w-full", "bg-coral-red-100")}>
            Add experience
          </Button>
        </div>
      </div>
    </form>
  )
}

