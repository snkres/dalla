"use client"

import type React from "react"

import { type Dispatch, useState } from "react"
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

  const handleEducationSubmit = (education: ProOnboardingData["education"][0]) => {
    updateData((prevData) => ({
      ...prevData,
      education: [...prevData.education, education],
    }))
    setIsEduOpen(false)
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
              </div>
            ))}
          </div>
        ) : (
          <Image src="/exp.webp" alt="Education" width={500} height={300} className="mx-auto" />
        )}

      </div>

      <div className="flex gap-2 items-center w-full mt-6">
        <Button
          onClick={
            onSubmit
          }
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
          onClick={
            () => setIsEduOpen(true)
          }
          size="lg"
          className="text-sunshine-yellow-10 shadow-[rgba(16, 24, 40, 0.18)] flex w-full items-center justify-center gap-[0.375rem] self-stretch rounded-[0.5rem] border-[0.05rem] border-solid border-[#CEB67B] bg-coral-red-100 stroke-[0.1px] px-[1rem] py-[10px] shadow-sm"
          type="button"
          style={{
            boxShadow: "0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset",
          }}
        >
          {
            data.education.length > 0 ? "Add More" : "Add Education"
          }
        </Button>
      </div>

      <Modal isOpen={isEduOpen} onClose={() => setIsEduOpen(false)}>
        <EducationForm onSubmit={handleEducationSubmit} onCancel={() => setIsEduOpen(false)} />
      </Modal>
    </div>
  )
}

