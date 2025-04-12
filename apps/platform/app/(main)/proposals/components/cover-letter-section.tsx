import { FileText } from 'lucide-react'
import ExpandableSection from './expandable-section'

interface CoverLetterSectionProps {
  data: {
    coverLetter: string
  }
  isExpanded: boolean
  onToggle: () => void
}

const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({
  data,
  isExpanded,
  onToggle,
}) => (
  <ExpandableSection
    title="Your Cover Letter"
    icon={<FileText className="mr-2 h-4 w-4 text-[#63B7B7]" />}
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
        {data.coverLetter}
      </p>
    </div>
  </ExpandableSection>
)

export default CoverLetterSection
