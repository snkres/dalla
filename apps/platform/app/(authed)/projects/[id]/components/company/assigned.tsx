import { Avatar, AvatarFallback, AvatarImage } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { GetProjectRes } from '@lib/api/company/projects'
import { MessageSquare, Star, Users } from 'lucide-react'
import Link from 'next/link'

export function CompanyProjectAssigned({
  professional,
}: {
  professional: GetProjectRes['data']['professional']
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
            <Users className="h-4 w-4 text-[#1D8489]" />
          </div>
          <h2 className="font-medium text-gray-900">Professional Assigned</h2>
        </div>
      </div>

      <div className="p-5">
        {professional ? (
          <div className="">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 border border-gray-200">
                <AvatarImage
                  src={professional.UserProfile?.avatar || '/placeholder.svg'}
                  alt={professional.name}
                />
                <AvatarFallback>{professional.name?.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium text-gray-900">
                    {professional.name}
                  </div>
                  {professional.UserProfile?.meta?.rating && (
                    <div className="flex items-center gap-1 rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-medium text-amber-700">
                        {professional.UserProfile.meta.rating}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-0.5 text-sm text-gray-500">
                  {professional.UserProfile?.headline}
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="h-8 !bg-[#63B7B7] text-xs !text-white hover:!bg-[#1D8489]"
                  >
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                    Message
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="!h-8 text-xs"
                    asChild
                  >
                    <Link
                      href={`/professionals/${professional.username}`}
                      prefetch
                    >
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center p-5 text-sm text-gray-500">
            No professional assigned yet
          </div>
        )}
      </div>
    </div>
  )
}
