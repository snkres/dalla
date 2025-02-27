"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BriefcaseIcon,
  Filter,
  GraduationCap,
  Heart,
  Info,
  Mail,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  Phone,
  Plus,
  Star,
  Trophy,
  Video,
} from "lucide-react"

import { Button, Badge, Progress } from "@dallah/design-system"

export default function FreelancerProfile() {
  const [activeProject, setActiveProject] = useState("Ongoing Projects")
  const [unreadMessages, setUnreadMessages] = useState(3)
  const [activeSkillCategory, setActiveSkillCategory] = useState("Technical")

  const handleProjectChange = (project: string) => {
    setActiveProject(project)
  }

  const handleSkillCategoryChange = (category: string) => {
    setActiveSkillCategory(category)
  }

  const handleMessageRead = () => {
    if (unreadMessages > 0) {
      setUnreadMessages(unreadMessages - 1)
    }
  }

  // Freelancer experience data
  const experiences = [
    {
      company: "TechNova Solutions",
      position: "Marketing Specialist",
      period: "2021 - Present",
      description: "Leading digital marketing campaigns and brand strategy development.",
    },
    {
      company: "MediaCraft Agency",
      position: "Marketing Analyst",
      period: "2018 - 2021",
      description: "Conducted market research and analyzed campaign performance metrics.",
    },
    {
      company: "CreativeHub",
      position: "Marketing Assistant",
      period: "2016 - 2018",
      description: "Supported content creation and social media management.",
    },
  ]

  // Freelancer skills data
  const skills = {
    Technical: [
      { name: "SEO Optimization", level: 90 },
      { name: "Social Media Management", level: 85 },
      { name: "Content Marketing", level: 80 },
      { name: "Email Marketing", level: 75 },
    ],
    Soft: [
      { name: "Communication", level: 95 },
      { name: "Time Management", level: 85 },
      { name: "Problem Solving", level: 80 },
      { name: "Leadership", level: 70 },
    ],
  }

  // Education data
  const education = [
    {
      institution: "University of Marketing Sciences",
      degree: "Master's in Digital Marketing",
      year: "2016",
    },
    {
      institution: "Business Communications College",
      degree: "Bachelor's in Communications",
      year: "2014",
    },
  ]

  return (
    <>
      {/* <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5 text-slate-blue-100" />
          </Button>
          <h1 className="text-2xl font-bold font-sora text-slate-blue-100">My Profile</h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-text-success-primary py-2 px-4 rounded-full">
            Available for Work
          </Badge>
          <Badge variant="outline" className="bg-slate-blue-100 py-2 px-4 rounded-full">
            Top Rated
          </Badge>
          <Button variant="outline" size="icon" className="rounded-full bg-white">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-6 relative">
        {/* Left Column - Profile Info */}
        <div className="gap-6 sticky top-12 h-[calc(100vh-6rem)] overflow-hidden flex flex-col ">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-amber-100 overflow-hidden mb-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/122938074?v=4"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold">Amr Tamer</h2>
              <p className="text-gray-600">Marketing Specialist</p>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Video className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-center items-center">
                <p className="font-medium">Freelancer Stats</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Projects</span>
                  <span className="font-bold text-lg">24</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Success Rate</span>
                  <span className="font-bold text-lg">96%</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Reviews</span>
                  <span className="font-bold text-lg">4.9/5</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Experience</span>
                  <span className="font-bold text-lg">6 yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-white !rounded-3xl p-6 shadow-sm h-full flex flex-col justify-center  w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Detailed Information</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">Amr Tamer</p>
                </div>
                <Badge variant="outline" className="bg-white py-1 px-3 rounded-full text-green-600">
                  Online
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">amr.tamer@gmail.com</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">(555) 555-6789</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium">Marketing Specialist</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">Cairo, Egypt</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant={
                    activeProject === 'Ongoing Projects' ? 'default' : "outline"
                  }
                  className={`!rounded-full ${activeProject === "Ongoing Projects" ? "bg-slate-blue-100 text-white" : "bg-white text-black"}`}
                  onClick={() => handleProjectChange("Ongoing Projects")}
                >
                  Ongoing Projects
                </Button>
                <Button
                  variant={
                    activeProject === 'Completed Projects' ? 'default' : "outline"
                  }
                  className={`!rounded-full ${activeProject === "Completed Projects" ? "bg-black text-white" : ""}`}
                  onClick={() => handleProjectChange("Completed Projects")}
                >
                  Completed Projects
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full bg-white">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Project 1 */}
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white py-1 px-3 rounded-full">
                    March 05, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Digital Marketing Strategy</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-amber-300/20">
                    <Info className="h-4 w-4 text-amber-500" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Campaign Development</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={60} className="h-2 bg-amber-200" indicatorClassName="!bg-amber-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      60%
                    </Badge>
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      Progress
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-amber-200 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-amber-300 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-amber-400 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                  </div>
                  <Badge variant="outline" className="bg-white/40 py-1 px-3 rounded-full">
                    2 Days Left
                  </Badge>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white/40 py-1 px-3 rounded-full">
                    March 08, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Social Media Campaign</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-blue-300/20">
                    <Info className="h-4 w-4 text-blue-400" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Content Creation</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={80} className="h-2 bg-blue-200" indicatorClassName="!bg-blue-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      80%
                    </Badge>
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      Progress
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-200 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-300 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-400 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                  </div>
                  <Badge variant="outline" className="bg-white/40 py-1 px-3 rounded-full">
                    5 Days Left
                  </Badge>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white/40 py-1 px-3 rounded-full">
                    March 12, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">SEO Optimization</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-red-400/20">
                    <Info className="h-4 w-4 text-red-400" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Keyword Research</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={40} className="h-2 bg-red-200" indicatorClassName="bg-red-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      40%
                    </Badge>
                    <Badge variant="outline" className="bg-white/40 py-1 px-2 rounded-full text-xs">
                      Progress
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-red-200 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-red-300 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-red-400 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                  </div>
                  <Badge variant="outline" className="bg-white/40 py-1 px-3 rounded-full">
                    8 Days Left
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Experience and Skills Section (replacing Calendar) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Professional Experience */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Professional Experience</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full bg-white">
                    <BriefcaseIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4 relative">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-[#63B7B7]"></div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-md font-semibold mb-3">Education</h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-4 w-4 text-[#5C5C5C]" />
                    </div>
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Skills & Expertise</h3>
                <Badge className="bg-slate-blue-90 text-white !rounded-full">Top 5%</Badge>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant={activeSkillCategory === "Technical" ? "default" : "outline"}
                    className={`!rounded-full ${activeSkillCategory === "Technical" ? "!bg-slate-blue-100 text-white" : ""}`}
                    onClick={() => handleSkillCategoryChange("Technical")}
                  >
                    Technical Skills
                  </Button>
                  <Button
                    variant={activeSkillCategory === "Soft" ? "default" : "outline"}
                    className={`!rounded-full ${activeSkillCategory === "Soft" ? "!bg-slate-blue-100 text-white" : ""}`}
                    onClick={() => handleSkillCategoryChange("Soft")}
                  >
                    Soft Skills
                  </Button>
                </div>

                <div className="space-y-4">
                  {
                    //@ts-ignore
                    skills[activeSkillCategory].map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{skill.name}</p>
                          <p className="text-sm text-gray-600">{skill.level}%</p>
                        </div>
                        <Progress
                          value={skill.level}
                          className="!h-1.5 bg-gray-100"
                          indicatorClassName={'bg-slate-blue-80'}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-md font-semibold mb-3">Certifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/20 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">Google Analytics Certification</p>
                      <p className="text-xs text-gray-500">Issued Jan 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/20 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook Blueprint Certification</p>
                      <p className="text-xs text-gray-500">Issued Mar 2022</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/20 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">HubSpot Content Marketing</p>
                      <p className="text-xs text-gray-500">Issued Sep 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials & Reviews Section */}
          {/* <div className="bg-white rounded-3xl p-6 shadow-sm ">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Client Reviews</h3>
              <Badge className="bg-gray-100 text-snow-white-20">4.9/5 Average</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Mohamed</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-current text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Amr delivered an exceptional marketing strategy that increased our conversion rate by 45%. His
                  attention to detail and understanding of our market was impressive."
                </p>
                <p className="text-xs text-gray-500 mt-2">Project: Digital Marketing Campaign · Feb 2025</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Mahmoud Galal</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-current text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Working with Amr was a game-changer for our social media presence. He helped us increase engagement
                  by 78% and develop a consistent brand voice across all platforms."
                </p>
                <p className="text-xs text-gray-500 mt-2">Project: Social Media Management · Jan 2025</p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" className="rounded-full text-sm">
                View All Reviews (24)
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

