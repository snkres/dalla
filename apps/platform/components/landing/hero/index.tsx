import Image from 'next/image'
import { Underline } from '../shared/underline'

export function Hero() {
  return (
    <div className="bg-background relative flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden px-[7.5rem] pt-4">
      <div className="container-fluid mx-auto">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2">
          <div className="">
            <h1 className="text-heading-2xl text-slate-blue mb-6 font-semibold leading-tight">
              Find the right{' '}
              <span className="relative inline-block">
                Consultant
                <Underline className="absolute -bottom-1 left-0 w-full" />
              </span>{' '}
              for your project{' '}
              <span className="relative inline-block">
                needs
                <Underline className="absolute bottom-0 left-0 w-full scale-105" />
              </span>
              .
            </h1>
            <p className="text-text-md mb-8 text-gray-600">
              Connecting companies across MENA with specialized consultants in
              culture, sports, arts, franchising, and corporate management.
              Dalla makes it easy to achieve success with verified experts and
              seamless collaboration.
            </p>

            <div className="flex items-center gap-4">
              <Stars />
              <div>
                <div className="text-slate-blue font-bold">
                  630,000 Projects
                </div>
                <div className="text-sm text-gray-600">Delivered Globally</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <div className="absolute inset-0 rounded-[50px] bg-[#272727]" />
              <div className="relative overflow-hidden rounded-[40px]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Consultants collaborating"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 transform rounded-full bg-[#FFB155] px-4 py-2 text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💫</span>
                <span>Build a professional brand image</span>
              </div>
            </div>

            <div className="absolute bottom-20 right-0 translate-x-1/4 transform rounded-lg bg-white p-4 shadow-lg">
              <div className="text-sm">
                <div className="font-semibold">How happy are you at work</div>
                <div className="mt-1 flex items-center gap-1">
                  <span>😊</span>
                  <span>😐</span>
                  <span>😢</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/4 rounded-lg bg-[#0B2A3D] px-6 py-3 text-white">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-sm opacity-80">Years of experience</div>
                  <div className="text-xs opacity-60">
                    12+ Years of Consulting Expertise
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                  12+
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-1/4 translate-x-1/4 transform rounded-lg bg-[#FFB155] px-4 py-2 text-[#0B2A3D]">
              <div className="flex items-center gap-2">
                <span>24,000+ Verified Professionals</span>
                <div className="h-6 w-6 rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stars() {
  return (
    <div className="flex -space-x-3">
      <Image
        className="ring-background rounded-full ring-2"
        src="/avatar.png"
        width={50}
        height={50}
        alt="Avatar 01"
      />
      <Image
        className="ring-background rounded-full ring-2"
        src="/avatar.png"
        width={50}
        height={50}
        alt="Avatar 02"
      />
      <Image
        className="ring-background rounded-full ring-2"
        src="/avatar.png"
        width={50}
        height={50}
        alt="Avatar 03"
      />
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 ring-2"
        style={{
          backgroundImage: 'url(/avatar.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white/30 text-xs text-black backdrop-blur-sm">
          +100K
        </span>
      </div>
    </div>
  )
}
