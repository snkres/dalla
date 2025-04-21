import React from 'react'
import { motion } from 'motion/react'
import { CheckCircle } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { Button } from '@dalla/design-system'
import type { GetAllProjectsProfessionalViewRes } from '@lib/api/pro/projects'
import { scaleIn } from '@dalla/utils'
import { useTranslation } from '@hooks/use-translation'

interface SuccessScreenProps {
  project: GetAllProjectsProfessionalViewRes['data'][0][number]
  onClose: () => void
}

export function SuccessScreen({ project, onClose }: SuccessScreenProps) {
  const translations = useTranslation()
  const t = translations.dashboard.applyProposal

  return (
    <motion.div
      {...scaleIn}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        {t.successTitle}
      </h2>
      <p className="mb-8 max-w-md text-sm text-gray-600">
        {t.successDescription.replace('{title}', project.title)}
      </p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="border-[#234d64]/30 px-6 text-[#234d64] hover:bg-[#234d64]/10"
          onClick={onClose}
        >
          {t.returnToProjectButton}
        </Button>
        <Button className="!bg-[#63B7B7] px-6 hover:!bg-[#63B7B7]/90" asChild>
          <Link href={`/proposals`}>{t.viewProposalsButton}</Link>
        </Button>
      </div>
    </motion.div>
  )
}
