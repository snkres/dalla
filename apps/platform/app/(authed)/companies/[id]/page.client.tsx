"use client"

import Image from "next/image"
import Link from "next/link"
import { Button, Logomark } from "@dallah/design-system"
import { Tabs, TabsList, TabsTrigger } from "@dallah/design-system"
import { Copy, MapPin, Mail, LinkIcon, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useAtom } from "jotai"
import { companyProfileAtom } from "@lib/atoms/company/profile"
import { useQueryState } from "nuqs"

export default function CompanyProfileClient({
  params,
}: {
  params: {
    id: string
  }
}) {
  const [companyProfile, setCompanyProfile] = useAtom(companyProfileAtom)
  const [activeTab, setActiveTab] = useState("all")
  const [isFollowing, setIsFollowing] = useState(false)


  const [viewMode, setViewMode] = useQueryState("view", {
    defaultValue: "default",
  })
  const isOwnProfile = false;
  //  params.id === companyProfile?.id
  const canEdit = isOwnProfile && viewMode !== 'public'



  console.log("currr", companyProfile.id)
  console.log("params", params.id)
  const handleCopy = () => {
    navigator.clipboard.writeText("salmaux.com/@caitlyn")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-48 bg-[#0A1B2B] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20" />
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="graph" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 100 M 150 0 L 0 150 M 50 0 L 0 50 M 100 50 L 50 100"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-500/20"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#graph)" />
          </svg>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="relative">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="relative bg-snow-white-30 w-32 h-32 rounded-full flex items-center justify-center border border-slate-blue-90 shadow-md">
              {
                companyProfile?.CompanyProfile?.logo ? (
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dalla__Solutions__Copy_-J2aoNEXcuYN6TCXl3qTe7oOaf7Rd0q.png"
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-white h-28 w-28"
                  />
                ) : (
                  <Logomark className="h-20 w-20" />
                )
              }
              <div className="absolute bottom-2 right-2 bg-blue-500 text-white" >
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <h1 className="mt-4 text-text-2xl font-bold">{
              companyProfile.name
            }</h1>
            <p className="text-gray-600">{
              companyProfile?.CompanyProfile?.website
            }</p>
            <div className="mt-4 flex gap-3">
              <Button variant="outline">View portfolio</Button>
              {
                isOwnProfile ? (
                  <Button className="bg-slate-blue-100">
                    {
                      viewMode === 'public' ? 'Edit Profile' : 'View Public Profile'
                    }
                  </Button>
                ) : (
                  <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)} className="bg-slate-blue-100 hover:bg-slate-blue-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_6023_1263)">
                        <path d="M10 6.66669V13.3334M6.66669 10H13.3334M18.3334 10C18.3334 14.6024 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6024 1.66669 10C1.66669 5.39765 5.39765 1.66669 10 1.66669C14.6024 1.66669 18.3334 5.39765 18.3334 10Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_6023_1263">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )
              }
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                <div className="space-y-6">
                  {experiences.map((experience, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        {experience.logo}
                      </div>
                      <div>
                        <h3 className="font-medium">{experience.title}</h3>
                        <p className="text-gray-600">{experience.company}</p>
                        <p className="text-sm text-gray-500">{experience.date}</p>
                        <Button variant="link" className="mt-1 h-auto p-0">
                          View project
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">View all</TabsTrigger>
                      <TabsTrigger value="web">Web design</TabsTrigger>
                      <TabsTrigger value="product">Product design</TabsTrigger>
                      <TabsTrigger value="branding">Branding</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border bg-gray-50">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  Riyadh, Saudi Arabia
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                <Link
                  href="https://salmamahdy.com"
                  className="mt-1 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <LinkIcon className="h-4 w-4" />
                  salmamahdy.com
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <Link
                  href="mailto:salmamahdy234@gmail.com"
                  className="mt-1 flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="h-4 w-4" />
                  salmamahdy234@gmail.com
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Profile URL</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-gray-600">salmaux.com/@caitlyn</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const experiences = [
  {
    logo: "C",
    title: "Lead Product Designer",
    company: "ContrastAI",
    date: "May 2020 - Present",
  },
  {
    logo: "S",
    title: "Product Designer",
    company: "Sayphus",
    date: "Jan 2018 - May 2020",
  },
  {
    logo: "E",
    title: "UX Designer",
    company: "Ephemeral",
    date: "Mar 2017 - Jan 2018",
  },
  {
    logo: "C",
    title: "Visual Designer",
    company: "Convergence",
    date: "Apr 2015 - Mar 2017",
  },
]

const projects = [
  {
    title: "Project 1",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Project 2",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Project 3",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Project 4",
    image: "/placeholder.svg?height=300&width=400",
  },
]

