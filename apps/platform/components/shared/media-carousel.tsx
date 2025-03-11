'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, FileText, Maximize, X } from 'lucide-react'
import { Button } from '@dallah/design-system'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'motion/react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface MediaCarouselProps {
  media: string[]
  initialIndex?: number
}

export function MediaCarousel({ media, initialIndex = 0 }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentPage(1)
  }, [currentIndex])

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf')
  const currentMedia = media[currentIndex]
  const currentIsPdf = isPdf(currentMedia)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (carouselRef.current?.requestFullscreen) {
        carouselRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  if (media.length === 0) return null

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden rounded-lg ${isFullscreen ? 'flex h-screen w-screen items-center justify-center bg-black' : 'bg-gray-100'}`}
    >
      <div className="relative h-full w-full">
        <div
          className={`flex items-center justify-center ${isFullscreen ? 'h-full' : 'aspect-video'}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full w-full items-center justify-center"
            >
              {currentIsPdf ? (
                <div className="max-h-full overflow-auto bg-white p-4">
                  <Document
                    file={currentMedia}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#63B7B7] border-t-transparent"></div>
                      </div>
                    }
                    error={
                      <div className="flex h-64 flex-col items-center justify-center text-center">
                        <FileText className="mb-2 h-12 w-12 text-red-500" />
                        <p className="text-sm text-gray-600">
                          Failed to load PDF
                        </p>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={currentPage}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={isFullscreen ? window.innerWidth * 0.8 : 600}
                    />
                  </Document>

                  {numPages && numPages > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage <= 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        Page {currentPage} of {numPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(numPages, currentPage + 1))
                        }
                        disabled={currentPage >= numPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={currentMedia || '/placeholder.svg'}
                  alt={`Media ${currentIndex + 1}`}
                  className={`${isFullscreen ? 'max-h-[90vh] max-w-[90vw]' : 'max-h-[600px]'} object-contain`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      'https://placehold.co/800x600/e6f3f3/63B7B7?text=Image+Not+Found'
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 p-0 text-gray-700 shadow-md backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 p-0 text-gray-700 shadow-md backdrop-blur-sm hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 p-0 text-gray-700 shadow-md backdrop-blur-sm hover:bg-white"
        >
          {isFullscreen ? (
            <X className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>

        {media.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  currentIndex === index
                    ? 'border-[#63B7B7]'
                    : 'border-transparent'
                }`}
              >
                {isPdf(item) ? (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <FileText className="h-8 w-8 text-[#63B7B7]" />
                  </div>
                ) : (
                  <img
                    src={item || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src =
                        'https://placehold.co/100x100/e6f3f3/63B7B7?text=Image'
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {currentIndex + 1} / {media.length}
        </div>
      </div>
    </div>
  )
}
