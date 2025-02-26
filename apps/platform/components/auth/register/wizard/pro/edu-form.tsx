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
import { DatePicker } from "./date-picker"
import { cn } from "@dallah/utils"
import type { ProOnboardingData } from ".."

// Define the schema for the education form
const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  description: z.string().min(1, "Description is required"),
  isCurrentlyStudying: z.boolean(),
  startMonth: z.string().min(1, "Start month is required"),
  startYear: z.string().min(1, "Start year is required"),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
})

type FormData = z.infer<typeof educationSchema>

const degreeOptions = [
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Professional Certification",
  "High School Diploma",
  "Other",
]

export function EducationForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (education: ProOnboardingData["education"][0]) => void
  onCancel: () => void
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      description: "",
      isCurrentlyStudying: false,
      startMonth: "",
      startYear: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form
  const isCurrentlyStudying = watch("isCurrentlyStudying")

  const onFormSubmit = handleSubmit((data) => {
    const education = {
      school: data.school,
      degree: data.degree,
      field: data.field,
      description: data.description,
      startDate: `${data.startMonth} ${data.startYear}`,
      endDate: data.isCurrentlyStudying ? "Present" : `${data.endMonth} ${data.endYear}`,
    }
    onSubmit(education)
  })

  return (
    <form onSubmit={onFormSubmit} className="p-8">
      <div className="flex items-center justify-center mb-2">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyIDEwVjZDMjIgNC45IDIxLjEgNCAyMCA0SDRDMi45IDQgMiA0LjkgMiA2VjEwTDEyIDE1TDIyIDEwWk0xMiAxOEwyIDEzVjE4QzIgMTkuMSAyLjkgMjAgNCAyMEgyMEMyMS4xIDIwIDIyIDE5LjEgMjIgMThWMTNMMTIgMThaIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo="
            alt="Education"
            className="w-6 h-6"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center mb-1">Add Education</h2>
      <p className="text-gray-600 text-center mb-6">Share your educational background.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School <span className="text-red-500">*</span>
          </label>
          <Input {...register("school")} placeholder="Enter school name" className="w-full" />
          {errors.school && <p className="mt-1 text-sm text-red-500">{errors.school.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree <span className="text-red-500">*</span>
          </label>
          <Select onValueChange={(value) => setValue("degree", value)} defaultValue={form.getValues("degree")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              {degreeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.degree && <p className="mt-1 text-sm text-red-500">{errors.degree.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <Input {...register("field")} placeholder="Enter field of study" className="w-full" />
          {errors.field && <p className="mt-1 text-sm text-red-500">{errors.field.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            {...register("description")}
            placeholder="Describe your studies, achievements, etc."
            rows={4}
            className="w-full"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              {...register("isCurrentlyStudying")}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm currently studying here</span>
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
              <p className="mt-1 text-sm text-red-500">Start date is required</p>
            )}

            <DatePicker
              label="End Date"
              selectedMonth={form.getValues("endMonth") || ""}
              selectedYear={form.getValues("endYear") || ""}
              onMonthChange={(month) => setValue("endMonth", month)}
              onYearChange={(year) => setValue("endYear", year)}
              disabled={isCurrentlyStudying}
            />
            {!isCurrentlyStudying && (errors.endMonth || errors.endYear) && (
              <p className="mt-1 text-sm text-red-500">End date is required</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" onClick={onCancel} variant="outline" className="w-full">
            Cancel
          </Button>
          <Button type="submit" className={cn("w-full", "bg-coral-red-100")}>
            Add Education
          </Button>
        </div>
      </div>
    </form>
  )
}

