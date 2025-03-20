'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { useRef } from 'react'
import { Camera, Check, UserCircle } from 'lucide-react'
import Image from 'next/image'
import { upload } from '@lib/api/shared/upload'
import { RequiredIndicator } from '@components/shared/required-indicator'
import { cn } from '@dallah/utils'

const AvatarUpload = ({
  setUploadedURL,
  required,
  initialURL,
  className,
}: {
  setUploadedURL: (url: string) => void
  required: boolean
  initialURL?: string
  className?: string
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(initialURL || '')
  const [isHovered, setIsHovered] = useState(false)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      const { data } = await upload(file)
      setUploadedURL(data.fileUrl)
      console.log(data.fileUrl)
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-4')}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn('relative h-24 w-24 cursor-pointer', className)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#234d64]/10 bg-[#234d64]/5">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserCircle className="h-12 w-12 text-[#234d64]/40" />
              </div>
            )}
            <motion.div
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              className="absolute inset-0 flex items-center justify-center bg-[#234d64]/10 transition-colors"
            >
              <Camera className="h-6 w-6 text-[#234d64]" />
            </motion.div>
          </div>
          {previewUrl && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 rounded-full border border-gray-100 bg-white p-1 shadow-sm"
            >
              <Check className="h-3 w-3 text-[#234d64]" />
            </motion.div>
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
      <p className="text-sm text-gray-500">
        {required ? (
          <>
            Upload your profile picture
            <RequiredIndicator />
          </>
        ) : (
          'Upload your profile picture'
        )}
      </p>
    </div>
  )
}

export default AvatarUpload
