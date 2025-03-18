import React from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import {
  Building,
  FileText,
  Bell,
  Search,
  Star,
  HelpCircle,
  Zap,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { companyMetaAtom } from '@lib/atoms/company/meta'
import { useAtom } from 'jotai'

export function Sidebar() {
  const [profile] = useAtom(companyMetaAtom)
  const quickLinks = [
    {
      icon: <FileText />,
      label: 'Start a Project',
      href: '/?startProject=true',
      highlight: true,
    },
    { icon: <Bell />, label: 'Notifications', href: '#/notifications' },
    { icon: <HelpCircle />, label: 'Help Center', href: '#/help' },
  ]

  return (
    <div className="w-full space-y-5 md:w-[320px] lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="p-5">
          <div className="mb-4 flex flex-col items-center">
            <div className="relative mb-3 h-20 w-20 rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white ring-offset-1">
              <Image
                src={profile?.data?.CompanyProfile?.logo || '/logo.svg'}
                alt="Company"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>
            </div>
            <h3 className="mb-0.5 text-base font-medium text-gray-800">
              {profile?.data?.name}
            </h3>
            <p className="text-xs text-gray-500">
              {profile?.data?.CompanyProfile?.headline}
            </p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#63B7B7]/10 p-2.5 text-center">
              <div className="text-base font-medium text-[#63B7B7]">
                {profile?.data?._count?.projects}
              </div>
              <div className="text-xs text-gray-600">Active Projects</div>
            </div>
            <div className="rounded-lg bg-[#63B7B7]/10 p-2.5 text-center">
              <div className="text-base font-medium text-[#63B7B7]">
                {profile?.data?._count?.projects}
              </div>
              <div className="text-xs text-gray-600">Hired Professionals</div>
            </div>
          </div>

          <Button
            className="h-9 w-full !bg-[#63B7B7] text-sm font-normal transition-colors duration-200 hover:!bg-[#63B7B7]/90"
            asChild
          >
            <Link href={`/companies/${profile?.data?.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
            {React.isValidElement(<Zap />) ? (
              React.cloneElement(
                (<Zap />) as React.ReactElement<React.SVGProps<SVGSVGElement>>,
                { className: 'h-3.5 w-3.5 mr-1.5 text-[#63B7B7]' },
              )
            ) : (
              <Zap />
            )}
            Quick Actions
          </h2>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-3 gap-2">
            {quickLinks.map((link, index) => (
              <Link
                key={`link-${index}`}
                href={link.href}
                className={`flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-gray-50 ${
                  link.highlight ? 'bg-[#63B7B7]/5' : ''
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    link.highlight
                      ? 'bg-[#63B7B7]/15 text-[#63B7B7]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {React.cloneElement(
                    link.icon as React.ReactElement<
                      React.SVGProps<SVGSVGElement>
                    >,
                    { className: 'h-4 w-4' },
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
            {React.isValidElement(<Star />) ? (
              React.cloneElement(
                (<Star />) as React.ReactElement<React.SVGProps<SVGSVGElement>>,
                { className: 'h-3.5 w-3.5 mr-1.5 text-[#63B7B7]' },
              )
            ) : (
              <Star />
            )}
            Recommended Consultants
          </h2>
        </div>
        <div className="space-y-4 p-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#63B7B7]/10">
                <Image
                  src={`/avatar.png`}
                  alt="Consultant"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Alex Morgan
                    </p>
                    <p className="text-xs text-gray-500">UI/UX Designer</p>
                  </div>
                  <Badge className="h-5 !bg-green-100 text-[10px] !text-green-800">
                    Available
                  </Badge>
                </div>
                <div className="mt-1 flex items-center">
                  <Star className="h-3 w-3 text-amber-400" />
                  <span className="ml-1 text-xs">4.9</span>
                  <span className="ml-2 text-xs text-gray-500">$65/hr</span>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="mt-2 h-8 w-full rounded-lg border-[#63B7B7]/30 text-xs font-normal text-[#63B7B7] hover:border-[#63B7B7] hover:bg-[#63B7B7]/5 hover:text-[#63B7B7]"
          >
            <Search className="mr-1.5 h-3.5 w-3.5" />
            View All Recommendations
          </Button>
        </div>
      </div> */}

      {/* <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
            {React.isValidElement(<Building />) ? (
              React.cloneElement(
                (<Building />) as React.ReactElement<
                  React.SVGProps<SVGSVGElement>
                >,
                { className: 'h-3.5 w-3.5 mr-1.5 text-[#63B7B7]' },
              )
            ) : (
              <Building />
            )}
            Hiring Insights
          </h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <h3 className="mb-2 text-sm font-medium text-gray-800">
              Top Skills in Demand
            </h3>
            <div className="space-y-2">
              {['React', 'UI/UX Design', 'Node.js'].map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-700">{skill}</span>
                  <Badge className="rounded-full border-none bg-[#63B7B7]/20 px-2 py-0.5 text-[10px] font-normal text-[#166534]">
                    High Demand
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-[#BEDDF1]/20 p-3">
            <p className="mb-2 text-xs text-gray-700">
              Need help with your hiring strategy?
            </p>
            <Button
              variant="outline"
              className="h-8 w-full rounded-lg border-[#63B7B7]/30 text-xs font-normal text-[#63B7B7] hover:border-[#63B7B7] hover:bg-[#63B7B7]/5 hover:text-[#63B7B7]"
            >
              <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
              Talk to an Advisor
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
