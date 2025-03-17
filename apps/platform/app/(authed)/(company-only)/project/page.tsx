'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CheckCircle,
  MessageSquare,
  FileText,
  Plus,
  Star,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Briefcase,
  ChevronRight,
  BarChart,
  Download,
  Settings,
  Eye,
  ArrowRight,
  Share2,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dallah/design-system'

const Progress = ({
  value = 0,
  color = 'bg-[#63B7B7]',
  height = 'h-2',
  animated = true,
  showLabel = false,
}) => (
  <div className="w-full">
    <div
      className={`${height} w-full overflow-hidden rounded-full bg-gray-100`}
    >
      {animated ? (
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ) : (
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      )}
    </div>
    {showLabel && (
      <div className="mt-1 flex justify-end">
        <span className="text-xs font-medium">{value}%</span>
      </div>
    )}
  </div>
)

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'In Progress': 'bg-[#E0F2F2] text-[#1D8489] border-[#63B7B7]/30',
    'At Risk': 'bg-amber-50 text-amber-700 border-amber-200',
    Completed: 'bg-green-50 text-green-700 border-green-200',
    'Not Started': 'bg-gray-100 text-gray-700 border-gray-200',
    'On Hold': 'bg-purple-50 text-purple-700 border-purple-200',
  }
  return (
    <Badge
      className={`border py-1 text-xs font-medium ${styles[status as keyof typeof styles] || styles['Not Started']}`}
    >
      {status}
    </Badge>
  )
}

const ActivityIcon = ({ type }: { type: string }) => {
  const icons = {
    milestone: {
      icon: CheckCircle,
      bgColor: 'bg-[#E0F2F2]',
      textColor: 'text-[#1D8489]',
    },
    comment: {
      icon: MessageSquare,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    file: { icon: FileText, bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    calendar: {
      icon: Calendar,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  }
  const {
    icon: Icon,
    bgColor,
    textColor,
  } = icons[type as keyof typeof icons] || icons.file

  return (
    <div
      className={`h-9 w-9 rounded-full ${bgColor} flex items-center justify-center shadow-sm`}
    >
      <Icon className={`${textColor} h-4 w-4`} />
    </div>
  )
}

export default function ProjectDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [viewMode, setViewMode] = useState('timeline')

  const project = {
    id: 'PRJ-2024-001',
    title: 'E-commerce Platform Redesign',
    client: 'NorthStar Retail',
    status: 'In Progress',
    progress: 65,
    startDate: 'Feb 15, 2024',
    endDate: 'Apr 30, 2024',
    daysLeft: 45,
    budget: 15000,
    spent: 9750,
    description:
      "Redesigning the company's e-commerce platform to improve user experience, increase conversion rates, and implement a new responsive design across all device types. The project is currently in the visual design phase, with a focus on creating a modern and user-friendly interface that will enhance the overall shopping experience for customers. The project is expected to be completed by the end of April 2024.",
    team: [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Lead UX Designer',
        avatar: '/avatar.png',
        rating: 4.9,
        status: 'Active',
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'Frontend Developer',
        avatar: '/avatar.png',
        rating: 4.7,
        status: 'Active',
      },
      {
        id: 3,
        name: 'Anna Smith',
        role: 'Backend Engineer',
        avatar: '/avatar.png',
        rating: 4.8,
        status: 'Active',
      },
    ],
    milestones: [
      {
        id: 1,
        title: 'Research & Planning',
        status: 'Completed',
        date: 'Feb 20, 2024',
        progress: 100,
        dueDate: 'Feb 20, 2024',
      },
      {
        id: 2,
        title: 'Wireframing',
        status: 'Completed',
        date: 'Mar 05, 2024',
        progress: 100,
        dueDate: 'Mar 05, 2024',
      },
      {
        id: 3,
        title: 'Visual Design',
        status: 'In Progress',
        date: 'Mar 25, 2024',
        progress: 60,
        dueDate: 'Mar 25, 2024',
      },
      {
        id: 4,
        title: 'Development',
        status: 'Not Started',
        date: 'Apr 15, 2024',
        progress: 0,
        dueDate: 'Apr 15, 2024',
      },
    ],
    activities: [
      {
        id: 1,
        type: 'milestone',
        message: 'Visual Design phase is 60% complete',
        time: '2 hours ago',
        user: 'Sarah Johnson',
        avatar: '/avatar.png',
      },
      {
        id: 2,
        type: 'comment',
        message: 'Client requested additional analytics features',
        time: '5 hours ago',
        user: 'Michael Chen',
        avatar: '/avatar.png',
      },
      {
        id: 3,
        type: 'file',
        message: 'Updated wireframes uploaded to project files',
        time: '1 day ago',
        user: 'Anna Smith',
        avatar: '/avatar.png',
      },
      {
        id: 4,
        type: 'calendar',
        message: 'Weekly team meeting scheduled for Friday',
        time: '2 days ago',
        user: 'Sarah Johnson',
        avatar: '/avatar.png',
      },
    ],
    files: [
      {
        id: 1,
        name: 'Wireframes_v2.pdf',
        size: '2.4 MB',
        uploadDate: 'Mar 10, 2024',
        uploadedBy: 'Sarah Johnson',
      },
      {
        id: 2,
        name: 'Data_requirements.xlsx',
        size: '1.8 MB',
        uploadDate: 'Mar 05, 2024',
        uploadedBy: 'Michael Chen',
      },
      {
        id: 3,
        name: 'Design_assets.zip',
        size: '8.6 MB',
        uploadDate: 'Mar 02, 2024',
        uploadedBy: 'Anna Smith',
      },
    ],
  }
  const completedMilestones = project.milestones.filter(
    (m) => m.status === 'Completed',
  ).length
  const totalMilestones = project.milestones.length
  const budgetPercentage = Math.round((project.spent / project.budget) * 100)
  const isOnBudget = budgetPercentage <= 75

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
                    {project.title}
                  </h1>
                  <StatusBadge status={project.status} />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Briefcase className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                    {project.client}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                    {project.startDate} - {project.endDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5 text-[#1D8489]" />
                    {project.daysLeft} days left
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 border-gray-200 text-xs text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 border-gray-200 text-xs text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </Button>
                <Button className="h-9 gap-1.5 bg-[#63B7B7] text-xs text-white shadow-sm hover:bg-[#1D8489]">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Contact Team
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <p className="mb-5 text-sm leading-relaxed text-gray-700">
                  {project.description}
                </p>
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-3 md:w-72 lg:w-80">
                <div className="col-span-2 overflow-hidden rounded-xl border border-[#63B7B7]/20 shadow-sm">
                  <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-[#1D8489]" />
                      <h3 className="text-sm font-medium text-[#1D8489]">
                        Project Progress
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Completion</div>
                        <div className="text-sm font-medium text-[#1D8489]">
                          {project.progress}%
                        </div>
                      </div>

                      <Progress
                        value={project.progress}
                        color="bg-[#63B7B7]"
                        height="h-2.5"
                      />

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{project.startDate}</span>
                        <span>{project.endDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border shadow-sm">
                  <div
                    className={`bg-${isOnBudget ? 'green' : 'amber'}-50 border-b px-4 py-3 border-${isOnBudget ? 'green' : 'amber'}-100`}
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign
                        className={`h-4 w-4 text-${isOnBudget ? 'green' : 'amber'}-600`}
                      />
                      <h3
                        className={`text-sm font-medium text-${isOnBudget ? 'green' : 'amber'}-700`}
                      >
                        Budget
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex flex-col">
                      <div
                        className={`text-base font-semibold ${isOnBudget ? 'text-green-700' : 'text-amber-700'}`}
                      >
                        {budgetPercentage}%
                      </div>
                      <div className="text-xs text-gray-500">
                        Used from total budget
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#63B7B7]/20 shadow-sm">
                  <div className="border-b border-[#63B7B7]/20 bg-[#E0F2F2] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#1D8489]" />
                      <h3 className="text-sm font-medium text-[#1D8489]">
                        Milestones
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex flex-col">
                      <div className="text-base font-semibold text-[#1D8489]">
                        {completedMilestones}/{totalMilestones}
                      </div>
                      <div className="text-xs text-gray-500">
                        Milestones completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-12 w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
                {['overview', 'milestones', 'team', 'files', 'budget'].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 text-sm capitalize text-gray-600 data-[state=active]:border-[#63B7B7] data-[state=active]:font-medium data-[state=active]:text-[#1D8489]"
                    >
                      {tab}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="overview" className="m-0 p-0 outline-none">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <BarChart className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <h2 className="font-medium text-gray-900">
                        Project Milestones
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex overflow-hidden rounded-md border border-gray-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 rounded-none border-r border-gray-200 px-3 ${viewMode === 'timeline' ? 'bg-[#E0F2F2] font-medium text-[#1D8489]' : 'text-gray-600'}`}
                          onClick={() => setViewMode('timeline')}
                        >
                          Timeline
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 rounded-none px-3 ${viewMode === 'list' ? 'bg-[#E0F2F2] font-medium text-[#1D8489]' : 'text-gray-600'}`}
                          onClick={() => setViewMode('list')}
                        >
                          List
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"
                        onClick={() => setActiveTab('milestones')}
                      >
                        View All
                        <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      {viewMode === 'timeline' ? (
                        <motion.div
                          key="timeline"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative pb-2 pt-4"
                        >
                          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-100"></div>

                          {project.milestones.map((milestone, index) => (
                            <div
                              key={milestone.id}
                              className="relative mb-8 flex last:mb-0"
                            >
                              <div
                                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                                  milestone.status === 'Completed'
                                    ? 'bg-green-400 text-white'
                                    : milestone.status === 'In Progress'
                                      ? 'bg-[#63B7B7] text-white'
                                      : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {milestone.status === 'Completed' ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs font-medium">
                                    {index + 1}
                                  </span>
                                )}
                              </div>

                              <div className="ml-4 flex-1">
                                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {milestone.title}
                                    </div>
                                    <div className="mt-0.5 text-xs text-gray-500">
                                      Due: {milestone.dueDate}
                                    </div>
                                  </div>
                                  <StatusBadge status={milestone.status} />
                                </div>

                                {milestone.status !== 'Not Started' && (
                                  <div className="mt-3">
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                      <span className="text-gray-500">
                                        Progress
                                      </span>
                                      <span className="font-medium text-gray-700">
                                        {milestone.progress}%
                                      </span>
                                    </div>
                                    <Progress value={milestone.progress} />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="list"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                                    Milestone
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                                    Due Date
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                                    Status
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500">
                                    Progress
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {project.milestones.map((milestone) => (
                                  <tr
                                    key={milestone.id}
                                    className="hover:bg-gray-50"
                                  >
                                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                      {milestone.title}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                                      {milestone.dueDate}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                      <StatusBadge status={milestone.status} />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                      <div className="w-24">
                                        <Progress
                                          value={milestone.progress}
                                          height="h-1.5"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <DollarSign className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <h2 className="font-medium text-gray-900">
                        Budget Overview
                      </h2>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"
                      onClick={() => setActiveTab('budget')}
                    >
                      View Details
                      <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="p-5">
                    <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="mb-1 text-xs font-medium text-gray-500">
                          Total Budget
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${project.budget.toLocaleString()}
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="mb-1 text-xs font-medium text-gray-500">
                          Spent
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${project.spent.toLocaleString()}
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="mb-1 text-xs font-medium text-gray-500">
                          Remaining
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ${(project.budget - project.spent).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Budget Usage</span>
                        <span
                          className={
                            budgetPercentage > 80
                              ? 'font-medium text-amber-700'
                              : 'font-medium text-[#1D8489]'
                          }
                        >
                          {budgetPercentage}%
                        </span>
                      </div>
                      <Progress
                        value={budgetPercentage}
                        color={
                          budgetPercentage > 80
                            ? 'bg-amber-500'
                            : 'bg-[#63B7B7]'
                        }
                        height="h-2.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <FileText className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <h2 className="font-medium text-gray-900">
                        Recent Files
                      </h2>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"
                      onClick={() => setActiveTab('files')}
                    >
                      View All
                      <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="p-5">
                    <div className="space-y-3">
                      {project.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                        >
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2F2] shadow-sm">
                            <FileText className="h-5 w-5 text-[#1D8489]" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-gray-900">
                              {file.name}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.uploadDate}</span>
                            </div>
                          </div>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Download file</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Preview file</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>

                    <Button className="mt-4 flex h-9 w-full items-center justify-center gap-1.5 bg-[#63B7B7] text-white hover:bg-[#1D8489]">
                      <Plus className="h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <Users className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <h2 className="font-medium text-gray-900">Team</h2>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"
                      onClick={() => setActiveTab('team')}
                    >
                      View All
                      <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <ScrollArea className="h-[280px]">
                    <div className="p-0">
                      {project.team.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 transition-colors last:border-b-0 hover:bg-gray-50"
                        >
                          <Avatar className="h-10 w-10 border border-gray-200">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <div className="truncate text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="flex items-center rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                <span className="ml-1 text-xs font-medium text-amber-700">
                                  {member.rating}
                                </span>
                              </div>
                            </div>
                            <div className="truncate text-xs text-gray-500">
                              {member.role}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-[#1D8489] hover:bg-[#E0F2F2]"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t border-gray-200 p-4">
                    <Button
                      variant="outline"
                      className="h-9 w-full border-dashed border-gray-300 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5" />
                      Add Team Member
                    </Button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <Clock className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <h2 className="font-medium text-gray-900">Activity</h2>
                    </div>
                  </div>

                  <ScrollArea className="h-[320px]">
                    <div className="space-y-5 p-5">
                      {project.activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <ActivityIcon type={activity.type} />
                          <div>
                            <p className="text-sm text-gray-900">
                              {activity.message}
                            </p>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <Avatar className="mr-1 h-3.5 w-3.5">
                                <AvatarImage
                                  src={activity.avatar}
                                  alt={activity.user}
                                />
                              </Avatar>
                              <span>{activity.user}</span>
                              <span className="mx-1.5">•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage
                          src="https://randomuser.me/api/portraits/men/40.jpg"
                          alt="You"
                        />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                      <Button className="h-9 flex-1 justify-start border border-gray-200 bg-gray-50 text-xs text-gray-500 hover:bg-gray-100">
                        Add a comment...
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 p-4">
                    <h2 className="font-medium text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="grid grid-cols-2">
                    <Button
                      variant="ghost"
                      className="flex h-auto items-center justify-center gap-2 rounded-none border-b border-r border-gray-200 py-4 hover:bg-[#E0F2F2]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <Plus className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <span className="text-sm text-gray-700">Add Task</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex h-auto items-center justify-center gap-2 rounded-none border-b border-gray-200 py-4 hover:bg-[#E0F2F2]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <FileText className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <span className="text-sm text-gray-700">Add Files</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex h-auto items-center justify-center gap-2 rounded-none border-r border-gray-200 py-4 hover:bg-[#E0F2F2]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <MessageSquare className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <span className="text-sm text-gray-700">Message</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex h-auto items-center justify-center gap-2 rounded-none py-4 hover:bg-[#E0F2F2]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                        <Settings className="h-4 w-4 text-[#1D8489]" />
                      </div>
                      <span className="text-sm text-gray-700">Settings</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="m-0 p-0 outline-none">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <CheckCircle className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">
                    Project Milestones
                  </h2>
                </div>

                <Button className="h-9 gap-1.5 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Milestone
                </Button>
              </div>

              <div className="p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Milestone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {project.milestones.map((milestone) => (
                      <tr key={milestone.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {milestone.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {milestone.dueDate}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <StatusBadge status={milestone.status} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="w-32">
                            <Progress
                              value={milestone.progress}
                              height="h-1.5"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#1D8489] hover:bg-[#E0F2F2]"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="team" className="m-0 p-0 outline-none">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <Users className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">Project Team</h2>
                </div>

                <Button className="h-9 gap-1.5 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Team Member
                </Button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center gap-4 p-5">
                        <Avatar className="h-14 w-14 border border-gray-200">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-base font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="flex items-center gap-1 rounded border border-amber-100 bg-amber-50 px-1.5 py-0.5">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span className="text-xs font-medium text-amber-700">
                                {member.rating}
                              </span>
                            </div>
                          </div>
                          <div className="mt-0.5 text-sm text-gray-500">
                            {member.role}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="border border-green-100 bg-green-50 text-green-700">
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex divide-x divide-gray-200 border-t border-gray-200">
                        <Button
                          variant="ghost"
                          className="h-10 flex-1 gap-1.5 rounded-none text-xs text-gray-700 hover:bg-[#E0F2F2]"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-[#1D8489]" />
                          Message
                        </Button>
                        <Button
                          variant="ghost"
                          className="h-10 flex-1 gap-1.5 rounded-none text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="files" className="m-0 p-0 outline-none">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <FileText className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">Project Files</h2>
                </div>

                <Button className="h-9 gap-1.5 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Upload File
                </Button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {project.files.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-3 flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2F2] shadow-sm">
                          <FileText className="h-5 w-5 text-[#1D8489]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {file.size}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>Uploaded: {file.uploadDate}</div>
                        <div>By: {file.uploadedBy}</div>
                      </div>

                      <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="m-0 p-0 outline-none">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <DollarSign className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">
                    Budget Management
                  </h2>
                </div>

                <Button className="h-9 gap-1.5 bg-[#63B7B7] text-xs text-white hover:bg-[#1D8489]">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Expense
                </Button>
              </div>

              <div className="p-5">
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Total Budget
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      ${project.budget.toLocaleString()}
                    </div>
                    <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 p-0 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                      >
                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                        Adjust Budget
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Spent
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      ${project.spent.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {Math.round((project.spent / project.budget) * 100)}% of
                      budget
                    </div>
                    <Progress value={budgetPercentage} height="h-1.5" />
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Remaining
                    </div>
                    <div className="text-xl font-semibold text-gray-900">
                      ${(project.budget - project.spent).toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {Math.round(
                        ((project.budget - project.spent) / project.budget) *
                          100,
                      )}
                      % remaining
                    </div>
                    <Progress
                      value={100 - budgetPercentage}
                      height="h-1.5"
                      color="bg-green-500"
                    />
                  </div>
                </div>

                <div className="my-8 flex justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-base font-medium text-gray-900">
                      Budget Details
                    </div>
                    <p className="mb-6 max-w-lg text-sm text-gray-600">
                      Detailed budget information will be displayed here,
                      including expenses by category, invoice tracking, and
                      financial projections for the project.
                    </p>
                    <Button className="bg-[#63B7B7] text-white hover:bg-[#1D8489]">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Full Finance Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
