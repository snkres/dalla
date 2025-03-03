import { Button } from '@dallah/design-system'
import {
  Mail,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Verified,
  Video,
} from 'lucide-react'

interface ProfileCardProps {
  profileImage: string
  name: string
  title: string
  isVerified: boolean
  isOwner: boolean
  yearsOfExperience: number
  bio: string
}

export const ProfileCard = ({
  profileImage,
  name,
  title,
  isVerified,
  isOwner,
  yearsOfExperience,
  bio,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
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
    </div>
  )
}
