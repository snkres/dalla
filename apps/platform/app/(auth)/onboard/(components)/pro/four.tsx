'use client'

import type React from 'react'
import { type Dispatch } from 'react'
import Image from 'next/image'
import { Button } from '@dallah/design-system'
import { Modal } from '@components/shared/modal'
import { EducationForm } from './edu-form'
import type { ProOnboardingData } from '../../page'
import { PlusIcon } from 'lucide-react'
import { useProOnboarding } from '../../(hooks)/use-pro-onboarding'

export function ProOnboardingFour({
  data,
  updateData,
  setIsAbleToProceed,
}: {
  data: ProOnboardingData
  updateData: Dispatch<React.SetStateAction<ProOnboardingData>>
  setIsAbleToProceed: Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    isEduOpen,
    setIsEduOpen,
    editingIndex,
    setEditingIndex,
    isAllValid,
    handleEduEdit,
    handleEducationSubmit,
  } = useProOnboarding({
    data,
    updateData,
    setIsAbleToProceed,
  })

  return (
    <div className="flex w-[43rem] flex-col items-center justify-center gap-4 px-6">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-text-xl font-semibold">Add Education</h1>
        <p className="text-[#475467]">
          Share your educational background to complete your profile.
        </p>
        {!isAllValid ? (
          <p className="text-red-500">
            Please make sure all fields are filled.
          </p>
        ) : null}
      </div>

      <div className="mt-4 w-full">
        {data.education.length > 0 ? (
          <div className="space-y-4">
            {data.education.map(
              (
                edu: ProOnboardingData['education'][0],
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-md font-medium text-slate-700">
                        {edu.school}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleEduEdit(index as number)}
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full hover:bg-slate-100"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <Image
            src="/exp.webp"
            alt="Education"
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
            setIsEduOpen(true)
          }}
          size="lg"
          type="button"
          style={{
            boxShadow: '0px -1px 0px 0px rgba(16, 24, 40, 0.1) inset',
          }}
        >
          <PlusIcon className="h-4 w-4" />
          {data.education.length > 0
            ? 'Add another Education'
            : 'Add Education'}
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
          initialData={
            editingIndex !== null ? data.education[editingIndex] : undefined
          }
        />
      </Modal>
    </div>
  )
}
