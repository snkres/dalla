'use client'

import { motion } from 'motion/react'
import { useState, useRef } from 'react'
import { Camera, Image as ImageIcon, X, Plus, FileText } from 'lucide-react'
import Image from 'next/image'
import { upload } from '@lib/api/shared/upload'
import { Button } from '@dallah/design-system'

interface MultiImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  label?: string
  className?: string
  allowPdf?: boolean
}

const MultiImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  label = 'Add Media',
  className = '',
  allowPdf = true,
}: MultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)

      try {
        // Upload each file
        for (let i = 0; i < files.length; i++) {
          if (images.length >= maxImages) break

          const file = files[i]
          const { data } = await upload(file)
          onImagesChange([...images, data.fileUrl])
        }
      } catch (error) {
        console.error('Error uploading files:', error)
      } finally {
        setIsUploading(false)
        // Clear the input to allow uploading the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    onImagesChange(updatedImages)
  }

  // Improved function to determine if a URL is a PDF
  const isPdf = (url: string): boolean => {
    return (
      url.toLowerCase().includes('.pdf') ||
      url.toLowerCase().includes('application/pdf')
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} ({images.length}/{maxImages})
      </label>

      <div className="flex flex-wrap gap-3">
        {images.map((fileUrl, index) => (
          <div
            key={`${fileUrl}-${index}`}
            className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200"
          >
            {isPdf(fileUrl) ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50">
                <FileText className="h-8 w-8 text-[#63B7B7]" />
                <span className="mt-1 text-[10px] text-gray-500">PDF</span>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src="https://placehold.co/80x80/e6f3f3/63B7B7?text=PDF"
                  alt={`Media`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute right-1 top-1 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white"
            >
              <X className="h-3 w-3 text-gray-700" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#63B7B7] hover:bg-[#f5fafa]"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#63B7B7] border-t-transparent"></div>
                <span className="mt-1 text-xs text-gray-500">Uploading...</span>
              </div>
            ) : (
              <>
                <Plus className="h-5 w-5 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">Add</span>
              </>
            )}
          </motion.div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={allowPdf ? 'image/*,.pdf' : 'image/*'}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-gray-500">
        Click to add {allowPdf ? 'images or PDFs' : 'images'}. Maximum{' '}
        {maxImages} files allowed.
      </p>
    </div>
  )
}

export default MultiImageUpload
