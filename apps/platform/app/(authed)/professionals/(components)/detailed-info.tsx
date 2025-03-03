import { Badge, Button } from '@dallah/design-system'
import { Info, Mail, Phone } from 'lucide-react'

export const DetailedInfo = () => {
  return (
    <div className="flex h-full w-full flex-col !rounded-3xl border-[#F3F2F1]/30 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Detailed Information</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">Amr Tamer</p>
          </div>
          <Badge
            variant="outline"
            className="rounded-full bg-white px-3 py-1 text-green-600"
          >
            Online
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">amr.tamer@gmail.com</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="font-medium">(555) 555-6789</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-gray-500">Designation</p>
            <p className="font-medium">Marketing Specialist</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white">
            <div className="h-2 w-2 rounded-full bg-black"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">Cairo, Egypt</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
