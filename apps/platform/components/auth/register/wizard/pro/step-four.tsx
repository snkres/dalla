"use client"

import type React from "react"
import { type Dispatch, useState, useEffect } from "react"
import type { ProOnboardingData } from ".."
import Image from "next/image"
import { Button } from "@dallah/design-system"
import { Modal } from "@components/shared/modal"
import { EducationForm } from "./edu-form"

export function ProWizardStepFour({
  data,
  updateData,
  onSubmit,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  onSubmit: () => void
}) {
  const [isEduOpen, setIsEduOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    // Validate that all education items have dates
    const isValid = data.education.every((edu) => edu.startDate && (edu.endDate || edu.endDate === "Present"))
    if (!isValid) {
      // If not valid, you might want to show an error message or prevent proceeding
      console.error("All education items must have start and end dates")
    }
  }, [data.education])

  const handleEducationSubmit = (education: ProOnboardingData["education"][0]) => {
    updateData((prevData) => {
      const newEducation = [...prevData.education]
      if (editingIndex !== null) {
        newEducation[editingIndex] = education
      } else {
        newEducation.push(education)
      }
      return { ...prevData, education: newEducation }
    })
    setIsEduOpen(false)
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsEduOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 w-[43rem] px-6 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-text-xl font-semibold">Add Education</h1>
        <p className="text-[#475467]">Share your educational background to complete your profile.</p>
      </div>

      <div className="w-full mt-4">
        {data.education.length > 0 ? (
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg border-slate-blue-50">
                <p className="font-medium">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-sm">{edu.school}</p>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
                <Button onClick={() => handleEdit(index)} variant="outline" size="sm" className="mt-2">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Image src="/exp.webp" alt="Education" width={500} height={300} className="mx-auto" />
        )}
      </div>

      <div className="flex gap-2 items-center w-full mt-6">
        <Button
          onClick={onSubmit}
          variant="outline"
          size="lg"
          className="shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="submit"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset",
          }}
        >
          {data.education.length > 0 ? "Complete Profile" : "Skip"}
        </Button>
        <Button
          variant="default"
          onClick={() => {
            setEditingIndex(null)
            setIsEduOpen(true)
          }}
          size="lg"
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="button"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset",
          }}
        >
          {data.education.length > 0 ? "Add More" : "Add Education"}
        </Button>
      </div>

      <Modal
        isOpen={isEduOpen}
        onClose={() => {
          setIsEduOpen(false)
          setEditingIndex(null)
        }}
      >
        <EducationForm
          onSubmit={handleEducationSubmit}
          onCancel={() => {
            setIsEduOpen(false)
            setEditingIndex(null)
          }}
          initialData={editingIndex !== null ? data.education[editingIndex] : undefined}
        />
      </Modal>
    </div>
  )
}

