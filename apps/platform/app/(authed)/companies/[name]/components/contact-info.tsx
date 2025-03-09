import { Button } from '@dallah/design-system'
import { Award, ExternalLink, Trophy, Mail, BarChart3 } from 'lucide-react'

export function ContactInfoCard({
  data,
}: {
  data: {
    email: string
    website: string
    location: string
  }
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-800">
        <Mail className="h-4 w-4 text-[#3A97A0]" />
        Contact Information
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <span className="text-xs text-gray-600">Email</span>
          <span className="text-xs text-[#3A97A0]">{data.email}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <span className="text-xs text-gray-600">Website</span>
          <a
            href={data.website || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#3A97A0] hover:underline"
          >
            {data.website}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Location</span>
          <span className="text-xs text-gray-800">{data.location}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <h4 className="mb-3 text-sm text-gray-800">Social Presence</h4>
        <div className="flex justify-center gap-2">
          {['linkedin', 'twitter', 'facebook'].map((platform, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-gray-200 transition-colors duration-200 hover:bg-[#BEDDF1]/25"
            >
              <SocialIcon platform={platform} />
            </Button>
          ))}
        </div>
      </div>

      {/* <div className="mt-5 border-t border-gray-100 pt-4">
        <h4 className="mb-3 flex items-center gap-1.5 text-sm text-gray-800">
          <Award className="h-3.5 w-3.5 text-[#3A97A0]" />
          Company Recognition
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-[#BEDDF1]/10 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BEDDF1]/40">
              <Trophy className="h-4 w-4 text-[#3A97A0]" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">
                Top Tech Innovator
              </p>
              <p className="text-xs text-gray-500">2023</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#BEDDF1]/10 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BEDDF1]/40">
              <BarChart3 className="h-4 w-4 text-[#3A97A0]" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">
                Fast-Growing Company
              </p>
              <p className="text-xs text-gray-500">2022</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'linkedin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3A97A0]"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    case 'twitter':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3A97A0]"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    case 'facebook':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3A97A0]"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    default:
      return null
  }
}
