'use client'

import { motion } from 'motion/react'
import { useState, useRef } from 'react'
import { Camera, Check, Image as ImageIcon, X, Plus } from 'lucide-react'
import Image from 'next/image'
import { uploadImage } from '@lib/api/shared/upload'
import { Button } from '@dallah/design-system'

interface ImageUploadProps {
  setUploadedURL: (url: string) => void
  label?: string
  initialURL?: string
  className?: string
  aspectRatio?: 'square' | 'rectangle'
  size?: 'sm' | 'md' | 'lg'
}

const ImageUpload = ({
  setUploadedURL,
  label = 'Upload image',
  initialURL = '',
  className = '',
  aspectRatio = 'rectangle',
  size = 'md',
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(initialURL)
  const [isHovered, setIsHovered] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: aspectRatio === 'square' ? 'h-24 w-24' : 'h-24 w-40',
    lg: aspectRatio === 'square' ? 'h-32 w-32' : 'h-48 w-full',
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Show preview immediately
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      try {
        // Upload to server
        const { data } = await uploadImage(file)
        setUploadedURL(data.fileUrl)
        console.log('Uploaded image URL:', data.fileUrl)
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreviewUrl('')
    setUploadedURL('')
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative cursor-pointer overflow-hidden rounded-lg border-2 border-[#234d64]/10 bg-[#234d64]/5 ${sizeClasses[size]}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                className="absolute inset-0 flex items-center justify-center bg-[#234d64]/20 transition-colors"
              >
                <Camera className="h-6 w-6 text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute right-2 top-2 rounded-full bg-white/80 p-1 shadow-sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4 text-gray-700" />
              </motion.div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              {isUploading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#234d64] border-t-transparent"></div>
                  <span className="mt-2 text-xs text-[#234d64]/70">Uploading...</span>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-[#234d64]/40" />
                  <span className="mt-1 text-xs text-[#234d64]/70">{label}</span>
                </>
              )}
            </div>
          )}
        </motion.div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </motion.div>
    </div>
  )
}

export default ImageUpload
