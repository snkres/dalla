'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { Button } from '../button'
import { X, ExternalLink } from 'lucide-react'
import { cn } from '@dallah/utils'

// Animation constants
const SLIDE_ANIMATION = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { type: 'spring', damping: 25, stiffness: 300 },
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  showExternalLink?: boolean
  onExternalLinkClick?: () => void
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  headerClassName?: string
  bodyClassName?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showExternalLink = false,
  onExternalLinkClick,
  width = 'md',
  className,
  headerClassName,
  bodyClassName,
}: ModalProps): React.ReactNode {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const widthClasses = {
    sm: 'md:w-[400px]',
    md: 'md:w-[600px]',
    lg: 'md:w-[750px]',
    xl: 'md:w-[1000px]',
    full: 'w-full',
  }

  if (!isMounted || !isOpen) return null

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        {...SLIDE_ANIMATION}
        className={cn(
          'fixed bottom-2 left-auto right-4 top-2 z-50 flex w-full flex-col rounded-3xl border-l border-gray-200 bg-white shadow-lg',
          widthClasses[width],
          className,
        )}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-full flex-col"
        >
          {/* Header */}
          <div
            className={cn(
              'sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 px-4 py-3',
              headerClassName,
            )}
          >
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center !rounded-full text-gray-500 transition-colors hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
            {title && (
              <h2 className="text-sm font-medium text-gray-700">{title}</h2>
            )}
            {showExternalLink && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 !rounded-full text-[#63B7B7]"
                onClick={onExternalLinkClick}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            {!showExternalLink && <div className="w-8" />}
          </div>

          {/* Body */}
          <div className={cn('flex-1 overflow-y-auto', bodyClassName)}>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </>
  )

  return createPortal(modalContent, document.body)
}

export default Modal
