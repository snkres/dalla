import { FileText } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { CoverLetterSectionProps } from '@lib/types/proposals'

const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({
  proposal,
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
        {proposal.coverLetter}
      </p>
    </div>
  </ExpandableSection>
)

export default CoverLetterSection
