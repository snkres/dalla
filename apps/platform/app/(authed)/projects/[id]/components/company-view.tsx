'use client'

import {
  Button,
  TabsContent,
  Tabs,
  Progress,
  ScrollArea,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@dallah/design-system'
import { AnimatePresence, motion } from 'motion/react'
import {
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Plus,
  Settings,
  DollarSign,
  BarChart,
  ChevronRight,
  MessageSquare,
  Clock,
  Loader2,
} from 'lucide-react'
import { GetProjectRes } from '@lib/api/company/projects'
import { formatCurrency } from '@lib/utils/format-currency'
import { ProfessionalProjectView } from './professional-view'
import { ProjectProposals } from './project-proposals'

export function CompanyProjectView({
  project,
  activeTab,
  setActiveTab,
}: {
  project: GetProjectRes['data']
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsContent value="overview" className="m-0 p-0 outline-none">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                    <DollarSign className="h-4 w-4 text-[#1D8489]" />
                  </div>
                  <h2 className="font-medium text-gray-900">Budget Overview</h2>
                </div>
                {/* 
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"

                >
                  View Details
                  <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                </Button> */}
              </div>

              <div className="p-5">
                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Total Budget
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(project.meta.budget)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Spent
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(
                        project.meta.budget *
                          (project.status === 'Open' ? 0.3 : 1),
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-1 text-xs font-medium text-gray-500">
                      Remaining
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(
                        project.meta.budget -
                          (project.status === 'Open' ? 0.3 : 1) *
                            project.meta.budget,
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Budget Usage</span>
                    <span>
                      {project.status === 'Open' ? 30 : project.meta.budget}%
                    </span>
                  </div>
                  <Progress
                    value={project.status === 'Open' ? 30 : 100}
                    color={
                      project.status === 'Open'
                        ? 'bg-[#63B7B7]'
                        : 'bg-amber-500'
                    }
                    indicatorClassName={
                      project.status === 'Open'
                        ? '!bg-[#63B7B7]'
                        : '!bg-amber-500'
                    }
                  />
                </div>
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
                  <h2 className="font-medium text-gray-900">
                    Professional Assigned
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-[#1D8489] hover:bg-[#E0F2F2] hover:text-[#1D8489]/80"
                  onClick={() => setActiveTab('team')}
                >
                  View Details
                  <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
                </Button>
              </div>

              <ScrollArea className="h-56">
                {project.status === 'InProgress' ? (
                  <ProfessionalProjectView project={project} />
                ) : project.proposals && project.proposals.length > 0 ? (
                  // <ProjectProposals proposals={project.proposals} />
                  <></>
                ) : (
                  <div className="flex h-56 items-center justify-center p-5 text-sm text-gray-500">
                    No professional assigned yet
                  </div>
                )}
              </ScrollArea>
            </div>
            {project.status === 'InProgress' ? (
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
                    {/* {project.activities.map((activity) => (
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
                  ))} */}
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
            ) : null}
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
              <h2 className="font-medium text-gray-900">Project Milestones</h2>
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
                {/* {project.milestones.map((milestone) => (
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
                        <Progress value={milestone.progress} height="h-1.5" />
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
                ))} */}
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
              {/* {project.team.map((member) => (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4 p-5">
                    <Avatar className="h-14 w-14 border border-gray-200">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
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
              ))} */}
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
              {/* {project.files.map((file) => (
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
                      <div className="text-xs text-gray-500">{file.size}</div>
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
              ))} */}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* <TabsContent value="budget" className="m-0 p-0 outline-none">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
                <DollarSign className="h-4 w-4 text-[#1D8489]" />
              </div>
              <h2 className="font-medium text-gray-900">Budget Management</h2>
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
                  ${formatCurrency(project.meta.budget ?? 0)}
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
                  ${formatCurrency(project.meta.spent ?? 0)}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {Math.round((project.meta.spent / project.meta.budget) * 100)}
                  % of budget
                </div>
                <Progress value={project.meta.budgetPercentage ?? 0} />
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-1 text-xs font-medium text-gray-500">
                  Remaining
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {formatCurrency(project.meta.budget - project.meta.spent)}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {Math.round(
                    (project.meta.budget - project.meta.spent) /
                      project.meta.budget,
                  )}
                  % remaining
                </div>
                <Progress value={100 - (project.meta.budgetPercentage ?? 0)} />
              </div>
            </div>

            <div className="my-8 flex justify-center">
              <div className="text-center">
                <div className="mb-2 text-base font-medium text-gray-900">
                  Budget Details
                </div>
                <p className="mb-6 max-w-lg text-sm text-gray-600">
                  Detailed budget information will be displayed here, including
                  expenses by category, invoice tracking, and financial
                  projections for the project.
                </p>
                <Button className="bg-[#63B7B7] text-white hover:bg-[#1D8489]">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View Full Finance Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent> */}
    </Tabs>
  )
}
