import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Briefcase,
  Award,
  ArrowUpRight,
  PieChart,
  Search,
  DollarSign,
  HelpCircle,
  FileText,
  Bell,
  Star,
} from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Badge } from '@dallah/design-system'
import { Progress } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import {
  ProjectSidebar,
  SkillItem,
  QuickLink,
  SidebarCardProps,
  SidebarHeaderProps,
} from '@lib/types/profile'
import { useAtom } from 'jotai'
import { proProfileAtom } from '@lib/atoms/pro/profile'

export function ProfileSidebar() {
  const [profile] = useAtom(proProfileAtom)
  if (!profile) return null
  const [isWindowFocused, setIsWindowFocused] = useState(true)

  const projects: ProjectSidebar[] = [
    {
      id: 'p1',
      title: 'Brand Identity Redesign',
      budget: '$4,200',
      match: 95,
      category: 'Branding',
      isNew: true,
    },
    {
      id: 'p2',
      title: 'Digital Marketing Campaign',
      budget: '$2,800',
      match: 88,
      category: 'Marketing',
    },
    {
      id: 'p3',
      title: 'E-commerce Website Optimization',
      budget: '$3,500',
      match: 82,
      category: 'E-commerce',
    },
  ]

  const skillData: SkillItem[] = [
    { skill: 'SEO', strength: 90, demand: 'High', endorsed: 24 },
    { skill: 'Content Marketing', strength: 85, demand: 'High', endorsed: 18 },
    { skill: 'Social Media', strength: 78, demand: 'High', endorsed: 15 },
    { skill: 'Email Marketing', strength: 65, demand: 'Medium', endorsed: 9 },
  ]

  const quickLinks: QuickLink[] = [
    {
      icon: <DollarSign />,
      label: 'Get Paid',
      href: '#/payments',
      highlight: true,
    },
    { icon: <HelpCircle />, label: 'Help Center', href: '#/help' },
    { icon: <FileText />, label: 'Direct Contract', href: '#/contracts' },
    { icon: <Bell />, label: 'Alerts', href: '#/alerts' },
  ]

  const handleProjectClick = (project: ProjectSidebar, e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Project clicked:', project)
  }

  const SidebarCard = ({ children }: SidebarCardProps) => (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {children}
    </div>
  )

  if (!profile) return null

  const SidebarHeader = ({ icon, title, action }: SidebarHeaderProps) => (
    <div className="flex items-center justify-between border-b border-gray-100 p-4">
      <h2 className="flex items-center text-xs font-medium uppercase tracking-wider text-gray-500">
        {React.isValidElement(icon)
          ? React.cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              { className: 'h-3.5 w-3.5 mr-1.5 text-[#63B7B7]' },
            )
          : icon}
        {title}
      </h2>
      {action}
    </div>
  )

  return (
    <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <SidebarCard>
        <div className="p-5">
          <div className="mb-4 flex flex-col items-center">
            <div className="relative mb-3 h-20 w-20 rounded-full bg-[#63B7B7]/10 shadow-sm ring-2 ring-white ring-offset-1">
              <Image
                src={profile?.data?.avatar || '/avatar.png'}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              {/* <div className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                <Star className="h-4 w-4 text-amber-400" />
              </div> */}
              <div
                className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white ${
                  isWindowFocused ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
            </div>
            <h3 className="mb-0.5 text-base font-medium text-gray-800">
              {profile?.data?.User.name}
            </h3>
            <p className="text-xs text-gray-500">{profile?.data?.headline}</p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#63B7B7]/10 p-2.5 text-center">
              <div className="text-base font-medium text-[#63B7B7]">15</div>
              <div className="text-xs text-gray-600">Active Proposals</div>
            </div>
            <div className="rounded-lg bg-[#63B7B7]/10 p-2.5 text-center">
              <div className="text-base font-medium text-[#63B7B7]">3</div>
              <div className="text-xs text-gray-600">Interviews</div>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Profile Completion</span>
              <span className="font-medium text-[#63B7B7]">
                {profile?.data?.precentage}%
              </span>
            </div>
            <div className="w-full">
              <Progress
                value={profile?.data?.precentage}
                className="h-1.5 !bg-gray-100"
                indicatorClassName="!bg-[#63B7B7]"
              />
            </div>
          </div>

          <Button
            className="h-9 w-full !bg-[#63B7B7] !text-sm font-normal transition-colors duration-200 hover:!bg-[#63B7B7]/90"
            asChild
          >
            <Link href={`/professionals/${profile?.data?.User.username}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </SidebarCard>

      {/* TODO: EndPoint not ready */}
      <SidebarCard>
        <SidebarHeader
          icon={<Briefcase />}
          title="Recommended Projects"
          action={
            <Link
              href="#"
              className="flex items-center text-xs text-[#63B7B7] transition-colors hover:text-[#63B7B7]/80"
            >
              View all
              <ArrowUpRight className="ml-0.5 h-3 w-3" />
            </Link>
          }
        />
        <div className="divide-y divide-gray-100">
          {projects.map((project) => (
            <Link
              key={`project-${project.id}`}
              href={`#project-${project.id}`}
              onClick={(e) => handleProjectClick(project, e)}
              className="block p-4 transition-colors hover:bg-gray-50/80"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <Badge
                  className={cn(
                    '!rounded-full border-none px-1.5 py-0.5 text-[10px] font-normal',
                    project.match >= 90
                      ? '!bg-[#63B7B7]/20 !text-[#166534]'
                      : project.match >= 80
                        ? '!bg-[#FEF9C3]/50 !text-[#854D0E]'
                        : '!bg-[#F3F4F6]/50 !text-[#4B5563]',
                  )}
                >
                  {project.match}% match
                </Badge>

                {project.isNew && (
                  <Badge className="!rounded-full border-none !bg-[#DBEAFE] !px-1.5 !py-0.5 !text-[10px] !font-normal !text-[#1E40AF]">
                    New
                  </Badge>
                )}
              </div>

              <h4 className="mb-1 line-clamp-1 text-sm font-medium text-gray-800">
                {project.title}
              </h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-[#63B7B7]">
                    {project.budget}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 rounded-full p-0 hover:bg-[#63B7B7]/10"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#63B7B7]" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </SidebarCard>

      {/* <SidebarCard>
        <SidebarHeader
          icon={<PieChart />}
          title="Skills & Expertise"
          action={
            <Link
              href="#"
              className="flex items-center text-xs text-[#63B7B7] transition-colors hover:text-[#63B7B7]/80"
            >
              View all
              <ArrowUpRight className="ml-0.5 h-3 w-3" />
            </Link>
          }
        />
        <div className="p-4">
          <div className="mb-4 space-y-4">
            {skillData.map((item, index) => (
              <div key={`skill-${index}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-800">
                      {item.skill}
                    </span>
                    <Badge
                      className={cn(
                        'ml-1 !rounded-full border-none px-1.5 py-0.5 text-[10px] font-normal',
                        item.demand === 'High'
                          ? '!bg-[#63B7B7]/20 !text-[#166534]'
                          : item.demand === 'Medium'
                            ? '!bg-[#FEF9C3]/50 !text-[#854D0E]'
                            : '!bg-[#FEEBC8]/50 !text-[#9A3412]',
                      )}
                    >
                      {item.demand}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-[#63B7B7]" />
                    <span className="text-xs text-gray-600">
                      {item.endorsed}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative h-2 w-full flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      style={{ width: `${item.strength}%` }}
                      className={cn(
                        'absolute left-0 top-0 h-full',
                        item.demand === 'High'
                          ? 'bg-[#63B7B7]'
                          : item.demand === 'Medium'
                            ? 'bg-[#EAB308]/50'
                            : 'bg-[#F97316]/50',
                      )}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {item.strength}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarCard> */}

      <SidebarCard>
        <SidebarHeader icon={<Search />} title="Quick Actions" />
        <div className="p-2">
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link, index) => (
              <Link
                key={`link-${index}`}
                href={link.href}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-gray-50',
                  link.highlight ? 'bg-[#63B7B7]/5' : '',
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    link.highlight
                      ? 'bg-[#63B7B7]/15 text-[#63B7B7]'
                      : 'bg-gray-100 text-gray-500',
                  )}
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
      </SidebarCard>
    </div>
  )
}
