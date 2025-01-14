import { useState, useRef } from 'react'
import { Button, Logomark } from '@dallah/design-system'
import { Upload, X } from 'lucide-react'

interface PictureUploadProps {
  onImageChange: (image: string | null) => void
}

export function PictureUpload({ onImageChange }: PictureUploadProps) {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result as string
        setImage(newImage)
        onImageChange(newImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setImage(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
            <Logomark className="[&_path]:fill-zinc-400" />
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl"
        >
          Upload new picture
        </Button>
        <Button
          variant="ghost"
          onClick={handleRemove}
          disabled={!image}
          className="rounded-xl"
        >
          Delete
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
