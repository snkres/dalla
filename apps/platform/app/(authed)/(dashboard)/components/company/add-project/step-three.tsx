import React from 'react'
import MultiImageUpload from '@components/shared/multiImage-upload'
import { motion } from 'motion/react'
import { Image, FileText } from 'lucide-react'
import { useTranslation } from '@hooks/use-translation'

interface StepThreeProps {
  formData: {
    media: string[]
  }
  handleMediaChange: (media: string[]) => void
}

export function StepThree({ formData, handleMediaChange }: StepThreeProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#63B7B7]"></div>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            {t.mediaDocumentsTitle || 'Media & Documents'}
          </h3>

          <div className="mb-6 rounded-lg border border-[#63B7B7]/10 bg-[#63B7B7]/5 p-4">
            <div className="flex">
              <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#63B7B7]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {t.addSupportingMaterialsTitle || 'Add Supporting Materials'}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {t.addSupportingMaterialsDescription ||
                    "Upload files that help explain your project requirements such as documents, images, designs, or examples of what you're looking for."}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="media"
              className="mb-1 flex items-center text-sm font-medium text-gray-700"
            >
              {t.mediaLabel}
              <div className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {'Optional'}
              </div>
            </label>
            <MultiImageUpload
              images={formData.media}
              onImagesChange={handleMediaChange}
              maxImages={5}
              label="Project Media"
              allowAllFileTypes
            />

            {formData.media.length > 0 && (
              <div className="mt-4 flex items-center gap-1 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
                <Image className="mr-2 h-4 w-4" />
                {(
                  t.filesUploadedMessage ||
                  '{count} file(s) uploaded successfully'
                ).replace('{count}', formData.media.length.toString())}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
