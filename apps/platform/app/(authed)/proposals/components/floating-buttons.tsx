import { Button } from '@dallah/design-system'
import { ChevronUp, Briefcase } from 'lucide-react'

const FloatingButtons: React.FC = () => (
  <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 md:hidden">
    <Button
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ChevronUp className="h-5 w-5 text-[#63B7B7]" />
    </Button>
    <Button
      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#63B7B7] shadow-lg"
      onClick={() => (window.location.href = '/projects')}
    >
      <Briefcase className="h-6 w-6 text-white" />
    </Button>
  </div>
)

export default FloatingButtons
