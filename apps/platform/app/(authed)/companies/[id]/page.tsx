"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Award,
  Building,
  Building2,
  Filter,
  Globe,
  Heart,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  Phone,
  Plus,
  Star,
  Trophy,
  Users,
} from "lucide-react"

import { Button, Badge, Progress } from "@dallah/design-system"


export default function CompanyProfile() {
  const [activeProject, setActiveProject] = useState("Current Projects")
  const [activeServiceCategory, setActiveServiceCategory] = useState("Core Services")
  const [unreadMessages, setUnreadMessages] = useState(3)

  const handleProjectChange = (project: string) => {
    setActiveProject(project)
  }

  const handleServiceCategoryChange = (category: string) => {
    setActiveServiceCategory(category)
  }

  const handleMessageRead = () => {
    if (unreadMessages > 0) {
      setUnreadMessages(unreadMessages - 1)
    }
  }

  // Company history data
  const companyHistory = [
    {
      milestone: "Global Expansion",
      year: "2022 - Present",
      description: "Expanded operations to 5 new countries across Europe and Asia.",
    },
    {
      milestone: "Product Innovation",
      year: "2018 - 2022",
      description: "Launched 3 groundbreaking product lines and secured 4 industry patents.",
    },
    {
      milestone: "Company Founded",
      year: "2015 - 2018",
      description: "Established headquarters and built core team of industry experts.",
    },
  ]

  // Company services data
  const services = {
    "Core Services": [
      { name: "Software Development", expertise: 95 },
      { name: "Cloud Solutions", expertise: 90 },
      { name: "Data Analytics", expertise: 85 },
      { name: "Cybersecurity", expertise: 80 },
    ],
    "Additional Services": [
      { name: "IT Consulting", expertise: 90 },
      { name: "Digital Transformation", expertise: 85 },
      { name: "UX/UI Design", expertise: 80 },
      { name: "Mobile App Development", expertise: 75 },
    ],
  }

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Michael Chen",
      position: "CTO",
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Priya Patel",
      position: "Head of Operations",
      image: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "David Rodriguez",
      position: "Lead Developer",
      image: "/placeholder.svg?height=48&width=48",
    },
  ]

  return (
    <
      >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left Column - Company Info */}
        <div className="gap-4 sticky top-6 h-[calc(100vh-6rem)] overflow-hidden flex flex-col ">
          {/* Company Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-blue-100 overflow-hidden mb-3 flex items-center justify-center">
                  <Image src={"/meza.jpeg"} alt={"Meza"} width={500} height={500} className="w-full h-full" />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold">Meza Consulting</h2>
              <p className="text-gray-600">
                Consulting
              </p>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-center items-center">
                <p className="font-medium">Company Stats</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">
                    Professionals
                  </span>
                  <span className="font-bold text-lg">120+</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Projects</span>
                  <span className="font-bold text-lg">350+</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Team Size</span>
                  <span className="font-bold text-lg">85</span>
                </div>
                <div className="bg-white border rounded-xl p-3 flex flex-col items-center">
                  <span className="text-gray-500 text-sm">Years Active</span>
                  <span className="font-bold text-lg">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-white rounded-3xl p-6 shadow-sm h-full flex justify-center flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Company Information</h3>
            </div>

            <div className="space-y-4 ">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <Building className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">Meza Consulting Company</p>
                </div>
                <Badge variant="outline" className="bg-white py-1 px-3 rounded-full text-green-600">
                  Verified
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">contact@Meza.com</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">(555) 123-4567</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="font-medium">www.mezaconsulting.com</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">Headquarters</p>
                  <p className="font-medium">Cairo, Egypt</p>
                </div>
                <Button variant="outline" size="icon" className="rounded-full bg-white h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {/* <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Leadership Team</h3>
              <Button variant="outline" size="sm" className="rounded-full">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Projects Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={
                    activeProject === 'Current Projects' ? 'default' : 'outline'
                  }
                  className={`!rounded-full ${activeProject === "Current Projects" ? "!bg-slate-blue-80 !text-white" : ""}`}
                  onClick={() => handleProjectChange("Current Projects")}
                >
                  Current Projects
                </Button>
                <Button
                  variant={
                    activeProject === 'Completed Projects' ? 'default' : 'outline'
                  }
                  className={`!rounded-full ${activeProject === "Completed Projects" ? "!bg-slate-blue-80 !text-white" : ""}`}
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
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    March 15, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Enterprise CRM System</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-blue-300/20 ">
                    <Info className="h-4 w-4 text-blue-400" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Backend Development</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={75} className="h-2 bg-blue-200" indicatorClassName="!bg-blue-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
                      75%
                    </Badge>
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
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
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    3 Weeks Left
                  </Badge>
                </div>
                <Button variant="outline" size="icon" className=" w-full rounded-full bg-white/70 mt-2">
                  <Plus className="h-4 w-4" /> Hire a Professional
                </Button>
              </div>

              {/* Project 2 */}
              <div className="bg-[#63B7B7]/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    April 02, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">Cloud Migration</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-[#63B7B7]/10">
                    <Info className="h-4 w-4 text-[#60bcbc]" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Infrastructure Setup</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={60} className="h-2 bg-green-200" indicatorClassName="!bg-[#63B7B7]" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
                      60%
                    </Badge>
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
                      Progress
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/40 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/60 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/80 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>

                  </div>
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    5 Weeks Left
                  </Badge>
                </div>
                <Button variant="outline" size="icon" className=" w-full rounded-full bg-white/70 mt-2">
                  <Plus className="h-4 w-4" /> Hire a Professional
                </Button>
              </div>

              {/* Project 3 */}
              <div className="bg-sunshine-yellow/20 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    March 28, 2024
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">AI Analytics Platform</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-full bg-amber-300/20">
                    <Info className="h-4 w-4 text-amber-500" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-1">Algorithm Development</p>
                  <div className="flex items-center gap-2 my-2">
                    <Progress value={40} className="h-2 bg-sunshine-yellow/40" indicatorClassName="!bg-sunshine-yellow" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
                      40%
                    </Badge>
                    <Badge variant="outline" className="bg-white/60 py-1 px-2 rounded-full text-xs">
                      Progress
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-sunshine-yellow/30 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-sunshine-yellow/50 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-sunshine-yellow/70 border-2 border-white overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Team member"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white/60 py-1 px-3 rounded-full">
                    7 Weeks Left
                  </Badge>
                </div>
                <Button variant="outline" size="icon" className=" w-full rounded-full bg-white/70 mt-2">
                  <Plus className="h-4 w-4" /> Hire a Professional
                </Button>
              </div>
            </div>
          </div>

          {/* Company History and Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company History */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Services & Expertise</h3>
                <Badge className="bg-slate-blue-80 text-white !rounded-full">Industry Leader</Badge>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant={activeServiceCategory === "Core Services" ? "default" : "outline"}
                    className={`!rounded-full ${activeServiceCategory === "Core Services" ? "bg-slate-blue-80 text-white" : "bg-white text-black"}`}
                    onClick={() => handleServiceCategoryChange("Core Services")}
                  >
                    Core Services
                  </Button>
                  <Button
                    variant={activeServiceCategory === "Additional Services" ? "default" : "outline"}
                    className={`!rounded-full ${activeServiceCategory === "Additional Services" ? "bg-slate-blue-80 text-white" : "bg-white text-black"}`}
                    onClick={() => handleServiceCategoryChange("Additional Services")}
                  >
                    Additional Services
                  </Button>
                </div>

                <div className="space-y-4">
                  {
                    //@ts-ignore
                    services[activeServiceCategory].map((service, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.expertise}%</p>
                        </div>
                        <Progress
                          value={service.expertise}
                          className="!h-1.5 bg-gray-100"
                          indicatorClassName={`${activeServiceCategory === "Core Services" ? "bg-slate-blue-80" : "bg-green-600"}`}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-md font-semibold mb-3">Company Values</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full  bg-[#63B7B7]/20 flex items-center justify-center">
                      <Award className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">Innovation</p>
                      <p className="text-xs text-gray-500">Pushing boundaries in technology</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">Collaboration</p>
                      <p className="text-xs text-gray-500">Working together for better solutions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#63B7B7]/20 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-[#63B7B7]" />
                    </div>
                    <div>
                      <p className="font-medium">Excellence</p>
                      <p className="text-xs text-gray-500">Delivering the highest quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Professionals Testimonials</h3>
                <Badge className=" !text-slate-blue-10 bg-slate-blue-80 !rounded-full">4.8/5 Average Rating</Badge>
              </div>

              <div className="grid grid-cols-1  gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Global Enterprises Ltd.</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "TechNova Solutions transformed our entire IT infrastructure with their cloud migration services.
                    Their team's expertise and professionalism exceeded our expectations at every stage of the project."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Project: Enterprise Cloud Migration · Jan 2024</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Innovate Financial Services</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-amber-400" />
                        ))}
                        <Star className="h-3 w-3 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "The custom CRM solution developed by TechNova has revolutionized how we manage client relationships.
                    Their ongoing support and continuous improvements have made them a valuable long-term partner."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Project: Custom CRM Development · Dec 2023</p>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="rounded-full text-sm">
                  View All Testimonials (42)
                </Button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

