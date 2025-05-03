'use client'

import { useState } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Textarea,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@dalla/design-system'
// import type { ProjectStatus } from '@lib/types/project' // Removed specific import
import {
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  UploadCloud,
  Send,
  Paperclip,
  MessageSquare, // For feedback section
} from 'lucide-react'
import MultiImageUpload from '@components/shared/multiImage-upload' // Import the component
import { submitAllInOne } from '@lib/api/pro/projects'

// Reusing the Submission type definition from the company side
// Ensure this matches the actual data structure received by the professional
type Submission = {
  id: string
  description: string
  submittedAt: string
  updatedAt: string
  status: 'Pending' | 'Approved' | 'ChangesRequested' | 'Rejected'
  media: string[]
  comments: {
    id: string
    author: string // Should distinguish company vs professional
    authorName: string
    text: string
    createdAt: string
  }[]
}

interface ProfessionalAllInOneActionsProps {
  projectId: string
  submission: Submission | null | undefined
  projectStatus: string // Use string type for now
}

export function ProfessionalAllInOneActions({
  projectId,
  submission,
  projectStatus,
}: ProfessionalAllInOneActionsProps) {
  const [description, setDescription] = useState('')
  // State for uploaded media URLs from MultiImageUpload
  const [uploadedMediaUrls, setUploadedMediaUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleSubmitWork = async () => {
    // Validation: Check if description is provided
    if (!description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please provide a description for your submission.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Media URLs are now managed by uploadedMediaUrls state

      // TODO: Implement API call to submit work
      await submitAllInOne({
        payload: { description, media: uploadedMediaUrls },
        projectId,
      }).then(async () => {
        toast({ title: 'Work submitted successfully!' })
        await queryClient.invalidateQueries({
          queryKey: ['project', projectId],
        })

        setDescription('')
        setUploadedMediaUrls([])
      })
    } catch (err: any) {
      toast({
        title: 'Error submitting work',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine the current state based on submission and project status
  let statusContent
  const canSubmit = !submission || submission.status === 'ChangesRequested'

  if (projectStatus === 'Completed') {
    statusContent = (
      <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Project Completed</p>
          <p className="text-sm">
            The company has approved the final submission.
          </p>
        </div>
      </div>
    )
  } else if (submission?.status === 'Approved') {
    statusContent = (
      <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Submission Approved</p>
          <p className="text-sm">
            Waiting for final project completion by the company.
          </p>
        </div>
      </div>
    )
  } else if (submission?.status === 'Pending') {
    statusContent = (
      <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 p-4 text-blue-800">
        <Clock className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Pending Review</p>
          <p className="text-sm">
            Your submission is awaiting review by the company.
          </p>
        </div>
      </div>
    )
  } else if (submission?.status === 'ChangesRequested') {
    statusContent = (
      <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
        <RefreshCw className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Changes Requested</p>
          <p className="text-sm">
            The company has requested changes. See feedback below.
          </p>
        </div>
      </div>
    )
  } else {
    // No submission yet
    statusContent = (
      <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-800">
        <UploadCloud className="h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Awaiting Submission</p>
          <p className="text-sm">Submit your work for the company to review.</p>
        </div>
      </div>
    )
  }

  // Extract company comments/feedback from submission
  const companyFeedback = submission?.comments?.filter(
    (c) => c.author === 'company', // Assuming author field distinguishes
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Submission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {statusContent}

        {/* Display Company Feedback if Changes Requested */}
        {submission?.status === 'ChangesRequested' &&
          companyFeedback &&
          companyFeedback.length > 0 && (
            <div className="space-y-3 rounded-md border border-yellow-200 bg-yellow-50/60 p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-yellow-900">
                <MessageSquare className="h-4 w-4" /> Company Feedback
              </h3>
              {companyFeedback.map((comment) => (
                <div
                  key={comment.id}
                  className="border-t border-yellow-200 pt-2 text-sm text-yellow-800 first:border-t-0 first:pt-0"
                >
                  {/* Consider adding author name/timestamp if available */}
                  <p className="whitespace-pre-wrap">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

        {/* Submission Form - Show if allowed */}
        {canSubmit && projectStatus === 'InProgress' && (
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {submission?.status === 'ChangesRequested'
                ? 'Submit Revision'
                : 'Submit Work'}
            </h3>
            <Textarea
              placeholder="Add a description for your submission..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
            {/* Use MultiImageUpload component */}
            <MultiImageUpload
              images={uploadedMediaUrls}
              onImagesChange={setUploadedMediaUrls}
              maxImages={10} // Adjust as needed
              label="Attach Files (Optional)"
              allowAllFileTypes={true} // Allow various file types for deliverables
              maxFileSize={25} // Example: 25MB limit, adjust as needed
            />
          </div>
        )}
      </CardContent>

      {/* Footer with Submit Button */}
      {canSubmit && projectStatus === 'InProgress' && (
        <CardFooter className="border-t border-gray-200 pt-4">
          <Button
            onClick={handleSubmitWork}
            disabled={isSubmitting || !description.trim()} // Ensure description is not just whitespace
            className="ml-auto !bg-[#1D8489] text-white hover:!bg-[#1D8489]/90"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="mr-1.5 h-4 w-4" /> Submit Work
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
