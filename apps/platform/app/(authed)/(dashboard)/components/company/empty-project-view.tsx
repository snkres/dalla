import { motion } from 'motion/react'
import { Button } from '@dalla/design-system'
import {
  Briefcase,
  Users,
  PlusCircle,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { useTranslation } from '@hooks/use-translation'
import { useLocale } from '@hooks/use-locale'

interface EmptyProjectViewProps {
  onPostJob: () => void
  onHireConsultant: () => void
}

const EmptyProjectView = ({
  onPostJob,
  onHireConsultant,
}: EmptyProjectViewProps) => {
  const t = useTranslation()
  const { locale } = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 text-center"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="mb-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
          <Briefcase className="h-7 w-7 text-[#1D8489]" />
        </div>
      </div>

      <h3 className="mb-2 text-lg font-medium text-gray-900">
        {t.dashboard.companyComponents.emptyProjectView.title}
      </h3>
      <p className="mx-auto mb-6 max-w-md text-sm text-gray-600">
        {t.dashboard.companyComponents.emptyProjectView.description}
      </p>

      <div className="mx-auto grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[#63B7B7]/20 bg-[#E0F2F2]/50 p-4 text-left transition-shadow hover:shadow-md">
          <div className="mb-3 flex flex-col items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <FileText className="h-4 w-4 text-[#1D8489]" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              {t.dashboard.companyComponents.emptyProjectView.postJobCardTitle}
            </h4>
          </div>
          <p className="mb-4 text-xs text-gray-600">
            {
              t.dashboard.companyComponents.emptyProjectView
                .postJobCardDescription
            }
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onPostJob}
            className="w-full border-[#63B7B7]/30 bg-white text-xs text-[#1D8489] hover:bg-white"
          >
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            {t.dashboard.companyComponents.emptyProjectView.postJobCardButton}
          </Button>
        </div>

        <div className="rounded-lg border border-[#63B7B7]/20 bg-[#E0F2F2]/50 p-4 text-left transition-shadow hover:shadow-md">
          <div className="mb-3 flex flex-col items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <Users className="h-4 w-4 text-[#1D8489]" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">
              {t.dashboard.companyComponents.emptyProjectView.hireCardTitle}
            </h4>
          </div>
          <p className="mb-4 text-center text-xs text-gray-600">
            {t.dashboard.companyComponents.emptyProjectView.hireCardDescription}
          </p>
          <Button
            size="sm"
            onClick={onHireConsultant}
            className="w-full !bg-[#63B7B7] text-xs text-white hover:!bg-[#1D8489]"
          >
            {t.dashboard.companyComponents.emptyProjectView.hireCardButton}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default EmptyProjectView
