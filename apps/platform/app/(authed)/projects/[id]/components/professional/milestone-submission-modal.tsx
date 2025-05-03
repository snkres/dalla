'use client'

import { useState } from 'react'
import { Modal, Button, Textarea } from '@dalla/design-system'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { Milestone } from '@lib/types/project'
import { Send } from 'lucide-react'
import MultiImageUpload from '@components/shared/multiImage-upload'
import { submitMilestone } from '@lib/api/pro/projects'
import { useQueryClient } from '@tanstack/react-query'

interface MilestoneSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  milestone: Milestone
}

export function MilestoneSubmissionModal({
  isOpen,
  onClose,
  projectId,
  milestone,
}: MilestoneSubmissionModalProps) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [description, setDescription] = useState('')
  const [media, setMedia] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: 'Description Required',
        description: 'Please provide a description for your submission.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    const submissionData = {
      description,
      media,
    }

    try {
      await submitMilestone({
        projectId,
        milestoneId: milestone.id || '',
        payload: submissionData,
      })

      await queryClient.refetchQueries({
        queryKey: ['project', projectId],
      })

      toast({
        title: 'Submission Successful',
        description: `Work for milestone "${milestone.title}" submitted.`,
      })
      onClose()
      setDescription('')
      setMedia([])
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: 'Submission Failed',
        description: 'Could not submit milestone work. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Submit Work for Milestone: ${milestone.title}`}
      width="lg"
      bodyClassName="overflow-y-auto"
    >
      <div className="space-y-6 p-6">
        {/* Description */}
        <div>
          <label
            htmlFor="submission-description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="submission-description"
            placeholder="Describe the work you've completed for this milestone..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
            className="resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            Provide details about your submission and any relevant notes for the
            client.
          </p>
        </div>

        {/* Use MultiImageUpload Component */}
        <div>
          <MultiImageUpload
            images={media}
            onImagesChange={setMedia}
            maxImages={5}
            label="Attach Files"
            allowAllFileTypes={true}
            maxFileSize={10}
          />
        </div>

        {/* Submission Button */}
        <div className="border-t border-gray-100 pt-4">
          <Button
            className="w-full !bg-[#63B7B7] text-white hover:!bg-[#63B7B7]/90"
            onClick={handleSubmit}
            disabled={isSubmitting || !description.trim()}
          >
            {isSubmitting ? (
              <>
                <Send className="mr-2 h-4 w-4 animate-pulse" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Milestone Work
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
