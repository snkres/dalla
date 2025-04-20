import React from 'react'
import Image from 'next/image'
import { Star, MapPin, CheckCircle, Briefcase } from 'lucide-react'
import { Badge } from '@dalla/design-system'
import { Button } from '@dalla/design-system'
import { cn } from '@dalla/utils'
import { motion } from 'motion/react'
import { Consultant } from '@lib/types/company'
import { GetAllProfessionalsRes } from '@lib/api/company/professionals'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface ProfessionalCardProps {
  professional: GetAllProfessionalsRes['data'][0][number]
  onClick: (professional: GetAllProfessionalsRes['data'][0][number]) => void
  onHire?: (professional: GetAllProfessionalsRes['data'][0][number]) => void
}

export function ProfessionalCard({
  professional,
  onClick,
  onHire,
}: ProfessionalCardProps) {
  const t = useTranslation()
  const { locale } = useLocale()

  const handleHireClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onHire?.(professional)
  }

  const getMatchColor = (rating: number) => {
    if (rating >= 4.8) return '!text-[#63B7B7]'
    if (rating >= 4.0) return '!text-[#FFB650]'
    return '!text-gray-600'
  }

  const getStatusColors = (status: string) => {
    if (status === 'available')
      return {
        bg: '!bg-emerald-50',
        text: '!text-emerald-700',
        dot: '!bg-emerald-500',
      }
    if (status === 'unavailable')
      return {
        bg: '!bg-amber-50',
        text: '!text-amber-700',
        dot: '!bg-amber-500',
      }
    if (status === 'limited')
      return {
        bg: '!bg-gray-50',
        text: '!text-gray-600',
        dot: '!bg-gray-400',
      }
    return { bg: '!bg-gray-100', text: '!text-gray-600', dot: '!bg-gray-400' }
  }

  const statusColors = getStatusColors(professional.meta.availability)
  const matchPercentage = Math.round(
    (professional.meta.successRate ?? 0 / 5) * 100,
  )

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow"
      onClick={() => onClick(professional)}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-[#63B7B7]/10 ring-1 ring-[#63B7B7]/20">
                <Image
                  src={professional.avatar}
                  alt={professional.User.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <div
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white',
                  statusColors.dot,
                )}
              ></div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-gray-800 transition-colors group-hover:text-[#63B7B7]">
                {professional.User.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {professional.headline}
              </p>
            </div>

            <Badge
              className={cn(
                'flex h-5 shrink-0 items-center gap-1 rounded-full px-2 text-[10px] font-medium capitalize',
                statusColors.bg,
                statusColors.text,
              )}
            >
              <div
                className={cn('h-1.5 w-1.5 rounded-full', statusColors.dot)}
              ></div>
              {professional.meta.availability ??
                t.dashboard.companyComponents.professionalCard.availabilityNA}
            </Badge>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="mr-0.5 h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">
                  {professional.meta.rating ?? 5}
                </span>
              </div>

              {professional.meta.location && (
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-0.5 h-3 w-3" />
                  <span className="max-w-[70px] truncate">
                    {professional.meta.location}
                  </span>
                </div>
              )}
            </div>

            {professional.meta.hourlyRate && (
              <div className="font-medium text-gray-700">
                ${professional.meta.hourlyRate}
                {
                  t.dashboard.companyComponents.professionalCard
                    .hourlyRateSuffix
                }
              </div>
            )}
          </div>

          <div className="mb-3 flex flex-wrap gap-1">
            {professional.meta.skills.slice(0, 2).map((skill, index) => (
              <Badge
                key={index}
                className="!rounded-md !border-none !bg-[#63B7B7]/5 !px-1.5 !py-0.5 !text-[10px] !font-normal !text-[#63B7B7]"
              >
                {skill}
              </Badge>
            ))}
            {professional.meta.skills.length > 2 && (
              <Badge className="!rounded-md !border-none !bg-gray-50 !px-1.5 !py-0.5 !text-[10px] !font-normal !text-gray-600">
                +{professional.meta.skills.length - 2}
              </Badge>
            )}
          </div>
          <div className="mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-gray-500" />
              <span className="text-gray-600">
                {professional.meta.yearsOfExperience}{' '}
                {
                  t.dashboard.companyComponents.professionalCard
                    .yearsExperienceSuffix
                }
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-0.5 font-medium',
                getMatchColor(professional.meta.successRate ?? 0),
              )}
            >
              <CheckCircle className="h-3 w-3" />
              <span>
                {matchPercentage}
                {t.dashboard.companyComponents.professionalCard.matchSuffix}
              </span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleHireClick}
          className="mt-1 h-7 w-full !bg-[#63B7B7] !text-xs !text-white hover:!bg-[#63B7B7]/90"
        >
          {t.dashboard.companyComponents.professionalCard.hireButton}
        </Button>
      </div>
    </motion.div>
  )
}
