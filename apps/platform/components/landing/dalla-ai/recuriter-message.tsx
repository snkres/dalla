// import { type RecruiterMessage } from '../types/recruitment'

export function RecruiterMessage() {
  return (
    <div className="mb-6 flex gap-4">
      <img src="/avatar.png" alt="" className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <span className="text-foreground">Recruiter</span>
        <div className="motion-preset-pop motion-duration-700 max-w-xl rounded-3xl rounded-ss-none bg-white p-4 shadow-sm">
          <div className="roun text-gray-900">
            Send me candidate who are expert in{' '}
            <span className="font-bold">Figma</span> and understand {''}
            <span className="font-bold">HTML</span>
          </div>
        </div>
      </div>
    </div>
  )
}
