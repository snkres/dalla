'use client'

import type React from 'react'

import { useState, useRef, useCallback } from 'react'
import {
  ImageIcon,
  X,
  Plus,
  FileText,
  Eye,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  FileAudio,
  FileVideo,
  FileIcon,
} from 'lucide-react'
import Image from 'next/image'
import { upload } from '@lib/api/shared/upload'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@dalla/design-system'
import { Progress } from '@dalla/design-system'
import { cn } from '@dalla/utils'

interface MultiImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  label?: string
  className?: string
  allowAllFileTypes?: boolean
  maxFileSize?: number
}

interface FileTypeInfo {
  icon: React.ForwardRefExoticComponent<any>
  color: string
  label: string
  isImage?: boolean
}

const FILE_TYPES: Record<string, FileTypeInfo> = {
  pdf: { icon: FileText, color: '#F40F02', label: 'PDF' },
  doc: { icon: FileText, color: '#2B579A', label: 'DOC' },
  docx: { icon: FileText, color: '#2B579A', label: 'DOCX' },
  txt: { icon: FileText, color: '#5B5B5B', label: 'TXT' },

  xls: { icon: FileSpreadsheet, color: '#217346', label: 'XLS' },
  xlsx: { icon: FileSpreadsheet, color: '#217346', label: 'XLSX' },
  csv: { icon: FileSpreadsheet, color: '#217346', label: 'CSV' },

  ppt: { icon: FileText, color: '#D24726', label: 'PPT' },
  pptx: { icon: FileText, color: '#D24726', label: 'PPTX' },

  zip: { icon: FileArchive, color: '#FFBE00', label: 'ZIP' },
  rar: { icon: FileArchive, color: '#FFBE00', label: 'RAR' },

  mp3: { icon: FileAudio, color: '#FF7700', label: 'MP3' },
  wav: { icon: FileAudio, color: '#FF7700', label: 'WAV' },
  mp4: { icon: FileVideo, color: '#0072BC', label: 'MP4' },
  avi: { icon: FileVideo, color: '#0072BC', label: 'AVI' },

  jpg: { icon: ImageIcon, color: '#3E7BFA', label: 'JPG', isImage: true },
  jpeg: { icon: ImageIcon, color: '#3E7BFA', label: 'JPEG', isImage: true },
  png: { icon: ImageIcon, color: '#3E7BFA', label: 'PNG', isImage: true },
  gif: { icon: ImageIcon, color: '#3E7BFA', label: 'GIF', isImage: true },
  svg: { icon: ImageIcon, color: '#3E7BFA', label: 'SVG', isImage: true },
  webp: { icon: ImageIcon, color: '#3E7BFA', label: 'WEBP', isImage: true },

  default: { icon: FileIcon, color: '#8C8C8C', label: 'FILE' },
}

const MultiImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  label = 'Add Media',
  className = '',
  allowAllFileTypes = false,
  maxFileSize = 10,
}: MultiImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const getFileTypeInfo = (fileUrl: string, mimeType?: string) => {
    const extension = fileUrl.split('.').pop()?.toLowerCase() || ''

    if (extension && FILE_TYPES[extension as keyof typeof FILE_TYPES]) {
      return FILE_TYPES[extension as keyof typeof FILE_TYPES]
    }

    if (mimeType) {
      if (mimeType.includes('pdf')) return FILE_TYPES.pdf
      if (mimeType.includes('word')) return FILE_TYPES.docx
      if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
        return FILE_TYPES.xlsx
      if (mimeType.includes('powerpoint') || mimeType.includes('presentation'))
        return FILE_TYPES.pptx
      if (mimeType.includes('image')) return FILE_TYPES.jpg
      if (mimeType.includes('audio')) return FILE_TYPES.mp3
      if (mimeType.includes('video')) return FILE_TYPES.mp4
      if (mimeType.includes('zip') || mimeType.includes('compressed'))
        return FILE_TYPES.zip
      if (mimeType.includes('text/plain')) return FILE_TYPES.txt
    }

    return FILE_TYPES.default
  }

  const isImage = (fileUrl: string, mimeType?: string): boolean => {
    const fileType = getFileTypeInfo(fileUrl, mimeType)
    return fileType.isImage === true
  }

  const validateFile = (file: File): boolean => {
    if (file.size > maxFileSize * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${maxFileSize}MB`,
        variant: 'destructive',
      })
      return false
    }

    if (!allowAllFileTypes) {
      const isValidType =
        file.type.includes('image') || file.type.includes('pdf')
      if (!isValidType) {
        toast({
          title: 'Invalid file type',
          description: 'Only images and PDFs are allowed',
          variant: 'destructive',
        })
        return false
      }
    }

    return true
  }

  const uploadFiles = async (files: FileList | File[]) => {
    if (images.length >= maxImages) {
      toast({
        title: 'Maximum files reached',
        description: `You can only upload up to ${maxImages} files`,
        variant: 'destructive',
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const remainingSlots = maxImages - images.length
      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      const validFiles = filesToUpload.filter(validateFile)

      if (validFiles.length === 0) {
        setIsUploading(false)
        return
      }

      const newImages = [...images]

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const progressIncrement = 100 / validFiles.length

        try {
          const { data } = await upload(file)
          newImages.push(data.fileUrl)
          setUploadProgress((prev) => Math.min(prev + progressIncrement, 100))
        } catch (error) {
          console.error('Error uploading file:', error)
          toast({
            title: 'Upload failed',
            description: `Failed to upload ${file.name}`,
            variant: 'destructive',
          })
        }
      }

      onImagesChange(newImages)

      if (validFiles.length > 0) {
        toast({
          title: 'Upload successful',
          description: `Successfully uploaded ${validFiles.length} file(s)`,
        })
      }
    } catch (error) {
      console.error('Error uploading files:', error)
      toast({
        title: 'Upload failed',
        description: 'An error occurred while uploading files',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      await uploadFiles(files)
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    onImagesChange(updatedImages)
    toast({
      title: 'File removed',
      description: 'The file has been removed',
    })
  }

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files)
      }
    },
    [images, maxImages],
  )

  const getFileExtension = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase() || ''
    return extension
  }

  const renderFileThumbnail = (fileUrl: string, index: number) => {
    const extension = getFileExtension(fileUrl)
    const fileTypeInfo =
      FILE_TYPES[extension as keyof typeof FILE_TYPES] || FILE_TYPES.default

    const PreviewButton = () => (
      <button
        type="button"
        onClick={() => setPreviewFile(fileUrl)}
        className="absolute bottom-1 left-1 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white"
        aria-label="Preview file"
      >
        <Eye className="h-3 w-3 text-gray-700" />
      </button>
    )

    if (fileTypeInfo.isImage) {
      return (
        <div className="relative h-full w-full">
          <Image
            src={fileUrl || '/placeholder.svg'}
            alt={`Media ${index + 1}`}
            fill
            className="object-cover"
          />
          <PreviewButton />
          <div className="absolute bottom-0 right-0 bg-black/50 px-1 py-0.5 text-[8px] text-white">
            {/* {extension.toUpperCase()} */}
            File
          </div>
        </div>
      )
    }

    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: `${fileTypeInfo.color}15` }}
      >
        <div className="mb-1">
          <fileTypeInfo.icon
            className="h-6 w-6"
            style={{ color: fileTypeInfo.color }}
          />
        </div>
        <div className="text-center" style={{ color: fileTypeInfo.color }}>
          {/* <span className="text-xs font-bold">{extension.toUpperCase()}</span> */}
          File
        </div>
        <PreviewButton />
      </div>
    )
  }

  const generateAcceptString = () => {
    if (allowAllFileTypes) return '*/*'
    return 'image/*,.pdf'
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} ({images.length}/{maxImages})
      </label>

      <div
        ref={dropZoneRef}
        className={cn(
          'relative rounded-lg border-2 border-dashed p-4 transition-all',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 bg-gray-50 hover:border-[#63B7B7] hover:bg-[#f5fafa]',
          isUploading ? 'opacity-75' : '',
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="mb-2 text-sm font-medium">Uploading...</div>
            <Progress value={uploadProgress} className="w-3/4 max-w-md" />
            <div className="mt-2 text-xs text-gray-500">
              {Math.round(uploadProgress)}%
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {images.map((fileUrl, index) => (
            <div
              key={`${fileUrl}-${index}`}
              className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {renderFileThumbnail(fileUrl, index)}

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-1 top-1 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white"
                aria-label="Remove file"
              >
                <X className="h-3 w-3 text-gray-700" />
              </button>
            </div>
          ))}

          {images.length < maxImages && (
            <button
              type="button"
              className={cn(
                'flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-[#63B7B7] hover:bg-[#f5fafa]',
                isUploading ? 'cursor-not-allowed opacity-50' : '',
              )}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              aria-label="Add media"
            >
              <Plus className="h-5 w-5 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500">Add</span>
            </button>
          )}
        </div>

        {images.length === 0 && !isUploading && (
          <div className="mt-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2 flex items-center justify-center rounded-full bg-[#f5fafa] p-3">
              <ImageIcon className="h-6 w-6 text-[#63B7B7]" />
            </div>
            <p className="text-sm text-gray-700">
              Drag and drop files here or click to browse
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {allowAllFileTypes
                ? 'Supports various file types'
                : 'Images and PDFs only'}{' '}
              (max {maxFileSize}MB)
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={generateAcceptString()}
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload files"
      />

      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 text-gray-400" />
        <p className="text-xs text-gray-500">
          Click or drag to add {allowAllFileTypes ? 'files' : 'images and PDFs'}
          . Maximum {maxImages} files allowed, up to {maxFileSize}MB each.
        </p>
      </div>

      <Dialog
        open={!!previewFile}
        onOpenChange={(open) => !open && setPreviewFile(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>File Preview</DialogTitle>
            <DialogDescription>
              {isImage(previewFile || '')
                ? 'Viewing image file'
                : 'File preview not available'}
            </DialogDescription>
          </DialogHeader>
          {previewFile && (
            <>
              {isImage(previewFile) ? (
                <div className="relative aspect-auto h-[60vh] w-full">
                  <Image
                    src={previewFile || '/placeholder.svg'}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-[60vh] w-full flex-col items-center justify-center rounded-lg border border-dashed p-4">
                  {(() => {
                    const extension = getFileExtension(previewFile)
                    const fileTypeInfo =
                      FILE_TYPES[extension as keyof typeof FILE_TYPES] ||
                      FILE_TYPES.default
                    const IconComponent = fileTypeInfo.icon

                    return (
                      <>
                        <IconComponent
                          className="mb-4 h-20 w-20"
                          style={{ color: fileTypeInfo.color }}
                        />
                        <p
                          className="text-lg font-medium"
                          style={{ color: fileTypeInfo.color }}
                        >
                          {fileTypeInfo.label} File
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          Preview not available.{' '}
                          <a
                            href={previewFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Download file
                          </a>
                        </p>
                      </>
                    )
                  })()}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MultiImageUpload
