'use client'

import { Button } from '@dalla/design-system'
import { Building } from 'lucide-react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import type { GetProjectRes } from '@lib/api/company/projects'

// Define more specific type for company prop if possible
interface ProfessionalCompanyInfoProps {
  company: GetProjectRes['data']['company']
}

export function ProfessionalCompanyInfo({
  company,
}: ProfessionalCompanyInfoProps) {
  // Add null check for company
  if (!company) {
    return null // Or return a placeholder/loading state
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="flex items-center text-base font-medium text-gray-900">
          <Building className="mr-2 h-5 w-5 text-[#63B7B7]" />
          About the Company
        </h2>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {company.CompanyProfile?.logo ? (
            <Image
              src={company.CompanyProfile.logo || '/placeholder.svg'}
              alt={company.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {company.name || 'Company Name'}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {company.CompanyProfile?.location || 'Location'}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-1">
              {' '}
              {/* Adjusted grid for sidebar */}
              <div>
                <span className="text-gray-500">Member since</span>
                <p className="font-medium text-gray-900">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString('en-GB', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
            <Button
              asChild
              size="sm" // Added size
              className="mt-4 !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
            >
              <Link href={`/companies/${company.id}`}>
                View Company Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
