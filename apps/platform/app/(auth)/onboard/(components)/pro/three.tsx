'use client'

import type React from 'react'
import { type Dispatch, useState, useEffect } from 'react'

import Image from 'next/image'
import { Button } from '@dallah/design-system'
import { Modal } from '@components/shared/modal'
import { ExperienceForm } from './exp-form'
import { ProOnboardingData } from '../../page'
import { PlusIcon } from 'lucide-react'

export function ProOnboardingThree({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const [isExpOpen, setIsExpOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAllValid, setIsAllValid] = useState(false)

  useEffect(() => {
    const isValid = data.experience.every(
      (exp: { startDate: any; endDate: string }) =>
        exp.startDate && (exp.endDate || exp.endDate === 'Present'),
    )
    setIsAllValid(isValid)
    setIsAbleToProceed(isValid)
  }, [data.experience])

  const handleExperienceSubmit = (
    experience: ProOnboardingData['experience'][0],
  ) => {
    updateData((prevData) => {
      const newExperience = [...prevData.experience]
      if (editingIndex !== null) {
        newExperience[editingIndex] = experience
      } else {
        newExperience.push(experience)
      }
      return { ...prevData, experience: newExperience }
    })
    setIsExpOpen(false)
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsExpOpen(true)
  }

  return (
    <div className="flex w-[43rem] flex-col items-center justify-center gap-4 px-6">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-text-xl font-semibold">Add Experience</h1>
        <p className="text-[#475467]">
          Share your work history on your profile.
        </p>
        {!isAllValid && (
          <p className="text-red-500">
            Please make sure all fields are filled.
          </p>
        )}
      </div>

      <div className="mt-4 w-full">
        {data.experience.length > 0 ? (
          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold">
                      {exp.title} <span className="text-gray-500">at</span>{' '}
                      {exp.company}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {exp.location} • {exp.meta.employmentType}
                    </p>
                    {exp.meta.responsibilities && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {exp.meta.responsibilities}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleEdit(index)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Image
            src="/exp.webp"
            alt="Experience"
            width={500}
            height={300}
            className="mx-auto"
          />
        )}
      </div>

      <div className="mt-6 flex w-full items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setEditingIndex(null)
            setIsExpOpen(true)
          }}
          size="lg"
          type="button"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          <PlusIcon className="h-4 w-4" />
          {data.experience.length > 0
            ? 'Add another Experience'
            : 'Add Experience'}
        </Button>
      </div>

      <Modal
        isOpen={isExpOpen}
        onClose={() => {
          setIsExpOpen(false)
          setEditingIndex(null)
        }}
      >
        <ExperienceForm
          onSubmit={handleExperienceSubmit}
          onCancel={() => {
            setIsExpOpen(false)
            setEditingIndex(null)
          }}
          initialData={
            editingIndex !== null ? data.experience[editingIndex] : undefined
          }
        />
      </Modal>
    </div>
  )
}
