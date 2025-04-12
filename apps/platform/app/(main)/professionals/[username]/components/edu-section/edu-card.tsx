import { ProProfile } from '@lib/atoms/pro/meta'
import { Calendar, GraduationCap } from 'lucide-react'

export function EduCard({
  edu,
  index,
}: {
  edu: ProProfile['data']['education'][number]
  index: number
}) {
  return (
    <div
      key={index}
      className="group -ml-2 rounded-md px-2 py-2 transition-colors hover:bg-gray-50/50"
    >
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#63B7B7]">
          <GraduationCap className="h-3 w-3 text-white" />
        </div>
        <h4 className="text-sm font-medium text-gray-800">{edu.degree}</h4>
      </div>

      <div className="ml-7">
        <div className="flex flex-wrap items-baseline justify-between">
          <p className="text-sm text-gray-600">{edu.school}</p>

          <div className="mt-1 flex items-center text-xs text-gray-500 sm:mt-0">
            <Calendar className="mr-1 h-3 w-3" />
            <span>
              {new Date(edu.startDate).toLocaleDateString('en-GB', {
                month: 'short',
                year: 'numeric',
              })}{' '}
              -{' '}
              {edu.endDate === 'present'
                ? 'Present'
                : new Date(edu.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
            </span>
          </div>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {edu.field && (
            <div className="flex items-center">
              <svg
                className="mr-1 h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20v-6M12 8V2M4.93 10A8 8 0 0 0 4 14a8 8 0 0 0 16 0 8 8 0 0 0-.93-4" />
              </svg>
              <span>{edu.field}</span>
            </div>
          )}
        </div>

        {edu.description && (
          <p className="mt-2 text-xs leading-relaxed text-gray-600">
            {edu.description}
          </p>
        )}
      </div>
    </div>
  )
}
