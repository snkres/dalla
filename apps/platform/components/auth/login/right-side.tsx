import { LogoHorizontal } from '@dallah/design-system'
import { cn } from '@dallah/utils'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    quote:
      'A seamless way to find clients and manage tasks—highly recommended for freelancers.',
    author: 'Ahmed Elwy',
    title: 'Founder, Catalog',
    company: 'Web Design Agency',
    rating: 5,
  },
]

export function LoginRightSide({ proMode }: { proMode?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }
  return (
    <section
      className={cn(
        'motion-ease-spring-smooth relative flex flex-1 items-center justify-between transition-all duration-200',
        proMode ? 'bg-slate-blue' : 'bg-white',
      )}
    >
      <img
        src="/right-side.webp"
        alt="company"
        className="h-screen w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 top-0 z-20 flex h-screen flex-col items-start justify-between">
        <LogoHorizontal
          className={cn(
            'motion-ease-spring-bouncy z-50 w-72 px-10 py-10 transition-colors duration-500',
            !proMode ? 'fill-sunshine-yellow-100' : '[&_path]:fill-slate-blue',
          )}
        />

        <div className="-auto text-snow-white-10 relative px-8 py-8">
          <div className="relative w-full overflow-hidden">
            {/* <div className="absolute inset-0 bottom-0 bg-cover bg-center bg-no-repeat blur-sm brightness-50" /> */}

            <div className="relative h-full">
              <div className="mx-auto bg-[#ffffff4d] px-5 py-5 backdrop-blur-xl">
                <blockquote className="text-heading-xl mb-8 font-semibold">
                  <p className="text-2xl font-medium leading-relaxed text-white md:text-4xl">
                    "{testimonials[currentIndex].quote}"
                  </p>
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="">
                    <div className="text-heading-2xl mb-2 font-semibold text-white">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-text-lg text-white/80">
                      {testimonials[currentIndex].title}
                    </div>
                    <div className="text-text-lg text-white/70">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="mb-6 flex justify-end">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="fill-snow-white-10 text-snow-white-10 h-5 w-5"
                          />
                        ),
                      )}
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        onClick={previous}
                        className="rounded-full border border-white/20 p-4 text-white transition-colors hover:bg-white/10"
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={next}
                        className="rounded-full border border-white/20 p-4 text-white transition-colors hover:bg-white/10"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
