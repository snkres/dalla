'use client'
import { TypingAnimation } from '@components/shared/typing-animation'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

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
      '"A seamless way to find clients and manage tasks—highly recommended for freelancers."',
    author: 'Ahmed Elwy',
    title: 'Founder, Catalog',
    company: 'Web Design Agency',
    rating: 5,
  },
  {
    quote:
      '"This platform has connected me with amazing projects and helped me grow my portfolio quickly!"',
    author: 'Mahmoud Galal',
    title: 'Founder, Catalog',
    company: 'Web Design Agency',
    rating: 5,
  },
  {
    quote:
      '"A seamless way to find clients and manage tasks—highly recommended for freelancers."',
    author: 'Joe Elwy',
    title: 'Founder, Catalog',
    company: 'Web Design Agency',
    rating: 5,
  },
]

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [resetTyping, setResetTyping] = useState(false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setResetTyping(true)
  }

  const previous = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
    setResetTyping(true)
  }

  useEffect(() => {
    if (resetTyping) {
      setResetTyping(false)
    }
  }, [resetTyping])

  return (
    <div className="-auto text-snow-white-10 relative w-full px-8 py-8">
      <div className="relative w-full overflow-hidden">
        <div className="relative h-full">
          <motion.div
            className="mx-auto flex flex-col gap-6 bg-[#ffffff4d] px-5 py-5 backdrop-blur-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <TypingAnimation
              className="text-heading-xl h-20 font-semibold"
              as="blockquote"
              key={resetTyping ? 'reset' : 'typing'}
            >
              {testimonials[currentIndex].quote}
            </TypingAnimation>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="text-heading-2xl mb-2 font-semibold text-white">
                  {testimonials[currentIndex].author}
                </div>
                <div className="mb-6 flex justify-end">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-snow-white-10 text-snow-white-10 h-5 w-5"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div className="text-text-lg font-semibold text-white/80">
                    <TypingAnimation startOnView>
                      {testimonials[currentIndex].title}
                    </TypingAnimation>
                  </div>
                  <div className="text-text-lg text-white/70">
                    {testimonials[currentIndex].company}
                  </div>
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}
