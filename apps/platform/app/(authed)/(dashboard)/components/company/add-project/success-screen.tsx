import React from 'react'
import { motion } from 'motion/react'
import { CheckCircle, ExternalLink } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { Button } from '@dalla/design-system'
import { useTranslation } from '@hooks/use-translation'

interface SuccessScreenProps {
  projectTitle: string
  onClose: () => void
  isRtl?: boolean
}

export function SuccessScreen({
  projectTitle,
  onClose,
  isRtl,
}: SuccessScreenProps) {
  const translations = useTranslation()
  const t = translations.dashboard.companyComponents.addProject

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex w-full flex-col items-center justify-center p-8 text-center"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        {(t.successTitle || 'Project Created Successfully!').replace(
          '{title}',
          projectTitle,
        )}
      </h2>
      <p className="mb-8 max-w-md text-sm text-gray-600">
        {(
          t.successDescription ||
          'Your project has been created and is now visible to professionals. You will receive proposals soon.'
        ).replace('{title}', projectTitle)}
      </p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="border-[#63B7B7]/30 px-6 text-[#63B7B7] hover:bg-[#63B7B7]/10"
          onClick={onClose}
        >
          {t.returnToDashboardButton || 'Return to Dashboard'}
        </Button>
        <Button className="!bg-[#63B7B7] px-6 hover:!bg-[#63B7B7]/90" asChild>
          <Link href="/company/projects">
            {t.viewProjectsButton || 'View All Projects'}{' '}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
