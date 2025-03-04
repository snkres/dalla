'use client'
import { Clock, FileText } from 'lucide-react'
import { motion } from 'motion/react'
import { fadeInVariants } from '@components/aniamtion/animate'

interface Tool {
  id: string
  name: string
}

interface ExperienceCardProps {
  company: {
    name: string
    logo: string
    subtitle: string
  }
  role: string
  location: string
  tools: Tool[]
  employmentType: string
  duration: {
    start: string
    end: string | 'Present'
  }
}

export function ExperienceCard({
  company,
  role,
  location,
  tools,
  employmentType,
  duration,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-sm"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={company.logo || '/placeholder.svg'}
            alt={company.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {company.name}
              </h3>
              <p className="text-gray-600">{company.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                {role}
              </span>
              <p className="mt-1 text-gray-600">{location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-2 text-gray-600">
          <FileText size={20} className="text-gray-400" />
          <h4 className="font-medium">Used Tools</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool.id}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tool.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-gray-400" />
          <span>{employmentType}</span>
        </div>
        <span>
          {duration.start} ~ {duration.end}
        </span>
      </div>
    </motion.div>
  )
}
