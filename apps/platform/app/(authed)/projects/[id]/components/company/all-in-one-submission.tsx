'use client'

import { useState } from 'react'
import { useToast } from '@dalla/design-system/ui/toast/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Textarea, Badge } from '@dalla/design-system'
import { reviewAllInOne } from '@lib/api/company/projects' // Assuming project data structure
import type { ReviewSubmission } from '@lib/types/project' // For review payload
import { CheckCircle, RefreshCw, Paperclip, AlertCircle } from 'lucide-react'

type Submission = {
  id: string
  description: string
  submittedAt: string // or Date
  updatedAt: string // or Date
  status: 'Pending' | 'Approved' | 'ChangesRequested' | 'Rejected'
  media: string[]
  comments: {
    id: string
    author: string
    authorName: string
    text: string
    createdAt: string // or Date
  }[]
}

interface CompanyAllInOneSubmissionProps {
  projectId: string
  // Pass the relevant submission data. This might be project.submissions directly,
  // or a specific submission derived from the project data.
  submission: Submission | null | undefined
  professionalName: string // For display purposes
  isProjectCompleted: boolean
}

export function CompanyAllInOneSubmission({
  projectId,
  submission,
  professionalName,
  isProjectCompleted,
}: CompanyAllInOneSubmissionProps) {
  const [reviewComment, setReviewComment] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleReviewAction = async (reviewPayload: {
    status: ReviewSubmission['status']
    comment?: string
  }) => {
    if (!submission) {
      toast({ title: 'No submission found', variant: 'destructive' })
      return
    }

    // Construct the final ReviewSubmission object based on the expected type
    // Assuming ReviewSubmission expects status and an array of comments or similar structure
    // Adjust this based on the actual definition of ReviewSubmission
    const review: ReviewSubmission = {
      status: reviewPayload.status,
      // If ReviewSubmission expects a comments array, structure it like this:
      // comments: reviewPayload.comment ? [{ text: reviewPayload.comment /* add other fields if needed */ }] : [],
      // If it expects just a single comment string field named 'comments':
      comments: reviewPayload.comment || '', // Adjust field name and structure as needed
    }

    setIsSubmittingReview(true)
    try {
      await reviewAllInOne(projectId, submission.id, review).then(async () => {
        await queryClient.refetchQueries({
          queryKey: ['project', projectId],
        })

        const actionMessages: Record<ReviewSubmission['status'], string> = {
          Approved: 'Project approved! The professional has been notified.',
          ChangesRequested:
            'Change request sent. The professional has been notified.',
          Rejected: 'Project rejected. The professional has been notified.',
        }
        toast({
          title: actionMessages[review.status],
          variant: review.status === 'Rejected' ? 'destructive' : 'default',
        })
      })

      setReviewComment('')
    } catch (err: any) {
      toast({
        title: 'Error submitting review',
        description:
          err instanceof Error ? err.message : 'An unknown error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmittingReview(false)
    }
  }

  if (isProjectCompleted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center shadow-sm">
        <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-600" />
        <h3 className="text-lg font-semibold text-green-800">
          Project Completed
        </h3>
        <p className="text-sm text-green-700">
          This project has been successfully approved and completed.
        </p>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Awaiting Submission
        </h3>
        <p className="text-sm text-gray-600">
          {professionalName} has not submitted the work for review yet.
        </p>
      </div>
    )
  }

  // Determine status badge variant and classes
  const getStatusBadge = () => {
    switch (submission.status) {
      case 'Approved':
        // Use default variant with green styling
        return (
          <Badge className="border-green-200 bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case 'Pending':
        return <Badge variant="secondary">Pending Review</Badge>
      case 'ChangesRequested':
        // Use outline variant with yellow/amber styling
        return (
          <Badge variant="outline" className="border-amber-300 text-amber-700">
            Changes Requested
          </Badge>
        )
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{submission.status}</Badge>
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Review Submission
          </h2>
          {getStatusBadge()}
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Review the work submitted by {professionalName}.
        </p>
      </div>

      <div className="space-y-6 p-5">
        {/* Submission Details */}
        <div>
          <h3 className="mb-2 font-medium text-gray-800">
            Submission Description
          </h3>
          <p className="whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50/50 p-3 text-sm text-gray-700">
            {submission.description || 'No description provided.'}
          </p>
        </div>

        {/* Submitted Files/Media */}
        {submission.media && submission.media.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium text-gray-800">Submitted Files</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {submission.media.map((fileUrl, index) => (
                <a
                  key={index}
                  href={fileUrl} // Assuming these are direct URLs
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-100 transition-colors hover:bg-gray-200"
                >
                  {/* Basic file icon - enhance later if needed */}
                  <Paperclip className="h-8 w-8 text-gray-500 group-hover:text-gray-700" />
                  {/* Add file preview/thumbnail later if possible */}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TODO: Display Comments if available */}

        {/* Review Actions - Show only if Pending or ChangesRequested? */}
        {(submission.status === 'Pending' ||
          submission.status === 'ChangesRequested') &&
          !isProjectCompleted && (
            <div className="space-y-4 border-t border-gray-200 pt-5">
              <h3 className="font-medium text-gray-800">Provide Feedback</h3>
              <Textarea
                placeholder={`Provide feedback for ${professionalName}... (Optional for approval)`}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
              <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleReviewAction({
                      status: 'ChangesRequested',
                      comment: reviewComment || 'Changes requested.',
                    })
                  }
                  disabled={isSubmittingReview || !reviewComment} // Require comment for changes
                >
                  <RefreshCw className="mr-1.5 h-4 w-4" />
                  Request Changes
                </Button>
                {/* Consider adding Reject button if needed - requires careful handling */}
                {/* <Button
                        variant="destructive"
                         onClick={() => handleReviewAction({ status: 'Rejected', comment: reviewComment || 'Rejected' })}
                         disabled={isSubmittingReview || !reviewComment}
                    >
                        <XCircle className="mr-1.5 h-4 w-4" />
                        Reject
                    </Button> */}
                <Button
                  onClick={() =>
                    handleReviewAction({
                      status: 'Approved',
                      comment: reviewComment,
                    })
                  }
                  disabled={isSubmittingReview}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle className="mr-1.5 h-4 w-4" />
                  Approve Submission
                </Button>
              </div>
              {submission.status === 'ChangesRequested' && (
                <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-600" />
                  You previously requested changes on this submission.
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  )
}
