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
import { cn } from "@dallah/utils"
import type { ProOnboardingData } from ".."

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)

const educationSchema = z.object({
  school: z.string().min(2, {
    message: "School must be at least 2 characters.",
  }),
  degree: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  field: z.string().min(2, {
    message: "Field of study must be at least 2 characters.",
  }),
  startMonth: z.string().min(1, {
    message: "Start month is required",
  }),
  startYear: z.string().min(4, {
    message: "Start year is required",
  }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
  isCurrentlyStudying: z.boolean().default(false),
  description: z.string().optional(),
})

type FormData = z.infer<typeof educationSchema>

export function EducationForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (education: ProOnboardingData["education"][0]) => void
  onCancel: () => void
  initialData?: ProOnboardingData["education"][0]
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: initialData?.school || "",
      degree: initialData?.degree || "",
      field: initialData?.field || "",
      description: initialData?.description || "",
      isCurrentlyStudying: initialData?.endDate === "Present",
      startMonth: initialData?.startDate.split(" ")[0] || "",
      startYear: initialData?.startDate.split(" ")[1] || "",
      endMonth: initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[0] : "",
      endYear: initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[1] : "",
    },
  })

  const { register, handleSubmit, formState, watch, setValue } = form
  const { errors } = formState

  const isCurrentlyStudying = watch("isCurrentlyStudying")

  const onFormSubmit = (values: FormData) => {
    const { startMonth, startYear, endMonth, endYear, isCurrentlyStudying, description = "", ...rest } = values

    const startDate = `${startMonth} ${startYear}`
    const endDate = isCurrentlyStudying ? "Present" : `${endMonth} ${endYear}`

    onSubmit({
      ...rest,
      startDate,
      endDate,
      description: description
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Input
            id="school"
            // label="School"
            placeholder="Enter school name"
            {...register("school")}
          // error={errors.school?.message}
          />
        </div>
        <div>
          <Input
            id="degree"
            // label="Degree"
            placeholder="Enter degree"
            {...register("degree")}
          // error={errors.degree?.message}
          />
        </div>
        <div>
          <Input
            id="field"
            // label="Field of study"
            placeholder="Enter field of study"
            {...register("field")}
          // error={errors.field?.message}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div>
          <Select onValueChange={(value) => setValue("startMonth", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Start Month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.startMonth && <p className="mt-2 text-sm text-red-500">{errors.startMonth?.message}</p>}
        </div>
        <div>
          <Select onValueChange={(value) => setValue("startYear", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Start Year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.startYear && <p className="mt-2 text-sm text-red-500">{errors.startYear?.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div>
          <Select
            disabled={isCurrentlyStudying}
            onValueChange={(value) => setValue("endMonth", value)}
            defaultValue={initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[0] : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="End Month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            disabled={isCurrentlyStudying}
            onValueChange={(value) => setValue("endYear", value)}
            defaultValue={initialData?.endDate !== "Present" ? initialData?.endDate.split(" ")[1] : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="End Year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2">
          <Input type="checkbox" {...register("isCurrentlyStudying")} className="h-4 w-4" />
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I am currently studying here
          </span>
        </label>
      </div>

      <div className="mt-4">
        <Textarea id="description" placeholder="Enter description" {...register("description")} />
      </div>

      <div className="flex gap-4">
        <Button type="button" onClick={onCancel} variant="outline" className="w-full">
          Cancel
        </Button>
        <Button type="submit" className={cn("w-full", "bg-coral-red-100")}>
          {initialData ? "Update Education" : "Add Education"}
        </Button>
      </div>
    </form>
  )
}

