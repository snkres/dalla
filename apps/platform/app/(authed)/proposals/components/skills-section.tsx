import { Award } from 'lucide-react'
import ExpandableSection from './expandable-section'
import { Badge } from '@dallah/design-system'
import { SkillsSectionProps } from '@lib/types/proposals'

const SkillsSection: React.FC<SkillsSectionProps> = ({
  proposal,
  isExpanded,
  onToggle,
}) => (
  <ExpandableSection
    title="Skills & Expertise"
    icon={<Award className="mr-2 h-4 w-4 text-[#63B7B7]" />}
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="flex flex-wrap gap-2">
      {proposal.skills.map((skill, index) => (
        <Badge
          key={index}
          className="border-[#63B7B7]/20 bg-[#63B7B7]/10 px-3 py-1.5 text-[#63B7B7] hover:bg-[#63B7B7]/20"
        >
          {skill}
        </Badge>
      ))}
    </div>
  </ExpandableSection>
)

export default SkillsSection
