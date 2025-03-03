import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from '@dallah/design-system'
import { useToast } from '@dallah/design-system/ui/toast/use-toast'
import { AxiosResponse } from 'axios'
import {
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Verified,
  Video,
  Edit,
  Edit2,
} from 'lucide-react'
import { useState } from 'react'

interface ProfileCardProps {
  profileImage: string
  name: string
  title: string
  isVerified: boolean
  isOwner: boolean
  yearsOfExperience: number
  bio: string
  onUpdateProfile?: (
    updatedProfile: Partial<{
      bio: string
      title: string
      yearsOfExperience: number
    }>,
  ) => Promise<AxiosResponse<any, any>>
}

export const ProfileCard = ({
  profileImage,
  name,
  title,
  isVerified,
  isOwner,
  yearsOfExperience,
  bio,
  onUpdateProfile,
}: ProfileCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  return (
    <div className="relative flex flex-col gap-4 rounded-3xl border border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
      {isOwner && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 rounded-full"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}

      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="mb-3 h-24 w-24 overflow-hidden rounded-full bg-amber-100">
            <img
              src={profileImage}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          <Verified
            className={`absolute bottom-2 right-0 h-8 w-8 ${
              isVerified ? 'fill-green-500' : 'fill-gray-200 text-gray-500'
            }`}
          />
        </div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-600">{title}</p>
        <p className="text-center text-base text-gray-500">{bio}</p>
      </div>

      {!isOwner && (
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white"
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-center">
          <p className="font-medium">Freelancer Stats</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center rounded-xl border bg-white p-3">
            <span className="text-sm text-gray-500">Projects</span>
            <span className="text-lg font-bold">24</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border bg-white p-3">
            <span className="text-sm text-gray-500">Success Rate</span>
            <span className="text-lg font-bold">96%</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border bg-white p-3">
            <span className="text-sm text-gray-500">Reviews</span>
            <span className="text-lg font-bold">4.9/5</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border bg-white p-3">
            <span className="text-sm text-gray-500">Experience</span>
            <span className="text-lg font-bold">{yearsOfExperience} yrs</span>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <ProfileEditModal
          profile={{
            title,
            bio,
            yearsOfExperience,
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedProfile) => {
            if (onUpdateProfile) {
              await onUpdateProfile(updatedProfile)
                .then(() => {
                  setIsEditModalOpen(false)
                  toast({
                    title: 'Profile updated successfully',
                  })
                })
                .catch(() => {
                  toast({
                    title: 'Failed to update profile',
                    variant: 'destructive',
                  })
                })
            }
          }}
        />
      )}
    </div>
  )
}

interface ProfileEditModalProps {
  profile: {
    title: string
    bio: string
    yearsOfExperience: number
  }
  onClose: () => void
  onSave: (updatedProfile: Partial<ProfileCardProps>) => void
}

const ProfileEditModal = ({
  profile,
  onClose,
  onSave,
}: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    title: profile.title,
    bio: profile.bio,
    yearsOfExperience: profile.yearsOfExperience,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <div className="mb-4 text-xl font-bold">Edit Profile</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0  "
                className="h-11"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
